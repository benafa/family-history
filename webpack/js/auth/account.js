import { apiClient, urlBase, logoutUrl, ACCOUNT_PAGE } from '../fetch/fetch_data';
import { getMember, rememberNextPage, takeNextPage } from './member';

const GENERIC_ERROR = 'Something went wrong. Please try again.';

function show(id) {
    document.getElementById(id).style.display = 'block';
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}

function setTitle(text) {
    document.getElementById('page-title').textContent = text;
}

function setMessage(id, text) {
    const message = document.getElementById(id);
    message.textContent = text;
    message.style.display = 'block';
}

function postAuth(path, body) {
    return apiClient.postJson(urlBase + 'api/auth/' + path, body);
}

// Waits for a click because email security scanners open links and run the page
function showConfirmSignIn(token) {
    setTitle('Sign in');
    show('confirm-sign-in-panel');
    document.getElementById('confirm-sign-in').addEventListener('click', async (event) => {
        event.target.disabled = true;
        try {
            const result = await postAuth('verify', { token });
            if (result.ok) {
                window.location.replace(takeNextPage());
                return;
            }
            setMessage('account-error', result.data.msg || GENERIC_ERROR);
        } catch (error) {
            setMessage('account-error', GENERIC_ERROR);
        }
        hide('confirm-sign-in-panel');
        showSignIn();
    });
}

function describeApplicant(details) {
    const place = details.city ? ` from ${details.city}` : '';
    const source = details.how_heard ? ` Heard about the site from: ${details.how_heard}.` : '';
    return `${details.first_name} ${details.last_name} (${details.email})${place}.${source}`;
}

async function showReview(token) {
    setTitle('Review signup');
    show('review-panel');
    try {
        const details = await postAuth('review', { token });
        if (!details.ok) {
            hide('review-buttons');
            setMessage('review-result', details.data.msg || GENERIC_ERROR);
            return;
        }
        setMessage('review-details', describeApplicant(details.data));
    } catch (error) {
        hide('review-buttons');
        setMessage('review-result', GENERIC_ERROR);
        return;
    }

    show('review-buttons');
    for (const decision of ['approve', 'reject']) {
        document.getElementById(`review-${decision}`).addEventListener('click', async () => {
            hide('review-buttons');
            try {
                const result = await postAuth('decide', { token, decision });
                setMessage('review-result', result.data.msg || GENERIC_ERROR);
            } catch (error) {
                setMessage('review-result', GENERIC_ERROR);
            }
        });
    }
}

function showAccount(member) {
    setTitle('Account Homepage');
    document.getElementById('account-email').textContent = member.email;
    show('account-panel');
    document.getElementById('sign-out').addEventListener('click', async () => {
        await apiClient.logout(logoutUrl);
        window.location.replace(ACCOUNT_PAGE);
    });
}

function showSignIn() {
    setTitle('Sign in or create an account');
    show('sign-in-panel');
    show('site-info');
}

function connectForm(formId, path, messageId, readBody) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = form.querySelector('button');
        button.disabled = true;
        try {
            const result = await postAuth(path, readBody(new FormData(form)));
            setMessage(messageId, result.data.msg || GENERIC_ERROR);
        } catch (error) {
            setMessage(messageId, GENERIC_ERROR);
        }
        button.disabled = false;
    });
}

async function initAccountPage() {
    connectForm('sign-in-form', 'request_link', 'sign-in-message',
        (data) => ({ email: data.get('email') }));
    connectForm('sign-up-form', 'signup', 'sign-up-message',
        (data) => Object.fromEntries(data.entries()));

    rememberNextPage(new URLSearchParams(window.location.search).get('next'));

    // The page head moves these out of the address bar before analytics loads
    const { token, review } = window.authLink || {};
    if (token) {
        showConfirmSignIn(token);
    } else if (review) {
        await showReview(review);
    } else {
        const member = await getMember();
        if (member.logged_in) {
            showAccount(member);
        } else {
            showSignIn();
        }
    }
}

document.addEventListener('DOMContentLoaded', initAccountPage);

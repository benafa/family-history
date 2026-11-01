import { apiClient, urlBase, logoutUrl } from '../fetch/fetch_data';
import { getMember, rememberNextPage, takeNextPage } from './member';

const ACCOUNT_PAGE = process.env.ACCOUNT_PAGE || "/account";

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

async function postJson(path, body) {
    const response = await fetch(urlBase + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, msg: data.msg };
}

async function finishSignIn(token) {
    setTitle('Signing you in...');
    // Clean the one-time link out of the address bar and browser history
    window.history.replaceState({}, '', ACCOUNT_PAGE);
    try {
        const result = await postJson('api/auth/verify', { token });
        if (result.ok) {
            window.location.replace(takeNextPage());
            return;
        }
        setMessage('account-error', result.msg);
    } catch (error) {
        setMessage('account-error', 'Something went wrong. Please try again.');
    }
    showSignIn();
}

function showReview(token) {
    setTitle('Review signup');
    window.history.replaceState({}, '', ACCOUNT_PAGE);
    show('review-panel');
    for (const decision of ['approve', 'reject']) {
        document.getElementById(`review-${decision}`).addEventListener('click', async () => {
            const result = await postJson('api/auth/decide', { token, decision });
            hide('review-buttons');
            setMessage('review-result', result.msg || 'Something went wrong.');
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
            const result = await postJson(path, readBody(new FormData(form)));
            setMessage(messageId, result.msg || 'Something went wrong. Please try again.');
            if (result.ok) {
                form.style.display = 'none';
            }
        } catch (error) {
            setMessage(messageId, 'Something went wrong. Please try again.');
        }
        button.disabled = false;
    });
}

async function initAccountPage() {
    connectForm('sign-in-form', 'api/auth/request_link', 'sign-in-message',
        (data) => ({ email: data.get('email') }));
    connectForm('sign-up-form', 'api/auth/signup', 'sign-up-message',
        (data) => Object.fromEntries(data.entries()));

    const params = new URLSearchParams(window.location.search);
    rememberNextPage(params.get('next'));

    if (params.get('token')) {
        await finishSignIn(params.get('token'));
    } else if (params.get('review')) {
        showReview(params.get('review'));
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

import { apiClient, urlBase, refreshUrl, ACCOUNT_PAGE } from '../fetch/fetch_data';

const NEXT_PAGE_KEY = "next_page";
const NEXT_PAGE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function fetchMember() {
    return fetch(urlBase + 'api/auth/me', { credentials: 'include' });
}

async function readMember() {
    const response = await fetchMember();
    const member = response.ok ? await response.json() : null;
    return { response, member };
}

async function loadMember() {
    try {
        let { response, member } = await readMember();
        // The access cookie lapses after 15 minutes, so a returning member may only have the refresh cookie
        if (response.status === 401 || (member && !member.logged_in && hasSessionCookie())) {
            await apiClient.refreshToken(refreshUrl);
            ({ response, member } = await readMember());
        }
        if (member) {
            return member;
        }
        return { logged_in: false, unknown: response.status >= 500 };
    } catch (error) {
        // A rejected refresh means signed out; anything else means the API could not answer
        const signedOut = error instanceof Response && error.status < 500;
        return { logged_in: false, unknown: !signedOut };
    }
}

// Shared on window because each page's scripts are separate bundles
export function getMember() {
    window.memberCheck = window.memberCheck || loadMember();
    return window.memberCheck;
}

export function hasSessionCookie() {
    return Boolean(apiClient.getCookie('csrf_refresh_token'));
}

export function redirectToAccount() {
    const next = window.location.pathname + window.location.search;
    window.location.replace(`${ACCOUNT_PAGE}?next=${encodeURIComponent(next)}`);
}

// Resolves the path the way the browser will, so a crafted link cannot leave this site
function toSameSitePath(next) {
    try {
        const url = new URL(next, window.location.origin);
        return url.origin === window.location.origin ? url.pathname + url.search : null;
    } catch (error) {
        return null;
    }
}

export function rememberNextPage(next) {
    const path = next && toSameSitePath(next);
    try {
        if (path) {
            localStorage.setItem(NEXT_PAGE_KEY, JSON.stringify({ path, savedAt: Date.now() }));
        }
    } catch (error) {
        // Without storage, sign-in still works and lands on the account page
    }
}

export function takeNextPage() {
    try {
        const saved = JSON.parse(localStorage.getItem(NEXT_PAGE_KEY));
        localStorage.removeItem(NEXT_PAGE_KEY);
        const isRecent = saved && Date.now() - saved.savedAt < NEXT_PAGE_MAX_AGE_MS;
        return (isRecent && toSameSitePath(saved.path)) || ACCOUNT_PAGE;
    } catch (error) {
        return ACCOUNT_PAGE;
    }
}

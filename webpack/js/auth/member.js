import { apiClient, urlBase, refreshUrl } from '../fetch/fetch_data';

const ACCOUNT_PAGE = process.env.ACCOUNT_PAGE || "/account";
const NEXT_PAGE_KEY = "next_page";

async function fetchMember() {
    return fetch(urlBase + 'api/auth/me', { credentials: 'include' });
}

// Asks the API whether this visitor is signed in, renewing an expired session if possible
export async function getMember() {
    try {
        let response = await fetchMember();
        if (response.status === 401) {
            await apiClient.refreshToken(refreshUrl);
            response = await fetchMember();
        }
        return response.ok ? await response.json() : { logged_in: false };
    } catch (error) {
        return { logged_in: false };
    }
}

export function redirectToAccount() {
    const next = window.location.pathname + window.location.search;
    window.location.replace(`${ACCOUNT_PAGE}?next=${encodeURIComponent(next)}`);
}

// Only paths on this site, so a crafted link cannot send someone elsewhere after sign-in
function isSafeNextPage(next) {
    return typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') && !next.includes('\\');
}

export function rememberNextPage(next) {
    try {
        if (isSafeNextPage(next)) {
            localStorage.setItem(NEXT_PAGE_KEY, next);
        }
    } catch (error) {
        // Without storage, sign-in still works and lands on the account page
    }
}

export function takeNextPage() {
    try {
        const next = localStorage.getItem(NEXT_PAGE_KEY);
        localStorage.removeItem(NEXT_PAGE_KEY);
        return isSafeNextPage(next) ? next : ACCOUNT_PAGE;
    } catch (error) {
        return ACCOUNT_PAGE;
    }
}

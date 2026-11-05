import { apiClient, urlBase, refreshUrl } from '../fetch/fetch_data';
import { hasSessionCookie } from './member';

const trackUrl = urlBase + 'api/track';

function sendVisit(visit) {
    return fetch(trackUrl, {
        method: 'POST',
        credentials: 'include',
        keepalive: true,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN-ACCESS': apiClient.getCookie('csrf_access_token') || ''
        },
        body: JSON.stringify(visit)
    });
}

// Records which page a signed-in member opened, for the site owner's private report
async function recordVisit() {
    if (!hasSessionCookie()) {
        return;
    }
    const visit = { path: window.location.pathname + window.location.search, title: document.title };
    try {
        const response = await sendVisit(visit);
        if (response.status === 401) {
            await apiClient.refreshToken(refreshUrl);
            await sendVisit(visit);
        }
    } catch (error) {
        // Recording a visit must never get in the way of reading the page
    }
}

document.addEventListener('DOMContentLoaded', recordVisit);

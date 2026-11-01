import { getMember, hasSessionCookie, redirectToAccount } from './member';

// The cookie check needs no network, so members never wait on the API to see a page
async function checkAccess() {
    if (!hasSessionCookie()) {
        redirectToAccount();
        return;
    }

    document.documentElement.classList.remove('member-gate-pending');
    const member = await getMember();
    if (!member.logged_in && !member.unknown) {
        redirectToAccount();
    }
}

checkAccess();

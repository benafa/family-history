import { getMember, redirectToAccount } from './member';

async function checkAccess() {
    const member = await getMember();
    if (member.logged_in) {
        document.documentElement.classList.remove('member-gate-pending');
    } else {
        redirectToAccount();
    }
}

checkAccess();

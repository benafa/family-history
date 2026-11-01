import { getMember } from './member';

document.addEventListener('DOMContentLoaded', async function() {
    const member = await getMember();
    if (member.logged_in) {
        document.getElementById('comment-name').value = member.name || '';
        document.getElementById('comment-email').value = member.email || '';
    }
});

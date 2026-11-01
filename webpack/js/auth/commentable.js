import { getMember } from './member';

document.addEventListener('DOMContentLoaded', async function() {
    const member = await getMember();

    for (const element of document.getElementsByClassName('comment-allowed')) {
        element.style.display = member.logged_in ? 'block' : 'none';
    }

    for (const element of document.getElementsByClassName('comment-denied')) {
        element.style.display = member.logged_in ? 'none' : 'block';
    }
});

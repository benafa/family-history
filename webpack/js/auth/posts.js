import { getMember } from './member';

document.addEventListener('DOMContentLoaded', async function() {
    const member = await getMember();
    const elements = document.getElementsByClassName('login_prompt');

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = member.logged_in ? 'none' : 'block';
    }
});

import { setPersonData } from './requests/set_person';

document.addEventListener("DOMContentLoaded", async function() {
    function getIdFromUrl() {
        const path = window.location.pathname;
        const pathParts = path.split('/');
        // Assuming URL is like /person/id
        return pathParts[pathParts.length - 1];
    }

    const personId = getIdFromUrl();
    console.log("person id")
    console.log(personId)
    await setPersonData(personId);
});
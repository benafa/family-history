import { setPersonData } from './requests/set_person';

function getIdFromUrl() {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const queryParams = new URLSearchParams(url.search);

    // Check if the URL has a query parameter 'id'
    if (queryParams.has('id')) {
        return queryParams.get('id');
    }

    // If not, assume the last part of the path is the ID
    const pathParts = path.split('/');
    return pathParts[pathParts.length - 1];
}

const SITE_BASE_URL = process.env.SITE_BASE_URL;

document.addEventListener("DOMContentLoaded", async function() {
    var path = window.location.pathname;
    console.log("hello")
  	const personId = getIdFromUrl();
    console.log("person id")
    console.log(personId)
    await setPersonData(personId);
     
});
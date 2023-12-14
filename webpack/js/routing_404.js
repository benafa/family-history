import { setPersonData } from './requests/set_person';

function getIdFromUrl() {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    // Assuming URL is like /person/id
    return pathParts[pathParts.length - 1];
}

const SITE_BASE_URL = process.env.SITE_BASE_URL;

document.addEventListener("DOMContentLoaded", async function() {
    var path = window.location.pathname;
    console.log("hello")
    // Check if the URL path starts with '/person'
    if (path.startsWith(`${SITE_BASE_URL}/person`)) {
		// Hide the default 404 content
		var errorContainer = document.getElementById('error-container');
		if (errorContainer) {
			errorContainer.style.display = 'none';
		}

		var pageTitle = document.getElementById('page-title');
		if (pageTitle) {
			pageTitle.style.display = 'block';
		}
      	
      	const personId = getIdFromUrl();
	    console.log("person id")
	    console.log(personId)
	    await setPersonData(personId);
     } else {

     }
});
import { setPersonData } from './requests/set_person';

let PAGE_INIT = false;
const SITE_BASE_URL = process.env.SITE_BASE_URL;

document.addEventListener("DOMContentLoaded", async function() {
    await initPerson();
});

document.addEventListener('MemberSpace.member.info', async function() {
  	if (!PAGE_INIT) {
	  	await initPerson();
	}
});

async function initPerson() {
	try {
    	var path = window.location.pathname;
  		const personId = getIdFromUrl();
    	await setPersonData(personId);
    	PAGE_INIT = true;  
    } catch(error) {
    	//
    	console.log(error);
    } 
}

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
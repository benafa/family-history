import { getRestDataWrapper } from '../fetch/fetch_data';

const PERSON_ENDPOINT = "individuals"
const LOCAL_STORAGE_TREE_KEY = process.env.LOCAL_STORAGE_TREE_KEY ||  "tree_id"
const DYNAMIC_TREE_PAGE = process.env.DYNAMIC_TREE_PAGE ||  "/dynamic"

async function setPersonData(person_id) {
    try {
        const personData = await getRestDataWrapper(PERSON_ENDPOINT, person_id);

        // Find the container element
        const container = document.getElementById('dynamic-content');
        
        // Append the fetched data to the container
        container.innerHTML = personData; 

        document.querySelectorAll('.view-tree').forEach(function(element) {
            element.addEventListener('click', function() {
                localStorage.setItem(LOCAL_STORAGE_TREE_KEY, person_id);
                window.location.href = DYNAMIC_TREE_PAGE;
            });
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { setPersonData };

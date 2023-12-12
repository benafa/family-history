import { getRestDataWrapper } from '../fetch/fetch_data';
import { runTreeCode } from '../tree';

const TREE_ENDPOINT = "tree"
const PROFILE_PAGE = process.env.PROFILE_PAGE ||  "/person/"


async function setTreeData(person_id) {
    try {
        const treeData = await getRestDataWrapper(TREE_ENDPOINT, person_id);

        // Find the container element
        const container = document.getElementById('tree-content');
        
        // Append the fetched data to the container
        container.innerHTML = treeData; 

        runTreeCode();
        console.log("finsh run tree code")
        document.querySelectorAll('.tree-link').forEach(function(element) {
            element.addEventListener('click', function() {
                setTreeData(this.dataset.treeId);
            });
        });
        document.querySelectorAll('.profile-link').forEach(function(element) {
            element.addEventListener('click', function() {
                const url = PROFILE_PAGE +  this.dataset.profileId;
                window.location.href = url;
            });
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { setTreeData };

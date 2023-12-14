import { getRestDataWrapper } from '../fetch/fetch_data';
import { runTreeCode } from '../tree';

const TREE_ENDPOINT = "tree"
const PROFILE_PAGE = process.env.PROFILE_PAGE ||  "/person?id="

async function setTreeData(person_id, dynamic = true) {
    try {
        const treeData = await getRestDataWrapper(TREE_ENDPOINT, person_id);

        // Find the container element
        const container = document.getElementById('tree-content');
        
        // Append the fetched data to the container
        container.innerHTML = treeData; 

        runTreeCode();
        console.log("finsh run tree code")
        if (dynamic) {
            document.querySelectorAll('.tree-link').forEach(function(element) {
                element.addEventListener('click', function() {
                    setTreeData(this.dataset.treeId);
                });
            });
        } else {
            document.querySelectorAll('.tree-link').forEach(function(element) {
                element.addEventListener('click', function() {
                    const url = PROFILE_PAGE +  this.dataset.treeId;
                    window.location.href = url;
                });
            });
        }
        
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

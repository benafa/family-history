import { getRestDataWrapper } from './fetch_data';
import { runTreeCode } from './tree';

async function setTreeData(url_end) {
    try {
        const treeData = await getRestDataWrapper(url_end);

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
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { setTreeData };

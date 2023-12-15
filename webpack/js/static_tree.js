import { activateAll } from './utilities/tree_helpers';
import { setTreeData } from './requests/set_tree';

async function initStaticTree(treeId) {
  try {
    await setTreeData(treeId, false);
    const main_profile = document.getElementById('main-profile-link');
    main_profile.style.display = 'none';
  } catch(error) {
      //console.log("initDynamicTree failed")
      console.log(error)
      throw error
  } 
}

window.initStaticTree = initStaticTree;
window.activateAll = activateAll;
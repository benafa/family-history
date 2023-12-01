import { runTreeCode } from './tree';
import { activateAll } from './tree';

document.addEventListener('DOMContentLoaded', async function() {
    runTreeCode();
    document.getElementById('activate_all').addEventListener('click', function() {
      activateAll();
  });
});

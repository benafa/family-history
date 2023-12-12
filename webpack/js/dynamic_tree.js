import { getPeopleList } from './requests/list_of_people';
import { setTreeData } from './requests/set_tree';
import { activateAll } from './tree';

document.addEventListener('DOMContentLoaded', async function() {
    await initDynamicTree();
});

document.addEventListener('MemberSpace.member.info', initDynamicTree);

async function initDynamicTree() {
    const searchInput = document.getElementById('search-input');
    const dropdown = document.getElementById('dropdown');
    const selectedIdInput = document.getElementById('selected-id');
    document.getElementById('activate_all').addEventListener('click', function() {
          activateAll();
      });

    try {
        // init view
        await setTreeData("I0001");
        const people = await loadAndSortPeople();
        searchInput.addEventListener('input', () => handleInput(searchInput, dropdown, selectedIdInput, people));
        searchInput.addEventListener('blur', () => handleBlur(dropdown));
    } catch(error) {
        //console.log("initDynamicTree failed")
        //console.log(error)
        //throw error
    } 
}

async function loadAndSortPeople() {
    const people_res = await getPeopleList();
    const people = people_res.data.individuals;

    return people.sort((a, b) => sortPeopleByName(a, b));
}

function sortPeopleByName(a, b) {
    const aGivn = a.GIVN ? a.GIVN.toLowerCase() : '';
    const bGivn = b.GIVN ? b.GIVN.toLowerCase() : '';
    const aSurn = a.SURN ? a.SURN.toLowerCase() : '';
    const bSurn = b.SURN ? b.SURN.toLowerCase() : '';

    if (aGivn === bGivn) {
        return aSurn.localeCompare(bSurn);
    }
    return aGivn.localeCompare(bGivn);
}

function handleInput(searchInput, dropdown, selectedIdInput, people) {
    const inputValue = searchInput.value.toLowerCase();
    dropdown.innerHTML = '';

    const filteredPeople = people.filter(person => 
        `${person.GIVN} ${person.SURN}`.toLowerCase().includes(inputValue)
    );

    updateDropdown(searchInput, dropdown, selectedIdInput, filteredPeople, inputValue);
}

function updateDropdown(searchInput, dropdown, selectedIdInput, filteredPeople, inputValue) {
    if (filteredPeople.length === 1 && 
        `${filteredPeople[0].GIVN} ${filteredPeople[0].SURN}`.toLowerCase() === inputValue &&
         selectedIdInput.value != filteredPeople[0].id) 
    {
        // Auto-select if only one match and it's exactly as typed
        selectedIdInput.value = filteredPeople[0].id;
        searchInput.value = `${filteredPeople[0].GIVN} ${filteredPeople[0].SURN} (${filteredPeople[0].id})`;
        dropdown.style.display = 'none';
        setTreeData(filteredPeople[0].id);
    } else if (inputValue.length > 1) {
        populateDropdown(dropdown, searchInput, selectedIdInput, filteredPeople);
    } else {
        dropdown.style.display = 'none';
    }
}

function populateDropdown(dropdown, searchInput, selectedIdInput, people) {
    people.forEach(person => {
        let div = document.createElement('div');
        div.textContent = `${person.GIVN} ${person.SURN} (${person.id})`;
        div.onclick = () => selectPerson(person, searchInput, selectedIdInput, dropdown);
        dropdown.appendChild(div);
    });

    dropdown.style.display = 'block';
}

function selectPerson(person, searchInput, selectedIdInput, dropdown) {
    searchInput.value = `${person.GIVN} ${person.SURN} (${person.id})`;
    selectedIdInput.value = person.id; // Store the selected ID
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
    setTreeData(person.id);
}

function handleBlur(dropdown) {
    // Delay hiding the dropdown to allow click event processing
    setTimeout(() => {
        if (!dropdown.contains(document.activeElement)) {
            dropdown.style.display = 'none';
        }
    }, 200);
}
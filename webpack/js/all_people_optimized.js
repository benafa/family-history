import { getPeopleList } from './requests/list_of_people';

let tableData = []; // Stores the original data
let currentPage = 1; // Current page for pagination
const rowsPerPage = 10; // Number of rows per page

document.addEventListener("DOMContentLoaded", async function() {
  try {
    const response = await getPeopleList("with_parents")
    tableData = transformData(response.data.individuals);
    initTable();
    renderTable(tableData);
  } catch (error) {
    console.error('Error:', error);
  }
});

window.addEventListener("pageshow", clearSearchAndResetRows);

function transformData(graphqlData) {
    return graphqlData.map(person => {
        // Extract mother and father information
        const mother = person.parents.find(parent => parent.SEX === 'F');
        const father = person.parents.find(parent => parent.SEX === 'M');

        return {
            id: person.id,
            name: `${person.GIVN} ${person.SURN}`, 
            motherName: mother ? `${mother.GIVN} ${mother.SURN}` : 'Unknown',
            fatherName: father ? `${father.GIVN} ${father.SURN}` : 'Unknown',
            motherId: mother ? `${mother.id}` : 'None',
            fatherId: father ? `${father.id}` : 'None'
        };
    });
}

function renderTable(tableData) {
	const tableBody = document.getElementById('tableBody');
    const fragment = document.createDocumentFragment(); // Use DocumentFragment
    let startIndex = (currentPage - 1) * rowsPerPage;
    let endIndex = startIndex + rowsPerPage;

    tableData.slice(startIndex, endIndex).forEach(person => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td><a href="/person/${person.id}" class="link">${person.name}</a></td>
                        <td style="display: none;">${person.SURN}</td>
                        <td>${person.motherName !== 'unknown' ? `<a href="/person/${person.motherId}" class="link">${person.motherName}</a>` : 'Unknown'}</td>
                        <td>${person.fatherName !== 'unknown' ? `<a href="/person/${person.fatherId}" class="link">${person.fatherName}</a>` : 'Unknown'}</td>`;
        fragment.appendChild(tr);
    });

    tableBody.innerHTML = '';
    tableBody.appendChild(fragment);
}

export function initTable() {
    // Initialize column headers
    var headers = document.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].classList.add("sorted-none");
    }

    // Setup the search input
    const searchInput = document.getElementById("searchInput");

    // Debounce function to limit the frequency of search function calls
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Attach the search input event listener
    searchInput.addEventListener("keyup", debounce(() => {
        filterTable(searchInput.value);
    }, 100));

    // Attach event listeners to column headers for sorting
    for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener("click", function() {
            sortTable(i);
        });
    }
}




function filterTable(searchString) {
    const lowerCaseSearchString = searchString.toLowerCase();

    // Filter tableData based on the search string
    const filteredTableData = tableData.filter(person => {
        return person.name.toLowerCase().includes(lowerCaseSearchString) ||
               person.motherName.toLowerCase().includes(lowerCaseSearchString) ||
               person.fatherName.toLowerCase().includes(lowerCaseSearchString);
    });

    renderTable(filteredTableData);
}

function sortTable(column) {
    const sortKey = getColumnKey(column); // Function to get the key to sort by

    tableData.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        // Check if the values are numbers or strings
        if (!isNaN(valA) && !isNaN(valB)) {
            return valA - valB; // For numerical sorting
        } else {
            return valA.localeCompare(valB); // For string sorting
        }
    });

    renderTable(tableData);
}

// Helper function to map column index to person property
function getColumnKey(columnIndex) {
    const mapping = {
        0: 'name',
        2: 'motherName',
        3: 'fatherName',
        // ... other column mappings ...
    };
    return mapping[columnIndex] || 'name'; // Default to 'name' if no mapping found
}

// Clear search input and reset rows
function clearSearchAndResetRows() {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = "";
    filterTable(''); // Reset the tableData and re-render the table
}
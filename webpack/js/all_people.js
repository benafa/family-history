import { getPeopleList } from './requests/list_of_people';
import { initTable } from './table';

const SITE_BASE_URL = process.env.SITE_BASE_URL;

document.addEventListener("DOMContentLoaded", async function() {
  try {
    const response = await getPeopleList("with_parents")
    const persons = response.data.individuals;
    populateTable(persons);
    initTable()
  } catch (error) {
    console.error('Error:', error);
  }
});

function populateTable(persons) {
  const tableBody = document.getElementById('tableBody');
  let rows = ''; // Initialize an empty string to accumulate rows

  persons.forEach(person => {
    let mother = person.parents.find(parent => parent.SEX === 'F');
    let father = person.parents.find(parent => parent.SEX === 'M');

    let motherLink = mother ? `<a href="${SITE_BASE_URL}/person/${mother.id}" class="link">${mother.GIVN} ${mother.SURN}</a>` : 'Unknown';
    let fatherLink = father ? `<a href="${SITE_BASE_URL}/person/${father.id}" class="link">${father.GIVN} ${father.SURN}</a>` : 'Unknown';
    
    // Build the row string without updating the DOM yet
    rows += `<tr>
               <td><a href="${SITE_BASE_URL}/person/${person.id}" class="link">${person.GIVN} ${person.SURN}</a></td>
               <td style="display: none;">${person.SURN}</td>
               <td>${motherLink}</td>
               <td>${fatherLink}</td>
             </tr>`;
  });

  // Update the DOM once after building the entire table content
  tableBody.innerHTML = rows;
}
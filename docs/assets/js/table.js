function sortTable(column) {
  var table, rows, switching, i, x, y, shouldSwitch, dir;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";
  // Check if the column is already sorted in ascending or descending order
  if (table.querySelector("th.sorted-asc") === table.getElementsByTagName("th")[column]) {
    dir = "desc";
  } else if (table.querySelector("th.sorted-desc") === table.getElementsByTagName("th")[column]) {
    dir = "asc";
  }
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[column];
      y = rows[i + 1].getElementsByTagName("td")[column];
      if (isNaN(x.innerHTML)) {
        if (dir == "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() ||
           dir == "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else {
        if (dir == "asc" && Number(x.innerHTML) > Number(y.innerHTML) ||
           dir == "desc" && Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  // Add sorted class to clicked column header and remove from others
  var headers = table.getElementsByTagName("th");
  for (i = 0; i < headers.length; i++) {
    headers[i].classList.remove("sorted-asc");
    headers[i].classList.remove("sorted-desc");
    headers[i].classList.add("sorted-none");
  }
  if (dir == "asc") {
    headers[column].classList.remove("sorted-none");
    headers[column].classList.add("sorted-asc");
    dir = "desc";
  } else {
    headers[column].classList.remove("sorted-none");
    headers[column].classList.add("sorted-desc");
    dir = "asc";
  }
}

window.addEventListener('DOMContentLoaded', function() { 
  const searchInput = document.getElementById('searchInput');
  const table = document.getElementById('myTable');
  const rows = table.getElementsByTagName('tr');

  searchInput.addEventListener('keyup', function() {
    const searchString = searchInput.value.toLowerCase();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      let rowText = row.innerText.toLowerCase();

      if (rowText.includes(searchString)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
});





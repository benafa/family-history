import {clearSearchAndResetRows, initTable, sortTable} from "./utilities/table_helpers"

window.addEventListener("DOMContentLoaded", function () {
  console.log("table: initTable")
  initTable();
});

// Clear the search input and reset rows display when the back button is pressed
window.addEventListener("pageshow", function (event) {
  clearSearchAndResetRows();
});

window.sortTable = sortTable;
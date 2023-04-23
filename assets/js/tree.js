function recruseiveDeactivate(element) {
	var childUls = element.getElementsByClassName("nested");
  for (var i = 0; i < childUls.length; i++) {
    childUls[i].classList.remove("active");
    recruseiveDeactivate(childUls[i])
  }
  var childButtons = element.getElementsByClassName("collapsible");
  for (var i = 0; i < childButtons.length; i++) {
    childButtons[i].classList.remove("active");
  }
}

function adjustHeight(parent_li, parent_ul, recursive) {
	parent_of_parent_ul = parent_ul.parentElement;
	const parent_of_parent_ul_children = parent_of_parent_ul.querySelectorAll(':scope > li');
	const parent_of_parent_ul_last_li = parent_of_parent_ul_children[parent_of_parent_ul_children.length - 1];
	console.log("compare")
	console.log(parent_of_parent_ul)
	console.log(parent_of_parent_ul_last_li)
	console.log(parent_li)
	console.log(parent_ul)
	console.log("end of comapre")

		// Get all li elements within the ul
		const allLiElements = parent_ul.querySelectorAll(':scope > li');

		// Get the last li element
		const lastLi = allLiElements[allLiElements.length - 1];
		console.log("hello_time")
		console.log(lastLi)
		console.log(lastLi.getBoundingClientRect())
	    const liHeight_half = lastLi.getBoundingClientRect().height/2;
	    const ul_dim = parent_ul.getBoundingClientRect();
	    const parent_li_dim = parent_li.getBoundingClientRect();
		//const liTop = lastLi.getBoundingClientRect().top;
		//const ulTop = parent_ul.getBoundingClientRect().top;
		//const ulBeforeHeight = liTop + liHeight / 2 - ulTop;
		console.log(ul_dim)
		console.log(parent_li_dim)
		const correct_hi = ul_dim.bottom - parent_li_dim.bottom - liHeight_half
		//parent_ul.style.setProperty('--ul-before-margin', `${liHeight_half}px`);
		parent_ul.style.setProperty('--ul-before-margin', `${correct_hi}px`);


	if (parent_of_parent_ul_last_li !== parent_li) {

		if (recursive & parent_of_parent_ul.tagName === 'UL' & !parent_of_parent_ul.classList.contains("level-0")) {
			adjustHeight(parent_of_parent_ul.previousElementSibling, parent_of_parent_ul, true)
		}
	}
}

function changeActiveClass(element) {
  // this will toggle active for all descendents 
	element.classList.toggle("active");

	parent_li = element.parentElement.parentElement.parentElement;
	parent_ul = parent_li.nextElementSibling;
    parent_ul.classList.toggle("active");

    console.log("compare1")
    console.log(parent_ul)
	console.log(parent_li)
	console.log("compare2")


    adjustHeight(parent_li, parent_ul, true);

	if (element.classList.contains("active")) {
	    element.textContent = "";
	} else {
		element.textContent = "";
		recruseiveDeactivate(parent_ul)
	}
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
		changeActiveClass(this);
	});
}

var isExpanded = false;
function activateAll() {
  
  // Get all nested lists in the document
  var nestedLists = document.getElementsByClassName("nested");


  // Loop through each nested list
  for (var i = 0; i < nestedLists.length; i++) {
    var nestedList = nestedLists[i];

    // Add the "active" class to the nested list
    if (!isExpanded) {
    	nestedList.classList.add("active");
    } else {
    	nestedList.classList.remove("active");
    }
  }

  var collapseButtons = document.getElementsByClassName("collapsible");

  for (var i = 0; i < collapseButtons.length; i++) {
    var collapseButton = collapseButtons[i];

    // Add the "active" class to the nested list
    if (!isExpanded) {
    	collapseButton.classList.add("active");
    } else {
    	collapseButton.classList.remove("active");
    }
  }


  isExpanded = !isExpanded
}




// Code to get sticky bar to show or hide 
// it will show once the person scrolls more than half the page
var stickyBar = document.querySelector('.sticky-bar');
var threshold = window.innerHeight * 0.5; // set the threshold to 50% of the viewport height

function onScroll() {
  if (window.pageYOffset > threshold) {
    stickyBar.classList.remove('bar-hidden');
  } else {
    stickyBar.classList.add('bar-hidden');
  }
}

window.addEventListener('scroll', onScroll);




/////// BELOW IS UNUSED
// Get all the <ul> elements on the page
var uls = document.getElementsByClassName("nested");

// Loop through each <ul> element
function setLastLiHeight() {
	for (var i = 0; i < uls.length; i++) {
	  // Get the last <li> element in the current <ul>
	  uls[i].style.display = 'block';
	}

	for (var i = 0; i < uls.length; i++) {
	  // Get the last <li> element in the current <ul>
	  var lastLi = uls[i].querySelector('li:last-of-type');

		// Get the computed style of the li element
		const liStyle = window.getComputedStyle(lastLi);

		// Get the values of the line-height, font-size, and padding-bottom properties
		const lineHeight = parseFloat(liStyle.getPropertyValue('line-height'));
		const liBeforeHi = parseFloat(window.getComputedStyle(lastLi, ':before').getPropertyValue('height'));
		const fontSize = parseFloat(liStyle.getPropertyValue('font-size'));
		const paddingBottom = parseFloat(liStyle.getPropertyValue('padding-bottom'));

		// Calculate the distance between the bullet point and the bottom of the li element
		const distance = lineHeight - fontSize + paddingBottom;

	  // Get the height of the last <li> element
	  var lastLiHeight = lastLi.clientHeight;
	  console.log(uls[i])
	  console.log(lastLi)
	  console.log(lastLiHeight)
	  console.log(distance)
	  console.log(lineHeight)
	  console.log(paddingBottom)
	  console.log(liBeforeHi)

	  // Set the CSS variable on the current <ul> element
	  uls[i].style.setProperty('--last-li-height', lineHeight - paddingBottom + 'px');
	}

	for (var i = 0; i < uls.length; i++) {
	  // Get the last <li> element in the current <ul>
	  uls[i].style.display = '';
	}

}

window.onload = function() {
  //setLastLiHeight();
};
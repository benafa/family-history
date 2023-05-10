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
	// Get all li elements within the ul
	const allLiElements = parent_ul.querySelectorAll(':scope > li');

	// Get the last li element
	const lastLi = allLiElements[allLiElements.length - 1];
    const liHeight_half = lastLi.getBoundingClientRect().height/2;
    const liDim = lastLi.getBoundingClientRect();
    const parent_li_dim = parent_li.getBoundingClientRect();
	const correct_hi = liDim.bottom - parent_li_dim.bottom - liHeight_half;
	parent_ul.style.setProperty('--ul-before-margin', `${correct_hi}px`);

	parent_of_parent_ul = parent_ul.parentElement;
	if (recursive & parent_of_parent_ul.tagName === 'UL') {
		adjustHeight(parent_of_parent_ul.previousElementSibling, parent_of_parent_ul, true)
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

// adjusgt height on load 
var root = document.getElementsByClassName("root")[0];
var level_0 = document.getElementsByClassName("level-0")[0];
adjustHeight(level_0.previousElementSibling, level_0, false)


// the below is used to expand or collapse all descendents 
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
    	if (!nestedList.classList.contains("level-0")) {
    		nestedList.classList.remove("active");
    	}
    }
  }

  // Loop through each nested list
  if (!isExpanded) {
	  for (var i = 0; i < nestedLists.length; i++) {
	    var nestedList = nestedLists[i];
			adjustHeight(nestedList.previousElementSibling, nestedList, false)
	  }
  } else {
  	adjustHeight(level_0.previousElementSibling, level_0, false)
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


function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function onWindowResize() {
  console.log('Window resized:', window.innerWidth, window.innerHeight);
  // Get all nested lists in the document
  var nestedLists = document.querySelectorAll('.nested.active'); 
  // Loop through each nested list
  for (var i = 0; i < nestedLists.length; i++) {
    var nestedList = nestedLists[i];
	adjustHeight(nestedList.previousElementSibling, nestedList, false)
  }
}

const debouncedResizeHandler = debounce(onWindowResize, 10);
window.addEventListener('resize', debouncedResizeHandler);

/* move this to inline 
window.onload = function() {
  console.log("hello");
  var root = document.getElementsByClassName("root")[0];
  var level_0 = document.getElementsByClassName("level-0")[0];
  adjustHeight(root, level_0, false)
};
*/ 

    document.addEventListener("DOMContentLoaded", function () {
      const stickyItemsByLevel = new Map();
      const max_level = 7

      function getLevel(element) {
        let level = 0;
        if (element.classList.contains("root")) {
        	level = -1
        } else if (element.classList.contains("level-0")) {
        	level = 0
        } else if (element.classList.contains("level-1")) {
        	level = 1
        } else if (element.classList.contains("level-2")) {
        	level = 2
        } else if (element.classList.contains("level-3")) {
        	level = 3
        } else if (element.classList.contains("level-4")) {
        	level = 4
        } else if (element.classList.contains("level-5")) {
        	level = 5
        } else if (element.classList.contains("level-6")) {
        	level = 6
        } else if (element.classList.contains("level-7")) {
        	level = 7
        } 
        return level;
      }

      function checkIntersectingElements() {
        var listItems = document.querySelectorAll("li.tree");
        const listRoot = document.querySelectorAll("li.root");
        listItems = [...listItems, ...listRoot];

        for (let i = 0; i < listItems.length; i++) {
          const item = listItems[i];
          const itemRect = item.getBoundingClientRect();
          const itemTop = itemRect.top;
          const itemBottom = itemRect.bottom;
          const parentUl = item.closest("ul");
          const level = getLevel(parentUl);
          const levelOffset = 30 + (level+1) * 60;

          const currentItemSticky = stickyItemsByLevel.get(level);
	      if (currentItemSticky === item) {
	        continue;
	      }           
	      var currentItemStickyRectBottom = null;

	      if (currentItemSticky) {
		      const currentItemStickyRect = currentItemSticky.getBoundingClientRect();
		      currentItemStickyRectBottom = currentItemStickyRect.bottom
	  	  } else {
	  	  	if (itemTop <= 0 && itemBottom > 0) {
	  	  		console.log("initial sticky")
	  	  		console.log("level " + level)
	            stickyItemsByLevel.set(level, item);
	            console.log("stick")
	            console.log(item)
	            item.classList.add("sticky");
	            item.classList.remove("tree");
				item.style.top =`${levelOffset}px`; // Set the top position to 50px
			}
	  	  }


          if (itemTop < currentItemStickyRectBottom & itemBottom > 0) {
            console.log("level " + level)
            
            if (currentItemSticky) {
            	console.log("unstick")
            	console.log(currentItemSticky)
            	currentItemSticky.classList.remove("sticky");
            	currentItemSticky.classList.add("tree");
            	currentItemSticky.style.top = "";
            }
            stickyItemsByLevel.set(level, item);
            console.log("stick")
            console.log(item)
            item.classList.add("sticky");
            item.classList.remove("tree");
			item.style.top =`${levelOffset}px`; // Set the top position to 50px
			for (let j = level+1; j < max_level + 1; j++) {
				var itemSticky =  stickyItemsByLevel.get(j);
				if (itemSticky) {
					console.log("unset prev levels " + level)
	            	console.log(itemSticky)
	            	itemSticky.classList.remove("sticky");
	            	itemSticky.classList.add("tree");
	            	itemSticky.style.top = ""
					stickyItemsByLevel.set(j, null);
				}
			}
          } else {
            //const currentItemSticky = stickyItemsByLevel.get(level);
            //if (currentItemSticky === item) {
             // item.classList.remove("sticky");
            //}
          }
        }
      }
      window.addEventListener("scroll", checkIntersectingElements);
    });


/*
    document.addEventListener("DOMContentLoaded", function () {
      const observerOptions = {
        rootMargin: "0px",
        threshold: [0, 1],
      };

      const stickyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach((entry) => {
            if (entry.intersectionRatio === 1) {
              console.log("helllo")
              console.log(entry)
              entry.target.classList.remove("sticky");
            } else if (entry.boundingClientRect.top < 30) {
              console.log("goodbye")
              console.log(entry)
              entry.target.classList.add("sticky");
            }
          });
        },
        observerOptions
      );

      const disableStickyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach((entry) => {
            if (entry.intersectionRatio === 1) {
              const prevSibling = entry.target.previousElementSibling;
              if (prevSibling) {
                prevSibling.classList.remove("sticky");
              }
            }
          });
        },
        observerOptions
      );

      function applyObserverToListItems() {
        const listItems = document.getElementsByClassName("nested");
        console.log("init observers")

        for (var i = 0; i < listItems.length; i++) {
          stickyObserver.observe(listItems[i].previousElementSibling);
          //disableStickyObserver.observe(listItems[i].previousElementSibling);
        }
      }
      applyObserverToListItems();
    });

    */

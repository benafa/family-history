(()=>{"use strict";window.addEventListener("DOMContentLoaded",(function(){!function(){for(var e=document.getElementsByTagName("th"),t=0;t<e.length;t++)e[t].classList.add("sorted-none");const o=document.getElementById("searchInput"),s=document.getElementById("myTable").querySelectorAll("tr:not(:first-child)");o.value="",s.forEach((e=>{e.dataset.keywords=e.textContent.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(" ").filter((e=>e.length>2)).join(" ")})),o.addEventListener("keyup",function(e,t){let o;return function(...s){const n=this;clearTimeout(o),o=setTimeout((()=>e.apply(n,s)),t)}}((function(){const e=o.value.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(" ");for(const t of s){const o=t.dataset.keywords,s=e.map((e=>o.includes(e))).every((e=>!0===e));t.style.display=s?"":"none"}}),100))}()})),window.addEventListener("pageshow",(function(e){searchInput.value="",document.getElementById("myTable").querySelectorAll("tr:not(:first-child)").forEach((e=>{e.style.display=""}))})),window.sortTable=function(e){const t=document.getElementById("myTable"),o=t.querySelectorAll("th"),s=Array.from(t.querySelectorAll("tr:not(:first-child)")),n=o[e],r="asc"===(n.dataset.sortDir||"none")?"desc":"asc";o.forEach((e=>{e.classList.remove("sorted-asc","sorted-desc","sorted-none"),e.dataset.sortDir="none",e.classList.add("sorted-none")})),n.classList.remove("sorted-none"),n.classList.add(`sorted-${r}`),n.dataset.sortDir=r,s.sort(((t,o)=>{const s=t.cells[e].textContent.trim(),n=o.cells[e].textContent.trim(),a=isNaN(s)?s.localeCompare(n):parseFloat(s)-parseFloat(n);return"asc"===r?a:-a}));for(const e of s)t.tBodies[0].appendChild(e)}})();
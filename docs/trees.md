---
title: Family Trees
layout: single
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/links.css" type="text/css">

Discover family trees of various  Colombo Chetty families below!

While the website is designed to be veiwed on any device, we recommend a laptop/tablet for the best viewing experience due to the large amount of information. We hope you enjoy exploring! 

<h2> Guide: Viewing trees </h2>

Here is a quick guide to the tree visualizations with an example gif: 

<img src="{{ '/assets/images/tree_example.gif' | prepend:site.baseurl  }}" alt="tree_example.gif" style="border: 2px solid #555">

- &#128141; represents a marriage  
- Each graph is a descendant tree. In this example, we have **Anthony Anandappa** who married **Anthonia Wijeratnam** and *everyone* in this tree is descended from this couple. 
- The names underneath are their children, and we can see who each child married. For example, we see that one child of Anthony was **Anthony Xavier Anandappa** and he married **Anna Pieris Tavarayan** (who is the daughter of Saviel Pieris Tavarayan and Cecilia Rodrigo). 
- As you scroll down, a color-coded guide will show up to remind you which generation each color represents 
- Button functionalities
	- **+**: Click the **+** sign next to each name to see their children. For example, if we click the **+** button next to Anthony Xavier Anandappa, we will see all of his children. This can be repeated for any names with a **+** sign 
	- **-**: To hide children after clicking the **+** sign, click the **-**. 
	- **Expand/Collapse All**: button will allow you to view all descendants. Clicking it again will hide all descendants

<h2> Guide: Search all people </h2>
You can <a href="{{ site.baseurl }}/people" class="link"> search a person's name here </a>
  which will show some bio information along with trees they are included in. If you would like to add stories or photos for individuals, please contact <a href = "mailto: ben@colombochetty.com"  class="link">ben@colombochetty.com</a>. 

{% assign sorted_trees = site.tree | sort: 'title' %}

<h2> Adaman Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'adaman' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Alles Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'alles' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" Class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Anandappa Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'anandappa' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Babapulle Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% assign all_tags = tree.tags | join: ' ' %}
  {% if all_tags contains 'babapulle' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Candappa Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% assign all_tags = tree.tags | join: ' ' %}
  {% if all_tags contains 'candappa' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Canjemanaden Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'canjemanaden' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Casie Chetty Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'casie_chetty' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Fernandopulle Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'fernandopulle' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Laity Ramenaden Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'laity_ramenaden' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>


<h2> Massillamany Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'massillamany' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>


<h2> Muttukisna Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'muttukisna' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>


<h2> Perumal Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% assign all_tags = tree.tags | join: ' ' %}
  {% if all_tags contains 'perumal' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Rodrigo Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'rodrigo' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Sathianathan Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'rodrigo_sathianathan' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>


<h2> Tavarayan Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'pieris_tavarayan' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Wijeratnam Families </h2>
<ul>
{% for tree in sorted_trees %}
  {% if tree.tags contains 'wijeratnam' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h1> Would you like to contribute? </h1>
If you have family tree information you would like to share with the community, please email <a href = "mailto: ben@colombochetty.com"  class="link">ben@colombochetty.com</a>. 

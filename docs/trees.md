---
title: Family Trees
layout: single
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/links.css" type="text/css">

Discover family trees of various  Colombo Chetty families below! Please note: while the website is designed to be veiwed on any device, we recommend a laptop/tablet for the best viewing experience due to the large amount of information. We hope you enjoy exploring! 

<h2> Guide: Viewing trees </h2>

Here is a quick guide to the tree visualizations with an example screenshot: 

<img src="{{ 'assets/images/tree_example.png' | prepend:site.baseurl  }}" alt="tree_example.png" style="border: 2px solid #555">

- &#128141; represents a marriage  
- Each graph is a descendent tree. In this example, we have **Casper Casie Chetty** who married **Maria Theresa** (maidan name unknown) and *everyone* in this tree are descendeded from this couple. 
- The names underneath are their children, and we can see who each child married. For example, we see that one child of Casper was **Abraham Peter Casie Chetty** and he married **Mary Clara Anandappa** (who is the daughter of Emmanuel Anandappa and Mary Nathalia Canjemenaden). 
- Button functionalities
	- **+**: Click the **+** sign next to each name to see their children. For example, if we click the **+** button next to Abraham Peter Casie Chetty, we will see all of his children. This can be repeated for any names with a **+** sign 
	- **-**: To hide children after clicking the **+** sign, click the **-**. For example, we could lick the **-** near John Caitan Anthony which would then hide his children 
	- **Expand/Collapse All**: button will allow you to view all descendents. Clicking it again will hide all descendents

<h2> Guide: Search all people </h2>
You can search a person's name here which will show some bio information along with trees they are included in. If you would like to add stories or photos for individuals, please contact <a href = "mailto: ben@colombochetty.com"  class="link">ben@colombochetty.com</a>. 

<h2> Adaman Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'adaman' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Alles Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'alles' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" Class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Anandappa Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'anandappa' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Babapulle Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'babapulle' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Canjemenaden Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'canjemenaden' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Candappa Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'candappa' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Casie Chetty Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'casie_chetty' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Fernandopulle Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'fernandopulle' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Laity Ramenaden Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'l_ramenaden' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Perumal Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'perumal' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Rodrigo Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'rodrigo' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Tavarayan Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'tavarayan' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h2> Wijeratnam Families </h2>
<ul>
{% for tree in site.tree %}
  {% if tree.tags contains 'wijeratnam' %}
  	<li> <a href="{{ tree.url | prepend:site.baseurl }}" class="link">{{ tree.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

<h1> Would you like to contribute? </h1>
If you have family tree information you would like to share with the community, please <a href="/family-history/contribute" class="link">submit this form</a>  or email <a href = "mailto: ben@colombochetty.com"  class="link">ben@colombochetty.com</a>. 

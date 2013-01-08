---
layout: page
title: "Reading"
description: ""
group: navigation
---
{% include JB/setup %}

<p>Here are some things I've been reading.</p>

<div class="accordion" id="accordion2">
    <div class="accordion-group">
	      <div class="accordion-heading">
	        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
	          <h3>Instapaper</h3>
	        </a>
	      </div>
	      <div id="collapseOne" class="accordion-body collapse" >
	        <div class="accordion-inner">
	          {% include instapaper-export.html %}
	        </div>
	      </div>
	    </div>
	    <div class="accordion-group">
	      <div class="accordion-heading">
	        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
	          <h3>Books</h3>
	        </a>
	      </div>
	      <div id="collapseTwo" class="accordion-body collapse" >
	        <div class="accordion-inner">
	          <ul>
	          	<li>Notes From the Underground</li>
	          	<li>Godel, Escher, Bach</li>
	          	<li>Code Complete 2</li>
	          </ul>	

	        </div>
	      </div>
	    </div>
	    <div class="accordion-group">
	      <div class="accordion-heading">
	        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
	          <h3>Blogs and other online sources</h3>
	        </a>
	      </div>
	      <div id="collapseThree" class="accordion-body collapse">
	        <div class="accordion-inner">
	          <ul>
	          	<li>Hacker News</li>
	          	<li>reddit.com/r/programming</li>
	          	<li>nyt.com</li>
	          </ul>
	        </div>
	      </div>
    </div>
</div>


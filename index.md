---
layout: page
title: Welcome!
tagline: ""
---
{% include JB/setup %}
<div class="row">
	<div class="span9">
<p>
	Hi! I am Colin Chang, an engineer at Adobe and a graduate of UC Berkeley. 
</p>

<h2>Handles:</h2>

<ul class="unstyled">
	<li><a href="mailto:{{site.author['email']}}">colinichang@gmail.com</a></li>
	<li><a href="http://github.com/{{site.author['github']}}">Github</a></li>
	<li><a href="http://linkedin.com/in/{{site.author['linkedin']}}">LinkedIn</a></li>
	<li><a href="https://www.dropbox.com/s/b34exlggqowpg6j/Colin%20Chang%27s%20Resume%20Adobe.pdf">Resume</a></li>
</ul>
	</div>
	<div class="span3">
		<img src="{{ ASSET_PATH }}images/Profile.jpg">
	</div>
</div>

<h3>Posts</h3>

<ul class="posts">
	{% for post in site.posts %}
	<li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	{% endfor %}
</ul>

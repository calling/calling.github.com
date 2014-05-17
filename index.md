---
layout: page
title: Welcome!
tagline: ""
---
{% include JB/setup %}
Hello, I am Colin.

##Handles:
* [colinichang at gmail dot com](mailto:{{site.author['email']}})
* [Github](http://github.com/{{site.author['github']}})
* [LinkedIn](http://linkedin.com/in/{{site.author['linkedin']}})
* [Resume](assets/Colin%20Chang's%20Resume.pdf)

##Posts:
{% for post in site.posts %}
* {{ post.date | date_to_string }} &raquo; [{{ post.title }}]({{ BASE_PATH }}{{ post.url }})
{% endfor %}

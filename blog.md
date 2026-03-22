---
layout: default
title: "Blog"
class: "blog"
description: "Colin Chang's Blog"
---

# Blog

{% for post in collections.posts %}
  <div class="post-item">
    <span class="post-date">{{ post.date | dateFormat }}</span>
    <a href="{{ post.url }}" class="post-link">{{ post.data.title }}</a>
  </div>
{% endfor %}

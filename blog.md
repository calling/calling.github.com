---
title: "Blog"
class: "blog"
description: "Colin Chang's Blog"
---

# Blog

{% assign sorted_posts = site.posts | sort: 'date' | reverse %}
{% for post in sorted_posts %}
  <div class="post-item">
    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
    <a href="{{ post.url }}" class="post-link">{{ post.title }}</a>
  </div>
{% endfor %}

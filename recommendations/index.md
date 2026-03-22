---
layout: default
title: "Recommendations"
---

# Recommendations

Hey there! I've collected some of my favorite recommendations -  resources that have helped me grow professionally to my favorite spots in NYC. Hope you find something useful:

{% for rec in recommendations %}

- [{{ rec.title }}]({{ rec.url }}) - {{ rec.description }}

{% endfor %}

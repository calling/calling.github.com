# Recommendations

This directory contains various recommendations and resources:

{% assign current_dir_pages = site.pages | where_exp: "page", "page.dir == '/recommendations/'" %}
{% for page in current_dir_pages %}
    {% if page.name != 'index.md' %}

- [{{ page.title | default: page.name }}]({{ page.name | remove: '.md' }}) - {{ page.description | default: '' }}

    {% endif %}
{% endfor %}

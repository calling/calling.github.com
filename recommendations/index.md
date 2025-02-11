# Recommendations

Hey there! I've collected some of my favorite recommendations -  resources that have helped me grow professionally to my favorite spots in NYC. Hope you find something useful:

{% assign current_dir_pages = site.pages | where_exp: "page", "page.dir == '/recommendations/'" %}
{% for page in current_dir_pages %}
    {% if page.name != 'index.md' %}

- [{{ page.title | default: page.name }}]({{ page.name | remove: '.md' }}) - {{ page.description | default: '' }}

    {% endif %}
{% endfor %}

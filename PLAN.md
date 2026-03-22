# Migration Plan: Jekyll → Eleventy (11ty)

## Overview

This site is a minimal Jekyll blog hosted on GitHub Pages. The migration to 11ty
is straightforward because:

- 11ty supports Liquid templates natively — most templates can be reused with minor edits
- Content (Markdown + YAML front matter) needs no changes
- CSS and static assets need no changes
- The main work is replacing Jekyll config/scaffolding with 11ty equivalents

---

## Todo List

### Phase 1: Setup & Dependencies
- [x] Create `package.json` with 11ty and markdownlint-cli2 dev dependencies
- [x] Create `.nvmrc` with Node version 24
- [x] Delete `Gemfile` and `Gemfile.lock`
- [x] Delete `Dockerfile` and `docker-compose.yml`
- [x] Delete `Makefile`
- [x] Run `npm install` to populate `node_modules/` and create `package-lock.json`

### Phase 2: Configuration Files
- [x] Create `eleventy.config.js` with:
  - [x] Pass-through copies (styles, scripts, assets, CNAME, .nojekyll)
  - [x] Posts collection definition
  - [x] Date filter
  - [x] Directory config
  - [x] Template formats
- [x] Create `_data/site.json` with name, description, url
- [x] Create `_data/recommendations.json` with all recommendations
- [x] Create `_posts/_posts.json` with default layout and permalink structure

### Phase 3: Layout & Template Updates
- [x] Update `_layouts/default.html`:
  - [x] Change `site.data.header` → `header`
  - [x] Change `page.layout` → `class` in title conditional
  - [x] Change `page.title` → `title`
  - [x] Simplify meta description logic with default filter
- [x] Update `_layouts/post.html`:
  - [x] Change `page.title` → `title`
  - [x] Change date filter from `| date: "%Y-%m-%d"` → `| dateFormat`

### Phase 4: Content Pages
- [x] Update `blog.md`:
  - [x] Remove `site.posts` assignment
  - [x] Change loop to use `collections.posts`
  - [x] Update date filter to `dateFormat`
- [x] Update `recommendations/index.md`:
  - [x] Remove Jekyll `where_exp` logic
  - [x] Replace with loop over `recommendations` array from data

### Phase 5: RSS Feed
- [x] Add `@11ty/eleventy-plugin-rss` to `package.json`
- [x] Run `npm install`
- [x] Update `eleventy.config.js` to add the RSS plugin
- [x] Rewrite `feed.xml` with 11ty RSS plugin helpers:
  - [x] Use `absoluteUrl` filter for links
  - [x] Use `dateToRfc822` filter for dates
  - [x] Limit to last 10 posts
  - [x] Set proper XML header and RSS structure

### Phase 6: Deployment & GitHub Config
- [x] Create `.github/workflows/` directory if needed
- [x] Create `.github/workflows/deploy.yml` with:
  - [x] Trigger on `push` to `master` branch
  - [x] Node 24 setup
  - [x] npm ci & npm run build
  - [x] Upload pages artifact
  - [x] Deploy pages
- [x] Create `.nojekyll` file in repo root
- [x] Update `.gitignore`:
  - [x] Remove `_site/*`, `Gemfile.lock`, `.rbenv-version`
  - [x] Add `_site/` and `node_modules/`
- [ ] Update GitHub repo Pages settings → set source to "GitHub Actions" (manual step)

### Phase 7: Testing & Verification
- [x] Run `npm run dev` and verify dev server starts on localhost:8080
- [x] Check that content renders correctly:
  - [x] Home page (`/`)
  - [x] Blog listing (`/blog`)
  - [x] A blog post (e.g., `/2026/03/21/how-i-schedule-meetings`)
  - [x] Recommendations page (`/recommendations`)
  - [x] RSS feed (`/feed.xml`)
- [x] Run `npm run build` and verify `_site/` builds successfully
- [x] Check generated URLs in `_site/` match Jekyll URLs (no trailing slash differences)
- [x] Verify CSS files are copied to `_site/styles/`
- [x] Test that Google Analytics script is included in generated HTML
- [x] Verify `CNAME` file was copied to `_site/`
- [x] Run `npm run lint` and fix any markdown issues
- [x] Check that all blog post images load (in `assets/images/`)

### Phase 8: Cleanup & Final Checks
- [x] Verify no Ruby/Jekyll artifacts remain (no Gemfile, Dockerfile, etc.)
- [x] Confirm `.gitignore` excludes `node_modules/` and `_site/`
- [ ] Test GitHub Actions workflow by pushing to `master` branch (manual)
- [ ] Verify site deploys to GitHub Pages successfully (manual)
- [ ] Test live site at https://colinchang.org (manual)
- [ ] Verify RSS feed is accessible and valid (manual)
- [x] Convert Jekyll `{% highlight %}` tags to markdown fenced code blocks
- [x] Handle `published: false` posts (excluded from collection and build)

---

## Step 1: Bootstrap 11ty

Replace the Ruby/Jekyll toolchain with a Node.js/11ty one.

**Remove:**

- `Gemfile`, `Gemfile.lock`
- `Dockerfile`, `docker-compose.yml`
- `Makefile` (lint script moves to `package.json`)

**Add:**

- `package.json` with `@11ty/eleventy` as a dev dependency
- `.eleventy.js` (or `eleventy.config.js`) as the main config file
- `.nvmrc` to pin Node version

```json
// package.json (minimal)
{
  "name": "colinchang.org",
  "scripts": {
    "build": "eleventy",
    "dev": "eleventy --serve",
    "lint": "markdownlint-cli2 \"**/*.md\" \"!_site/**/*.md\""
  },
  "devDependencies": {
    "@11ty/eleventy": "^3.x",
    "markdownlint-cli2": "^0.x"
  }
}
```

`markdownlint-cli2` moves from an `npx`-invoked tool to an explicit dev
dependency so it's versioned and reproducible without extra effort.

---

## Step 2: Configure 11ty (`.eleventy.js`)

11ty's config replaces `_config.yml`. Key things to configure:

```js
module.exports = function (eleventyConfig) {
  // Pass-through static assets
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Collections
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("_posts/**/*.md").reverse()
  );

  // Date filter (replaces Jekyll's | date: "%Y-%m-%d")
  eleventyConfig.addFilter("dateFormat", (date) =>
    new Date(date).toISOString().slice(0, 10)
  );

  return {
    dir: {
      input: ".",
      output: "_site",
      layouts: "_layouts",   // keep existing layouts dir
      data: "_data",         // keep existing data dir
      includes: "_includes",
    },
    templateFormats: ["md", "html", "liquid", "xml"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
};
```

---

## Step 3: Update Global Data

Jekyll exposes site metadata via `_config.yml` (e.g. `site.name`, `site.url`,
`site.description`). In 11ty, this comes from a data file.

**Add `_data/site.json`:**

```json
{
  "name": "Colin Chang",
  "description": "Colin Chang's blog and project repository",
  "url": "https://colinchang.org"
}
```

`_data/header.json` already exists and works as-is in 11ty.

---

## Step 4: Update Layouts

Both layouts are almost valid 11ty Liquid already. Two changes needed:

### `_layouts/default.html`

- `site.name` → `site.name` (unchanged, comes from `_data/site.json`)
- `site.data.header` → `header` (11ty exposes `_data/header.json` as `header`, not `site.data.header`)
- `page.layout` → `layout` (11ty uses `layout` not `page.layout` for the current layout name — remove the conditional title logic or check differently)
- `page.excerpt` → 11ty doesn't auto-generate excerpts; either drop this or add a custom excerpt filter

**Diff for `_layouts/default.html`:**

```diff
- {% for item in site.data.header %}
+ {% for item in header %}

- {% if page.layout == 'home' %}
- <title>{{ page.title }}</title>
- {% else %}
- <title>{{ page.title }} | {{ site.name }}</title>
- {% endif %}
+ {% if layout == 'home' %}
+ <title>{{ title }}</title>
+ {% else %}
+ <title>{{ title }} | {{ site.name }}</title>
+ {% endif %}

- {% if page.description %}
- <meta name="description" content="{{ page.description }}" />
- {% else %}
- <meta name="description" content="{{ site.description }}" />
- {% endif %}
+ <meta name="description" content="{{ description | default: site.description }}" />
```

### `_layouts/post.html`

```diff
- <h1>{{ page.title }}</h1>
- <div class="post-date">{{ page.date | date: "%Y-%m-%d" }}</div>
+ <h1>{{ title }}</h1>
+ <div class="post-date">{{ page.date | dateFormat }}</div>
```

---

## Step 5: Update Content Pages

### `blog.md`

Jekyll's `site.posts` becomes the `posts` collection defined in `.eleventy.js`.

```diff
- {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
- {% for post in sorted_posts %}
+ {% for post in collections.posts %}
    <div class="post-item">
-     <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
+     <span class="post-date">{{ post.date | dateFormat }}</span>
```

The collection is already defined in reverse-chronological order, so no sort needed.

### `recommendations/index.md`

Jekyll's `site.pages` with `where_exp` has no direct 11ty equivalent. Replace
with an explicit list in a data file or hardcode the links. Simplest approach:

**Add `_data/recommendations.json`:**

```json
[
  { "title": "Management", "url": "management", "description": "..." },
  { "title": "NYC", "url": "nyc", "description": "..." },
  { "title": "Software Engineering", "url": "software engineering", "description": "..." }
]
```

Then in `recommendations/index.md`:

```diff
- {% assign current_dir_pages = site.pages | where_exp: ... %}
- {% for page in current_dir_pages %}
-   - [{{ page.title }}]({{ page.name | remove: '.md' }}) - {{ page.description }}
- {% endfor %}
+ {% for rec in recommendations %}
+ - [{{ rec.title }}]({{ rec.url }}) - {{ rec.description }}
+ {% endfor %}
```

### `index.md`

No template changes needed; `class` and `description` front matter work the same.

### `_posts/*.md`

No changes needed. 11ty reads YAML front matter identically. The `layout: post`
front matter works as long as `_layouts/post.html` exists.

---

## Step 6: Permalinks

Jekyll `_config.yml` sets `permalink: /:year/:month/:day/:title`. 11ty handles
`_posts/` automatically when posts have date-prefixed filenames. Configure in
`.eleventy.js` or via a `_posts/_posts.json` data file:

**Add `_posts/_posts.json`:**

```json
{
  "layout": "post",
  "permalink": "/{{ page.date | dateFormat }}/{{ page.fileSlug }}/"
}
```

This removes the need for `layout: post` in each post's front matter and matches
the existing URL structure. Verify the generated URLs match the old ones to avoid
breaking existing links.

---

## Step 7: RSS Feed

Replace the hand-rolled `feed.xml` with the official plugin:

```
npm install @11ty/eleventy-plugin-rss
```

In `.eleventy.js`:

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");
eleventyConfig.addPlugin(pluginRss);
```

Then rewrite `feed.xml` using 11ty's RSS plugin helpers (`absoluteUrl`,
`dateToRfc822`, etc.). The plugin provides Liquid filters for this.

---

## Step 8: Update GitHub Pages Deployment

GitHub Pages no longer needs the Jekyll build pipeline. Switch to a GitHub
Actions workflow using the **official GitHub Pages deploy actions** — no
third-party actions, minimal surface area to maintain.

**Add `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site
      - id: deploy
        uses: actions/deploy-pages@v4
```

**Notes:**

- `ubuntu-latest` is the right choice — GitHub keeps it updated automatically,
  so there's nothing to maintain.
- Node 24 works fine with 11ty v3 (minimum is Node 18). Node 24 is current LTS.
- Using `actions/upload-pages-artifact` + `actions/deploy-pages` (GitHub's own
  actions) instead of a third-party action means fewer external dependencies to
  track or update.
- In GitHub repo settings → Pages, set source to **"GitHub Actions"** instead of
  "Deploy from a branch".
- Add a `.nojekyll` file to the repo root to prevent GitHub Pages from
  attempting to run Jekyll on the already-built output.

---

## Step 9: Update Local Dev Setup

Replace Docker with a simple npm script. No Makefile needed — all tasks live in
`package.json`:

| Task | Command |
|---|---|
| Local dev server | `npm run dev` |
| Production build | `npm run build` |
| Lint markdown | `npm run lint` |

11ty's built-in dev server starts on `localhost:8080` with hot reload.

---

## Step 10: Update `.gitignore`

```diff
- _site/*
- _theme_packages/*
- Gemfile.lock
- .rbenv-version
+ _site/
+ node_modules/
```

---

## File Change Summary

| File | Action |
|---|---|
| `Gemfile`, `Gemfile.lock` | Delete |
| `Dockerfile`, `docker-compose.yml` | Delete |
| `Makefile` | Delete |
| `_config.yml` | Delete (replaced by `.eleventy.js` + `_data/site.json`) |
| `package.json` | Add |
| `.eleventy.js` | Add |
| `.nvmrc` | Add (Node 24) |
| `_data/site.json` | Add |
| `_data/recommendations.json` | Add |
| `_posts/_posts.json` | Add |
| `.github/workflows/deploy.yml` | Add |
| `.nojekyll` | Add |
| `_layouts/default.html` | Edit (variable name changes) |
| `_layouts/post.html` | Edit (variable name changes) |
| `blog.md` | Edit (collection reference) |
| `recommendations/index.md` | Edit (data-driven list) |
| `feed.xml` | Edit (use rss plugin helpers) |
| `.gitignore` | Edit |
| All `_posts/*.md` | No changes needed |
| `styles/`, `assets/`, `scripts/` | No changes needed |

---

## Risks & Notes

- **URL compatibility**: The permalink format `/:year/:month/:day/:title` must
  produce identical URLs. Verify a few posts after migration (e.g.
  `/2026/03/21/how-i-schedule-meetings`). A trailing slash difference (`/` vs no
  slash) could cause 404s — check against the existing `CNAME`/CDN config.
- **`page.excerpt`**: The current layout falls back to `page.excerpt` for the
  meta description. 11ty doesn't auto-generate excerpts. Either drop the
  fallback or add a custom excerpt shortcode/filter.
- **Pagination**: `_config.yml` sets `paginate: 5` but `blog.md` doesn't use
  paginator variables — it lists all posts. Pagination appears unused; skip it.
- **`published: true` front matter**: 11ty doesn't filter by this automatically.
  If any posts have `published: false`, add a filter in the collection definition.

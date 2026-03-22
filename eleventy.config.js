const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addGlobalData("site", {
    name: "Colin Chang",
    description: "Colin Chang's blog and project repository",
    url: "https://colinchang.org",
  });

  eleventyConfig.addGlobalData("header", [
    { title: "About", url: "/" },
    { title: "Blog", url: "/blog" },
    { title: "Recommendations", url: "/recommendations" },
  ]);

  eleventyConfig.ignores.add("README.md");

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByTag("posts")
      .filter((post) => post.data.published !== false)
      .reverse(),
  );

  eleventyConfig.addFilter("dateFormat", (date) =>
    new Date(date).toISOString().slice(0, 10),
  );

  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      if (data.published === false) {
        return false;
      }
      if (data.page.inputPath.startsWith("./posts/")) {
        const d = new Date(data.page.date);
        const year = d.getUTCFullYear();
        const month = String(d.getUTCMonth() + 1).padStart(2, "0");
        const day = String(d.getUTCDate()).padStart(2, "0");
        return `/${year}/${month}/${day}/${data.page.fileSlug}/`;
      }
      return data.permalink;
    },
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["md", "html", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

module.exports = function (eleventyConfig) {

  const components = `./src/_includes/components`;
  const filters = `./src/_utils/filters`;
  const libraries = `./src/_utils/libraries`;
  const transforms = `./src/_utils/transforms`;

  const getTagList = require("./src/_utils/getTagList");

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
  eleventyConfig.addPlugin(require("eleventy-plugin-embed-everything"));

  eleventyConfig.setLibrary("md", require(`${libraries}/markdown.js`));

  eleventyConfig.addShortcode("Figure", require(`${components}/Figure.js`));
  eleventyConfig.addShortcode("CloudImage", require(`${components}/CloudImage.js`));
  eleventyConfig.addShortcode("Heading", require(`${components}/Heading.js`));
  eleventyConfig.addShortcode("InlineIcon", require(`${components}/InlineIcon.js`));
  eleventyConfig.addPairedShortcode("ArchiveList", require(`${components}/ArchiveList.js`));

  eleventyConfig.addFilter("includes", require(`${filters}/includes.js`));
  eleventyConfig.addFilter("excludes", require(`${filters}/excludes.js`));
  eleventyConfig.addFilter("fixedEncodeURIComponent", require(`${filters}/fixedEncodeURIComponent.js`));
  eleventyConfig.addFilter("head", require(`${filters}/head.js`));
  eleventyConfig.addFilter("machineDate", require(`${filters}/machineDate.js`));
  eleventyConfig.addFilter("readableDate", require(`${filters}/readableDate.js`));
  eleventyConfig.addFilter("mdInline", require(`${filters}/mdInline.js`));

  eleventyConfig.addCollection("articles", (collection) => {
    return collection.getAllSorted().filter((page) => page.data.contentType === "article");
  });

  eleventyConfig.addPassthroughCopy("./src/uploads");
  eleventyConfig.addPassthroughCopy({"./src/_includes/styles/main.css": "assets/styles/main.css"});
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");

  eleventyConfig.setDataDeepMerge(true);

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional:
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
      includes: "_includes",
    },
  };
};

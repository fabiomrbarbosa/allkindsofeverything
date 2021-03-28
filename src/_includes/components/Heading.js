const figureComp = require("./Figure");
const markdownIt = require("markdown-it");
const md = new markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
});

module.exports = function ({
  title = "",
  subtitle = "",
  machineDate = "",
  readableDate = "",
  className = "",
  imageSrc = "",
  imageAlt = "",
  imageCaption = "",
  imageAttribution = ""
} = {}) {
  return /*html*/ `
  <div class="heading ${className} ">
    <div class="inner">

      <h1 class="font-display font-semibold text-6xl md:text-8xl">${md.renderInline(title)}</h1>

      ${imageSrc &&
        figureComp({
          lazy: false,
          className: "heading__img",
          image: imageSrc,
          alt: imageAlt,
          caption: imageCaption,
          attribution: imageAttribution,
          size: "full", })
      }

      ${
        subtitle &&
        /*html*/ `<p class="font-serif text-3xl md:text-5xl italic my-4 tracking-tight">${md.renderInline(subtitle)}</p>`
      }

      ${
        machineDate &&
        /*html*/ `<time class="heading__datetime" datetime="${machineDate}">
        ${readableDate}
        </time>`
      }

    </div>
  </div>`;
};

const site = require("../../_data/metadata.js");
const imageSize = require("image-size");
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function ({
  lazy = true,
  image = "",
  alt = "",
  caption = "",
  attribution = "",
  size = "",
  className = "",
  coverImage = false,
} = {}) {
  const siteUrl = site.url;
  const imageUrl = encodeURIComponent(siteUrl + image);
  const imageFetch = (src, width) =>
    `https://res.cloudinary.com/fabiomrbarbosa/image/fetch/q_auto,f_auto,w_${width}/${src}`;
  const imageDimensions = imageSize("./src/" + image);
  const imageSteps = 5;
  const imageSrcsetList = [];
  const extraClass = className ? ` ${className}` : "";

  const imageSettings = {
    full: {
      fallbackWidth: 960,
      minWidth: 320,
      maxWidth: 1440,
      sizes: "(max-width: 90rem) 90vw, 90rem",
      classes: ["full"],
    },
    wide: {
      fallbackWidth: 480,
      minWidth: 320,
      maxWidth: 920,
      sizes: "(max-width: 56.25rem) 90vw, (max-width: 90rem) 66vw, 57.5rem",
      classes: ["twothirds"],
    },
    onethird: {
      fallbackWidth: 640,
      minWidth: 320,
      maxWidth: 820,
      sizes: "(max-width: 56.25rem) 90vw, (max-width: 90rem) 30vw, 27.75rem",
      classes: ["onethird"],
    },
  };

  for (let i = 0; i < imageSteps; i++) {
    let stepWidth = Math.ceil(
      imageSettings[size].minWidth +
        ((imageSettings[size].maxWidth - imageSettings[size].minWidth) /
          (imageSteps - 1)) *
          i
    );
    imageSrcsetList.push(`${imageFetch(imageUrl, stepWidth)} ${stepWidth}w`);
  }

  return /*html*/ `
  <figure class=" ${imageSettings[size].classes} ${extraClass} ">
    <img
      decoding="async"
      loading=${lazy == true ? "lazy" : "eager"}
      alt="${alt}"
      src="${imageFetch(imageUrl, imageSettings[size].fallbackWidth)}"
      srcset="${imageSrcsetList.join(", ")}"
      sizes="${imageSettings[size].sizes}"
      width="${imageDimensions.width}"
      height="${imageDimensions.height}"
      class="mx-auto"
    />
    ${
      (caption || attribution) &&
      /*html*/ `<figcaption class="text-gray-500 border-b border-gray-300 py-4 mt-3">
      ${
        caption &&
        /*html*/ `<span class="figure__caption">
        ${md.renderInline(caption)}
      </span>`
      }
      ${
        attribution &&
        /*html*/ `<span class="figure__attribution pl-4">
        ${md.renderInline(attribution)}
      </span>`
      }
    </figcaption>`
    }
  </figure>`;
};

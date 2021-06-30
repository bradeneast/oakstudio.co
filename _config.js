import lume from "lume/mod.js";
import date from "lume/plugins/date.js";
import slugifyUrls from "https://deno.land/x/lume@v0.24.0/plugins/slugify_urls.js";
import { matchExts, matchSrc, resizeOptions, targetExt } from "./prebuild/_options.js";

const site = lume({
  location: new URL("https://oakstudio.co"),
  src: "_src",
});

site.copy("img");
site.copy("main.css");
site.copy("_includes/fonts", "img/fonts");
site.copy("_includes/logos", "/");
site.copy("_includes/js/main.min.js", "main.min.js");
site.copy("_includes/favicon.ico", "favicon.ico");

// Process output HTML
let [width, height, opts] = resizeOptions;
site.process([".html"], page =>
  page.document
    .querySelectorAll('img[src*="/img/"]')
    .forEach(img => {
      let src = img.getAttribute('src');
      img.setAttribute('src', src.replace("/img/", "/img/sm/").replace(matchExts, targetExt));
      img.setAttribute('width', width); // Set intrisic width
      img.setAttribute('height', height); // Set intrisic height
    })
);

site.use(slugifyUrls());
site.use(date());

export default site;

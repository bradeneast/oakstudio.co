import lume from "lume/mod.js";
import date from "lume/plugins/date.js";
import slugifyUrls from "https://deno.land/x/lume@v0.23.1/plugins/slugify_urls.js";
import { matchExts, matchSrc, resizeOptions, targetExt } from "./prebuild/_options.js";

const site = lume({
  location: new URL("https://oakstudio.co"),
  src: "_src",
});

site.copy("img");
site.copy("main.css");
site.copy("_includes/fonts", "img/fonts");
site.copy("_includes/logos", "img/logos");
site.copy("_includes/js/main.min.js", "main.min.js");
site.copy("_includes/favicon.ico", "favicon.ico");

// Process output HTML
let [width, height, opts] = resizeOptions;
site.process([".html"], page =>
  page.content = page.content
    // Re-route image `src` attributes to use the resized path
    .replace(matchSrc, src => {
      if (!src.includes("/img/")) return src; // Ignore image references that weren't processed
      return src.trim()
        .replace("/img/", "/img/sm/") // Re-route path to small image directory
        .replace(matchExts, targetExt) // Replace file extension
    })
    // Add width and height attributes to reduce layout shift
    .replace(/(?<=<img) /ig, ` width="${width}" height="${height}" `)
);

site.use(slugifyUrls());
site.use(date());

// I don't understand these filters
site.filter("head", (array = [], n) => (n < 0) ? array.slice(n) : array.slice(0, n));
site.filter("min", (...numbers) => Math.min.apply(null, numbers));

export default site;

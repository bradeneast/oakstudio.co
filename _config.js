import lume from "lume";
import date from "lume/plugins/date.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import textLoader from "lume/core/loaders/text.ts";
import * as processors from "./_processors.js";
import * as filters from "./_filters.js";
import { imageDirName, siteSrc } from "./prebuild/_options.js";

const site = lume({
  location: new URL("https://oakstudio.co/"),
  src: siteSrc,
});

site
  .copy(imageDirName)
  .copy("_includes/assets/", "/")
  .copy("main.css")
  .copy("cms.css")
  .loadAssets([".js"], textLoader)

  // Processors
  .process([".html"], processors.html)
  .process([".js"], processors.js)

  // Plugins
  .use(slugifyUrls())
  .use(date())

  // Helpers
  .filter('splitting', filters.splitting, { type: "tag", body: true })

export default site;

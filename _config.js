import lume from "lume";
import date from "lume/plugins/date.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import textLoader from "lume/loaders/text.ts";
import * as processors from "./_processors.js";
import { imageDirName, siteSrc } from "./prebuild/_options.js";

const site = lume({
  location: new URL("https://oakstudio.co/"),
  src: siteSrc,
});

site
  .copy(imageDirName)
  .copy("_includes/assets/", "/")
  .copy("/main.css", "/main.css")
  .copy("/cms.css", "/cms.css")
  .loadAssets([".js"], textLoader)

  // Processors
  .process([".html"], processors.html)
  .process([".js"], processors.js)

  // Plugins
  .use(slugifyUrls())
  .use(date())

  // Helpers
  .helper('before_after', async (before, after, text) => `
<div>
  <div class="beforeafter">
    <div class="beforeafter__before">
      <img src="/img/${before}" alt="">
    </div>
    <div class="beforeafter__after">
      <img src="/img/${after}" alt="">
    </div>
    <div class="beforeafter__slider"></div>
  </div>
  <div class="subtext left">${text}</div>
</div>`,
    { type: "tag" }
  )

export default site;

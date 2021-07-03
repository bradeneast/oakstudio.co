import lume from "lume/mod.js";
import date from "lume/plugins/date.js";
import slugifyUrls from "lume/plugins/slugify_urls.js";
import textLoader from "lume/loaders/text.js";
import { imageDirName, siteSrc } from "./prebuild/_options.js";
import * as processors from "./_processors.js";

const site = lume({
  location: new URL("https://dreamy-noyce-6c21ca.netlify.app/"),
  src: siteSrc,
});

site.copy(imageDirName);
site.copy("_includes/assets/", "/");

// Process output HTML
site.process([".html"], processors.html);

// Bundle JS with esbuild
site.loadAssets([".js"], textLoader);
site.process([".js"], processors.js);

site.use(slugifyUrls());
site.use(date());

site.helper('before_after', async (before, after, text) => {
  return `
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
</div>`;
}, { type: "tag" });

export default site;

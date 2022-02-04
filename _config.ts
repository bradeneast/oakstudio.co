//@ts-nocheck
import lume from "lume/mod.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import postcss from "lume/plugins/postcss.ts";
import postcssFor from "https://jspm.dev/postcss-for";
import postcssVars from "https://jspm.dev/postcss-simple-vars";
import anchor from "https://jspm.dev/markdown-it-anchor";
import toc from "https://jspm.dev/markdown-it-table-of-contents";
import * as processors from "./_processors.ts";
import * as filters from "./_filters.ts";

const markdownConfig = {
  plugins: [
    anchor,
    [toc, { includeLevel: [2] }]
  ],
  keepDefaultPlugins: true
};
const postcssConfig = {
  plugins: [
    postcssFor,
    postcssVars
  ],
  keepDefaultPlugins: true
}


// CREATE SITE
const site = lume(
  { src: "_src" },
  { markdown: markdownConfig }
);

// Copy assets
site.copy("_includes/assets", "/");
site.copy("_img", "/_");

// Run all processors
for (let p in processors)
  site.process([`.${p}`], processors[p]);

// Run all filters
for (let f in filters)
  site.filter(f, filters[f]);

site.use(date());
site.use(postcss(postcssConfig));
site.use(slugify_urls());
site.use(esbuild({ target: "es6" }));

export default site;

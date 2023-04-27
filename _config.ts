//@ts-nocheck
import lume from "lume/mod.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import sass from "lume/plugins/sass.ts";
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


// CREATE SITE
const site = lume(
  { src: "_src" },
  { markdown: markdownConfig }
);

// Copy assets
site.copy("assets", "/");
site.copy("_img", "_");

// Run all filters
for (let f in filters)
  site.filter(f, filters[f]);

// Run all processors
for (let p in processors)
  site.process([`.${p}`], processors[p]);

site.use(date());
site.use(sass());
site.use(slugify_urls());
site.use(esbuild({ target: "es6" }));

export default site;

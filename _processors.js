import { imageDirName, resizeOptions, matchExts, outDirName, siteSrc, targetExt } from "./prebuild/_options.js";
import * as filters from "./_filters.js";
import * as esbuild from "https://deno.land/x/esbuild@v0.12.14/mod.js";

export function html(page) {

  let $$ = (selector, context = page.document) => context.querySelectorAll(selector);
  let [width, height, opts] = resizeOptions;
  let images = $$(`img[src*="/${imageDirName}/"]`);

  images.forEach(img => {
    // Check for no-resize attribute
    if (img.hasAttribute('no-resize')) return;

    let src = img.getAttribute('src');
    let resizedSrc = src
      .replace(`/${imageDirName}/`, `/${imageDirName}/${outDirName}/`)
      .replace(matchExts, targetExt);

    img.setAttribute('src', resizedSrc); // Set resized src
    img.setAttribute('width', width); // Set intrisic width
    img.setAttribute('height', height); // Set intrisic height
  })

  let addParallax = section => {
    $$('img', section).forEach((child, i) => {
      child.classList.add('rellax');
      child.setAttribute('data-rellax-speed', -0.5 * (i + 1));
      child.setAttribute('data-rellax-percentage', 0.5);
    })
  }

  $$('.project .bleed.col-2').forEach(addParallax);
  $$('.project .bleed.col-3').forEach(addParallax);
  $$('.project .bleed.col-4').forEach(addParallax);

  // Add data-splitting to h2 elements
  $$('h2').forEach(h2 => {
    h2.classList.add('splitting');
    h2.setAttribute('data-animate', '');
    h2.innerHTML = filters.splitting(h2.innerText);
  });
}

export async function js(page) {

  let { path, ext } = page.src;
  let entryPoint = path + ext;
  let filename = path.split(/[\\\/]/).pop();
  let outfile = filename + ".min" + ext;

  esbuild
    .build({
      entryPoints: [siteSrc + entryPoint],
      outfile: "_site/" + outfile,
      bundle: true,
      minify: true,
    })
    .then(() => {
      console.log("🥡 Bundle", outfile);
      esbuild.stop();
    })
}
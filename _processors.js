import { imageDirName, resizeOptions, matchExts, outDirName, siteSrc, targetExt } from "./prebuild/_options.js";
import * as esbuild from "https://deno.land/x/esbuild@v0.12.14/mod.js";

export function html(page) {

  let [width, height, opts] = resizeOptions;
  let imgSelector = `img[src*="/${imageDirName}/"]`;
  let images = page.document.querySelectorAll(imgSelector);

  images.forEach(img => {
    let src = img.getAttribute('src');
    img.setAttribute('src', src.replace(`/${imageDirName}/`, `/${imageDirName}/${outDirName}/`).replace(matchExts, targetExt));
    img.setAttribute('width', width); // Set intrisic width
    img.setAttribute('height', height); // Set intrisic height
  })
}

export async function js(page) {

  let { path, ext } = page.src;
  let entryPoint = path + ext;
  let outfile = "/main.min.js";

  esbuild
    .build({
      entryPoints: [siteSrc + entryPoint],
      outfile: "_site" + outfile,
      bundle: true,
      minify: true,
    })
    .then(() => {
      console.log("🥡 Bundle", outfile);
      esbuild.stop();
    })
}
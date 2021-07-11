import fs from 'fs-extra';
import sharp from 'sharp';
import { join, normalize } from 'path';
import colors from 'colors';
import { logFile } from './_utils.js';
import * as repo from './_repo.js';
import { outDir, targetExt, formatOptions, resizeOptions, matchExts, cacheFile } from './_options.js';

function makeOutPath(filename) {
  return join(outDir, filename.replace(matchExts, targetExt))
}

/**Resize, compress, and format an image, then write it to a new file */
async function resizeImage(src, dest, filename) {
  fs.ensureFileSync(dest);
  try {
    sharp(await fs.readFile(src))
      .resize(...resizeOptions)
      .toFormat(targetExt)
      .webp(formatOptions)
      .toFile(dest)
      .then(() => logFile("📐 RESIZED", filename))
      .catch(console.error)
  } catch (err) {
    console.log(colors.red("Error resizing ") + src);
    console.error(err);
  }
}

/**Iterates over a directory and processes each image file
 * Outputs to a subfolder within the source directory
 */
async function processImages(dir) {

  let dirName = normalize(dir);
  let images = fs.readdirSync(dirName);
  let cache = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
  let diff = cache.images.filter(image => !images.includes(image));

  // Diff cached images with images present
  for (let filename of diff) {
    // Remove filename from cache
    cache.images.splice(cache.images.indexOf(filename), 1);
    // Remove file from output directory
    fs.remove(makeOutPath(filename))
      .then(() => logFile("🗑️ REMOVED", filename));
  }

  // Process images
  images.map(processImage);

  // Update cache files
  const stringifiedCache = JSON.stringify(cache);
  fs.writeFileSync(cacheFile, stringifiedCache);
  repo
    .updateFileContents(cacheFile, stringifiedCache)
    .then(() => logFile("Cache updated", cacheFile))


  /**Generates src and dest paths for an image file and resizes or copies it */
  function processImage(filename) {

    let src = join(dirName, filename);
    let dest = makeOutPath(filename);

    // Return if file is directory
    if (fs.lstatSync(src).isDirectory())
      return;
    // Return if file is cached
    if (cache.images.includes(filename)) {
      logFile("Using cached file", filename);
      return;
    }
    // Resize if file is supported format
    if (matchExts.test(filename)) {
      resizeImage(src, dest, filename);
    }
    // Copy if file is not supported format
    else {
      fs.ensureFileSync(dest);
      fs.copyFile(src, dest).then(() => logFile("📄 COPIED", filename))
    }
    // Add filename to cache
    cache.images.push(filename);
  }
}

export default processImages;
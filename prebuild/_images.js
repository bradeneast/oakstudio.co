import fs from 'fs-extra';
import sharp from 'sharp';
import colors from 'colors';
import { join, normalize } from 'path';
import { outDir, targetExt, formatOptions, resizeOptions, matchExts, cacheFile } from './_options.js';

async function logFile(message, filename) {
  console.log(colors.gray(message + ":"), filename);
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
      .then(() => logFile("📐 RSZD", filename))
      .catch(console.error)
  } catch (err) {
    console.log("Error resizing ".red + src);
    console.error(err);
  }
}

/**Iterates over a directory and processes each image file
 * Outputs to a subfolder within the source directory
 */
async function processImages(dir, useCache = false) {

  let dirName = normalize(dir);
  let images = fs.readdirSync(dirName);
  let cache = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
  let diff = cache.images.filter(image => !images.includes(image));

  // Diff cached images with images present
  if (diff.length && useCache)
    for (let filename of diff) {

      // Remove filename from cache
      cache.images.splice(cache.images.indexOf(filename), 1);

      // Remove file from output directory
      fs.remove(join(outDir, filename.replace(matchExts, targetExt)))
        .then(() => logFile("🗑️ Removed cached file", filename));
    }

  // Process uncached images
  images
    .filter(image => cache.images.includes(image))
    .map(processImage);

  /**Generates src and dest paths for an image file and resizes or copies it */
  async function processImage(filename) {

    let src = join(dirName, filename);
    let dest = join(outDir, filename.replace(matchExts, targetExt));

    // Return if file is directory
    if (fs.lstatSync(src).isDirectory()) return;
    // Return if file is cached
    if (useCache && cache.images.includes(filename))
      return logFile("Using cached file", filename);

    // Resize if file is supported format : else copy file
    if (matchExts.test(filename))
      resizeImage(src, dest, filename)
    else {
      fs.ensureFileSync(dest);
      fs.copyFile(src, dest).then(() => logFile("📄 COPD", filename))
    }

    // Add filename to cache
    if (useCache) cache.images.push(filename);
  }

  // Write updated cache to cache file
  if (useCache) fs.writeFile(cacheFile, JSON.stringify(cache));
}

export default processImages;
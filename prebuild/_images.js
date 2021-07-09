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
async function processImages(dir) {

  dir = normalize(dir);

  let cache = JSON.parse(fs.readFileSync(cacheFile, "utf-8"))
  let images = fs.readdirSync(dir);
  let diff = cache.images.filter(image => !images.includes(image));

  if (diff.length)
    for (let filename of diff) {

      // Remove filename from cache
      let index = cache.images.indexOf(filename);
      cache.images.splice(index, 1);

      // Remove file from output directory
      fs.remove(join(outDir, filename.replace(matchExts, targetExt)))
        .then(() => logFile("🗑️ Removed cached file", filename));
    }

  images.forEach(processImage);

  /**Generates src and dest paths for an image file and resizes or copies it */
  async function processImage(filename) {

    let src = join(dir, filename);
    let dest = join(outDir, filename.replace(matchExts, targetExt));

    if (src == outDir) return;
    if (fs.lstatSync(src).isDirectory()) return;
    if (cache.images.includes(filename))
      return logFile("Using cached file", filename);

    if (matchExts.test(filename))
      resizeImage(src, dest, filename)
    else {
      fs.ensureFileSync(dest);
      fs.copyFile(src, dest).then(() => logFile("📄 COPD", filename))
    }

    cache.images.push(filename);
  }

  fs.writeFile(cacheFile, JSON.stringify(cache));
}

export default processImages;
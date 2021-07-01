import fs from 'fs-extra';
import sharp from 'sharp';
import { join, normalize } from 'path';
import { outDir, targetExt, formatOptions, resizeOptions, matchExts, inDir } from './_options.js';

/**Resize, compress, and format an image, then write it to a new file */
async function resizeImage(src, dest, filename) {
  fs.ensureFileSync(dest);
  try {
    sharp(await fs.readFile(src))
      .resize(...resizeOptions)
      .toFormat(targetExt)
      .webp(formatOptions)
      .toFile(dest)
      .then(() => console.log('📐 RSZD: ' + filename))
      .catch(console.error)
  } catch (err) {
    console.log("Error resizing " + src);
    console.error(err);
  }
}

let depth = 0;

/**Iterates over a directory and processes each image file
 * Outputs to a subfolder within the source directory
 */
async function processImages(currentDir) {

  currentDir = normalize(currentDir);
  fs.readdirSync(currentDir).forEach(processImage);

  /**Generates src and dest paths for an image file and resizes or copies it */
  async function processImage(filename) {
    let src = join(currentDir, filename);
    let currentDirName = currentDir.replace(inDir, "");
    let dest = join(outDir, currentDirName, filename.replace(matchExts, targetExt));

    if (src == outDir) return;
    if (fs.lstatSync(src).isDirectory()) return;

    if (matchExts.test(filename))
      resizeImage(src, dest, filename)
    else {
      fs.ensureFileSync(dest);
      fs.copyFile(src, dest)
        .then(() => console.log('📄 COPD: ' + filename))
    }
  }
}

export default processImages;
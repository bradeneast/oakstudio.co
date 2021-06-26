import fs from 'fs-extra';
import sharp from 'sharp';
import { join } from 'path';
import { targetExt, formatOptions, resizeOptions, matchExts } from './_options.js';

/**Resize, compress, and format an image, then write it to a new file */
async function resizeImage(src, dest, filename) {
  fs.ensureFileSync(dest);
  sharp(await fs.readFile(src))
    .resize(...resizeOptions)
    .toFormat(targetExt)
    .webp(formatOptions)
    .toFile(dest)
    .then(() => console.log('📐 RSZD: ' + filename))
    .catch(console.error)
}

/**Iterates over a directory and processes each image file
 * Outputs to a subfolder within the source directory
 */
async function processImages(dir, out) {
  fs.readdirSync(dir).forEach(async filename => {

    let src = join(dir, filename);
    let dest = join(dir, out, filename.replace(matchExts, targetExt));

    if (fs.lstatSync(src).isDirectory()) return;

    matchExts.test(filename)
      ? resizeImage(src, dest, filename)
      : fs.copyFile(src, dest)
        .then(() => console.log('📄 COPD: ' + filename))
  })
}

export default processImages;
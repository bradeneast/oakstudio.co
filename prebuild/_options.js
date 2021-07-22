let join = (...parts) => parts.join("/");

let validExts = [
  "jpeg",
  "jpg",
  "tiff",
  "raw",
  "png",
  "gif",
  "avif",
  "webp"
];
export let siteSrc = "_src";
export let imageDirName = "img";
export let outDirName = "s";
export let cacheFile = "prebuild/cache.json";
export let inDir = join(siteSrc, imageDirName);
export let outDir = join(siteSrc, imageDirName, outDirName);
export let targetExt = "webp";
export let matchExts = new RegExp(`(${validExts.join('|')})$`, 'i');
export let matchSrc = /(?<= (src=|url\()(["'`])).+?(?=\2[ >\/\)])/gi;
export let resizeOptions = [1440, 1440, { fit: "inside", withoutEnlargement: true }];
export let formatOptions = { quality: 50, reductionEffort: 2 };

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
export let inDir = "_src/img";
export let outDir = "_src/img/sm";
export let targetExt = "webp";
export let matchExts = new RegExp(`(${validExts.join('|')})$`, 'i');
export let matchSrc = /(?<= (src=|url\()(["'`])).+?(?=\2[ >\/\)])/gi;
export let resizeOptions = [2160, 2160, { fit: "inside", withoutEnlargement: true }];
export let formatOptions = { quality: 80, reductionEffort: 5 };
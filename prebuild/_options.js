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
export let targetExt = "webp";
export let matchExts = new RegExp(`(${validExts.join('|')})$`, 'i');
export let matchSrc = /(?<= (src=|url\()(["'`])).+?(?=\2[ >\/\)])/gi;
export let resizeOptions = [1620, 1620, { fit: "inside", withoutEnlargement: true }];
export let formatOptions = { quality: 50, smartSubsample: true, reductionEffort: 5 };

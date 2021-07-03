export const url = function (page) {
  let raw = page.src.path + ".html"
  return raw.replace(/\\/g, "/");
}
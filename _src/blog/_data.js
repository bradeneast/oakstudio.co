export const type = "post";
export const layout = "layouts/blog-post.njk";
export const templateEngine = "njk,md";
export const bodyClass = "post";

export function url(page) {
  return `/blog/${page.data.title}/`
}
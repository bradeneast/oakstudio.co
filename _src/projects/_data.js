export const type = "project";
export const layout = "layouts/project.njk";
export const templateEngine = "njk,md";
export const bodyClass = "project";

export function url(page) {
  return `/projects/${page.data.title}/`
}
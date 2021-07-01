export const type = "project";
export const layout = "layouts/project.njk";
export const templateEngine = "njk,md";

export function url(page) {
  return `/projects/${page.data.title}/`
}
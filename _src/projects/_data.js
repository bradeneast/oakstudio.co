export const type = "project";
export const layout = "layouts/project.njk";

export function url(page) {
  return `/projects/${page.data.title}/`
}
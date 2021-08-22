export const type = "project";
export const layout = "layouts/project.njk";
export const templateEngine = "njk,md";
export const bodyClass = "post";
export const areaDescription = "Case studies of our work here at Oak Studio";

export function url(page) {
  return `/projects/${page.data.title}/`
}
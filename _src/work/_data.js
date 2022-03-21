export const type = "case-study";
export const sortBy = "order";
export const layout = "caseStudy.layout.njk";
export function url(page) {
  return `/${type}/${page.data.title}/`
}
export const type = "case-study";
export const sortBy = "title";
export const layout = "caseStudy.njk";
export function url(page) {
  return `/${type}/${page.data.title}/`
}
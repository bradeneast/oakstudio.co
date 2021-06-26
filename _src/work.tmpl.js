export const layout = "layouts/archive.njk";
export const title = "Work";

export default function* ({ search, paginate }) {
  const projects = search.pages("type=project", "date");

  for (const data of paginate(projects, { url: (n) => `/projects/${n}/`, size: 6 })) {
    // Show the first page in the menu
    if (data.pagination.page === 1) {
      data.menu = {
        visible: true,
        order: 1,
      };
    }

    yield data;
  }
}

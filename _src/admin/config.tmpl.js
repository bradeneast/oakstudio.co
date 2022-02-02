import { stringify } from "lume/deps/yaml.ts";

export const url = "./config.yml";

export default (data, { url }) => {
  const config = {
    backend: {
      name: "git-gateway",
      repo: data.site.repo,
      branch: "main",
      commit_messages: {
        create: 'CMS Create {{collection}} “{{slug}}”',
        update: 'CMS Update {{collection}} “{{slug}}”',
        delete: 'CMS Delete {{collection}} “{{slug}}”',
        uploadMedia: '[skip ci] CMS Upload “{{path}}”',
        deleteMedia: '[skip ci] CMS Delete “{{path}}”',
      },
    },
    media_library: {
      name: "cloudinary",
      config: {
        cloud_name: data.site.cloud_name,
        api_key: data.site.cloud_key
      }
    },
    display_url: url("/"),
    logo_url: `${data.site.root}/logo.svg`,
    collections: [],
  };

  // Draft field
  const draftField = field("draft", "boolean", { required: false });
  // Markdown editor buttons - removed Heading 1 and code blocks
  const markdownButtons = ["bold", "italic", "link", "heading-two", "heading-three", "heading-four", "heading-five", "heading-six", "quote", "bulleted-list", "numbered-list"];

  // Reviews
  config.collections.push({
    label: "Review",
    name: "reviews",
    folder: "_src/reviews",
    description: "Here you can add or edit reviews from clients",
    preview: false,
    create: true,
    view_filters: [
      {
        label: "Drafts",
        field: "draft",
        pattern: true
      }
    ],
    fields: [
      field("client"),
      draftField,
      field("review"),
      field("photo", "image"),
    ]
  })

  const pageFields = [
    field("title"),
    field("photo", "image", { required: false }),
    field("body", "markdown", {
      buttons: ["heading-one", ...markdownButtons],
      editorComponents: ["image"],
      modes: ["rich_text"],
    }),
    field("layout", "hidden"),
  ];

  // Individual pages
  config.collections.push({
    label: "Page",
    name: "pages",
    description: "Here you can edit your individual pages",
    preview: false,
    files: [
      {
        label: "Home",
        name: "home",
        file: "/_src/index.md",
        fields: pageFields,
      },
    ]
  })

  return stringify(config);
};

function field(label, widget = "string", extra = {}) {
  return { label, name: label.toLowerCase(), widget, ...extra };
}

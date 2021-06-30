import { stringify } from "lume/deps/yaml.ts";

export const url = "./config.yml";

export default (data, { url }) => {
  const config = {
    backend: {
      name: "git-gateway",
      repo: "bradeneast/oakstudio.co",
      branch: "main",
      commit_messages: {
        create: 'CMS Create {{collection}} “{{slug}}”',
        update: 'CMS Update {{collection}} “{{slug}}”',
        delete: 'CMS Delete {{collection}} “{{slug}}”',
        uploadMedia: '[skip ci] CMS Upload “{{path}}”',
        deleteMedia: '[skip ci] CMS Delete “{{path}}”',
      },
    },
    media_folder: "_src/img",
    public_folder: "/img",
    display_url: url("/"),
    logo_url: "/img/logos/logo_light_cropped.png",
    collections: [],
  };

  // Draft field
  const draftField = field("draft", "boolean", { required: false });
  // Markdown editor buttons - removed Heading 1 and code blocks
  const markdownButtons = ["bold", "italic", "link", "heading-two", "heading-three", "heading-four", "heading-five", "heading-six", "quote", "bulleted-list", "numbered-list"];

  // Projects
  config.collections.push({
    label: "Project",
    name: "projects",
    folder: "_src/projects",
    description: "Here you can create or edit your projects",
    preview: false,
    create: true,
    view_filters: [
      {
        label: "Drafts",
        field: "draft",
        pattern: true,
      },
    ],
    fields: [
      field("title"),
      draftField,
      field("date", "date"),
      field("intro", "text"),
      field("tags", "list", { required: false }),
      field("image", "image"),
      field("colors", "list", {
        fields: [
          field("hex", "color"),
          field("pantone", "string", { required: false })
        ],
        allowAdd: true,
        add_to_top: true,
        collapsed: true,
        minimizeCollapsed: true
      }),
      field("body", "markdown", {
        buttons: ["heading-one", ...markdownButtons],
        editorComponents: ["image"],
      }),
    ],
  });

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
      field("company"),
      draftField,
      field("review"),
      field("image", "image", { required: false }),
    ]
  })

  const pageFields = [
    field("title"),
    field("image", "image"),
    field("headline", "markdown", {
      buttons: markdownButtons,
      editorComponents: []
    }),
    field("body", "markdown", {
      buttons: markdownButtons,
      editorComponents: ["image"],
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
        label: "Contact",
        name: "contact",
        file: "/_src/contact.md",
        fields: pageFields,
      },
      {
        label: "About",
        name: "about",
        file: "/_src/about.md",
        fields: pageFields,
      },
      {
        label: "404",
        name: "404",
        file: "/_src/404.md",
        fields: pageFields,
      },
      {
        label: "Success",
        name: "success",
        file: "/_src/success.md",
        fields: pageFields,
      },
    ],
  });

  return stringify(config);
};

function field(label, widget = "string", extra = {}) {
  return { label, name: label.toLowerCase(), widget, ...extra };
}

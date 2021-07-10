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
    logo_url: "/logo-cms.svg",
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
    folder: "_src/projects/",
    description: "Create or edit projects",
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
      field("Title"),
      draftField,
      field("Image", "image"),
      field("Order", "number"),
      field("Entity", "text", { default: "Small Business" }),
      field("Tags", "list", { required: false }),
      field("Description", "markdown", { editorComponents: [] }),
      field("Logo", "image", { required: false }),
      field("Colors", "list", {
        fields: [
          field("Name"),
          field("Hex", "color", {
            allowInput: true,
            enableAlpha: false
          }),
          field("Pantone", "string", { required: false })
        ],
        allowAdd: true,
        add_to_top: true,
        collapsed: true,
        minimizeCollapsed: true
      }),
      field("Body", "markdown", {
        modes: ["raw"],
        buttons: markdownButtons
      })
    ],
  });

  config.collections.push({
    label: "Blog Post",
    name: "posts",
    folder: "_src/blog/",
    description: "Create or edit blog posts",
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
      field("Title"),
      draftField,
      field("Image", "image"),
      field("Date", "date"),
      field("Tags", "list", { required: false }),
      field("Body", "markdown", {
        modes: ["raw"],
        buttons: markdownButtons
      })
    ]
  })

  const pageFields = [
    field("Title"),
    field("Image", "image"),
    field("Menu", "object", {
      fields: [
        field("Visible", "boolean", { required: false }),
        field("Order", "number")
      ],
      required: false
    }),
    field("Layout", "hidden"),
    field("Description", "markdown", {
      buttons: markdownButtons,
      editorComponents: [],
    }),
    field("Body", "markdown")
  ];

  // Individual pages
  config.collections.push({
    label: "Page",
    name: "pages",
    description: "Edit individual pages",
    preview: false,
    files: [
      {
        label: "Contact",
        name: "contact",
        file: "/_src/contact.md",
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

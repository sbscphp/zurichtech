import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { titleDescriptionFields } from "./objects";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "showcase", title: "Showcase Layout" },
    { name: "detail", title: "Detail Page" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "number",
      title: "Display Number",
      type: "string",
      group: "showcase",
      description: 'Shown above the title, e.g. "01".',
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short description on the services page and cards.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "content",
      description: "Lower numbers appear first.",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      group: "showcase",
      of: [defineArrayMember({ type: "string" })],
      description: "Checklist items on the services showcase row.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "showcase",
      description: "Upload or pick an image from the media library.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "imageSide",
      title: "Image Side",
      type: "string",
      group: "showcase",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
    defineField({
      name: "imageHeight",
      title: "Image Height (px)",
      type: "number",
      group: "showcase",
      description: "Desktop image frame height from the design.",
      initialValue: 564,
    }),
    defineField({
      name: "imageFrame",
      title: "Image Frame",
      type: "string",
      group: "showcase",
      options: {
        list: [
          { title: "Plain", value: "plain" },
          { title: "Blush", value: "blush" },
        ],
        layout: "radio",
      },
      initialValue: "plain",
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      group: "showcase",
      description: "Optional Tailwind object-position class.",
    }),
    defineField({
      name: "icon",
      title: "Icon Name (legacy)",
      type: "string",
      group: "content",
      description: "Optional Lucide icon name for older cards.",
      deprecated: {
        reason: "Prefer cover images and home icon mapping by title.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: "overview",
      title: "Overview Paragraphs",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (legacy)",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "string" })],
      deprecated: {
        reason: "Use Features for the services showcase checklist.",
      },
      readOnly: true,
      hidden: ({ value }) => !value || value.length === 0,
      initialValue: undefined,
    }),
    defineField({
      name: "process",
      title: "Process Steps",
      type: "array",
      group: "detail",
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          fields: titleDescriptionFields,
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "summary", media: "coverImage" },
  },
});

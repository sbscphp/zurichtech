import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const sectionMember = defineArrayMember({
  type: "object",
  name: "blogSection",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "listIntro",
      title: "List Intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "listItems",
      title: "List Items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "listOutro",
      title: "List Outro",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "detail", title: "Article Body" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "card",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "card",
      description: "Upload or pick an image from the media library.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "card",
      description: "Lower numbers appear first in the explore grid.",
    }),
    defineField({
      name: "date",
      title: "Published Date Label",
      type: "string",
      group: "detail",
      description: 'Display date, e.g. "May 18, 2026".',
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      group: "detail",
      description: 'e.g. "4 mins read".',
    }),
    defineField({
      name: "heroSubtitle",
      title: "Detail Hero Subtitle",
      type: "text",
      rows: 3,
      group: "detail",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraphs",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "detail",
      of: [sectionMember],
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
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});

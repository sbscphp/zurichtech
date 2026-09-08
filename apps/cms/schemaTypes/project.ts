import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { linkFields } from "./objects";

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "listing", title: "Listing" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCta",
      title: "Hero Button",
      type: "object",
      group: "hero",
      fields: linkFields,
    }),
    defineField({
      name: "listingEyebrow",
      title: "Listing Eyebrow",
      type: "string",
      group: "listing",
    }),
    defineField({
      name: "listingTitle",
      title: "Listing Title",
      type: "string",
      group: "listing",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Projects Page" }),
  },
});

const purposeFields = [
  defineField({
    name: "heading",
    title: "Heading",
    type: "string",
  }),
  defineField({
    name: "body",
    title: "Body",
    type: "text",
    rows: 4,
  }),
  defineField({
    name: "intro",
    title: "List Intro",
    type: "string",
  }),
  defineField({
    name: "items",
    title: "List Items",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  }),
];

const challengesFields = [
  defineField({
    name: "heading",
    title: "Heading",
    type: "string",
  }),
  defineField({
    name: "paragraphs",
    title: "Paragraphs",
    type: "array",
    of: [defineArrayMember({ type: "text", rows: 3 })],
  }),
  defineField({
    name: "intro",
    title: "List Intro",
    type: "string",
  }),
  defineField({
    name: "items",
    title: "List Items",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  }),
];

const approachFields = [
  defineField({
    name: "heading",
    title: "Heading",
    type: "string",
  }),
  defineField({
    name: "body",
    title: "Body",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "items",
    title: "List Items",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  }),
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "detail", title: "Case Study" },
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
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      group: "card",
      description: "Optional Tailwind object-position classes for the card image.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "card",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "card",
      description: "Lower numbers appear first in the grid.",
    }),
    defineField({
      name: "caseStudyTitle",
      title: "Case Study Title",
      type: "string",
      group: "detail",
      description: "Headline on the project detail page. Falls back to the card title.",
    }),
    defineField({
      name: "detailImage",
      title: "Detail Image",
      type: "image",
      group: "detail",
      description: "Large image on the case study page. Falls back to the cover image.",
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
      name: "about",
      title: "About Paragraphs",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "purpose",
      title: "Purpose",
      type: "object",
      group: "detail",
      fields: purposeFields,
    }),
    defineField({
      name: "challenges",
      title: "Challenges",
      type: "object",
      group: "detail",
      fields: challengesFields,
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "object",
      group: "detail",
      fields: approachFields,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});

import { defineField } from "sanity";

/** Label + href pair reused by nav, footer, social, and CTA fields. */
export const linkFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "href",
    title: "Link",
    type: "string",
    description: "Internal path (e.g. /services) or full URL (https://…).",
    validation: (rule) => rule.required(),
  }),
];

/** Title + description pair reused by highlights, values, and process steps. */
export const titleDescriptionFields = [
  defineField({
    name: "title",
    title: "Title",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 3,
    validation: (rule) => rule.required(),
  }),
];

import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { linkFields, titleDescriptionFields } from "./objects";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "highlights", title: "Highlights" },
    { name: "cta", title: "Closing CTA" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      group: "hero",
    }),
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
      rows: 4,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Hero Primary Button",
      type: "object",
      group: "hero",
      fields: linkFields,
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero Secondary Button",
      type: "object",
      group: "hero",
      fields: linkFields,
    }),
    defineField({
      name: "highlightsTitle",
      title: "Highlights Title",
      type: "string",
      group: "highlights",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "highlights",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: titleDescriptionFields,
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      group: "cta",
      fields: linkFields,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});

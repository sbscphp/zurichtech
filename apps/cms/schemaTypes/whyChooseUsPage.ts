import { HeartIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { linkFields } from "./objects";

const pillarMember = defineArrayMember({
  type: "object",
  name: "whyPillar",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "Upload or pick an icon from the media library.",
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
      name: "tint",
      title: "Icon Background",
      type: "string",
      description: "Optional Tailwind background class for the icon chip.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body", media: "icon" },
  },
});

const differenceMember = defineArrayMember({
  type: "object",
  name: "whyDifference",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});

export const whyChooseUsPage = defineType({
  name: "whyChooseUsPage",
  title: "Why Choose Us Page",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "pillars", title: "Pillars" },
    { name: "difference", title: "Our Difference" },
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
      name: "storyEyebrow",
      title: "Story Eyebrow",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyTitlePrefix",
      title: "Story Title — Prefix",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyTitleHighlight",
      title: "Story Title — Highlight",
      type: "string",
      group: "story",
      description: "Phrase shown in brand color.",
    }),
    defineField({
      name: "storyTitleSuffix",
      title: "Story Title — Suffix",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyBody",
      title: "Story Paragraphs",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "storyImage",
      title: "Story Image",
      type: "image",
      group: "story",
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
      name: "pillars",
      title: "Pillars",
      type: "array",
      group: "pillars",
      of: [pillarMember],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "differenceEyebrow",
      title: "Difference Eyebrow",
      type: "string",
      group: "difference",
    }),
    defineField({
      name: "differenceTitlePrefix",
      title: "Difference Title — Prefix",
      type: "string",
      group: "difference",
    }),
    defineField({
      name: "differenceTitleHighlight",
      title: "Difference Title — Highlight",
      type: "string",
      group: "difference",
      description: "Phrase shown in brand color.",
    }),
    defineField({
      name: "differenceTitleSuffix",
      title: "Difference Title — Suffix",
      type: "string",
      group: "difference",
    }),
    defineField({
      name: "difference",
      title: "Difference Cards",
      type: "array",
      group: "difference",
      of: [differenceMember],
      validation: (rule) => rule.max(12),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Why Choose Us Page" }),
  },
});

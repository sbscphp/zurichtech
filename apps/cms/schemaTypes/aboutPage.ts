import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { titleDescriptionFields } from "./objects";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story & Mission" },
    { name: "team", title: "Values & Team" },
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
      name: "storyTitle",
      title: "Story Title",
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
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "missionBody",
      title: "Mission Body",
      type: "text",
      rows: 3,
      group: "story",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "visionBody",
      title: "Vision Body",
      type: "text",
      rows: 3,
      group: "story",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      group: "team",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: titleDescriptionFields,
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "array",
      group: "team",
      of: [
        defineArrayMember({
          type: "object",
          name: "teamMember",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});

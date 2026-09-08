import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { linkFields } from "./objects";

const valueMember = defineArrayMember({
  type: "object",
  name: "value",
  fields: [
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
    select: { title: "title", subtitle: "description", media: "icon" },
  },
});

const teamMember = defineArrayMember({
  type: "object",
  name: "teamMember",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      description: "Upload or pick a photo from the media library.",
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
      name: "objectPosition",
      title: "Image Position",
      type: "string",
      description: "Optional Tailwind object-position class.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});

const testimonialMember = defineArrayMember({
  type: "object",
  name: "testimonial",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      description: "Upload or pick a photo from the media library.",
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
      name: "objectPosition",
      title: "Image Position",
      type: "string",
      description: "Optional Tailwind object-position class.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "photo" },
  },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "mission", title: "Mission & Vision" },
    { name: "team", title: "Team" },
    { name: "values", title: "Values" },
    { name: "testimonials", title: "Testimonials" },
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
      name: "storyTitleHighlight",
      title: "Story Title — Highlight",
      type: "string",
      group: "story",
      description: "Phrase shown in brand color.",
    }),
    defineField({
      name: "storyTitleRest",
      title: "Story Title — Rest",
      type: "string",
      group: "story",
      description: "Text after the highlighted phrase.",
    }),
    defineField({
      name: "storyBody",
      title: "Story Paragraphs",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "storyCta",
      title: "Story Button",
      type: "object",
      group: "story",
      fields: linkFields,
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
      name: "missionVisionTitle",
      title: "Mission / Vision Section Title",
      type: "string",
      group: "mission",
    }),
    defineField({
      name: "missionVisionCta",
      title: "Mission / Vision Button",
      type: "object",
      group: "mission",
      fields: linkFields,
    }),
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      group: "mission",
    }),
    defineField({
      name: "missionBody",
      title: "Mission Body",
      type: "text",
      rows: 4,
      group: "mission",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
      group: "mission",
    }),
    defineField({
      name: "visionBody",
      title: "Vision Body",
      type: "text",
      rows: 4,
      group: "mission",
    }),
    defineField({
      name: "teamEyebrow",
      title: "Team Eyebrow",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "teamTitle",
      title: "Team Title",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      group: "team",
      of: [teamMember],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "valuesEyebrow",
      title: "Values Eyebrow",
      type: "string",
      group: "values",
    }),
    defineField({
      name: "valuesTitle",
      title: "Values Title",
      type: "string",
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      group: "values",
      of: [valueMember],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "testimonialsEyebrow",
      title: "Testimonials Eyebrow",
      type: "string",
      group: "testimonials",
    }),
    defineField({
      name: "testimonialsTitle",
      title: "Testimonials Title",
      type: "string",
      group: "testimonials",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      of: [testimonialMember],
      validation: (rule) => rule.max(12),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});

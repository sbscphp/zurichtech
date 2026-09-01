import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { linkFields } from "./objects";

const statMember = defineArrayMember({
  type: "object",
  name: "stat",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

const whyPointMember = defineArrayMember({
  type: "object",
  name: "whyPoint",
  fields: [
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      description: 'Display label, e.g. "01".',
      validation: (rule) => rule.required(),
    }),
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
  ],
  preview: { select: { title: "title", subtitle: "number" } },
});

const clientLogoMember = defineArrayMember({
  type: "object",
  name: "clientLogo",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logoSrc",
      title: "Logo Path",
      type: "string",
      description: "Path under /public (e.g. /figma/home/logo-synergy.svg).",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name" } },
});

const insightCardMember = defineArrayMember({
  type: "object",
  name: "insightCard",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageSrc",
      title: "Image Path",
      type: "string",
      description: "Path under /public (e.g. /figma/home/insight-1.png).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Internal path or full URL.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});

const teamMemberMember = defineArrayMember({
  type: "object",
  name: "homeTeamMember",
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
      name: "imageSrc",
      title: "Photo Path",
      type: "string",
      description: "Path under /public (e.g. /figma/home/team-1.png).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "objectPosition",
      title: "Image Position",
      type: "string",
      description: "Optional Tailwind object-position class.",
    }),
    defineField({
      name: "raised",
      title: "Raised Layout",
      type: "boolean",
      description: "Offset card downward on large screens.",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "logos", title: "Client Logos" },
    { name: "stats", title: "Stats Band" },
    { name: "why", title: "Why Choose Us" },
    { name: "services", title: "Services" },
    { name: "insights", title: "Insights" },
    { name: "team", title: "Team" },
  ],
  fields: [
    defineField({
      name: "heroTitleLine1",
      title: "Hero Title — Line 1",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitleLine2",
      title: "Hero Title — Line 2 Prefix",
      type: "string",
      group: "hero",
      description: 'Text before the highlighted phrase, e.g. "your ".',
    }),
    defineField({
      name: "heroTitleHighlight",
      title: "Hero Title — Highlight",
      type: "string",
      group: "hero",
      description: "Phrase shown in brand color.",
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
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "clientLogos",
      title: "Client Logos",
      type: "array",
      group: "logos",
      of: [clientLogoMember],
      validation: (rule) => rule.max(16),
    }),
    defineField({
      name: "statsTitle",
      title: "Stats Title",
      type: "text",
      rows: 3,
      group: "stats",
    }),
    defineField({
      name: "statsDescription",
      title: "Stats Description",
      type: "text",
      rows: 4,
      group: "stats",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      of: [statMember],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "whyImage",
      title: "Why Choose Us Image",
      type: "image",
      group: "why",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "whyEyebrow",
      title: "Why Choose Us Eyebrow",
      type: "string",
      group: "why",
    }),
    defineField({
      name: "whyTitle",
      title: "Why Choose Us Title",
      type: "string",
      group: "why",
    }),
    defineField({
      name: "whyPoints",
      title: "Why Choose Us Points",
      type: "array",
      group: "why",
      of: [whyPointMember],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "whyCta",
      title: "Why Choose Us Button",
      type: "object",
      group: "why",
      fields: linkFields,
    }),
    defineField({
      name: "servicesTitle",
      title: "Services Section Title",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesCta",
      title: "Services Section Button",
      type: "object",
      group: "services",
      fields: linkFields,
    }),
    defineField({
      name: "insightsTitle",
      title: "Insights Section Title",
      type: "string",
      group: "insights",
    }),
    defineField({
      name: "insightsCta",
      title: "Insights Section Button",
      type: "object",
      group: "insights",
      fields: linkFields,
    }),
    defineField({
      name: "insights",
      title: "Featured Insights",
      type: "array",
      group: "insights",
      of: [insightCardMember],
      validation: (rule) => rule.max(12),
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
      name: "homeTeam",
      title: "Team Members",
      type: "array",
      group: "team",
      of: [teamMemberMember],
      validation: (rule) => rule.max(12),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});

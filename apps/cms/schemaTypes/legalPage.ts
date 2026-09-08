import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const policySectionMember = defineArrayMember({
  type: "object",
  name: "policySection",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "bullets",
      title: "Bullet Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "after",
      title: "Closing Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      description: "Shown after the bullet list, if any.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});

const policyMember = defineArrayMember({
  type: "object",
  name: "policy",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "Stable key used for tabs (e.g. privacy, cookies, terms).",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9-]+$/, {
          name: "slug",
          invert: false,
        }),
    }),
    defineField({
      name: "tabLabel",
      title: "Tab Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updated",
      title: "Updated Label",
      type: "string",
      description: 'e.g. "Last Updated: 18 August 2026"',
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [policySectionMember],
    }),
  ],
  preview: {
    select: { title: "tabLabel", subtitle: "id" },
  },
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "policies", title: "Policies" },
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
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      description: "Upload or pick a hero background from the media library.",
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
      name: "defaultPolicyId",
      title: "Default Policy Tab",
      type: "string",
      group: "policies",
      description: "Must match a policy ID (e.g. privacy).",
    }),
    defineField({
      name: "policies",
      title: "Policies",
      type: "array",
      group: "policies",
      of: [policyMember],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Legal Page" }),
  },
});

import { ControlsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { linkFields } from "./objects";

const linkArrayMember = defineArrayMember({
  type: "object",
  name: "link",
  fields: linkFields,
  preview: { select: { title: "label", subtitle: "href" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: ControlsIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      group: "general",
      description: "Shown under the logo in the footer.",
    }),
    defineField({
      name: "newsletterTitle",
      title: "Newsletter Title",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "newsletterDescription",
      title: "Newsletter Description",
      type: "text",
      rows: 2,
      group: "general",
    }),
    defineField({
      name: "navLinks",
      title: "Header Navigation",
      type: "array",
      group: "navigation",
      of: [linkArrayMember],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      group: "navigation",
      of: [linkArrayMember],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "navigation",
      of: [linkArrayMember],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactAddress",
      title: "Contact Address",
      type: "text",
      rows: 3,
      group: "contact",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});

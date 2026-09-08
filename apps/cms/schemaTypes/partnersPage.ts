import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const partnersPage = defineType({
  name: "partnersPage",
  title: "Partners Page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "logos", title: "Trusted By" },
    { name: "inquiry", title: "Inquiry" },
    { name: "info", title: "Contact Information" },
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
      name: "trustedByLabel",
      title: "Trusted By Label",
      type: "string",
      group: "logos",
      description: "Shown beside the client logo marquee. Logos come from the Home Page.",
    }),
    defineField({
      name: "inquiryTitle",
      title: "Service Selector Title",
      type: "string",
      group: "inquiry",
      description: 'e.g. "SELECT A SERVICE". Service options come from Services documents.',
    }),
    defineField({
      name: "formNote",
      title: "Form Note",
      type: "string",
      group: "inquiry",
      description: "Shown under the message field.",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      group: "inquiry",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      group: "inquiry",
      description: "Shown after the inquiry form submits successfully.",
    }),
    defineField({
      name: "infoTitle",
      title: "Section Title",
      type: "string",
      group: "info",
    }),
    defineField({
      name: "infoDescription",
      title: "Section Description",
      type: "text",
      rows: 2,
      group: "info",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Partners Page" }),
  },
});

import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "form", title: "Form" },
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
      name: "formNote",
      title: "Form Note",
      type: "string",
      group: "form",
      description: "Shown under the message field.",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      group: "form",
      description: "Shown after the contact form submits successfully.",
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
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow (legacy)",
      type: "string",
      group: "hero",
      deprecated: {
        reason: "The contact hero no longer uses an eyebrow.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description (legacy)",
      type: "text",
      rows: 3,
      group: "hero",
      deprecated: {
        reason: "The contact hero is title + image only.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
    defineField({
      name: "formTitle",
      title: "Form Title (legacy)",
      type: "string",
      group: "form",
      deprecated: {
        reason: "The contact form no longer shows a separate title.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
    defineField({
      name: "formDescription",
      title: "Form Description (legacy)",
      type: "text",
      rows: 3,
      group: "form",
      deprecated: {
        reason: "Use Form Note instead.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});

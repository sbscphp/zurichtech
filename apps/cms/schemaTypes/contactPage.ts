import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
    }),
    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      description: "Shown after the contact form submits successfully.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});

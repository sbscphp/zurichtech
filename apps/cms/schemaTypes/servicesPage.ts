import { ThLargeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { linkFields } from "./objects";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  icon: ThLargeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "showcase", title: "Showcase" },
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
      rows: 4,
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
      name: "showcaseCta",
      title: "Service Row Button",
      type: "object",
      group: "showcase",
      description: "CTA shown on each service row.",
      fields: linkFields,
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow (legacy)",
      type: "string",
      group: "hero",
      deprecated: {
        reason: "Unused on the current services banner.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: "directoryTitle",
      title: "Directory Title (legacy)",
      type: "string",
      group: "showcase",
      deprecated: {
        reason: "Directory section is no longer on the services page.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: "directoryDescription",
      title: "Directory Description (legacy)",
      type: "text",
      rows: 3,
      group: "showcase",
      deprecated: {
        reason: "Directory section is no longer on the services page.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Services Page" }),
  },
});

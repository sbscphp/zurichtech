import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogsPage = defineType({
  name: "blogsPage",
  title: "Blogs Page",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "listing", title: "Listing" },
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
      name: "recentTitle",
      title: "Recent Insights Title",
      type: "string",
      group: "listing",
    }),
    defineField({
      name: "exploreTitle",
      title: "Explore More Title",
      type: "string",
      group: "listing",
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "reference",
      group: "listing",
      to: [{ type: "blogPost" }],
      description: "Large card in the Recent Insights section.",
    }),
    defineField({
      name: "sidebarPosts",
      title: "Sidebar Posts",
      type: "array",
      group: "listing",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "blogPost" }],
        }),
      ],
      validation: (rule) => rule.max(3),
      description: "Up to three posts beside the featured card.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Blogs Page" }),
  },
});

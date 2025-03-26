import { defineField, defineType } from "sanity";

export const sectionTitlesType = defineType({
  name: "sectionTitles",
  title: "Section Titles",
  type: "document",
  fields: [
    defineField({
      name: "benefits",
      title: "Benefits Section",
      type: "object",
      fields: [
        defineField({
          name: "preTitle",
          title: "Pre Title",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "video",
      title: "Video Section",
      type: "object",
      fields: [
        defineField({
          name: "preTitle",
          title: "Pre Title",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials Section",
      type: "object",
      fields: [
        defineField({
          name: "preTitle",
          title: "Pre Title",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ Section",
      type: "object",
      fields: [
        defineField({
          name: "preTitle",
          title: "Pre Title",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
      ],
    }),
  ],
});

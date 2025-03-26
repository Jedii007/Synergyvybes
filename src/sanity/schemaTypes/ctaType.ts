import { defineField, defineType } from 'sanity';

export const ctaType = defineType({
  name: 'cta',
  title: 'Call To Action',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Button Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

import { defineField, defineType } from 'sanity';

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'introTitle',
      type: 'string',
      title: 'Introduction Title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'introText',
      type: 'text',
      title: 'Introduction Text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'expertiseTitle',
      type: 'string',
      title: 'Expertise Section Title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'expertiseText',
      type: 'text',
      title: 'Expertise Section Text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      type: 'string',
      title: 'YouTube Video ID',
      description: 'The ID of the YouTube video to display',
      validation: Rule => Rule.required(),
    }),
  ],
});

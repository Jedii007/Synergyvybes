import { defineField, defineType } from 'sanity'

export const mediaType = defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
    }),
    defineField({
      name: 'host',
      title: 'Host',
      type: 'string',
      description: 'Episode host'
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'url',
      title: 'Media URL',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
      }).required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artistName: 'artistName',
      media: 'thumbnail',
    },
    prepare({ title, artistName, media }) {
      return {
        title: title || artistName || 'Untitled Media',
        subtitle: artistName ? `Artist: ${artistName}` : undefined,
        media,
      }
    },
  },
})
import { defineField, defineType } from 'sanity'

export const artistSpotlightType = defineType({
  name: 'artistSpotlight',
  title: 'Artist Spotlight',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'medium',
      title: 'Medium/Discipline',
      type: 'string',
      description: 'e.g., Visual Artist, Musician & Poet, Sculptor',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required().min(100),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'wideImage',
      title: 'Wide Hero Image',
      type: 'image',
      description: 'Large banner image for the artist page',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
    }),
    defineField({
      name: 'spotlightImage',
      title: 'Spotlight Featured Image',
      type: 'image',
      description: 'Image used in spotlight listings',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Artist',
      type: 'boolean',
      initialValue: false,
      description: 'Show this artist prominently on the spotlight page',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'showcase',
      title: 'Showcase Works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                }
              ],
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Audio', value: 'audio' }
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'audioUrl',
              title: 'Audio URL',
              type: 'url',
              description: 'Required if type is audio',
              hidden: ({ parent }) => parent?.type !== 'audio',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              type: 'type',
            },
            prepare(selection) {
              const { title, type } = selection
              return {
                ...selection,
                subtitle: type === 'audio' ? '🎵 Audio' : '🖼️ Image',
              }
            },
          },
        }
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'portfolioLink',
      title: 'Portfolio/Interview Link',
      type: 'url',
      description: 'Link to portfolio, interview, or main work',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram Handle',
          type: 'string',
          description: 'Just the username (without @)',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Just the username (without @)',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'string',
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'interview',
      title: 'Interview',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Featured Quote',
          type: 'text',
          rows: 3,
          description: 'A standout quote from the artist',
        }),
        defineField({
          name: 'questions',
          title: 'Interview Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'text',
                  rows: 2,
                  validation: Rule => Rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 4,
                  validation: Rule => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'question',
                },
                prepare(selection) {
                  return {
                    title: selection.title?.substring(0, 50) + '...',
                    subtitle: 'Q&A',
                  }
                },
              },
            }
          ],
        }),
      ],
    }),
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions & Events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: Rule => Rule.required().regex(/^\d{4}$/, {
                name: 'year',
                invert: false
              }),
            }),
            defineField({
              name: 'events',
              title: 'Events',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Event Title',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'location',
                      title: 'Location',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'location',
                    },
                  },
                }
              ],
              validation: Rule => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'year',
              events: 'events',
            },
            prepare(selection) {
              const { title, events } = selection
              const eventCount = events?.length || 0
              return {
                title: title,
                subtitle: `${eventCount} event${eventCount !== 1 ? 's' : ''}`,
              }
            },
          },
        }
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags for categorization and search',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
      medium: 'medium',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, medium, featured } = selection
      return {
        ...selection,
        subtitle: `${medium}${featured ? ' • Featured' : ''}`,
      }
    },
  },
})
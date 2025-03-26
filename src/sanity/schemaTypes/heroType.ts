import { defineField, defineType } from 'sanity';

export const heroType = defineType({
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'buttons',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'text', type: 'string' },
                        { name: 'href', type: 'string' },
                    ]
                }
            ]
        })
    ],
});
import { defineField, defineType } from 'sanity';

export const newsEventType = defineType({
    name: 'newsEvent',
    title: 'News & Event',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'desc',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'sponsored',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'fullDescription',
            type: 'text',
        }),
    ],
}); 
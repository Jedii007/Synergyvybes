import { defineField, defineType } from 'sanity';

export const serviceHeroType = defineType({
    name: 'serviceHero',
    title: 'Service Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Hero Title',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            type: 'text',
            title: 'Hero Subtitle',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'backgroundImage',
            type: 'image',
            title: 'Background Image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'buttonText',
            type: 'string',
            title: 'Button Text',
            initialValue: 'Explore Our Services',
        }),
    ],
});
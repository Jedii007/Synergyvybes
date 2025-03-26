import { defineField, defineType } from 'sanity';

export const aboutHeroType = defineType({
    name: 'aboutHero',
    title: 'About Hero',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            type: 'string',
        }),
        defineField({
            name: 'backgroundImage',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required(),
        }),
    ],
});

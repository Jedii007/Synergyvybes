import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'textParts',
            title: 'Testimonial Text Parts',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'content',
                            title: 'Content',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'mark',
                            title: 'Highlight?',
                            type: 'boolean',
                            initialValue: false,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'content',
                            marked: 'mark',
                        },
                        prepare(value) {
                            return {
                                title: value.title,
                                subtitle: value.marked ? 'Highlighted' : '',
                            };
                        },
                    },
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Avatar Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Title / Position',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
});

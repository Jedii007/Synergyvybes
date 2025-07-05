import { type SchemaTypeDefinition } from 'sanity'
import { blogPostType } from './blogPost'
import { blockContentType } from './blockContent'
import { artistSpotlightType } from './artistSpotlight'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPostType, blockContentType, artistSpotlightType],
}

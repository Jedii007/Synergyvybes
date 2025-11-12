import { type SchemaTypeDefinition } from 'sanity'
import { blogPostType } from './blogPost'
import { blockContentType } from './blockContent'
import { artistSpotlightType } from './artistSpotlight'
import { mediaType } from './media'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPostType, blockContentType, artistSpotlightType, mediaType],
}

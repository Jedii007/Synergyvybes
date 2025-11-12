import { groq } from 'next-sanity'

// Get all blog posts
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    mainImage,
    contentType,
    mood,
    readTime,
    tags,
    featured,
    youtubeUrl
  }
`

// Get featured blog posts
export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    mainImage,
    contentType,
    mood,
    readTime,
    tags,
    youtubeUrl
  }
`

// Get blog posts with limit
export const blogPostsWithLimitQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    mainImage,
    contentType,
    mood,
    readTime,
    tags,
    featured,
    youtubeUrl
  }
`

// Get single blog post by slug
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    mainImage{
      ...,
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      }
    },
    contentType,
    mood,
    body[]{
      ...,
      _type == 'image' => {
        ...,
        asset->{
          _id,
          url,
          metadata{
            dimensions{
              width,
              height
            }
          }
        }
      }
    },
    readTime,
    tags,
    youtubeUrl
  }
`

// Get blog posts by content type
export const blogPostsByTypeQuery = groq`
  *[_type == "blogPost" && contentType == $contentType] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    mainImage,
    contentType,
    mood,
    readTime,
    tags,
    youtubeUrl
  }
`

// Artist Spotlight Queries

// Get all artist spotlights
export const artistSpotlightsQuery = groq`
  *[_type == "artistSpotlight"] | order(publishedAt desc) {
    _id,
    name,
    slug,
    medium,
    profileImage,
    featured,
    publishedAt,
    tags
  }
`

// Get featured artist spotlights
export const featuredArtistSpotlightsQuery = groq`
  *[_type == "artistSpotlight" && featured == true] | order(publishedAt desc) {
    _id,
    name,
    slug,
    medium,
    profileImage,
    spotlightImage,
    featured,
    publishedAt,
    tags
  }
`

// Get single artist spotlight by slug
export const artistSpotlightBySlugQuery = groq`
  *[_type == "artistSpotlight" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    medium,
    bio,
    profileImage,
    wideImage,
    spotlightImage,
    featured,
    publishedAt,
    showcase[] {
      _key,
      image,
      title,
      description,
      type,
      audioUrl
    },
    portfolioLink,
    socialLinks,
    interview {
      quote,
      questions[] {
        _key,
        question,
        answer
      }
    },
    exhibitions[] {
      _key,
      year,
      events[] {
        _key,
        title,
        location,
        description
      }
    },
    tags
  }
`

// Get artist spotlights with limit
export const artistSpotlightsWithLimitQuery = groq`
  *[_type == "artistSpotlight"] | order(publishedAt desc) [0...$limit] {
    _id,
    name,
    slug,
    medium,
    profileImage,
    featured,
    publishedAt,
    tags
  }
`

// Media Queries
export const mediaItemsQuery = groq`
  *[_type == "media"] | order(publishedAt desc) {
    _id,
    title,
    artistName,
    host,
    collaborators,
    url,
    platform,
    description,
    thumbnail,
    publishedAt,
    tags
  }
`

export const mediaItemsWithLimitQuery = groq`
  *[_type == "media"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    artistName,
    host,
    collaborators,
    url,
    platform,
    description,
    thumbnail,
    publishedAt,
    tags
  }
`
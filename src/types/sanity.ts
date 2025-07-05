import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: string
  publishedAt: string
  excerpt: string
  mainImage?: SanityImageSource
  contentType: 'essay' | 'mixed' | 'update'
  mood?: '🎧' | '🤔' | '🔥' | '✨' | '🎨'
  body?: any[] // Block content array
  readTime?: number
  tags?: string[]
  featured?: boolean
  youtubeUrl?: string
}

export interface BlogPostPreview {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: string
  publishedAt: string
  excerpt: string
  mainImage?: SanityImageSource
  contentType: 'essay' | 'mixed' | 'update'
  mood?: '🎧' | '🤔' | '🔥' | '✨' | '🎨'
  readTime?: number
  tags?: string[]
  featured?: boolean
  youtubeUrl?: string
}

// Artist Spotlight Types
export interface ShowcaseItem {
  _key: string
  image: SanityImageSource
  title: string
  description: string
  type: 'image' | 'audio'
  audioUrl?: string
}

export interface ExhibitionEvent {
  _key: string
  title: string
  location?: string
  description?: string
}

export interface ExhibitionYear {
  _key: string
  year: string
  events: ExhibitionEvent[]
}

export interface InterviewQuestion {
  _key: string
  question: string
  answer: string
}

export interface Interview {
  quote: string
  questions: InterviewQuestion[]
}

export interface SocialLinks {
  instagram?: string
  twitter?: string
  facebook?: string
  website?: string
}

export interface ArtistSpotlight {
  _id: string
  name: string
  slug: {
    current: string
  }
  medium: string
  bio: string
  profileImage: SanityImageSource
  wideImage?: SanityImageSource
  spotlightImage?: SanityImageSource
  featured: boolean
  publishedAt: string
  showcase: ShowcaseItem[]
  portfolioLink?: string
  socialLinks?: SocialLinks
  interview?: Interview
  exhibitions: ExhibitionYear[]
  tags?: string[]
}

export interface ArtistSpotlightPreview {
  _id: string
  name: string
  slug: {
    current: string
  }
  medium: string
  profileImage: SanityImageSource
  featured: boolean
  publishedAt: string
  tags?: string[]
}
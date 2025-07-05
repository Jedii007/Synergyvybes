"use client"
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { BlogPost } from '@/types/sanity';
import { SidebarAd, SquareAd } from '@/components/GoogleAdsComponent';

// Custom PortableText components for better formatting
const portableTextComponents = {
  marks: {
    // Bold text
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    // Italic text
    em: ({ children }: any) => (
      <em className="italic text-gray-200">{children}</em>
    ),
    // Code text
    code: ({ children }: any) => (
      <code className="bg-gray-800 text-[#e68531] px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    // Links
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#e68531] hover:text-[#f59542] underline transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    // Bullet lists
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200 ml-4">
        {children}
      </ul>
    ),
    // Numbered lists
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-200 ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    // List items
    bullet: ({ children }: any) => (
      <li className="mb-1 leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="mb-1 leading-relaxed">{children}</li>
    ),
  },
  // Handle blocks that are list items but not in a list container
  block: {
    // Normal paragraphs
    normal: ({ children, value }: any) => {
      // Check if this is a list item
      if (value.listItem) {
        return (
          <div className="mb-4">
            {value.listItem === 'number' && (
              <div className="flex items-start gap-2">
                <span className="text-[#e68531] font-bold min-w-[1.5rem]">
                  {value.level || 1}.
                </span>
                <div className="leading-relaxed text-gray-200">{children}</div>
              </div>
            )}
            {value.listItem === 'bullet' && (
              <div className="flex items-start gap-2">
                <span className="text-[#e68531] min-w-[1rem]">•</span>
                <div className="leading-relaxed text-gray-200">{children}</div>
              </div>
            )}
          </div>
        );
      }

      // Handle empty paragraphs (for spacing)
      const textContent = value.children?.map((child: any) => child.text).join('').trim();
      if (!textContent) {
        return <div className="mb-6" />; // Empty spacing div
      }

      // Regular paragraph
      return <p className="mb-6 leading-relaxed text-gray-200">{children}</p>;
    },
    // Headings
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-6 mt-8 text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-4 mt-6 text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mb-3 mt-5 text-white">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mb-2 mt-4 text-white">{children}</h4>
    ),
    // Blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#e68531] pl-6 my-6 italic text-gray-300">
        {children}
      </blockquote>
    ),
  },
  types: {
    // Handle images if you have them in your rich text
    image: ({ value }: any) => (
      <div className="my-8 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(800).height(400).url()}
          alt={value.alt || ''}
          width={800}
          height={400}
          className="w-full h-auto object-cover"
        />
        {value.alt && (
          <p className="text-sm text-gray-400 mt-2 text-center italic">
            {value.alt}
          </p>
        )}
      </div>
    ),
    // Handle YouTube videos in rich text
    youtube: ({ value }: any) => (
      <div className="my-8">
        <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden">
          <iframe
            src={value.url.replace('watch?v=', 'embed/')}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    ),
  },
};

export default function WhatsNewPost({ params }: { params: { slug: string } }) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPost() {
      console.log('Fetching blog post with slug:', params.slug);
      try {
        // First, let's see all available posts
        const allPosts = await client.fetch<BlogPost[]>(blogPostsQuery);
        console.log('All available blog posts:', allPosts.map(p => ({ title: p.title, slug: p.slug?.current })));

        const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug: params.slug });
        console.log('Fetched blog post:', post);
        setBlogPost(post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setBlogPost(null);
      }
      setLoading(false);
    }

    fetchBlogPost();
  }, [params.slug]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#e68531] mx-auto mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // If no blog post found, show 404
  if (!blogPost) {
    notFound();
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <div className="max-w-[95%] mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Takes 3/4 of the width on xl screens */}
          <div className="xl:col-span-3">
            <article className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  {blogPost.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="font-semibold text-[#e68531]">{blogPost.author}</span>
                  <span>•</span>
                  <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
                  {blogPost.mood && (
                    <>
                      <span>•</span>
                      <span>{blogPost.mood}</span>
                    </>
                  )}
                  {blogPost.readTime && (
                    <>
                      <span>•</span>
                      <span>{blogPost.readTime} min read</span>
                    </>
                  )}
                </div>
                {blogPost.tags && blogPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#e68531]/20 text-[#e68531] rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Image */}
              {blogPost.mainImage && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={urlFor(blogPost.mainImage).width(800).height(400).url()}
                    alt={blogPost.title}
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* YouTube Video */}
              {blogPost.youtubeUrl && (
                <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden mb-8">
                  <iframe
                    src={blogPost.youtubeUrl.replace('watch?v=', 'embed/')}
                    title={blogPost.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Content with Custom PortableText Components */}
              <div className="max-w-none">


                {blogPost.body && (
                  <PortableText
                    value={blogPost.body}
                    components={portableTextComponents}
                  />
                )}
              </div>
            </article>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-[#e68531]/90 to-[#e68531]/70 rounded-xl p-6 md:p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore More Content</h2>
              <p className="max-w-2xl mx-auto mb-6">
                Discover more artist spotlights, updates, and creative content from our community.
              </p>
              <Link
                href="/whats-new"
                className="inline-block px-6 md:px-8 py-3 bg-white text-[#e68531] font-bold rounded-lg hover:bg-gray-100 transition-colors mr-4"
              >
                View All Posts
              </Link>
              <Link
                href="/artist-spotlight"
                className="inline-block px-6 md:px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#e68531] transition-colors"
              >
                Artist Spotlights
              </Link>
            </div>
          </div>

          {/* Ads Sidebar - Takes 1/4 of the width on xl screens */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* First Ad */}
              <SidebarAd />

              {/* Second Ad */}
              <SquareAd />

              {/* Third Ad */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
                <div className="bg-gray-800/50 rounded-lg h-60 flex items-center justify-center text-gray-400 text-sm">
                  Ad Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
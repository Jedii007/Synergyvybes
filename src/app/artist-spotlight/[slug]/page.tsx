/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import WorkModal from "@/components/WorkModal";
import { Suspense } from "react";
import { client } from '@/sanity/lib/client';
import { blogPostBySlugQuery, artistSpotlightBySlugQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { BlogPost, ArtistSpotlight, ShowcaseItem, ExhibitionYear, ExhibitionEvent, InterviewQuestion, Interview } from '@/types/sanity';

// Legacy interface for compatibility with WorkModal
interface Work {
  image: string;
  title: string;
  type: "image" | "audio";
  description: string;
  audioUrl?: string;
}

// Separate client component for the work grid
const WorkGrid = ({ works, onWorkSelect }: { works: Work[], onWorkSelect: (work: Work) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {works.map((work, index) => (
      <div
        key={index}
        className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer"
        onClick={() => onWorkSelect(work)}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading={index < 4 ? "eager" : "lazy"}
          quality={75}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-center">
            <p className="text-white font-medium text-lg">{work.title}</p>
            {work.type === "audio" && (
              <span className="text-xs text-[#e68531] mt-2 inline-block">Click to play preview</span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Separate client component for the exhibitions timeline
const ExhibitionsTimeline = ({ exhibitions }: { exhibitions: ExhibitionYear[] }) => (
  <div className="space-y-8">
    {exhibitions.map((year, index) => (
      <div key={year._key || index} className="relative pl-8 border-l-2 border-[#e68531]">
        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#e68531]"></div>
        <h3 className="text-2xl font-bold mb-4">{year.year}</h3>
        <ul className="space-y-4">
          {year.events.map((event, eventIndex) => (
            <li key={event._key || eventIndex} className="pl-4">
              <h4 className="font-semibold text-lg">{event.title}</h4>
              {event.location && (
                <p className="text-gray-600 dark:text-gray-300">{event.location}</p>
              )}
              {event.description && (
                <p className="text-gray-500 dark:text-gray-400 mt-1">{event.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// Separate client component for the interview section
const InterviewSection = ({ interview }: { interview: Interview | null }) => {
  if (!interview) return null;

  return (
    <div>
      <div className="relative bg-[#e68531]/10 p-6 rounded-lg mb-8">
        <p className="text-xl italic font-light text-[#e68531] ml-8 relative z-10">
          {interview.quote}
        </p>
      </div>
      <div className="space-y-6">
        {interview.questions.map((item, index) => (
          <div key={item._key || index}>
            <h3 className="text-lg font-bold mb-2">{item.question}</h3>
            <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component to render blog post content
const BlogPostContent = ({ blogPost }: { blogPost: BlogPost }) => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
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

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <PortableText value={blogPost.body} />
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-[#e68531]/90 to-[#e68531]/70 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Content</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Discover more artist spotlights, updates, and creative content from our community.
          </p>
          <Link
            href="/whats-new"
            className="inline-block px-8 py-3 bg-white text-[#e68531] font-bold rounded-lg hover:bg-gray-100 transition-colors mr-4"
          >
            View All Posts
          </Link>
          <Link
            href="/artist-spotlight"
            className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#e68531] transition-colors"
          >
            Artist Spotlights
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ArtistSpotlightPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [artist, setArtist] = useState<ArtistSpotlight | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize state hooks early - before any conditional returns
  const [activeTab, setActiveTab] = useState("work");
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedWork: {
      image: "",
      title: "",
      type: "image" as "image" | "audio",
      description: ""
    }
  });

  const handleWorkSelect = (work: Work) => {
    setModalState({
      isOpen: true,
      selectedWork: {
        ...work,
        type: work.type as "image" | "audio"
      }
    });
  };

  // Memoize tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    if (!artist) return null;
    
    switch (activeTab) {
      case "work":
        // Transform ShowcaseItem[] to Work[] for compatibility
        const transformedWorks: Work[] = artist.showcase.map(item => ({
          image: urlFor(item.image).url(),
          title: item.title,
          type: item.type,
          description: item.description,
          audioUrl: item.audioUrl
        }));
        return <WorkGrid works={transformedWorks} onWorkSelect={handleWorkSelect} />;
      case "exhibitions":
        return <ExhibitionsTimeline exhibitions={artist.exhibitions} />;
      case "about":
        return (
          <div>
            <p className="text-lg mb-6">{artist.bio}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={artist.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#e68531] text-white rounded-md hover:bg-[#e68531]/80 transition-colors"
              >
                Dxd Interview
              </a>
              {artist.socialLinks && Object.entries(artist.socialLinks).map(([platform, handle]) => (
                <a
                  key={platform}
                  href={`https://www.instagram.com/${handle}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}: {handle}
                </a>
              ))}
            </div>
          </div>
        );
      case "interview":
        return <InterviewSection interview={artist.interview || null} />;
      default:
        return null;
    }
  }, [activeTab, artist]);

  // Fetch blog post if no artist found
  useEffect(() => {
    async function fetchBlogPost() {
      if (!artist) {
        try {
          const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug });
          setBlogPost(post);
        } catch (error) {
          console.error('Error fetching blog post:', error);
          setBlogPost(null);
        }
      }
      setLoading(false);
    }

    fetchBlogPost();
  }, [artist, slug]);

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

  // If blog post found, render blog post content
  if (blogPost) {
    return <BlogPostContent blogPost={blogPost} />;
  }

  // If neither artist nor blog post found, show 404
  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <WorkModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        work={modalState.selectedWork}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">Artist Spotlight: </span>
            <span className="text-[#e68531]">{artist?.name}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Celebrating extraordinary creative minds who are pushing boundaries and
            redefining artistic expression through their unique vision and craft.
          </p>
        </div>

        {/* Featured Artist Showcase */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 inline-block border-b-4 border-[#e68531] pb-2">
            Featured Artist
          </h2>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Artist Hero Section */}
                <div className="relative h-96 w-full">
                  <Image
                    src={
                      artist?.wideImage ? urlFor(artist.wideImage).url() :
                      artist?.showcase?.[0]?.image ? urlFor(artist.showcase[0].image).url() :
                      ""
                    }
                    alt={artist?.name + "'s work" || "Artist work"}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h2 className="text-3xl font-bold text-white mb-2">{artist?.name}</h2>
                      <p className="text-gray-200">{artist?.medium}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {["work", "about", "interview", "exhibitions"].map((tab) => (
                      <button
                        key={tab}
                        className={`py-4 px-6 text-center font-medium transition-colors flex-shrink-0 ${activeTab === tab
                          ? "border-b-2 border-[#e68531] text-[#e68531]"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <Suspense fallback={<div>Loading...</div>}>
                    {tabContent}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#e68531]/90 to-[#e68531]/70 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Would you like to be featured?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Apply to be featured in our Artist Spotlight Series and showcase your work to our creative community.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-[#e68531] font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

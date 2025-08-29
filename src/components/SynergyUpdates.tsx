"use client"
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';
import { blogPostsWithLimitQuery } from '../sanity/lib/queries';
import { BlogPostPreview } from '../types/sanity';
import { featuredArtists } from '../constants/featuredArtistesData';

export default function SynergyUpdates({ limit = 8 }: { limit?: number }) {
  const [updates, setUpdates] = useState<BlogPostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const data = await client.fetch<BlogPostPreview[]>(
          blogPostsWithLimitQuery,
          { limit },
          {
            next: {
              revalidate: 60 // Revalidate every minute
            }
          }
        );
        setUpdates(data);
      } catch (error) {
        console.error('Error fetching updates:', error);
        // Fallback to empty array if Sanity fails
        setUpdates([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUpdates();
  }, [limit]);

  if (loading) {
    return (
      <div className="mt-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-4 h-4 bg-[#e68531] rounded-sm inline-block" />
          <h2 className="text-3xl font-bold">WHAT&apos;S NEW</h2>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-0 h-64 animate-pulse">
                <div className="w-full h-40 bg-gray-700 rounded-t-xl"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-4 h-4 bg-[#e68531] rounded-sm inline-block" />
        <h2 className="text-3xl font-bold">WHAT&apos;S NEW</h2>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {updates.map((update) => {
            // All updates go to whats-new since we're fetching blog posts
            let link = `/whats-new/${update.slug.current}`;
            
            // Use the main image from the blog post
            let imageUrl = update.mainImage ? urlFor(update.mainImage).width(600).fit('max').auto('format').url() : null;

            return (
              <Link
                key={update._id}
                href={link}
                className="group block bg-white/10 rounded-xl p-0 h-full transition-all duration-300 hover:bg-[#e68531]/10 border border-transparent hover:border-[#e68531] shadow-sm hover:shadow-lg overflow-hidden"
              >
                {imageUrl && (
                  <div className="w-full h-40 bg-gray-800 relative">
                    <Image 
                      src={imageUrl} 
                      alt={update.title} 
                      fill
                      className="object-cover" 
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-semibold text-[#e68531]">{update.author}</span>
                    <span>•</span>
                    <span>{new Date(update.publishedAt).toLocaleDateString()}</span>
                    {update.mood && (
                      <>
                        <span>•</span>
                        <span>{update.mood}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-4 group-hover:text-[#e68531] transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {update.excerpt}
                  </p>
                  <span className="inline-flex items-center text-[#e68531] font-medium group-hover:underline">
                    Read More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        {updates.length >= limit && (
          <div className="flex justify-center mt-8">
            <Link href="/whats-new" className="bg-[#e68531] hover:bg-[#e68531]/90 text-white font-medium rounded-lg px-8 py-2 transition-colors text-lg">View More</Link>
          </div>
        )}
      </div>
    </div>
  );
}
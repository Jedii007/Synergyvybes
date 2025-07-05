"use client"

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, BookOpen, ImageIcon } from "lucide-react";
import Image from "next/image";
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';
import { blogPostsQuery, blogPostsByTypeQuery } from '../sanity/lib/queries';
import { BlogPostPreview } from '../types/sanity';

type ContentType = "essay" | "mixed" | "update" | "spotlight";

export default function BlogPreview() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [blogPosts, setBlogPosts] = useState<BlogPostPreview[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPostPreview[]>([]);
    const [activeFilter, setActiveFilter] = useState<ContentType | 'all'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogPosts() {
            try {
                const data = await client.fetch<BlogPostPreview[]>(
                    blogPostsQuery,
                    {},
                    {
                        next: {
                            revalidate: 60 // Revalidate every minute
                        }
                    }
                );
                setBlogPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setBlogPosts([]);
                setFilteredPosts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogPosts();
    }, []);

    const handleFilter = async (type: ContentType | 'all') => {
        setActiveFilter(type);
        setLoading(true);
        
        try {
            if (type === 'all') {
                setFilteredPosts(blogPosts);
            } else {
                const filtered = await client.fetch<BlogPostPreview[]>(
                    blogPostsByTypeQuery,
                    { contentType: type }
                );
                setFilteredPosts(filtered);
            }
        } catch (error) {
            console.error('Error filtering posts:', error);
            setFilteredPosts(blogPosts.filter(post => type === 'all' || post.contentType === type));
        } finally {
            setLoading(false);
        }
    };

    const getContentIcon = (type: ContentType) => {
        switch (type) {
            case "essay":
                return <BookOpen className="w-4 h-4" />;
            case "mixed":
                return <ImageIcon className="w-4 h-4" />;
            case "update":
                return <BookOpen className="w-4 h-4" />;
            case "spotlight":
                return <ImageIcon className="w-4 h-4" />;
        }
    };

    if (loading && filteredPosts.length === 0) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 mt-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#e68531] to-[#e68531]/80 bg-clip-text text-transparent">
                        Current Musings
                    </h2>
                </div>
                <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse">
                            <div className="p-6 border-b border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-gray-700 rounded"></div>
                                        <div className="h-4 bg-gray-700 rounded w-24"></div>
                                    </div>
                                    <div className="h-4 bg-gray-700 rounded w-16"></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 mt-12">
            {/* Header with Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#e68531] to-[#e68531]/80 bg-clip-text text-transparent">
                    Current Musings
                </h2>
                <div className="flex items-center gap-6 text-sm">
                    <button 
                        onClick={() => handleFilter('all')}
                        className={`flex items-center gap-2 transition-colors ${
                            activeFilter === 'all' 
                                ? 'text-[#e68531]' 
                                : 'text-gray-400 hover:text-[#e68531]'
                        }`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => handleFilter('essay')}
                        className={`flex items-center gap-2 transition-colors ${
                            activeFilter === 'essay' 
                                ? 'text-[#e68531]' 
                                : 'text-gray-400 hover:text-[#e68531]'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Essays
                    </button>
                    <button 
                        onClick={() => handleFilter('mixed')}
                        className={`flex items-center gap-2 transition-colors ${
                            activeFilter === 'mixed' 
                                ? 'text-[#e68531]' 
                                : 'text-gray-400 hover:text-[#e68531]'
                        }`}
                    >
                        <ImageIcon className="w-4 h-4" />
                        Media
                    </button>
                </div>
            </div>

            {/* Blog Entries */}
            <div className="space-y-6">
                {filteredPosts.map((entry) => (
                    <div
                        key={entry._id}
                        className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10"
                    >
                        {/* Entry Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">{entry.mood || '🎧'}</span>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        {getContentIcon(entry.contentType)}
                                        {entry.contentType === "essay" && entry.readTime && (
                                            <span>• {entry.readTime} min read</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400 flex items-center gap-1">
                                        {new Date(entry.publishedAt).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => setExpandedId(expandedId === entry._id ? null : entry._id)}
                                        className="text-[#e68531] hover:text-[#e68531]/80 transition-colors"
                                    >
                                        {expandedId === entry._id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Entry Content */}
                        <div className="p-6">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {entry.title}
                                </h3>
                                <p className="text-gray-200 text-lg leading-relaxed">
                                    {entry.excerpt}
                                </p>

                                {entry.contentType === "mixed" && entry.mainImage && (
                                    <div className="relative aspect-video rounded-xl overflow-hidden">
                                        <Image
                                            src={urlFor(entry.mainImage).width(800).height(450).url()}
                                            alt={entry.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {entry.youtubeUrl && (
                                    <div className="mt-4">
                                        <a 
                                            href={entry.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[#e68531] hover:text-[#e68531]/80 transition-colors"
                                        >
                                            <span>Watch on YouTube</span>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                        </a>
                                    </div>
                                )}

                                {entry.tags && entry.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {entry.tags.map((tag, index) => (
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
                        </div>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No posts found for the selected filter.</p>
                </div>
            )}
        </div>
    );
}
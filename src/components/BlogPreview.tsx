"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, ImageIcon } from "lucide-react";
import Image from "next/image";

type ContentType = "essay" | "mixed";

type BlogEntry = {
    id: string;
    type: ContentType;
    preview: string;
    fullText: string;
    timestamp: string;
    mood: "🎧" | "🤔" | "🔥";
    mediaUrl?: string;
    readTime?: string;
};

const mockBlogData: BlogEntry[] = [
    {
        id: "1",
        type: "essay",
        preview: "The Evolution of Sound: A Journey Through Creative Process...",
        fullText: "The creative process is a fascinating journey that often begins with a single idea...",
        timestamp: "8h ago",
        mood: "🤔",
        readTime: "5 min read"
    },
    {
        id: "2",
        type: "mixed",
        preview: "Behind the scenes of our latest music video shoot...",
        fullText: "Behind the scenes of our latest music video shoot. The energy on set was incredible...",
        timestamp: "1d ago",
        mood: "🎧",
        mediaUrl: "/4y2k.jpg"
    }
];

const getContentIcon = (type: ContentType) => {
    switch (type) {
        case "essay":
            return <BookOpen className="w-4 h-4" />;
        case "mixed":
            return <ImageIcon className="w-4 h-4" />;
    }
};

export default function BlogPreview() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="max-w-4xl mx-auto space-y-8 mt-12">
            {/* Header with Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#e68531] to-[#e68531]/80 bg-clip-text text-transparent">
                    Current Musings
                </h2>
                <div className="flex items-center gap-6 text-sm">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-[#e68531] transition-colors">
                        <BookOpen className="w-4 h-4" />
                        Essays
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-[#e68531] transition-colors">
                        <ImageIcon className="w-4 h-4" />
                        Media
                    </button>
                </div>
            </div>

            {/* Blog Entries */}
            <div className="space-y-6">
                {mockBlogData.map((entry) => (
                    <div
                        key={entry.id}
                        className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10"
                    >
                        {/* Entry Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">{entry.mood}</span>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        {getContentIcon(entry.type)}
                                        {entry.type === "essay" && entry.readTime && (
                                            <span>• {entry.readTime}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400 flex items-center gap-1">
                                        {entry.timestamp}
                                    </span>
                                    <button
                                        onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                                        className="text-[#e68531] hover:text-[#e68531]/80 transition-colors"
                                    >
                                        {expandedId === entry.id ? (
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
                                <p className="text-gray-200 text-lg leading-relaxed">
                                    {expandedId === entry.id ? entry.fullText : entry.preview}
                                </p>

                                {entry.type === "mixed" && entry.mediaUrl && (
                                    <div className="relative aspect-video rounded-xl overflow-hidden">
                                        <Image
                                            src={entry.mediaUrl}
                                            alt="Media content"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
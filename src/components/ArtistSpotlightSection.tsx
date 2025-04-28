"use client"
import { featuredArtists } from "@/constants/featuredArtistesData";
import ArtistSpotlightCard from "./ArtistSpotlightCard";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function ArtistSpotlightSection() {
  // Get only featured artists
  const artists = featuredArtists.filter(artist => artist.featured);
  
  return (
    <div className="my-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#e68531]" />
          <h2 className="text-2xl font-bold">Artist Spotlight</h2>
        </div>
        <Link 
          href="/artist-spotlight" 
          className="text-sm text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {artists.map(artist => (
          <ArtistSpotlightCard 
            key={artist.id} 
            artist={artist} 
            orientation="vertical"
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/artist-spotlight"
          className="inline-block px-6 py-3 bg-[#e68531]/10 hover:bg-[#e68531]/20 text-[#e68531] rounded-lg transition-colors"
        >
          Explore Artist Spotlight Series
        </Link>
      </div>
    </div>
  );
}

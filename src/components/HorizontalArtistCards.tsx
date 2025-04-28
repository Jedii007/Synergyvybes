"use client"
import { featuredArtists } from "@/constants/featuredArtistesData";
import ArtistSpotlightCard from "./ArtistSpotlightCard";
import Link from "next/link";

export default function HorizontalArtistCards() {
  // Get all artists (both featured and non-featured)
  const artists = featuredArtists.slice(0, 3); // Limit to 3 artists
  
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold mb-4">Featured Artists</h3>
      
      <div className="space-y-3">
        {artists.map(artist => (
          <ArtistSpotlightCard 
            key={artist.id} 
            artist={artist} 
            orientation="horizontal"
          />
        ))}
      </div>
      
      <div className="mt-4">
        <Link 
          href="/artist-spotlight"
          className="text-sm text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center"
        >
          See all artists
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

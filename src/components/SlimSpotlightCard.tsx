/* eslint-disable react/no-unescaped-entities */
"use client"
import Image from "next/image";
import Link from "next/link";
import { featuredArtists } from "@/constants/featuredArtistesData";
import { Sparkles } from "lucide-react";

// Feature flag to easily enable/disable the spotlight feature
const ENABLE_SPOTLIGHT = false;

export default function SlimSpotlightCard() {
  // Get the first featured artist
  const artist = featuredArtists.find(artist => artist.featured) || featuredArtists[0];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden h-[90vh] spotlight-card flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#e68531]" />
          <h3 className="font-bold text-lg uppercase tracking-wider">Spotlight</h3>
        </div>
      </div>

      {ENABLE_SPOTLIGHT ? (
        <Link href={`/artist-spotlight/${artist.slug}`} className="block group flex-grow relative">
          <div className="relative h-full w-full">
            <Image
              src={artist.spotlightImage || artist.image}
              alt={artist.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h4 className="font-bold text-white text-2xl md:text-3xl group-hover:text-[#e68531] transition-colors mb-2">
                {artist.name}
              </h4>
              <p className="text-[#e68531] text-sm md:text-lg">{artist.medium}</p>
              <p className="text-white/90 text-sm mt-4 line-clamp-3 md:line-clamp-4">
                {artist.bio.substring(0, 150)}...
              </p>

              <div className="mt-6 text-xs text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center">
                View {artist.name}'s Spotlight
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="block group flex-grow relative">
          <div className="relative h-full w-full">
            <Image
              src={artist.spotlightImage || artist.image}
              alt={artist.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />

            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
              <h4 className="font-bold text-white text-2xl md:text-3xl mb-4">
                Coming Soon
              </h4>
              <p className="text-[#e68531] text-sm md:text-lg">Artist Spotlight Series</p>
              <p className="text-white/90 text-sm mt-4 max-w-md">
                We're working on something special. Stay tuned for our upcoming artist spotlight series!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

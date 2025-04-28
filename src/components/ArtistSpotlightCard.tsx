"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ArtistSpotlightCardProps {
  artist: {
    id: number;
    name: string;
    medium: string;
    image: string;
    spotlightImage?: string;
    portfolioLink?: string;
    slug: string;
  };
  orientation?: "horizontal" | "vertical";
}

export default function ArtistSpotlightCard({
  artist,
  orientation = "vertical"
}: ArtistSpotlightCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Link to the artist's spotlight page using their slug
  const linkHref = `/artist-spotlight/${artist.slug}`;

  return (
    <Link href={linkHref}>
      <div
        className={`group overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 ${
          orientation === "horizontal"
            ? "flex items-center"
            : "flex flex-col"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div
          className={`relative overflow-hidden ${
            orientation === "horizontal"
              ? "h-24 w-24 flex-shrink-0"
              : "aspect-square w-full"
          }`}
        >
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div
          className={`flex flex-col ${
            orientation === "horizontal"
              ? "p-3"
              : "p-4"
          }`}
        >
          <h3 className="font-bold text-white group-hover:text-[#e68531] transition-colors duration-300">
            {artist.name}
          </h3>
          <p className="text-sm text-gray-300">
            {artist.medium}
          </p>

          <div className="mt-2 text-xs text-[#e68531] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
            <span>View Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

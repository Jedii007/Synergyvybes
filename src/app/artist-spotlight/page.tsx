"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { featuredArtists } from "@/constants/featuredArtistesData";

export default function ArtistSpotlightRedirect() {
  const router = useRouter();

  // Find the featured artist
  const featuredArtist = featuredArtists.find(artist => artist.featured) || featuredArtists[0];

  useEffect(() => {
    // Redirect to the featured artist's page
    router.push(`/artist-spotlight/${featuredArtist.slug}`);
  }, [router, featuredArtist.slug]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-[#e68531] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold">Loading Artist Spotlight...</h2>
      </div>
    </div>
  );
}

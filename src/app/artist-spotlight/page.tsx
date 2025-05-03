"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { featuredArtists } from "@/constants/featuredArtistesData";

// Feature flag to easily enable/disable the spotlight feature
const ENABLE_SPOTLIGHT = true;

export default function ArtistSpotlightRedirect() {
  const router = useRouter();
  const featuredArtist = featuredArtists.find(artist => artist.featured) || featuredArtists[0];

  useEffect(() => {
    if (ENABLE_SPOTLIGHT) {
      router.push(`/artist-spotlight/${featuredArtist.slug}`);
    }
  }, [router, featuredArtist.slug]);

  if (!ENABLE_SPOTLIGHT) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-6">Coming Soon</h1>
          <p className="text-xl mb-8">
            We&apos;re working on something special. Stay tuned for our upcoming artist spotlight series!
          </p>
          <div className="inline-block w-16 h-16 border-4 border-[#e68531] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-[#e68531] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold">Loading Artist Spotlight...</h2>
      </div>
    </div>
  );
}

/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import ImageSlider from "@/components/ImageSlider";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Instagram,
  Twitter,
  Youtube,
  Link2,
} from "lucide-react";

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export default function ChinaemePage() {
  const [showFullBio, setShowFullBio] = useState(false);
  const [email, setEmail] = useState("");

  const images: { src: string; alt: string; status?: "out-now" | "coming-soon" }[] = [
    {
      src: "/chinaeme/chincover.png",
      alt: "Chinaeme - Image 1",
      status: "coming-soon"
    },
    // {
    //   src: "/chinaeme/chinaeme-2.jpg",
    //   alt: "Chinaeme - Image 2",
    //   status: "coming-soon"
    // }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="min-h-screen p-4 sm:p-20 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Show chincover.png on small/medium, chincoverr.png on large screens */}
        <div className="block lg:hidden">
          <ImageSlider images={[{ src: "/chinaeme/chincover.png", alt: "Chinaeme Cover" }]} />
        </div>
        <div className="hidden lg:block">
          <ImageSlider images={[{ src: "/chinaeme/chincoverr.png", alt: "Chinaeme Cover Large" }]} />
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-4xl font-bold">Chinaeme</h1>
            <div className="flex flex-col items-end">
              <span className="text-[#e68531] text-lg font-medium">
                Lo-Fi Artist • Songwriter
              </span>
              <span className="text-gray-600 dark:text-gray-400">Gambian-Nigerian</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/theboythatoverthinks/" className="text-white hover:text-[#e68531] transition-colors" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.tiktok.com/@theboythatoverthinks?lang=en" className="text-white hover:text-[#e68531] transition-colors" aria-label="TikTok">
              <TikTokIcon className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/@Chinaeme/videos" className="text-white hover:text-[#e68531] transition-colors" aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="https://linktr.ee/Synergyvybes" className="text-white hover:text-[#e68531] transition-colors" aria-label="Linktree">
              <Link2 className="w-6 h-6" />
            </a>
          </div>

          {/* Artist Summary Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-32 md:h-32 rounded-xl md:rounded-full overflow-hidden border-2 border-[#e68531]/20">
                  <Image
                    src="/chinaeme/IMG_2453.jpeg"
                    alt="Chinaeme"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">About Chinaeme</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      We've added a new name to the Synergy family; Chinaeme, a young Gambian-Nigerian artist with a calm, lo-fi style and a strong lyrical presence. Bro's got the hunger and potential, and while there's still room for growth, we see something real in him.
                    </p>
                    <div
                      className={`relative transition-all duration-500 ${showFullBio ? 'max-h-[60vh] overflow-y-auto' : 'max-h-0 overflow-hidden'}`}
                    >
                      <div className="space-y-4">
                        <p className="text-gray-300 leading-relaxed">
                          As part of Synergy, he won't be moving alone. We'll be coaching him closely, helping him develop his sound and find his voice in the best way possible. His journey is just starting, but the foundation is solid.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          With his unique blend of lo-fi aesthetics and meaningful lyrics, Chinaeme brings a fresh perspective to the collective. Watch this space as he continues to evolve and establish his presence in the music scene.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          His upcoming track "Trance" is expected to showcase his evolving sound and artistic vision, offering listeners a glimpse into his creative journey as he develops his unique voice in the music industry.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center gap-2 group"
                    >
                      {showFullBio ? (
                        <>
                          Show Less
                          <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                        </>
                      ) : (
                        <>
                          See More
                          <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[#e68531] text-sm font-medium mb-1">
                      Genres
                    </div>
                    <div className="text-sm">Lo-Fi, Alternative R&B</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[#e68531] text-sm font-medium mb-1">
                      Status
                    </div>
                    <div className="text-sm">Just Starting</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[#e68531] text-sm font-medium mb-1">
                      Upcoming
                    </div>
                    <div className="text-sm">Trance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xl italic font-light text-[#e68531] ">
            <p>Observe the space...</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 relative">
            {/* Fixed separator line in the middle */}
            <div className="hidden lg:block w-px bg-white/10 absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 h-64" />

            {/* Journey Status Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Journey Status</h2>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#e68531] rounded-full"></div>
                    <span className="text-gray-300 font-medium">Just Starting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#e68531] rounded-full"></div>
                    <span className="text-gray-300 font-medium">Under Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-500">Upcoming Releases</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-500">Established Presence</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  We're coaching him closely, helping him develop his sound and find his voice in the best way possible.
                </p>
              </div>
            </div>

            {/* Upcoming Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Coming Soon</h2>
              </div>
              <div className="bg-gradient-to-r from-[#e68531]/20 to-[#e68531]/10 backdrop-blur-sm rounded-xl p-6 border border-[#e68531]/30">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {/* <div className="w-12 h-12 bg-[#e68531] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div> */}
                    <div>
                      <h3 className="text-xl font-semibold text-white">Trance</h3>
                      <p className="text-gray-300">Upcoming Single</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    "Trance" would be released shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-center">Follow the Journey</h2>
            <p className="text-gray-300 text-center">
              Stay connected as Chinaeme develops his unique sound and finds his voice in the music industry.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e68531]/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#e68531] hover:bg-[#e68531]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
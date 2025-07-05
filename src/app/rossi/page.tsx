/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { getLatestTracks } from "@/services/appleMusic";
import ImageSlider from "@/components/ImageSlider";
import BlogPreview from "@/components/BlogPreview";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Mail,
  Link2,
} from "lucide-react";
import LyricsSection from "@/components/LyricsSection";
import { songLyricsRossi } from "@/constants/lyricsData";

type Song = {
  name: string;
  artworkUrl: string;
  previewUrl: string;
};

// Add type declaration for Instagram embed
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

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

export default function RossiPage() {
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showFullBio, setShowFullBio] = useState(false);
  const [email, setEmail] = useState("");
  const [instagramLoaded, setInstagramLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mock upcoming tracks
  const upcomingTracks = [
    {
      name: "YX4L",
      image: "/rossi/yxcov.jpeg",
    },
    {
      name: "Coming-Soon",
      image: "",
    },
    {
      name: "Coming-Soon",
      image: "",
    },
  ];

  useEffect(() => {
    async function loadData() {
      const songsData = await getLatestTracks("1703621903");
      setSongs(songsData);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          const progress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(progress);
        }
      });

      audioRef.current.addEventListener("ended", () => {
        setPlayingTrack(null);
        setProgress(0);
      });
    }
  }, []);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      // Initialize Instagram embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        setInstagramLoaded(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Re-initialize Instagram embeds when the component updates
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  });

  const displayedSongs = showAllTracks ? songs : songs.slice(0, 3);

  const images: { src: string; alt: string; status?: "out-now" | "coming-soon" }[] = [
    {
      src: "/rossi/yx.jpeg",
      alt: "Rossi - Image 2",
      status: "out-now"
    },
    {
      src: "/rossi/rosss.jpeg",
      alt: "Rossi - YX4L",
      status: "out-now"
    }
  ];

  const handlePlay = (previewUrl: string) => {
    if (playingTrack === previewUrl) {
      setPlayingTrack(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setPlayingTrack(previewUrl);
      if (audioRef.current) {
        audioRef.current.src = previewUrl;
        audioRef.current.play();
      }
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="min-h-screen p-4 sm:p-20 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <audio ref={audioRef} className="hidden" controls />
        <ImageSlider images={images} />
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-4xl font-bold">Rossi Sbw</h1>
            <div className="flex flex-col items-end">
              <span className="text-[#e68531] text-lg font-medium">
                Artiste • Model
              </span>
              <span className="text-gray-600 dark:text-gray-400">Nigeria</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/r0ssi.sbw/"
              className="text-white hover:text-[#e68531] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@sadboyrossi"
              className="text-white hover:text-[#e68531] transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-6 h-6" />
            </a>
            {/* <a
              href="#"
              className="text-white hover:text-[#e68531] transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a> */}
            <a
              href="https://music.youtube.com/channel/UCHB4XI72i_zoiZZq3AsYc6A?si=7wnOvF3-rrBIjZ5Q"
              className="text-white hover:text-[#e68531] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://linktr.ee/Synergyvybes"
              className="text-white hover:text-[#e68531] transition-colors"
              aria-label="Linktree"
            >
              <Link2 className="w-6 h-6" />
            </a>
            {/* <a
              href="#"
              className="text-white hover:text-[#e68531] transition-colors"
            >
              <Globe className="w-6 h-6" />
            </a> */}
          </div>

          {/* Artist Summary Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-32 md:h-32 rounded-xl md:rounded-full overflow-hidden border-2 border-[#e68531]/20">
                  <Image
                    src="/rossi/rosii.jpg"
                    alt="Rossi"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">About Rossi</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      A rising star in the Nigerian music scene, Rossi Sbw
                      delivers a captivating blend of Afrobeats, Hip-hop and
                      R&B, creating music that resonates with listeners across
                      the African continent and beyond through his distinctive
                      voice and authentic storytelling.
                    </p>
                    <div
                      className={`relative transition-all duration-500 ${showFullBio ? "max-h-[60vh] overflow-y-auto" : "max-h-0 overflow-hidden"}`}
                    >
                      <div className="space-y-4">
                        <p className="text-gray-300 leading-relaxed">
                          Born and raised in Lagos, Nigeria, Victor Chima
                          Okoroafor (Rossi) hails from the southeastern part of
                          Nigeria in Abia State. As the first of four children
                          and an undergraduate of Biomedicine at Cyprus
                          International University, his journey is unique.
                          Although a student of science, he always found himself
                          in the crosshairs of art, undertaking literature and
                          the spoken word.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          His love for poetry and sound created an interest in
                          the production of melodies and sonic pleasure. Through
                          the years, he has taken time to practice and work on
                          his craftsmanship—not just to perfect it, but to
                          understand what his identity and focus should be in
                          the pursuit of art and sound.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          Rossi's music is a reflection of his diverse
                          influences and experiences, blending traditional
                          Nigerian sounds with contemporary global music trends.
                          His ability to seamlessly merge different genres while
                          maintaining his unique voice has earned him
                          recognition in the industry and a growing fanbase.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <h3 className="text-[#e68531] font-medium mb-2">
                              Creative Evolution
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                              <li>2022: Recorded "2:16"</li>
                              <li>2023: Joined Synergyvybes</li>
                              <li>
                                2023: Released first official single "2:16"
                                under Synergyvybes
                              </li>
                              <li>2024: Released debut album "Afro-5k"</li>
                            </ul>
                          </div>

                          <div className="bg-white/5 rounded-lg p-4">
                            <h3 className="text-[#e68531] font-medium mb-2">
                              Artist DNA
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                              <li>Nigerian Cultural Heritage</li>
                              <li>Contemporary Afrobeats</li>
                              <li>Hip-hop Influences</li>
                              <li>R&B Sensibilities</li>
                              <li>Poetic Lyricism</li>
                              <li>Scientific Precision</li>
                              <li>Global Music Perspective</li>
                            </ul>
                          </div>
                        </div>
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
                    <div className="text-sm">Alternative Music</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[#e68531] text-sm font-medium mb-1">
                      Active Since
                    </div>
                    <div className="text-sm">2018</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[#e68531] text-sm font-medium mb-1">
                      Latest Release
                    </div>
                    <div className="text-sm">YX4L</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xl italic font-light text-[#e68531] ">
            <p>Combination!!!</p>
          </div>

          {/* Main Content Grid - tracks side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 relative">
            {/* Fixed separator line in the middle */}
            <div className="hidden lg:block w-px bg-white/10 absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 h-64" />

            {/* Latest Tracks Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Latest Tracks</h2>
                {songs.length > 3 && (
                  <button
                    onClick={() => setShowAllTracks(!showAllTracks)}
                    className="text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center gap-2"
                  >
                    {showAllTracks ? (
                      <>
                        Show Less
                        <ChevronUp className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        See More
                        <ChevronDown className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {loading
                  ? // Loading skeleton
                    [...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 animate-pulse"
                      >
                        <div className="aspect-square bg-white/10 rounded-lg mb-3" />
                        <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-white/10 rounded w-1/2" />
                      </div>
                    ))
                  : displayedSongs.map((song, index) => (
                      <div
                        key={index}
                        className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                          <Image
                            src={song.artworkUrl}
                            alt={song.name}
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => handlePlay(song.previewUrl)}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {playingTrack === song.previewUrl ? (
                              <Pause className="w-12 h-12 text-[#e68531]" />
                            ) : (
                              <Play className="w-12 h-12 text-white" />
                            )}
                          </button>
                          {playingTrack === song.previewUrl && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                              <div
                                className="h-full bg-[#e68531] transition-all duration-100"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium text-lg truncate">
                          {song.name}
                        </h3>
                      </div>
                    ))}
              </div>
            </div>

            {/* Upcoming Tracks Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Upcoming Tracks</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingTracks.map((song, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    {song.image ? (
                      <>
                        <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                          <Image
                            src={song.image}
                            alt={song.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-medium text-lg truncate">
                          {song.name}
                        </h3>
                      </>
                    ) : (
                      <div className="aspect-square flex items-center justify-center rounded-lg bg-white/10">
                        <h3 className="font-medium text-lg text-center px-2">
                          {song.name}
                        </h3>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Newsletter CTA that appears when Show More is triggered */}
              <div
                className={`mt-8 transition-all duration-500 ${showAllTracks ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}`}
              >
                <div className="bg-gradient-to-r from-[#e68531]/20 to-[#e68531]/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <Mail className="w-12 h-12 text-[#e68531]" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold">Stay Updated</h3>
                      <p className="text-gray-300">
                        Subscribe to our newsletter for exclusive content, early
                        access to new releases, and behind-the-scenes updates.
                      </p>
                      <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col sm:flex-row gap-3 mt-4"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e68531]/50"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-[#e68531] hover:bg-[#e68531]/80 text-white font-medium rounded-lg px-6 py-2 transition-colors"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal separator line */}
          <div className="w-full h-px bg-white/10 my-12" />

          {/* Instagram Posts Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Instagram Feed</h2>
              <a
                href="https://www.instagram.com/rossi.mp3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow on Instagram</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 [&_.instagram-media]:!bg-transparent [&_.instagram-media]:!shadow-none [&_.instagram-media]:!border-none [&_.instagram-media]:!p-0 [&_.instagram-media]:!w-full [&_.instagram-media]:!max-w-none">
              {!instagramLoaded ? (
                // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-white/5 rounded-xl animate-pulse"
                  />
                ))
              ) : (
                <>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/DKAYFk2KIzX/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="12"
                  ></blockquote>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/DHJm5ZLuydI/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="12"
                  ></blockquote>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/DKfPmSPqC51/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="12"
                  ></blockquote>
                  {/* DJ7OFsOqgLh */}
                </>
              )}
            </div>
          </div>

          {/* Lyrics Section - Kept at the bottom */}
          <LyricsSection songs={songLyricsRossi} />
        </div>
      </div>
    </div>
  );
}

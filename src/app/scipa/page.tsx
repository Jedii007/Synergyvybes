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
  Mail,
  Link2,
} from "lucide-react";
import LyricsSection from "@/components/LyricsSection";
import { songLyricsScipa } from "@/constants/lyricsData";

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

type Song = {
  name: string;
  artworkUrl: string;
  previewUrl: string;
};

export default function SkippyPage() {
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showFullBio, setShowFullBio] = useState(false);
  const [email, setEmail] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [instagramLoaded, setInstagramLoaded] = useState(false);

  // Mock upcoming tracks
  const upcomingTracks = [
    {
      name: "E SHARP!",
      image: "/scipa/sharp.jpeg",
    },
    {
      name: "Coming-Soon",
      image: "",
    },
    {
      name: "Coming-Soon",
      image: "",
    }
    // Additional upcoming tracks can be added here
  ];

  useEffect(() => {
    async function loadData() {
      const songsData = await getLatestTracks("1573791914");
      setSongs(songsData);
      setLoading(false);
    }
    loadData();
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

  const displayedSongs = showAllTracks ? songs : songs.slice(0, 3);

  const images: {
    src: string;
    alt: string;
    status?: "out-now" | "coming-soon";
  }[] = [
      // {
      //   src: "/scipa/sharp.jpeg",
      //   alt: "Skippy on Fir3 - Creative Journey Image 1",
      //   status: "coming-soon",
      // },
      // {
      //   src: "/scipa/ryse.jpeg",
      //   alt: "Skippy on Fir3 - RYSE",
      //   status: "out-now",
      // },
      {
        src: "/scipa/rye.jpg",
        alt: "Skippy on Fir3 - Live Performance",
        status: "out-now",
      },
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
      <audio ref={audioRef} className="hidden" controls />
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <ImageSlider images={images} />
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-4xl font-bold">Skippy on Fir3</h1>
            <div className="flex flex-col items-end">
              <span className="text-[#e68531] text-lg font-medium">
                Artist • Model
              </span>
              <span className="text-gray-600 dark:text-gray-400">
              Gambia &amp; Sierra Leone
              </span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.youtube.com/@skippyonfir3"
              className="text-white hover:text-[#e68531] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            {/* <a
              href="https://x.com/skippyonfir3"
              className="text-white hover:text-[#e68531] transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a> */}
            <a
              href="https://www.youtube.com/@skippyonfir3/"
              className="text-white hover:text-[#e68531] transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://fanlink.tv/skippy_on_fir3/"
              className="text-white hover:text-[#e68531] transition-colors"
            >
              <Link2 className="w-6 h-6" />
            </a>
          </div>

          {/* Artist Summary Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-32 md:h-32 rounded-xl md:rounded-full overflow-hidden border-2 border-[#e68531]/20">
                  <Image
                    src="/scipa/IMG_2142.jpg"
                    alt="Skippy on Fir3"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    About Skippy on Fir3
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      Skippy on Fir3 is the embodiment of raw passion and
                      artistic evolution—an artist whose music doesn't just
                      play, it ignites. Born and raised in the heart of Banjul,
                      the Gambia, Skippy channels the struggles, triumphs, and
                      everyday poetry of their environment into a sound that's
                      as real as it is revolutionary.
                    </p>
                    <div
                      className={`relative transition-all duration-500 ${showFullBio ? 'max-h-[60vh] overflow-y-auto' : 'max-h-0 overflow-hidden'}`}
                    >
                      <div className="space-y-4">
                        <p className="text-gray-300 leading-relaxed">
                          Blending gritty, streetwise lyricism with
                          soul-stirring melodic flows, their music speaks to the
                          heart of a generation navigating pain, perseverance,
                          and the pursuit of purpose. Inspired by artists like
                          Salif Keita, Youssou N'Dour, Mavado, Lagbaja, and
                          Manzu, Skippy on Fir3 creates a unique sound that
                          resonates across cultural boundaries.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          Skippy on Fir3 blurs the lines between vulnerability
                          and strength, between the grind and the glory. Every
                          verse feels lived-in, every hook a heartbeat. Their
                          breakout single "RYSE" lit up local charts and social
                          platforms, quickly earning them a loyal fanbase drawn
                          to both the fire of their delivery and the depth of
                          their message.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          Whether commanding a stage with electrifying energy or
                          crafting lyrics that hit with emotional precision,
                          Skippy on Fir3 isn't just making music—they're
                          building a movement. And with each performance, each
                          release, they're proving that their flame is only
                          getting stronger.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <h3 className="text-[#e68531] font-medium mb-2">
                              Creative Evolution
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                              <li>2015: First freestyle recordings (Banjul)</li>
                              {/* <li>
                                2017: Formed local artist collective (The
                                Gambia)
                              </li> */}
                              <li>
                                2022: Began experimenting with fusion sounds
                              </li>
                              <li>
                                2023: First EP "RYSE" (International)
                              </li>
                            </ul>
                          </div>

                          <div className="bg-white/5 rounded-lg p-4">
                            <h3 className="text-[#e68531] font-medium mb-2">
                              Sonic DNA
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                              <li>Salif Keita's Vocal Expressions</li>
                              <li>Youssou N'Dour's Cultural Fusion</li>
                              <li>Mavado's Street Poetics</li>
                              <li>Lagbaja's Rhythmic Innovation</li>
                              <li>Manzu's Storytelling Depth</li>
                              <li>West African Traditional Percussion</li>
                              <li>Contemporary Urban Production</li>
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
                    <div className="text-sm">2013</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[#e68531] text-sm font-medium mb-1">
                      Latest Release
                    </div>
                    <div className="text-sm">E SHARP!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xl italic font-light text-[#e68531] ">
                            <p>Afrikan Rebel!!!</p>
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
                className={`mt-8 transition-all duration-500 ${showAllTracks
                  ? "opacity-100 max-h-[500px]"
                  : "opacity-0 max-h-0 overflow-hidden"
                  }`}
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
                href="https://www.instagram.com/skippa.mp3/"
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
                  <div key={index} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
                ))
              ) : (
                <>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/DHHN1NUOgl7/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="12"
                  ></blockquote>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/DJZ5hWNIBPQ/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="12"
                  ></blockquote>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/C3UVZGJIpDh/?utm_source=ig_embed&amp;utm_campaign=loading"
                    data-instgrm-version="12"
                  ></blockquote>
                </>
              )}
            </div>
          </div>

          {/* Lyrics Section - Kept at the bottom */}
          <LyricsSection songs={songLyricsScipa} />
        </div>
      </div>
    </div>
  );
}

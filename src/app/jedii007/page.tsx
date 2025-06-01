/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image";
import { getLatestTracks } from "@/services/appleMusic";
import ImageSlider from "@/components/ImageSlider";
import BlogPreview from "@/components/BlogPreview";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Play, Pause, ChevronDown, ChevronUp, Instagram, Twitter, Youtube, Mail, Link2 } from "lucide-react";
import LyricsSection from "@/components/LyricsSection";
import { songLyrics } from "@/constants/lyricsData";
import dynamic from 'next/dynamic';
import React from "react";

// Lazy load heavy components
const InstagramFeed = dynamic(() => import('@/components/InstagramFeed'), {
    ssr: false,
    loading: () => <InstagramFeedSkeleton />
});

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

// Skeleton component for Instagram feed
const InstagramFeedSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
            <div key={index} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
        ))}
    </div>
);

// Memoized track component
const TrackCard = React.memo(({
    song,
    index,
    playingTrack,
    progress,
    onPlay
}: {
    song: Song;
    index: number;
    playingTrack: string | null;
    progress: number;
    onPlay: (previewUrl: string) => void;
}) => {
    const isPlaying = playingTrack === song.previewUrl;

    const handlePlayClick = useCallback(() => {
        onPlay(song.previewUrl);
    }, [song.previewUrl, onPlay]);

    return (
        <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                <Image
                    src={song.artworkUrl}
                    alt={song.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                    priority={index < 3} // Prioritize first 3 images
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <button
                    onClick={handlePlayClick}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={isPlaying ? `Pause ${song.name}` : `Play ${song.name}`}
                >
                    {isPlaying ? (
                        <Pause className="w-12 h-12 text-[#e68531]" />
                    ) : (
                        <Play className="w-12 h-12 text-white" />
                    )}
                </button>
                {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div
                            className="h-full bg-[#e68531] transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>
            <h3 className="font-medium text-lg truncate">{song.name}</h3>
        </div>
    );
});

TrackCard.displayName = 'TrackCard';

export default function Jedii007Page() {
    const [showAllTracks, setShowAllTracks] = useState(false);
    const [playingTrack, setPlayingTrack] = useState<string | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showFullBio, setShowFullBio] = useState(false);
    const [email, setEmail] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Memoize static data
    const upcomingTracks = useMemo(() => [
        {
            name: "New Comer",
            image: "/jedii/newcomer.jpg",
        },
        {
            name: "Bad Mixes II",
            image: "/jedii/Bad Mixes Cover.jpg",
        },
        {
            name: "Speed-dial",
            image: "",
        }
    ], []);

    const images = useMemo(() => [
        {
            src: "/jedii/4y2kh.jpg",
            alt: "Jedii007",
            status: "out-now" as const
        },
        {
            src: "/jedii/newcomer.jpg",
            alt: "Jedii007 - Creative Journey Image 2",
            status: "out-now" as const
        },
        {
            src: "/jedii/Bad Mixes Cover.jpg",
            alt: "Jedii007 - Creative Journey Image 3",
            status: "out-now" as const
        }
    ], []);

    // Optimize data loading with error handling and retry
    useEffect(() => {
        let mounted = true;
        let retryCount = 0;
        const maxRetries = 3;

        async function loadData() {
            try {
                const songsData = await getLatestTracks("1623914059");
                if (mounted) {
                    setSongs(songsData);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to load tracks:', error);
                if (retryCount < maxRetries && mounted) {
                    retryCount++;
                    setTimeout(loadData, 1000 * retryCount); // Exponential backoff
                } else if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            mounted = false;
        };
    }, []);

    // Optimize audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (audio) {
                const progressValue = (audio.currentTime / audio.duration) * 100;
                setProgress(progressValue);
            }
        };

        const handleEnded = () => {
            setPlayingTrack(null);
            setProgress(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate, { passive: true });
        audio.addEventListener("ended", handleEnded, { passive: true });

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    // Memoize computed values
    const displayedSongs = useMemo(() =>
        showAllTracks ? songs : songs.slice(0, 3),
        [showAllTracks, songs]
    );

    // Memoize callback functions
    const handlePlay = useCallback((previewUrl: string) => {
        if (playingTrack === previewUrl) {
            setPlayingTrack(null);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        } else {
            setPlayingTrack(previewUrl);
            if (audioRef.current) {
                audioRef.current.src = previewUrl;
                audioRef.current.play().catch(console.error);
            }
        }
    }, [playingTrack]);

    const handleSubscribe = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription logic here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail("");
    }, [email]);

    const toggleShowAllTracks = useCallback(() => {
        setShowAllTracks(prev => !prev);
    }, []);

    const toggleShowFullBio = useCallback(() => {
        setShowFullBio(prev => !prev);
    }, []);

    // Loading skeleton component
    const TrackSkeleton = useMemo(() => (
        [...Array(3)].map((_, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 animate-pulse">
                <div className="aspect-square bg-white/10 rounded-lg mb-3" />
                <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
            </div>
        ))
    ), []);

    return (
        <div className="min-h-screen p-4 sm:p-20 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
            <audio ref={audioRef} className="hidden" preload="none" />
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
                <ImageSlider images={images} />
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h1 className="text-4xl font-bold">Jedii007</h1>
                        <div className="flex flex-col items-end">
                            <span className="text-[#e68531] text-lg font-medium">Artiste • Creative Director</span>
                            <span className="text-gray-600 dark:text-gray-400">Gambia &amp; Sierra Leone</span>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4">
                        <a href="https://www.instagram.com/jedii.heic/" className="text-white hover:text-[#e68531] transition-colors" aria-label="Instagram">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="https://x.com/jedii_txt" className="text-white hover:text-[#e68531] transition-colors" aria-label="Twitter">
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a href="https://www.youtube.com/@jedii.mp4/" className="text-white hover:text-[#e68531] transition-colors" aria-label="YouTube">
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
                                        src="/jedii/IMG_1729.jpeg"
                                        alt="Jedii007"
                                        width={192}
                                        height={192}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-y-visible">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">About Jedii007</h2>
                                    <div className="space-y-4">
                                        <p className="text-gray-300 leading-relaxed">
                                            A multifaceted creative force hailing from Gambia and Sierra Leone, Jedii007 fuses West African heritage with contemporary global sounds. From early literary experiments and comic book ventures to exploring acting and eventually pioneering an Afro-fusion/alté sound, his journey is as diverse as it is innovative.
                                        </p>
                                        <div className={`relative transition-all duration-500 ${showFullBio ? 'max-h-[60vh] overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
                                            <div className="space-y-4">
                                                <p className="text-gray-300 leading-relaxed">
                                                    Born Samuel Jordan Edmond Bernard, Jedii007's early ambitions in writing were reshaped by his passion for music. Inspired by legends like Wizkid, Ice Prince, and later influenced by American icons such as Drake and Kendrick Lamar, he crafted a signature style that challenges traditional boundaries.
                                                </p>
                                                <p className="text-gray-300 leading-relaxed">
                                                    A turning point came with the discovery of Show Dem Camp's "Tropicana," which opened the door to the alté scene—introducing him to artists like, Santi, Lady Donli, Tay Iwar, Fasina, and Odunsi. This fusion of sounds birthed an innovative musical identity that is both experimental and deeply rooted in West African culture.
                                                </p>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Jedii now leads Synergy, a rebranded creative collective dedicated to mentoring emerging talents and redefining Afro-fusion.
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                                    <div className="bg-white/5 rounded-lg p-4">
                                                        <h3 className="text-[#e68531] font-medium mb-2">Creative Evolution</h3>
                                                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                                            <li>2014: Formed EPIC Collective (The Gambia)</li>
                                                            <li>2015: First Song (The Gambia)</li>
                                                            <li>2018: Alté and Pop Awakening (The Gambia)</li>
                                                            <li>2019: Forced Self Reflection (Sierra Leone)</li>
                                                            <li>2020: Producer Metamorphosis (Cyprus)</li>
                                                            <li>2021: EPIC rebrand to Synergyvybes (Cyprus)</li>
                                                            <li>2025: Synergyvybes Website Launch (The Gambia)</li>
                                                        </ul>
                                                    </div>

                                                    <div className="bg-white/5 rounded-lg p-4">
                                                        <h3 className="text-[#e68531] font-medium mb-2">Sonic DNA</h3>
                                                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                                            <li>Santi's Alté Rebellion</li>
                                                            <li>Frank Ocean's Vulnerable R&B</li>
                                                            <li>ASAP Rocky's TESTING Era</li>
                                                            <li>Wizkid's Afroswing Foundations</li>
                                                            <li>Tay Iwar's Gemini Sound</li>
                                                            <li>Kendrick Lamar's Storytelling</li>
                                                            <li>Drake's Melodies</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Scroll indicator for mobile */}
                                            <div className="md:hidden sticky bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0c29] to-transparent h-12 flex items-center justify-center">
                                                <div className="animate-bounce text-[#e68531] text-sm flex items-center">
                                                    <ChevronDown className="w-4 h-4" />
                                                    <span>Scroll to read more</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={toggleShowFullBio}
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
                                        <div className="text-[#e68531] text-sm font-medium mb-1">Genres</div>
                                        <div className="text-sm">Alternative Music</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[#e68531] text-sm font-medium mb-1">Active Since</div>
                                        <div className="text-sm">2014</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[#e68531] text-sm font-medium mb-1">Latest Release</div>
                                        <div className="text-sm">New Comer???</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-xl italic font-light text-[#e68531] ">
                        <p>Geng Geng!!!</p>
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
                                        onClick={toggleShowAllTracks}
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
                                {loading ? TrackSkeleton : (
                                    displayedSongs.map((song, index) => (
                                        <TrackCard
                                            key={`${song.name}-${index}`}
                                            song={song}
                                            index={index}
                                            playingTrack={playingTrack}
                                            progress={progress}
                                            onPlay={handlePlay}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Upcoming Tracks Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6">Upcoming Tracks</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {upcomingTracks.map((song, index) => (
                                    <div key={song.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                                        {song.image ? (
                                            <>
                                                <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
                                                    <Image
                                                        src={song.image}
                                                        alt={song.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                                        className="object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <h3 className="font-medium text-lg truncate">{song.name}</h3>
                                            </>
                                        ) : (
                                            <div className="aspect-square flex items-center justify-center rounded-lg bg-white/10">
                                                <h3 className="font-medium text-lg text-center px-2">{song.name}</h3>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Newsletter CTA that appears when Show More is triggered */}
                            <div className={`mt-8 transition-all duration-500 ${showAllTracks ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                <div className="bg-gradient-to-r from-[#e68531]/20 to-[#e68531]/10 backdrop-blur-sm rounded-2xl p-6">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <div className="flex-shrink-0">
                                            <Mail className="w-12 h-12 text-[#e68531]" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-xl font-bold">Stay Updated</h3>
                                            <p className="text-gray-300">Subscribe to our newsletter for exclusive content, early access to new releases, and behind-the-scenes updates.</p>
                                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-4">
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

                    {/* Instagram Posts Section - Lazy loaded */}
                    <InstagramFeed />

                    {/* Lyrics Section - Kept at the bottom */}
                    <LyricsSection songs={songLyrics} />
                </div>
            </div>
        </div>
    );
}
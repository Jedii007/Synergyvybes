/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image";
import { getLatestTracks } from "@/services/appleMusic";
import ImageSlider from "@/components/ImageSlider";
import BlogPreview from "@/components/BlogPreview";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, ChevronDown, ChevronUp, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import LyricsSection from "@/components/LyricsSection";
import { songLyrics } from "@/constants/lyricsData";

type Song = {
    name: string;
    artworkUrl: string;
    previewUrl: string;
};

export default function Jedii007Page() {
    const [showAllTracks, setShowAllTracks] = useState(false);
    const [playingTrack, setPlayingTrack] = useState<string | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showFullBio, setShowFullBio] = useState(false);
    const [email, setEmail] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Mock upcoming tracks
    const upcomingTracks = [
        {
            name: "Bad Mixes II",
            image: "/Badmixescover.png",
        },
        {
            name: "New Comer",
            image: "",
        },
        {
            name: "Speed-dial",
            image: "",
        }
    ];

    useEffect(() => {
        async function loadData() {
            const songsData = await getLatestTracks("1623914059");
            setSongs(songsData);
            setLoading(false);
        }
        loadData();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', () => {
                if (audioRef.current) {
                    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                    setProgress(progress);
                }
            });

            audioRef.current.addEventListener('ended', () => {
                setPlayingTrack(null);
                setProgress(0);
            });
        }
    }, []);

    const displayedSongs = showAllTracks ? songs : songs.slice(0, 3);

    const images = [
      {
        src: "/Badmixescover.png",
        alt: "Jedii007 - Creative Journey Image 3",
      },
      {
        src: "/4y2kh.jpg",
        alt: "Jedii007",
      },
      {
        src: "/up.jpg",
        alt: "Jedii007 - Creative Journey Image 2",
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
        <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
            <audio ref={audioRef} className="hidden" controls />
            <div className="max-w-7xl mx-auto">
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
                        <a href="" className="text-white hover:text-[#e68531] transition-colors">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-white hover:text-[#e68531] transition-colors">
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-white hover:text-[#e68531] transition-colors">
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Artist Summary Section */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-48 h-48 md:w-32 md:h-32 rounded-xl md:rounded-full overflow-hidden border-2 border-[#e68531]/20">
                                    <Image
                                        src="/IMG_1729.png"
                                        alt="Jedii007"
                                        width={192}
                                        height={192}
                                        className="object-cover rotate-[94deg] w-full h-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">About Jedii007</h2>
                                    <div className="space-y-4">
                                        <p className="text-gray-300 leading-relaxed">
                                            A multifaceted creative force hailing from Gambia and Sierra Leone, Jedii007 fuses West African heritage with contemporary global sounds. From early literary experiments and comic book ventures to exploring acting and eventually pioneering an Afro-fusion/alté sound, his journey is as diverse as it is innovative.
                                        </p>
                                        <div className={`overflow-hidden transition-all duration-500 ${showFullBio ? 'max-h-[500px]' : 'max-h-0'}`}>
                                            <div className="space-y-4">
                                                <p className="text-gray-300 leading-relaxed">
                                                    Born Samuel Jordan Edmond Bernard, Jedii007's early ambitions in writing were reshaped by his passion for music. Inspired by legends like Wizkid, Ice Prince, and later influenced by American icons such as Drake and Kendrick Lamar, he crafted a signature style that challenges traditional boundaries.
                                                </p>
                                                <p className="text-gray-300 leading-relaxed">
                                                    A turning point came with the discovery of Santi's "Sparky," which opened the door to the alté scene—introducing him to artists like Lady Donli, Tay Iwar, Fasina, and Odunsi. This fusion of sounds birthed an innovative musical identity that is both experimental and deeply rooted in West African culture.
                                                </p>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Overcoming obstacles—from limited recording spaces in Cyprus to personal challenges—Jedii007's resilience fueled his evolution. He now leads Synergy, a rebranded creative collective dedicated to mentoring emerging talents and redefining Afro-fusion.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                                        <div className="text-[#e68531] text-sm font-medium mb-1">Genres</div>
                                        <div className="text-sm">Alté Everything</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[#e68531] text-sm font-medium mb-1">Active Since</div>
                                        <div className="text-sm">2014</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[#e68531] text-sm font-medium mb-1">Latest Release</div>
                                        <div className="text-sm">4Y2KH FRIDAY</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* A brief statement or lyric */}
                    <div className="prose prose-lg dark:prose-invert">
                        <p>
                            Geng geng
                        </p>
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
                                {loading ? (
                                    // Loading skeleton
                                    [...Array(3)].map((_, index) => (
                                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 animate-pulse">
                                            <div className="aspect-square bg-white/10 rounded-lg mb-3" />
                                            <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
                                            <div className="h-4 bg-white/10 rounded w-1/2" />
                                        </div>
                                    ))
                                ) : (
                                    displayedSongs.map((song, index) => (
                                        <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
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
                                            <h3 className="font-medium text-lg truncate">{song.name}</h3>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Upcoming Tracks Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6">Upcoming Tracks</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {upcomingTracks.map((song, index) => (
                                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
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

                    {/* Lyrics Section - Kept at the bottom */}
                    <LyricsSection songs={songLyrics} />
                </div>
            </div>
        </div>
    );
}
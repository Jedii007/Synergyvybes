"use client"
import { useState } from "react";
import { Song } from "@/types/song";
import { Play, Pause, ChevronDown } from "lucide-react";
import Image from "next/image";

interface SongGridProps {
    songs: Song[];
}

export default function SongGrid({ songs }: SongGridProps) {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [showAll, setShowAll] = useState(false);

    const handlePlay = (song: Song) => {
        if (playingId === song.id) {
            // If the same song is playing, pause it
            audio?.pause();
            setPlayingId(null);
            setAudio(null);
        } else {
            // If a different song is playing, stop it and play the new one
            audio?.pause();
            const newAudio = new Audio(song.previewUrl);
            newAudio.play();
            setPlayingId(song.id);
            setAudio(newAudio);

            // When the song ends, reset the state
            newAudio.onended = () => {
                setPlayingId(null);
                setAudio(null);
            };
        }
    };

    const displayedSongs = showAll ? songs : songs.slice(0, 6);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedSongs.map((song) => (
                    <div
                        key={song.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative aspect-square">
                            <Image
                                src={song.artworkUrl}
                                alt={`${song.name} artwork`}
                                fill
                                className="object-cover"
                            />
                            <button
                                onClick={() => handlePlay(song)}
                                className="absolute bottom-4 right-4 bg-[#e68531] text-white p-3 rounded-full hover:bg-[#e68531]/90 transition-colors duration-300"
                            >
                                {playingId === song.id ? (
                                    <Pause className="h-6 w-6" />
                                ) : (
                                    <Play className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {song.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {song.artist}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {song.albumName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {songs.length > 6 && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#e68531] text-white rounded-full hover:bg-[#e68531]/90 transition-colors duration-300"
                    >
                        {showAll ? (
                            <>
                                Show Less
                                <ChevronDown className="h-5 w-5 rotate-180" />
                            </>
                        ) : (
                            <>
                                See More
                                <ChevronDown className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
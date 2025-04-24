"use client"

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LyricsProps {
  songs: {
    id: number;
    title: string;
    lyrics: string;
  }[];
}

export default function LyricsSection({ songs }: LyricsProps) {
  const [expandedSong, setExpandedSong] = useState<number | null>(null);

  const toggleLyrics = (songId: number) => {
    if (expandedSong === songId) {
      setExpandedSong(null);
    } else {
      setExpandedSong(songId);
    }
  };

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6">Official Lyrics</h2>
      <div className="space-y-4">
        {songs.map((song) => (
          <div 
            key={song.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleLyrics(song.id)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-white/10 transition-colors"
            >
              <span className="font-medium text-lg">{song.title}</span>
              {expandedSong === song.id ? (
                <ChevronUp className="h-5 w-5 text-[#e68531]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#e68531]" />
              )}
            </button>
            <div 
              className={`transition-all duration-500 overflow-hidden ${
                expandedSong === song.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 pt-0 border-t border-white/10 whitespace-pre-line text-gray-300">
                {song.lyrics}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, X } from "lucide-react";

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  work: {
    image: string;
    title: string;
    description: string;
    type: "image" | "audio";
    audioUrl?: string;
  };
}

export default function WorkModal({ isOpen, onClose, work }: WorkModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Stop audio when modal closes
  useEffect(() => {
    if (!isOpen && audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen, isPlaying]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-[70vh]">
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-80 md:h-full">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
            />

            {/* Audio player overlay for music */}
            {work.type === "audio" && work.audioUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center">
                <div className="text-center">
                  <button
                    onClick={toggleAudio}
                    className="bg-[#e68531] text-white p-6 rounded-full hover:bg-[#e68531]/80 transition-all transform hover:scale-105 shadow-lg"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                  </button>

                  {isPlaying && (
                    <div className="mt-4 flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-6 bg-[#e68531] rounded-full animate-pulse"
                          style={{
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: '0.8s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <audio
                  ref={audioRef}
                  src={work.audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-8 md:w-1/2 flex flex-col overflow-y-auto">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{work.title}</h3>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {work.description}
              </p>

              {/* Additional content that could be added in the future */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  About this {work.type === "audio" ? "track" : "artwork"}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {work.type === "audio"
                    ? "This piece represents the artist's unique approach to blending sound and storytelling. The composition reflects both technical skill and emotional depth."
                    : "This piece showcases the artist's distinctive visual style and creative vision. The composition balances technical execution with meaningful expression."
                  }
                </p>
              </div>
            </div>

            {work.type === "audio" && (
              <div className="mt-auto pt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic flex items-center">
                  <span className="inline-block w-3 h-3 bg-[#e68531] rounded-full mr-2 animate-pulse"></span>
                  Click the play button to listen to a 30-second preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

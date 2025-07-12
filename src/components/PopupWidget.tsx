"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Users, Sparkles, X, BookOpen } from "lucide-react";

export function PopupWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={toggleMenu}
        className="fixed z-40 flex items-center justify-center transition duration-300 bg-[#e68531] rounded-full shadow-lg right-5 bottom-5 w-14 h-14 focus:outline-none hover:bg-[#e6853196] focus:bg-[#e68531] ease"
      >
        <span className="sr-only">Toggle Navigation</span>
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative w-[10rem] h-[10rem] rounded-full overflow-hiddenflex items-center justify-center">
            <Image
              src="/loo.png"
              alt="Synergyvybes Logo"
              fill
              className="object-contain p-1"
            />
          </div>
        )}
      </button>

      {/* Navigation Menu */}
      {isOpen && (
        <div className="fixed z-30 bottom-24 right-5 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden w-56 border border-white/10 transition-all duration-300 transform">
          <div className="p-2">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-white"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5 text-[#e68531]" />
              <span>Home</span>
            </Link>

            <Link
              href="/artistes"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-white"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles className="h-5 w-5 text-[#e68531]" />
              <span>Artistes</span>
            </Link>

            <Link
              href="/whats-new"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-white"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-5 w-5 text-[#e68531]" />
              <span>Blogs</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-white"
              onClick={() => setIsOpen(false)}
            >
              <Users className="h-5 w-5 text-[#e68531]" />
              <span>About</span>
            </Link>
            {/* Contact link removed */}
          </div>

          <div className="p-3 border-t border-white/10 bg-[#e68531]/10">
            <Link
              href="/"
              className="flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-center">
                <div className="text-xs text-white/70">Powered by</div>
                <div className="text-sm font-bold text-white">Synergyvybes</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

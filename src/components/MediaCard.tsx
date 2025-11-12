"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export type MediaItem = {
  _id: string;
  title?: string;
  artistName?: string;
  host?: string;
  collaborators?: string[];
  url: string;
  platform?: "youtube" | "instagram" | "other" | string;
  description?: string;
  thumbnail?: any;
};

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
  } catch {}
  return null;
}

function isInstagram(url: string) {
  try {
    return new URL(url).hostname.includes("instagram.com");
  } catch {
    return false;
  }
}

export default function MediaCard({ item }: { item: MediaItem }) {
  const ytId = extractYouTubeId(item.url);
  const [autoThumb, setAutoThumb] = useState<string | null>(null);

  const showTitle = !!item.title;
  const showArtist = !!item.artistName;
  const showCollabs = item.collaborators && item.collaborators.length > 0;
  const showDescription = !!item.description;
  const showHost = !!item.host;

  // Load Instagram embed script and process embeds when needed
  useEffect(() => {
    if (!isInstagram(item.url)) return;

    // If script already present, just process
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process();
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [item.url]);

  // Try to auto-generate thumbnail from the URL when none is provided
  useEffect(() => {
    if (item.thumbnail) return; // user-provided Sanity image

    // YouTube: construct thumbnail directly
    if (ytId) {
      setAutoThumb(`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`);
      return;
    }

    // Instagram: try noembed as a lightweight oEmbed proxy for backup image
    if (isInstagram(item.url)) {
      const controller = new AbortController();
      fetch(`https://noembed.com/embed?url=${encodeURIComponent(item.url)}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && typeof data.thumbnail_url === "string") {
            setAutoThumb(data.thumbnail_url);
          }
        })
        .catch(() => {});
      return () => controller.abort();
    }
  }, [item.url, item.thumbnail, ytId]);

  // Prefer provided Sanity thumbnail; otherwise, use auto-generated one
  const hasProvidedThumb = Boolean(item.thumbnail);

  const isIG = isInstagram(item.url);

  return (
    <div className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#e68531]/30 transition-colors">
      {/* Media area with platform-specific ratios */}
      <div className={`relative w-full ${isIG ? "aspect-[4/5]" : "aspect-video"} bg-black/40 overflow-hidden`}>
        {ytId ? (
          // YouTube 16:9 inline playback
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${ytId}`}
            title={item.title || "YouTube video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : isIG ? (
          // Instagram inline embed (no redirect)
          <blockquote
            className="instagram-media !bg-transparent !shadow-none !border-none !p-0 !m-0 !w-full !max-w-none"
            data-instgrm-permalink={item.url}
            data-instgrm-version="12"
            style={{ maxWidth: "100%" }}
          />
        ) : hasProvidedThumb ? (
          // Sanity image (object) - let Next.js optimize
          <Image
            src={item.thumbnail}
            alt={item.title || "media thumbnail"}
            fill
            className="object-cover"
          />
        ) : autoThumb ? (
          // Auto-generated thumbnail only for display (no auto-redirect)
          <Image src={autoThumb} alt={item.title || "media preview"} fill className="object-cover" unoptimized />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            Media
          </div>
        )}
      </div>

      {/* Details (conditionally rendered) */}
      {(showTitle || showArtist || showCollabs || showDescription) && (
        <div className="p-4 space-y-3">
          {showTitle && (
            <h3 className="text-base md:text-lg font-semibold text-white">
              {item.title}
            </h3>
          )}
          {/* {showArtist && (
            <p className="text-sm text-gray-300">
              <span className="text-[#e68531]">Artist:</span> {item.artistName}
            </p>
          )} */}
           {showHost && (
            <p className="text-sm text-gray-300">
              <span className="text-[#e68531]">Host:</span> {item.host}
            </p>
          )}
          {showCollabs && (
            <p className="text-sm text-gray-300">
              <span className="text-[#e68531]">Collaborators:</span> {item.collaborators?.join(", ")}
            </p>
          )}
          {showDescription && (
            <p className="text-sm text-gray-400">{item.description}</p>
          )}

          {/* External action button only (no auto-redirect on media) */}
          <div className="pt-1">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              {isIG ? "Follow on Instagram" : ytId ? "View on YouTube" : "Open Link"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
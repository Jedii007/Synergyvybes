/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { featuredArtists } from "@/constants/featuredArtistesData";
import WorkModal from "@/components/WorkModal";

export default function ArtistSpotlightPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Memoize artist lookup to prevent unnecessary recalculations
  const artist = useMemo(() =>
    featuredArtists.find(artist => artist.slug === slug),
    [slug]
  );

  // If artist not found, show 404
  if (!artist) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState("work");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(() => ({
    ...artist.showcase[0],
    type: artist.showcase[0].type as "image" | "audio"
  }));

  // Memoize tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "work":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artist.showcase.map((work, index) => (
              <div
                key={index}
                className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => {
                  setSelectedWork({
                    ...work,
                    type: work.type as "image" | "audio"
                  });
                  setIsModalOpen(true);
                }}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center">
                    <p className="text-white font-medium text-lg">{work.title}</p>
                    {work.type === "audio" && (
                      <span className="text-xs text-[#e68531] mt-2 inline-block">Click to play preview</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "exhibitions":
        return (
          <div className="space-y-8">
            {artist.exhibitions.map((year, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-[#e68531]">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#e68531]"></div>
                <h3 className="text-2xl font-bold mb-4">{year.year}</h3>
                <ul className="space-y-4">
                  {year.events.map((event, eventIndex) => (
                    <li key={eventIndex} className="pl-4">
                      <h4 className="font-semibold text-lg">{event.title}</h4>
                      {event.location && (
                        <p className="text-gray-600 dark:text-gray-300">{event.location}</p>
                      )}
                      {event.description && (
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{event.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case "about":
        return (
          <div>
            <p className="text-lg mb-6">{artist.bio}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={artist.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#e68531] text-white rounded-md hover:bg-[#e68531]/80 transition-colors"
              >
                Dxd Interview
              </a>
              {Object.entries(artist.socialLinks).map(([platform, handle]) => (
                <a
                  key={platform}
                  href={`https://www.instagram.com/${handle}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}: {handle}
                </a>
              ))}
            </div>
          </div>
        );

      case "interview":
        return artist.interview ? (
          <div>
            <div className="relative bg-[#e68531]/10 p-6 rounded-lg mb-8">
              <p className="text-xl italic font-light text-[#e68531] ml-8 relative z-10">
                {artist.interview.quote}
              </p>
            </div>
            <div className="space-y-6">
              {artist.interview.questions.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  }, [activeTab, artist]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <WorkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        work={selectedWork}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">Artist Spotlight: </span>
            <span className="text-[#e68531]">{artist.name}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Celebrating extraordinary creative minds who are pushing boundaries and
            redefining artistic expression through their unique vision and craft.
          </p>
        </div>

        {/* Featured Artist Showcase */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 inline-block border-b-4 border-[#e68531] pb-2">
            Featured Artist
          </h2>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Artist Hero Section */}
                <div className="relative h-96 w-full">
                  <Image
                    src={artist.wideImage || artist.showcase[0].image}
                    alt={artist.name + "'s work"}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h2 className="text-3xl font-bold text-white mb-2">{artist.name}</h2>
                      <p className="text-gray-200">{artist.medium}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {["work", "about", "interview", "exhibitions"].map((tab) => (
                      <button
                        key={tab}
                        className={`py-4 px-6 text-center font-medium transition-colors flex-shrink-0 ${activeTab === tab
                          ? "border-b-2 border-[#e68531] text-[#e68531]"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {tabContent}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#e68531]/90 to-[#e68531]/70 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Would you like to be featured?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Apply to be featured in our Artist Spotlight Series and showcase your work to our creative community.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-[#e68531] font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

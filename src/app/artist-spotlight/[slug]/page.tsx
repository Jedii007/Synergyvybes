/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { featuredArtists } from "@/constants/featuredArtistesData";
import WorkModal from "@/components/WorkModal";

export default function ArtistSpotlightPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the artist by slug
  const artist = featuredArtists.find(artist => artist.slug === slug);

  // If artist not found, show 404
  if (!artist) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState("work");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure the work has the correct type property
  const defaultWork = {
    ...artist.showcase[0],
    type: artist.showcase[0].type as "image" | "audio"
  };

  const [selectedWork, setSelectedWork] = useState(defaultWork);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Work Modal */}
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
            {/* Artist Details */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Artist Hero Section */}
                <div className="relative h-96 w-full">
                  <Image
                    src={artist.wideImage || artist.showcase[0].image}
                    alt={artist.name + "'s work"}
                    fill
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
                  <nav className="flex">
                    {["work", "about", "interview", "exhibitions"].map((tab) => (
                      <button
                        key={tab}
                        className={`py-4 px-6 text-center font-medium transition-colors ${activeTab === tab
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
                  {/* Work Showcase */}
                  {activeTab === "work" && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {artist.showcase.map((work, index) => (
                          <div
                            key={index}
                            className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer"
                            onClick={() => {
                              const typedWork = {
                                ...work,
                                type: work.type as "image" | "audio"
                              };
                              setSelectedWork(typedWork);
                              setIsModalOpen(true);
                            }}
                          >
                            <Image
                              src={work.image}
                              alt={work.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                    </div>
                  )}

                  {/* Exhibitions Timeline */}
                  {activeTab === "exhibitions" && (
                    <div className="space-y-8">
                      {artist.exhibitions.map((year, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-[#e68531]">
                          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#e68531]"></div>
                          <h3 className="text-2xl font-bold mb-4">{year.year}</h3>
                          <ul className="space-y-4">
                            {year.events.map((event, eventIndex) => (
                              <li key={eventIndex} className="pl-4">
                                <h4 className="font-semibold text-lg">{event.title}</h4>
                                <p className="text-gray-600 dark:text-gray-300">{event.location}</p>
                                {event.description && (
                                  <p className="text-gray-500 dark:text-gray-400 mt-1">{event.description}</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* About the Artist */}
                  {activeTab === "about" && (
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
                            href="https://www.instagram.com/iamcissh"
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}: {handle}
                          </a>
                        ))}
                      </div>

                      <div className="mt-10">
                        <h3 className="text-xl font-bold mb-4">Get Updates</h3>
                        <div className="flex">
                          <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e68531]"
                          />
                          <button
                            className="px-4 py-2 bg-[#e68531] text-white rounded-r-md hover:bg-[#e68531]/80 transition-colors"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interview */}
                  {activeTab === "interview" && artist.interview && (
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

                      <div className="mt-10 border-t pt-6 border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-4">Join the Conversation</h3>
                        <p className="mb-4">
                          Want to ask {artist.name} a question? Submit it below
                          and it might be featured in our next interview session!
                        </p>
                        <textarea
                          className="w-full p-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e68531]"
                          rows={4}
                          placeholder="Your question..."
                        ></textarea>
                        <button
                          className="mt-4 px-6 py-2 bg-[#e68531] text-white rounded-md hover:bg-[#e68531]/80 transition-colors"
                        >
                          Submit Question
                        </button>
                      </div>
                    </div>
                  )}
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

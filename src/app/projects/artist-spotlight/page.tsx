/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredArtists } from "@/constants/featuredArtistesData";

export default function ArtistSpotlightPage() {
  const [selectedArtist, setSelectedArtist] = useState(featuredArtists[0]);
  const [activeTab, setActiveTab] = useState("work");

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">Artist Spotlight Series</h1>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Artist Selection Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center">This Month's Artists</h3>
                
                <div className="space-y-4">
                  {featuredArtists.filter(artist => artist.featured).map((artist) => (
                    <div 
                      key={artist.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedArtist.id === artist.id 
                          ? "bg-[#e68531]/10 border-l-4 border-[#e68531]" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedArtist(artist)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                          <Image 
                            src={artist.image} 
                            alt={artist.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{artist.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{artist.medium}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Coming Next Month</h3>
                  {featuredArtists.filter(artist => !artist.featured).map((artist) => (
                    <div key={artist.id} className="flex items-center space-x-3 mb-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image 
                          src={artist.image} 
                          alt={artist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{artist.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{artist.medium}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Artist Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Artist Hero Section */}
                <div className="relative h-64 w-full">
                  <Image
                    src={selectedArtist.showcase[0].image}
                    alt={selectedArtist.name + "'s work"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedArtist.name}</h2>
                      <p className="text-gray-200">{selectedArtist.medium}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex">
                    {["work", "about", "interview"].map((tab) => (
                      <button
                        key={tab}
                        className={`py-4 px-6 text-center font-medium transition-colors ${
                          activeTab === tab
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
                        {selectedArtist.showcase.map((work, index) => (
                          <div 
                            key={index}
                            className="group relative h-64 rounded-lg overflow-hidden shadow-md"
                          >
                            <Image
                              src={work.image}
                              alt={work.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <p className="text-white font-medium text-lg">{work.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* About the Artist */}
                  {activeTab === "about" && (
                    <div>
                      <p className="text-lg mb-6">{selectedArtist.bio}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-8">
                        <a 
                          href={selectedArtist.portfolioLink} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#e68531] text-white rounded-md hover:bg-[#e68531]/80 transition-colors"
                        >
                          Visit Portfolio
                        </a>
                        {Object.entries(selectedArtist.socialLinks).map(([platform, handle]) => (
                          <a 
                            key={platform}
                            href="#"
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
                  {activeTab === "interview" && selectedArtist.interview && (
                    <div>
                      <div className="relative bg-[#e68531]/10 p-6 rounded-lg mb-8">
                        <div className="text-5xl absolute top-4 left-4 text-[#e68531]/30">"</div>
                        <p className="text-xl italic font-light ml-8 relative z-10">
                          {selectedArtist.interview.quote}
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        {selectedArtist.interview.questions.map((item, index) => (
                          <div key={index}>
                            <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{item.a}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-10 border-t pt-6 border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-4">Join the Conversation</h3>
                        <p className="mb-4">
                          Want to ask {selectedArtist.name} a question? Submit it below
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

        {/* Upcoming Spotlight Events */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 inline-block border-b-4 border-[#e68531] pb-2">
            Upcoming Spotlight Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Live Interview Session",
                date: "June 15, 2024",
                time: "7:00 PM EST",
                description: "Join us for a live Q&A session with Maya Johnson as she discusses her creative process and upcoming projects.",
                image: "/events/live-interview.jpg",
                type: "Virtual"
              },
              {
                title: "Gallery Opening",
                date: "June 28, 2024",
                time: "6:00 PM - 9:00 PM",
                description: "Experience Jamal Wright's newest installation series at our partner gallery in downtown.",
                image: "/events/gallery-opening.jpg",
                type: "In-Person"
              },
              {
                title: "Collaborative Workshop",
                date: "July 10, 2024",
                time: "2:00 PM - 4:00 PM",
                description: "Learn digital composition techniques from Elena Santos in this hands-on virtual workshop.",
                image: "/events/workshop.jpg",
                type: "Virtual"
              }
            ].map((event, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#e68531] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {event.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                  <button className="text-[#e68531] font-medium hover:text-[#e68531]/80 transition-colors flex items-center">
                    Register Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#e68531]/90 to-[#e68531]/70 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Are you an artist looking for exposure?</h2>
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
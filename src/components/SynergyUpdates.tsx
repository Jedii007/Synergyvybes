"use client"
import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Sample updates data - in a real app, this would come from an API or database
const updates = [
  {
    id: 1,
    date: "June 15, 2024",
    title: "New Artist Spotlight: Jedii007",
    excerpt: "We're excited to feature Jedii007 in this month's Artist Spotlight series.",
    link: "/artist-spotlight/jedii007"
  },
  {
    id: 2,
    date: "June 10, 2024",
    title: "Upcoming Collaboration Event",
    excerpt: "Join us for a special collaboration event featuring artists from across the globe.",
    link: "/events/collaboration"
  },
  {
    id: 3,
    date: "June 5, 2024",
    title: "New Music Releases This Week",
    excerpt: "Check out the latest tracks from our community of talented musicians.",
    link: "/music/releases"
  }
];

export default function SynergyUpdates() {
  const [expandedUpdate, setExpandedUpdate] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedUpdate(expandedUpdate === id ? null : id);
  };

  return (
    <div className="mt-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Synergy Updates</h2>
        <Link
          href="/updates"
          className="text-sm text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center"
        >
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {updates.map((update, index) => (
            <div
              key={update.id}
              className={`flex-1 border-b md:border-b-0 md:border-r border-white/10 last:border-b-0 last:border-r-0 ${
                index === expandedUpdate ? "bg-white/10" : ""
              }`}
            >
              <div
                className="p-3 cursor-pointer flex items-center justify-between"
                onClick={() => toggleExpand(index)}
              >
                <div>
                  <span className="text-xs text-[#e68531]">{update.date}</span>
                  <h3 className="font-medium text-sm">{update.title}</h3>
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-[#e68531] transition-transform duration-300 ${
                    index === expandedUpdate ? "rotate-90" : ""
                  }`}
                />
              </div>

              {index === expandedUpdate && (
                <div className="px-3 pb-3 pt-0 text-xs text-gray-300">
                  <p className="mb-2">{update.excerpt}</p>
                  <Link
                    href={update.link}
                    className="text-[#e68531] hover:text-[#e68531]/80 transition-colors inline-flex items-center text-xs"
                  >
                    Read More
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

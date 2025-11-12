"use client";
import Link from "next/link";

export default function SitesPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Web Projects
        </h1>
        <p className="text-gray-300 mb-10">
          We’re curating a showcase of websites we’ve designed and built for artists, brands, and organizations.
        </p>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
          <p className="text-xl md:text-2xl font-semibold text-gray-200">
            Coming soon
          </p>
          <p className="text-gray-400 mt-2">
            Our web portfolio will be live shortly. In the meantime, feel free to
            <Link href="/about" className="text-[#e68531] underline ml-1">get in touch</Link> to discuss your project.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white bg-[#e68531] rounded-md hover:bg-[#e68531]/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
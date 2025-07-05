import BlogSection from '@/components/SynergyUpdates';
import Link from 'next/link';
import { RectangleAd } from '@/components/GoogleAdsComponent';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white flex flex-col md:flex-row items-start justify-start relative">
      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* What's New Section */}
        <section className="w-full max-w-7xl mb-6 px-4 mx-auto">
          <BlogSection />
        </section>

        {/* Hero/Welcome Section */}
        <section className="w-full flex flex-col items-center justify-center py-6 bg-gradient-to-b from-[#0f0c29] to-transparent">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-center">Welcome to SynergyVybes</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-4 text-center max-w-2xl">
            Discover, connect, and celebrate the vibrant world of music and artistry across Africa and beyond.
          </p>
        </section>

        {/* Ad Placement 1 */}
        {/* <section className="w-full max-w-7xl mb-6 px-4 mx-auto flex justify-center">
          <RectangleAd className="max-w-sm" />
        </section> */}

        {/* Newsletter Signup Placeholder */}
        <section className="w-full max-w-2xl mb-6 px-4 mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-3">Stay in the Loop</h2>
            <p className="text-gray-400 mb-4">Sign up for our newsletter to get the latest updates, releases, and exclusive content.</p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input type="email" placeholder="Your email address" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e68531]/50" required />
              <button type="submit" className="bg-[#e68531] hover:bg-[#e68531]/80 text-white font-medium rounded-lg px-6 py-2 transition-colors">Subscribe</button>
            </form>
          </div>
        </section>

        {/* Ad Placement 2 */}
        {/* <section className="w-full max-w-2xl mb-10 px-4 mx-auto">
          <div className="bg-[#e68531]/20 border-2 border-[#e68531] rounded-xl p-4 text-center text-[#e68531] font-bold text-lg">
            [Ad Placement 2: Promote Your Brand or Event!]
          </div>
        </section> */}

        {/* Call to Action Placeholder */}
        <section className="w-full max-w-2xl mb-6 text-center px-4 mx-auto">
          <h2 className="text-xl font-bold mb-3">Ready to Explore?</h2>
          <Link href="/artistes" className="inline-block bg-[#e68531] hover:bg-[#e68531]/90 text-white px-6 py-2 rounded-full text-base font-medium transition-colors duration-300">Browse Artistes</Link>
        </section>
      </div>

      {/* Slim Vertical Advertise Here Section (Desktop only, right side) */}
      <aside className="hidden md:flex flex-col items-center sticky top-8 right-0 h-[80vh] w-20 z-20">
        <div className="bg-[#e68531]/20 border-2 border-[#e68531] rounded-2xl flex flex-col items-center justify-center h-full w-16 mt-8 shadow-lg">
          <span className="text-[#e68531] font-bold text-xs rotate-[-90deg] whitespace-nowrap">Advertise Here</span>
        </div>
      </aside>
    </main>
  );
}
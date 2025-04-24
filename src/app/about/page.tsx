/* eslint-disable react/no-unescaped-entities */
import { upcomingProjects } from "@/constants/upcomingProjectsData";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            About <span className="text-[#e68531]">Synergyvybes</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A creative sanctuary where artists and visionaries connect, collaborate, and showcase their brilliance.
          </p>
        </div>

        {/* About Description */}
        <div className="prose prose-invert prose-lg mb-12 max-w-3xl mx-auto text-gray-200">
          <p>
            Welcome to <strong>Synergyvybes</strong>, a platform dedicated to celebrating creative energy in all its forms.
            We believe in the power of collaboration and the magic that sparks when creative minds unite.
          </p>
          <p>
            Our mission is to provide a space where artists, musicians, and visionaries can thrive — a home to share their work,
            inspire others, and cultivate a growing audience that values authentic expression.
          </p>
          <p>
            Whether you're a seasoned creator or stepping into your artistic journey, <strong>Synergyvybes</strong> is your digital playground for connection, exposure, and elevation.
          </p>
        </div>

        {/* Upcoming Projects Section */}
        <div className="mt-12">
          <h2 className="text-4xl font-bold mb-10 text-center text-[#e68531]">Upcoming Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {upcomingProjects.map((project, index) => (
              <Link 
                href={`/projects/${project.slug}`} 
                key={index}
                className="group block transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#1f1f2e] hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-52 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="px-3 py-1 bg-[#e68531] text-white rounded-full text-xs font-semibold tracking-wide">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#e68531] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{project.date}</span>
                      <span className="text-[#e68531] group-hover:translate-x-1 transition-transform flex items-center">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

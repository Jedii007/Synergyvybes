/* eslint-disable react/no-unescaped-entities */
"use client"
import { upcomingProjects } from "@/constants/upcomingProjectsData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InstagramIcon, YoutubeIcon } from "lucide-react";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    artistName: "",
    message: "",
  });

  const [showArtistField, setShowArtistField] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form or show success message
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      reason: "",
      artistName: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Show artist name field if inquiry is about an artist
    if (name === "reason") {
      setShowArtistField(value === "artist-inquiry");
    }
  };

  const contactReasons = [
    { value: "", label: "Select a reason" },
    { value: "artist-spotlight", label: "Feature on Artist Spotlight" },
    { value: "join-synergy", label: "Join Synergyvybes Platform" },
    { value: "artist-inquiry", label: "Inquiry about an Artist" },
    { value: "investment", label: "Investment Opportunities" },
    { value: "collaboration", label: "Collaboration Proposal" },
    { value: "technical-support", label: "Technical Support" },
    { value: "other", label: "Other" }
  ];

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

        {/* Contact Section */}
        <div id="contact" className="mt-16 mb-16">
          <h2 className="text-4xl font-bold mb-10 text-center text-[#e68531]">Contact Us</h2>

          <div className="space-y-8">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium mb-2">
                    Reason for Contact
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
                    required
                  >
                    {contactReasons.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {showArtistField && (
                  <div>
                    <label htmlFor="artistName" className="block text-sm font-medium mb-2">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      id="artistName"
                      name="artistName"
                      value={formData.artistName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
                      placeholder="Enter the artist's name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    className="h-4 w-4 text-[#e68531] focus:ring-[#e68531] border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-gray-300">
                    I agree to Synergyvybes contacting me regarding my inquiry
                  </label>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 text-white bg-[#e68531] rounded-md hover:bg-[#e68531]/90 transition-colors font-medium"
                  >
                    Send Message
                  </button>

                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">Follow us:</span>
                    <a
                      href="https://instagram.com/jedii.heic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e68531] transition-colors"
                    >
                      <InstagramIcon className="w-6 h-6" />
                    </a>

                    <a
                      href="https://youtube.com/@jedii.mp4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e68531] transition-colors"
                    >
                      <YoutubeIcon className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Upcoming Projects Section - Hidden for now */}
        <div className="mt-12 hidden">
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

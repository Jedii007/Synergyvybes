/* eslint-disable react/no-unescaped-entities */
"use client"
import { upcomingProjects } from "@/constants/upcomingProjectsData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InstagramIcon, YoutubeIcon } from "lucide-react";

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    artistName: "",
    message: "",
  });

  const [showArtistField, setShowArtistField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'ff9892f9-0126-4bab-aecb-33e7cbdad5f5', // Replace with your actual access key
          name: formData.name,
          email: formData.email,
          reason: formData.reason,
          artistName: formData.artistName || 'N/A',
          message: formData.message,
          subject: `New Contact Form Submission: ${formData.reason}`,
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you for your message! We'll get back to you soon."
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          reason: "",
          artistName: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message: "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <div className="max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            About <span className="text-[#e68531]">SynergyVybes</span>
          </h1>
        </div>

        {/* About Description */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            SynergyVybes is a creative agency and collective shaping the future of music, art, and digital experiences across Africa and beyond. Based in The Gambia, we combine artistic vision with strategic thinking to help brands, creatives, and organizations express their identity with clarity and impact.
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Our team of designers, developers, and storytellers delivers high-quality solutions in web development, branding, content creation, videography, and digital strategy. Every project we take on reflects our belief that creativity and precision can coexist.
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Even this website was designed and developed in-house, reflecting the same attention to detail and passion we bring to every client project. Explore our {" "}
            <Link href="/projects/sites" className="text-[#e68531] underline hover:opacity-90">web portfolio</Link>
            {" "}to see how we bring ideas to life online.
          </p>
          
        </section>

        {/* Contact Section */}
        <div id="contact" className="mt-16 mb-16">
          <h2 className="text-4xl font-bold mb-10 text-center text-[#e68531]">Contact Us</h2>

          <div className="space-y-8">
            {/* Contact Form */}
            <div>
              {submitStatus.message && (
                <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6">
                {/* This hidden field is needed for Web3Forms to work */}
                <input type="hidden" name="access_key" value="ff9892f9-0126-4bab-aecb-33e7cbdad5f5" />

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

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-sm md:text-base md:px-6 md:py-3 text-white bg-[#e68531] rounded-md hover:bg-[#e68531]/90 transition-colors font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">Follow us:</span>
                     <a
                      href="https://www.youtube.com/@Synergyvybes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e68531] transition-colors"
                    >
                      <YoutubeIcon className="w-6 h-6" />
                    </a>
                    <a
                      href="https://instagram.com/synergyvybes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e68531] transition-colors"
                    >
                      <InstagramIcon className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@synergyvybes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e68531] transition-colors"
                    >
                      <TikTokIcon className="w-6 h-6" />
                    </a>
                  
                    {/* <a
                      href="https://youtube.com/@synergyvybes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e68531] transition-colors"
                    >
                      <YoutubeIcon className="w-6 h-6" />
                    </a> */}
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
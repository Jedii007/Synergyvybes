/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react";

export default function ContactPage() {
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
    // zoho passmHYSz-f%E7J.V2<aQ
    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <div className="prose prose-lg mb-8">
                    <p>
                        Have questions or want to get in touch? We'd love to hear from you.
                        Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6  rounded-xl shadow-lg p-8">
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
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
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
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
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
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
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
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
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
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#e68531] focus:border-transparent"
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
                        <label htmlFor="consent" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            I agree to Synergyvybes contacting me regarding my inquiry
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-white bg-[#e68531] rounded-md hover:bg-[#e68531]/90 transition-colors font-medium"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                        <div className="w-12 h-12 bg-[#e68531]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e68531]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400">contact@synergyvybes.com</p>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                        <div className="w-12 h-12 bg-[#e68531]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e68531]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Social Media</h3>
                        <p className="text-gray-600 dark:text-gray-400">@synergyvybes</p>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                        <div className="w-12 h-12 bg-[#e68531]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e68531]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Response Time</h3>
                        <p className="text-gray-600 dark:text-gray-400">Within 24-48 hours</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
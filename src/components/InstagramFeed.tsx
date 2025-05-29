import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';

// Declare global Instagram type
declare global {
    interface Window {
        instgrm?: {
            Embeds: {
                process: () => void;
            };
        };
    }
}

const InstagramFeed = () => {
    const [instagramLoaded, setInstagramLoaded] = useState(false);

    useEffect(() => {
        // Load Instagram embed script
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => {
            // Initialize Instagram embeds
            if (window.instgrm) {
                window.instgrm.Embeds.process();
                setInstagramLoaded(true);
            }
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup script on component unmount
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    // Re-initialize Instagram embeds when the component updates
    useEffect(() => {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Instagram Feed</h2>
                <a
                    href="https://www.instagram.com/jedii.heic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e68531] hover:text-[#e68531]/80 transition-colors flex items-center gap-2"
                >
                    <Instagram className="w-5 h-5" />
                    <span>Follow on Instagram</span>
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 [&_.instagram-media]:!bg-transparent [&_.instagram-media]:!shadow-none [&_.instagram-media]:!border-none [&_.instagram-media]:!p-0 [&_.instagram-media]:!w-full [&_.instagram-media]:!max-w-none">
                {!instagramLoaded ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
                    ))
                ) : (
                    <>
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DJWswVxIsp7/?utm_source=ig_embed&amp;utm_campaign=loading"
                            data-instgrm-version="12"
                        ></blockquote>
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DHLpgjPo31T/?utm_source=ig_embed&amp;utm_campaign=loading"
                            data-instgrm-version="12"
                        ></blockquote>
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DCxHOZuNMS7/?utm_source=ig_embed&amp;utm_campaign=loading"
                            data-instgrm-version="12"
                        ></blockquote>
                    </>
                )}
            </div>
        </div>
    );
};

export default InstagramFeed;
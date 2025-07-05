import { vybetalks } from '../../constants/vybetalksData';

export default function VybeTalksPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white flex flex-col items-center py-12 px-4">
            <section className="w-full max-w-3xl mx-auto mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">VybeTalks</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                    VybeTalks is our exclusive show where we dive into music, culture, and creative journeys with some of the most inspiring voices. Watch the latest episodes below!
                </p>
                <div className="space-y-12">
                    {vybetalks.map((ep) => (
                        <div key={ep.id} className="bg-white/5 rounded-xl p-6 mb-8 shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">{ep.title}</h2>
                            <div className="text-sm text-gray-400 mb-2">{ep.date}</div>
                            <p className="mb-4 text-gray-200">{ep.description}</p>
                            <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden">
                                <iframe
                                    src={ep.youtubeUrl.replace('watch?v=', 'embed/')}
                                    title={ep.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-gray-400 mt-8">Subscribe to our <a href="https://www.youtube.com/@YourChannel" target="_blank" rel="noopener noreferrer" className="text-[#e68531] underline hover:text-[#e68531]/80">YouTube channel</a> for more episodes!</p>
            </section>
        </main>
    );
} 
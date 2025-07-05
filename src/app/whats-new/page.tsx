import BlogSection from '@/components/SynergyUpdates';

export default function WhatsNewPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white py-12 px-4 flex flex-col items-center">
            <section className="w-full max-w-7xl mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">What&apos;s New</h1>
                <BlogSection limit={1000} />
            </section>
        </main>
    );
} 
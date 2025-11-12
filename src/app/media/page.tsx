import { client } from "@/sanity/lib/client";
import { mediaItemsQuery } from "@/sanity/lib/queries";
import MediaCard, { type MediaItem } from "@/components/MediaCard";

export const metadata = {
  title: "Media",
  description: "Embedded media from YouTube, Instagram, and more.",
};

// Always fetch fresh data so updates appear immediately
export const revalidate = 0;

export default async function MediaPage() {
  const items = await client.fetch<MediaItem[]>(mediaItemsQuery);

  // Normalize to a single platform per item based on URL (URL wins over manual field)
  const platformFromUrl = (url: string): "youtube" | "instagram" | "other" => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) return "youtube";
      if (u.hostname.includes("instagram.com")) return "instagram";
    } catch {}
    return "other";
  };

  const buckets: Record<"youtube" | "instagram" | "other", MediaItem[]> = {
    youtube: [],
    instagram: [],
    other: [],
  };

  (items || []).forEach((it) => {
    const inferred = platformFromUrl(it.url);
    const resolved = inferred !== "other" ? inferred : (it.platform?.toLowerCase() as "youtube" | "instagram" | "other" | undefined) || "other";
    if (resolved === "youtube") buckets.youtube.push(it);
    else if (resolved === "instagram") buckets.instagram.push(it);
    else buckets.other.push(it);
  });

  const sections: { title: string; data: MediaItem[] }[] = [
    { title: "YouTube", data: buckets.youtube },
    { title: "Instagram", data: buckets.instagram },
    { title: "Other", data: buckets.other },
  ];

  const hasAny = (items?.length || 0) > 0;

  return (
    <main className="min-h-screen px-4 md:px-8 py-10 bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Media
          </h1>
          <p className="mt-2 text-gray-300">
            Explore embedded media from our artists and collaborators.
          </p>
        </header>

        {!hasAny && (
          <div className="text-center text-gray-400">No media yet.</div>
        )}

        {sections.map((section) =>
          section.data.length ? (
            <section key={section.title} className="mt-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.data.map((item) => (
                  <MediaCard key={item._id} item={item} />)
                )}
              </div>
            </section>
          ) : null
        )}
      </div>
    </main>
  );
}
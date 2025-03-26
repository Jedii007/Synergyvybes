import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type NewsEvent = {
  _id: string;
  title: string;
  desc: string;
  image: any;
  sponsored: boolean;
  date: string;
  fullDescription: string;
};

async function getNewsEvent(id: string) {
  return await client.fetch<NewsEvent>(
    `*[_type == "newsEvent" && _id == $id][0]{
      _id,
      title,
      desc,
      image,
      sponsored,
      date,
      fullDescription
    }`,
    { id },
    {
      next: {
        revalidate: 0
      }
    }
  );
}

export default async function NewsAndEventsDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const newsItem = await getNewsEvent(id);

  if (!newsItem) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">News item not found.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
      <div className="relative w-full h-[300px] mb-4">
        <Image
          src={urlFor(newsItem.image).url()}
          alt={newsItem.title}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
      {newsItem.sponsored && (
        <span className="inline-block mb-4 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
          Sponsored
        </span>
      )}
      <span className="block mb-4 text-sm text-gray-500">
        {new Date(newsItem.date).toLocaleDateString()}
      </span>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{newsItem.desc}</p>
      {newsItem.fullDescription && (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">
            {newsItem.fullDescription}
          </p>
        </div>
      )}
    </div>
  );
}
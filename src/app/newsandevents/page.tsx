import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import Faq from "@/components/Faq";

type NewsEvent = {
  _id: string;
  title: string;
  desc: string;
  image: any;
  sponsored: boolean;
  date: string;
  fullDescription: string;
};

async function getNewsAndEvents() {
  return await client.fetch<NewsEvent[]>(
    `*[_type == "newsEvent"] | order(date desc) {
      _id,
      title,
      desc,
      image,
      sponsored,
      date,
      fullDescription
    }`,
    {},
    {
      next: {
        revalidate: 0
      }
    }
  );
}

export default async function NewsAndEvents() {
  const newsEvents = await getNewsAndEvents();

  if (!newsEvents) return null;

  return (
    <Container>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            News & Events
          </h2>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Stay updated with the latest news and upcoming events.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsEvents.map((item) => (
            <div key={item._id} className="group flex flex-col focus:outline-none">
              <Link href={`/newsandevents/${item._id}`} passHref>
                <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                  <Image
                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                    src={urlFor(item.image).url()}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  {item.sponsored && (
                    <span className="absolute top-0 start-0 rounded-ss-xl rounded-ee-xl text-xs font-medium bg-blue-600 text-white py-1.5 px-3">
                      Sponsored
                    </span>
                  )}
                </div>
                <div className="mt-7">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-800 dark:text-neutral-200">
                    {item.desc.length > 100
                      ? `${item.desc.slice(0, 100)}...`
                      : item.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 dark:text-blue-500">
                    Read more
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <SectionTitle
        preTitle="Got Questions?"
        title="Frequently Asked Questions"
      >
        Find out more about our services and how we can support your business
        needs.
      </SectionTitle>
      <Faq />
    </Container>
  );
}

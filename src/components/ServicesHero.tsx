import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ServiceHeroData = {
  title: string;
  subtitle: string;
  backgroundImage: SanityImageSource;
  buttonText: string;
};

async function getServiceHero() {
  return await client.fetch<ServiceHeroData>(
    `*[_type == "serviceHero"][0]{
      title,
      subtitle,
      backgroundImage,
      buttonText
    }`,
    {},
    {
      next: {
        revalidate: 0
      }
    }
  );
}

export default async function ServicesHero() {
  const serviceHero = await getServiceHero();

  if (!serviceHero) return null;

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-12"
      style={{
        backgroundImage: `url(${urlFor(serviceHero.backgroundImage).url()})`,
        borderRadius: "12px",
        minHeight: "600px",
      }}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0 rounded-lg"></div>
      <div className="container mx-auto flex flex-col mt-[9.8rem] items-center justify-center h-full relative z-10">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            {serviceHero.title}
          </h1>
          <p className="text-lg lg:text-xl text-white mt-4">
            {serviceHero.subtitle}
          </p>
          <a
            href="#services"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-indigo-700 transition duration-300"
          >
            {serviceHero.buttonText || 'Explore Our Services'}
          </a>
        </div>
      </div>
    </section>
  );
}
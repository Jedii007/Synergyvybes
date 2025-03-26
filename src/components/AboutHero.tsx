import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type AboutHeroData = {
  title: string;
  subtitle: string;
  backgroundImage: SanityImageSource;
};

async function getAboutHero() {
  return await client.fetch<AboutHeroData>(
    `*[_type == "aboutHero"][0]{
      title,
      subtitle,
      backgroundImage
    }`,
    {},
    {
      next: {
        revalidate: 0
      }
    }
  );
}

export default async function AboutHero() {
  const aboutHero = await getAboutHero();

  if (!aboutHero) return null;

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-12"
      style={{
        backgroundImage: `url(${urlFor(aboutHero.backgroundImage).url()})`,
        borderRadius: "12px",
        minHeight: "600px",
      }}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0 rounded-lg"></div> {" "}
      <div className="container mx-auto flex flex-col mt-[13rem] items-center justify-center h-full relative z-10">
        <div className="text-center max-w-2xl">
          <p className="text-lg lg:text-sm text-white mt-4">{aboutHero.subtitle}</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white">{aboutHero.title}</h1>
        </div>
      </div>
    </section>
  );
}

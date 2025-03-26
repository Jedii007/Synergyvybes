import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type TestimonialData = {
  _id: string;
  textParts: { content: string; mark: boolean }[];
  image: SanityImageSource; // Adjust the type if you have a more specific type for Sanity images
  name: string;
  title: string;
};

async function getTestimonials() {
  const query = `*[_type == "testimonial"]{
    _id,
    textParts,
    image,
    name,
    title
  }`;
  const data: TestimonialData[] = await client.fetch(query);
  return data;
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial._id}
            className={index === 0 ? "lg:col-span-2 xl:col-auto" : ""}
          >
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal">
                {testimonial.textParts.map((part, i) => 
                  part.mark ? (
                    <Mark key={i}>{part.content}</Mark>
                  ) : (
                    part.content
                  )
                )}
              </p>
              <Avatar
                image={urlFor(testimonial.image).url()}
                name={testimonial.name}
                title={testimonial.title}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

interface AvatarProps {
  image: string;
  name: string;
  title: string;
}

function Avatar({ image, name, title }: AvatarProps) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={image}
          width={40}
          height={40}
          alt="Avatar"
          // placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{name}</div>
        <div className="text-gray-600 dark:text-gray-400">{title}</div>
      </div>
    </div>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
      {children}
    </mark>
  );
}

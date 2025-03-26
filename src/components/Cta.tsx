import React from "react";
import { Container } from "@/components/Container";
import { client } from "@/sanity/lib/client";

type CtaData = {
  _id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

async function getCta() {
  const query = `*[_type == "cta"][0]{
    _id,
    title,
    description,
    buttonText,
    buttonLink
  }`;
  return await client.fetch<CtaData>(query);
}

export default async function Cta() {
  const ctaData = await getCta();
  if (!ctaData) return null;

  // Hardcoded styling values
  const backgroundColor = "bg-indigo-600";
  const buttonTextColor = "text-indigo-600";
  const buttonBackgroundColor = "bg-white";

  return (
    <Container>
      <div
        className={`flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white ${backgroundColor} px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl`}
      >
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            {ctaData.title}
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            {ctaData.description}
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href={ctaData.buttonLink}
            target="_blank"
            rel="noopener"
            className={`inline-block py-3 mx-auto text-lg font-medium text-center ${buttonTextColor} ${buttonBackgroundColor} rounded-md px-7 lg:px-10 lg:py-5`}
          >
            {ctaData.buttonText}
          </a>
        </div>
      </div>
    </Container>
  );
}

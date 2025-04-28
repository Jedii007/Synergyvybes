"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { heroData } from "@/constants/heroData";
import { CARD_ANIMATION_DELAY, CARD_ANIMATION_DURATION } from "@/constants/styles";
import SlimSpotlightCard from "./SlimSpotlightCard";

export default function Hero() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [visibleTexts, setVisibleTexts] = useState<number[]>([]);
  const { isLoading } = useLoading();

  useEffect(() => {
    // Reset visible cards when loading state changes
    setVisibleCards([]);
    setVisibleTexts([]);

    // Only start animations after loading is complete
    if (!isLoading) {
      // Show each card with a delay
      heroData.cards.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);

          // Add text animation after card becomes visible
          setTimeout(() => {
            setVisibleTexts(prev => [...prev, index]);
          }, CARD_ANIMATION_DURATION); // Wait for card animation to complete

        }, index * CARD_ANIMATION_DELAY);
      });
    }
  }, [isLoading]); // Re-run when loading state changes

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 min-h-screen w-full">
      {/* Main artist cards - take up 3/4 of the space */}
      <div className="lg:col-span-3 flex flex-col md:flex-row gap-4">
        {heroData.cards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className={`relative flex-1 h-[70vh] md:h-[90vh] rounded-3xl overflow-hidden transition-all duration-${CARD_ANIMATION_DURATION} hover:scale-[1.02] bg-gray-200 cursor-pointer
              ${visibleCards.includes(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'}`}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8 z-10">
              <h1
                className={`text-white text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg transition-all duration-500
                  ${visibleTexts.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4'}`}
              >
                {card.title}
              </h1>
              <div
                className={`text-[#e68531] text-sm md:text-lg font-medium transition-all duration-500 delay-100
                  ${visibleTexts.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4'}`}
              >
                <p className="drop-shadow-md">{card.role}</p>
                <p className="text-white/90 drop-shadow-md transition-all duration-500 delay-200
                  ${visibleTexts.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4'}">{card.country}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Slim spotlight card - takes up 1/4 of the space */}
      <div className={`lg:col-span-1 transition-all duration-${CARD_ANIMATION_DURATION} ${visibleCards.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <SlimSpotlightCard />
      </div>
    </div>
  );
}
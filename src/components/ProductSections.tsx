"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import gsap from "gsap";

interface ProductSectionsProps {
  arrivals: Product[];
  deals: Product[];
}

export default function ProductSections({
  arrivals,
  deals,
}: ProductSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrivalsRef = useRef<HTMLDivElement>(null);
  const midBannerRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);

  // Carousel slide index (moves 1 product card at a time)
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Maximum items visible in 1 row on desktop is 4
  const visibleCards = 4;
  const maxIndex = Math.max(0, arrivals.length - visibleCards);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".arrival-card-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      if (midBannerRef.current) {
        gsap.fromTo(
          midBannerRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.4,
          }
        );
      }

      gsap.fromTo(
        ".deal-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-12"
    >
      {/* 1. NEW ARRIVALS CAROUSEL (Strictly 1 Row of 4 Containers) */}
      <section ref={arrivalsRef} className="flex flex-col items-center w-full">
        <div className="mb-8 text-center">
          <div
            className="inline-block px-5 py-1.5 rounded-sm border"
            style={{
              backgroundColor: "#F8EDE7",
              borderColor: "rgba(169, 55, 23, 0.2)",
              color: "#A93717",
            }}
          >
            <h2
              className="text-base sm:text-lg font-normal"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              Explore our new arrivals!
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#A93717] hover:border-[#A93717] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Viewport Mask: Strictly clips to 1 row with overflow-hidden */}
          <div className="w-full overflow-hidden py-1 px-0.5">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                // Moves cards smoothly by 25% of the container (width of 1 card on desktop)
                transform: `translateX(-${carouselIndex * 25}%)`,
              }}
            >
              {arrivals.map((prod) => (
                <div
                  key={prod.id}
                  className="arrival-card-item shrink-0 w-1/2 sm:w-1/3 md:w-1/4 px-2 sm:px-3"
                >
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#A93717] hover:border-[#A93717] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next items"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. MID LIFESTYLE BANNER */}
      <section
        ref={midBannerRef}
        className="w-full rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] bg-[#E8DDD5]">
          <Image
            src="/images/image2.png"
            alt="Wonky Kids Collection Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* 3. TOP DEALS */}
      <section ref={dealsRef} className="flex flex-col items-center w-full">
        <div className="mb-8 text-center">
          <div
            className="inline-block px-5 py-1.5 rounded-sm border"
            style={{
              backgroundColor: "#F8EDE7",
              borderColor: "rgba(169, 55, 23, 0.2)",
              color: "#A93717",
            }}
          >
            <h2
              className="text-base sm:text-lg font-normal"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              Explore our top deals
            </h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {deals.map((prod) => (
            <div key={prod.id} className="deal-card">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

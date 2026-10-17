"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerWrapperRef.current) {
        gsap.fromTo(
          bannerWrapperRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.3 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Hero Banner Container */}
      <div
        ref={bannerWrapperRef}
        className="relative w-full rounded-2xl overflow-hidden bg-[#EFF4F8] shadow-sm flex items-center min-h-[380px] sm:min-h-[460px] md:min-h-[500px]"
      >
        {/* Full Hero Image from assets (hero-image.png) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-image.png"
            alt="Summer Sale - Wonky Kids Fashion"
            fill
            sizes="100vw"
            className="object-cover object-center md:object-right"
            priority
          />
        </div>

        {/* Previous Button Carousel Control */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button Carousel Control */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

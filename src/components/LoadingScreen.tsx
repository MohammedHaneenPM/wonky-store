"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export default function LoadingScreen({
  onComplete,
  minDurationMs = 1800,
}: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(logoWrapperRef.current, { scale: 0.85, opacity: 0, y: 20 });
      gsap.set(textRef.current, { opacity: 0, y: 15 });
      gsap.set(progressBarRef.current, { width: "0%" });

      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out the entire overlay
          gsap.to(containerRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: () => {
              setIsDone(true);
              if (onComplete) onComplete();
            },
          });
        },
      });

      // Intro animation
      tl.to(logoWrapperRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // Progress bar simulation
        .to(
          progressBarRef.current,
          {
            width: "100%",
            duration: minDurationMs / 1000 - 0.5,
            ease: "power1.inOut",
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [minDurationMs, onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white pointer-events-auto"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col items-center justify-center max-w-sm px-6 text-center">
        {/* Loading Image */}
        <div ref={logoWrapperRef} className="relative w-64 md:w-80 h-40">
          <Image
            src="/images/loading-screen.png"
            alt="Wonky Loading"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Dynamic loading bar */}
        <div className="w-56 h-1.5 bg-[#F8EDE7] rounded-full overflow-hidden mt-6 mb-3">
          <div
            ref={progressBarRef}
            className="h-full bg-[#A93717] rounded-full transition-all"
            style={{ width: "0%" }}
          />
        </div>

        <p
          ref={textRef}
          className="text-xs uppercase tracking-widest text-[#A93717]/80 font-medium"
        >
          Curating Best Kids Fashion...
        </p>
      </div>
    </div>
  );
}

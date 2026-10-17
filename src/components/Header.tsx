"use client";

import { Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <header ref={headerRef} className="w-full bg-[#F8EDE7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-3 flex flex-col">
        {/* Top Notification & Social Row */}
        <div
          className="w-full flex items-center justify-between pb-3 border-b border-[#EADBD1] text-xs sm:text-sm"
          style={{
            color: "#370B74",
            fontFamily: "var(--font-public-sans), sans-serif",
          }}
        >
          {/* Welcome Text */}
          <span className="font-normal text-xs sm:text-[13px] tracking-tight">
            Welcome to Wonky online eCommerce store.
          </span>

          {/* Social Links & Top Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-[13px] font-normal">
                Follow us:
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75 transition-opacity"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-[#370B74]" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75 transition-opacity"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-[#370B74]" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75 transition-opacity"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-[#370B74]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Logo, Search Bar & Profile/Admin Action */}
        <div className="w-full pt-4 pb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1">
            {/* Logo with logo.png */}
            <Link href="/" className="inline-block shrink-0">
              <div className="relative w-20 sm:w-24 h-11 transition-transform hover:scale-105 duration-200">
                <Image
                  src="/images/logo.png"
                  alt="Wonky"
                  fill
                  sizes="96px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Search Input Bar */}
            <div className="w-full max-w-md relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-500 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-11 pr-4 py-2.5 bg-white rounded-lg text-sm text-gray-700 placeholder:text-gray-400 border border-transparent shadow-xs focus:outline-none focus:ring-1 focus:ring-[#A93717]"
                />
              </div>
            </div>
          </div>

          {/* Profile / Admin Circle Icon (Direct link to /admin) */}
          <Link
            href="/admin"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-white/90 text-[#A93717] border border-[#EADBD1] shadow-2xs hover:shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            aria-label="Admin Dashboard"
            title="Admin Dashboard"
          >
            <User className="w-5 h-5 text-[#A93717]" />
          </Link>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { RotateCcw, CalendarCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col mt-12">
      {/* Feature Highlights Bar */}
      <div
        className="w-full py-4 px-6 flex items-center justify-center gap-10 sm:gap-16 border-t border-b text-xs sm:text-sm font-normal text-gray-700"
        style={{
          backgroundColor: "#F8EDE7",
          borderColor: "rgba(169, 55, 23, 0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-gray-600" />
          <span>Easy Return</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-gray-600" />
          <span>Book Your Product</span>
        </div>
      </div>

      {/* Main Footer (Terracotta #A93717) */}
      <div
        className="w-full text-white pt-12 pb-8 px-6 sm:px-16"
        style={{ backgroundColor: "#A93717", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-sm">
          {/* 1. About Wonky */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-base tracking-wide text-white">About Wonky</h4>
            <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
              Your one-stop destination for quality kids' clothing. We offer a wide range of dresses, casual wear, and party wear for your little ones.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-base tracking-wide text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-white/80 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="#boys" className="hover:text-white transition">Boys Collection</Link>
              </li>
              <li>
                <Link href="#girls" className="hover:text-white transition">Girls Collection</Link>
              </li>
              <li>
                <Link href="#track" className="hover:text-white transition">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* 3. Shipping & Policies */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-base tracking-wide text-white">Shipping & Policies</h4>
            <ul className="flex flex-col gap-2 text-white/80 text-xs sm:text-sm">
              <li>
                <Link href="#shipping" className="hover:text-white transition">Shipping Policy</Link>
              </li>
              <li>
                <Link href="#return" className="hover:text-white transition">Return Policy</Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-white transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#booking" className="hover:text-white transition">Booking Policy</Link>
              </li>
            </ul>
          </div>

          {/* 4. Follow Us */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-base tracking-wide text-white">Follow Us</h4>
            <div className="flex items-center gap-3.5 text-white">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="Facebook">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="Instagram">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="YouTube">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="Twitter">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <p className="text-white/80 text-xs mt-1 leading-relaxed">
              Stay connected for exclusive offers and updates!
            </p>
          </div>
        </div>

        {/* Divider line and copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/20 pt-6 text-center text-xs text-white/70">
          <p>© 2025 Wonky. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

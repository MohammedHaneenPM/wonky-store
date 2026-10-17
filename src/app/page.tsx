"use client";

import { useProducts } from "@/context/ProductContext";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSections from "@/components/ProductSections";
import Footer from "@/components/Footer";

export default function Home() {
  const { products } = useProducts();

  const arrivals = products.filter((p) => p.category === "arrivals" || p.category === "both");
  const deals = products.filter((p) => p.category === "deals" || p.category === "both");

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* 1. Initial & Refresh GSAP Animated Loading Screen */}
      <LoadingScreen minDurationMs={1500} />

      {/* 2. Header */}
      <Header />

      {/* 3. Hero Section with hero-image.png */}
      <HeroSection />

      {/* 4. Product Catalog Sections (New Arrivals + Mid Banner + Top Deals) */}
      <ProductSections
        arrivals={arrivals}
        deals={deals}
      />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}

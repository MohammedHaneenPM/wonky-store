"use client";

import { use, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Star, Ruler, ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";

export const dynamic = "force-dynamic";

function ProductDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, getProductById } = useProducts();

  const product = getProductById(resolvedParams.id) || products[0];

  const [selectedSize, setSelectedSize] = useState("1-2 Years");
  const [selectedColor, setSelectedColor] = useState("Charcoal");
  const [activeThumb, setActiveThumb] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const sizes = ["1-2 Years", "2-3 Years", "3-4 Years", "4-5 Years"];
  const colors = [
    { name: "Charcoal", hex: "#2B2B2B" },
    { name: "Oatmeal", hex: "#D4C7B8" },
    { name: "Terracotta", hex: "#D58A6D" },
    { name: "Slate Blue", hex: "#6F8EA1" },
  ];

  const thumbnails = [product.image, "/images/image 16.png"];

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  const handleBuyNow = () => {
    router.push(
      `/checkout?id=${product.id}&size=${encodeURIComponent(
        selectedSize
      )}&color=${encodeURIComponent(selectedColor)}`
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1">
      {/* Breadcrumb / Back Link */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-[#A93717] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs">
          {product.name}
        </span>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
        {/* Thumbnails Column (2 cols) */}
        <div className="hidden sm:flex md:col-span-2 flex-col gap-4">
          {thumbnails.map((thumb, index) => (
            <button
              key={index}
              onClick={() => setActiveThumb(index)}
              className={`relative w-24 h-32 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-xs ${
                activeThumb === index
                  ? "border-[#A93717] shadow-md ring-2 ring-[#A93717]/20"
                  : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={thumb}
                alt={`${product.name} preview ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Large Main Image (5 cols) */}
        <div className="md:col-span-5 relative w-full aspect-3/4 max-h-[560px] rounded-2xl overflow-hidden bg-[#FAF9F7] shadow-sm">
          <Image
            src={thumbnails[activeThumb] || product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-center"
            priority
          />

          {/* Wishlist Heart Button */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-transform active:scale-90"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited
                  ? "fill-[#A93717] text-[#A93717]"
                  : "text-gray-400 hover:text-[#A93717]"
              }`}
            />
          </button>
        </div>

        {/* Details & Selectors (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-start">
          {/* Title in Delius */}
          <h1
            className="text-2xl sm:text-[28px] font-normal text-[#1A1A1A] tracking-normal leading-tight"
            style={{ fontFamily: "var(--font-delius), cursive" }}
          >
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-2.5 text-sm">
            <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
            <span
              className="font-medium text-[#1A1A1A]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {product.rating}
            </span>
            <span
              className="text-[#6B7280]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Pricing Row: Green Sale Price First, Grey Strikethrough Second, Red Discount Pill Third */}
          <div className="flex items-center gap-3 mt-3.5">
            {/* Sale Price in Delius */}
            <span
              className="text-2xl font-bold text-[#10B981]"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              ₹{product.salePrice}
            </span>

            {/* Original Strikethrough in Delius */}
            <span
              className="text-xl text-[#9CA3AF] line-through font-normal"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              ₹{product.originalPrice}
            </span>

            {/* Offer Tag in #D4183D with Arial numbers */}
            <span
              className="text-xs font-semibold text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-0.5 shadow-2xs"
              style={{
                backgroundColor: "#D4183D",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <span>{product.discountPercent}%</span>
              <span>OFF</span>
            </span>
          </div>

          {/* Select Options Header */}
          <div className="mt-8">
            <h2
              className="text-base font-normal text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              Select Options
            </h2>

            {/* Size Sub-row */}
            <div className="flex items-center justify-between text-sm mb-2.5">
              <span
                className="text-[#1A1A1A]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Size: <span className="text-[#1A1A1A]">{selectedSize}</span>
              </span>
              <button
                className="flex items-center gap-1.5 text-xs text-[#E45028] hover:underline cursor-pointer font-medium"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                <span>Size Chart</span>
                <Ruler className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Size Pills */}
            <div className="grid grid-cols-4 gap-2.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 px-1 text-xs sm:text-sm rounded-lg border font-normal transition-all cursor-pointer text-center ${
                    selectedSize === s
                      ? "border-[#E45028] text-[#1A1A1A] bg-transparent ring-1 ring-[#E45028]"
                      : "border-gray-200 text-[#1A1A1A] hover:border-gray-300"
                  }`}
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Section */}
          <div className="mt-6">
            <span
              className="text-sm text-[#1A1A1A] block mb-2.5"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Color: <span className="text-[#1A1A1A]">{selectedColor}</span>
            </span>
            <div className="flex items-center gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                    selectedColor === c.name
                      ? "border-[#1A1A1A] ring-2 ring-[#1A1A1A] ring-offset-2 scale-105"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Primary Buy Now Button */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-xl text-white font-medium shadow-md hover:brightness-105 active:scale-[0.99] transition-all text-base cursor-pointer"
              style={{
                backgroundColor: "#E45028",
                fontFamily: "var(--font-delius), cursive",
              }}
            >
              Buy Now
            </button>

            {/* Return Policy Notice */}
            <p
              className="text-xs text-[#4B5563] mt-1"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Return within 7 days if unused.{" "}
              <span className="font-medium text-[#1A1A1A] cursor-pointer hover:underline">
                View return policy
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <section className="mt-16 pt-12 border-t border-gray-100 flex flex-col items-center">
        <div className="mb-8 text-center">
          <div
            className="inline-block px-6 py-2 rounded-sm border"
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
              Related Items
            </h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center p-12 text-gray-500">
            Loading product details...
          </div>
        }
      >
        <ProductDetailContent params={params} />
      </Suspense>
      <Footer />
    </div>
  );
}

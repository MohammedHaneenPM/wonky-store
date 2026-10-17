"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, Star, Ruler, CheckCircle } from "lucide-react";
import { Product } from "@/data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product, size: string, color: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onBuyNow,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("1-2 Years");
  const [selectedColor, setSelectedColor] = useState("Charcoal");
  const [isFavorited, setIsFavorited] = useState(false);

  if (!product) return null;

  const sizes = ["1-2 Years", "2-3 Years", "3-4 Years", "4-5 Years"];
  const colors = [
    { name: "Charcoal", hex: "#2B2B2B" },
    { name: "Oatmeal", hex: "#D4C7B8" },
    { name: "Terracotta", hex: "#D58A6D" },
    { name: "Slate Blue", hex: "#6F8EA1" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Preview */}
        <div className="w-full md:w-1/2 p-6 bg-[#FAF9F7] flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
            <div className="relative w-16 h-20 rounded-lg overflow-hidden border-2 border-[#A93717] shadow-xs cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-gray-200 opacity-70 hover:opacity-100 transition shadow-xs cursor-pointer">
              <Image
                src="/images/image 16.png"
                alt="Detail preview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Main Large Image */}
          <div className="relative w-64 sm:w-72 aspect-3/4 rounded-xl overflow-hidden shadow-sm bg-white order-1 sm:order-2">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorited
                    ? "fill-[#A93717] text-[#A93717]"
                    : "text-gray-400 hover:text-[#A93717]"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Side: Options and Buy */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <h2
              className="text-2xl font-normal text-gray-800"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
              <span className="font-semibold text-gray-800">{product.rating}</span>
              <span>({product.reviewsCount} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-bold text-emerald-600">
                ₹{product.salePrice}
              </span>
              <span className="text-base text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
              <span
                className="text-xs font-semibold text-white px-2 py-0.5 rounded-sm uppercase tracking-wide"
                style={{ backgroundColor: "#A93717" }}
              >
                {product.discountPercent}% OFF
              </span>
            </div>

            {/* Size Options */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">
                  Size: <span className="text-gray-900">{selectedSize}</span>
                </span>
                <button className="flex items-center gap-1 text-xs text-[#A93717] hover:underline">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs rounded-lg border font-medium transition-all ${
                      selectedSize === s
                        ? "border-[#A93717] text-[#A93717] bg-[#F8EDE7]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mt-5">
              <span className="text-sm font-medium text-gray-700 block mb-2">
                Color: <span className="text-gray-900">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === c.name
                        ? "border-[#A93717] scale-110 ring-2 ring-[#A93717]/30"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Button & Guarantee */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => onBuyNow(product, selectedSize, selectedColor)}
              className="w-full py-3.5 rounded-xl font-semibold text-white shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
              style={{ backgroundColor: "#E45028" }}
            >
              Buy Now
            </button>

            <p className="text-center text-xs text-gray-500">
              Return within 7 days if unused.{" "}
              <span className="underline cursor-pointer text-gray-700">
                View return policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

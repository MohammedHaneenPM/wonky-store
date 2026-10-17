"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(product.isFavorite || false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/checkout?id=${product.id}&size=1-2%20Years&color=Charcoal`);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#EFE4DC]/60 hover:border-[#5912B9] hover:shadow-xl transition-colors duration-300 flex flex-col cursor-pointer block h-full select-none"
    >
      {/* 
        Image & Animated Overlay Container
        This container has a FIXED aspect ratio so the product card size NEVER changes on hover.
      */}
      <div className="relative w-full aspect-square bg-[#FBF9F7] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center shadow-md transition-transform active:scale-90 z-20"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors stroke-[2] ${
              isFavorited
                ? "fill-[#E45028] text-[#E45028]"
                : "text-[#E45028]"
            }`}
          />
        </button>

        {/* 
          Sliding Action Drawer:
          - Starts translated 100% downward (hidden below the image area)
          - On hover, it slides upward into the bottom of the image area
          - The top edge of this drawer IS the dotted line!
          - The 'Buy now' button sits cleanly directly below this dotted line
        */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white/95 backdrop-blur-xs p-3 flex flex-col border-t border-dashed border-[#5912B9]">
          <button
            onClick={handleBuyNow}
            className="w-full py-2 px-3 rounded-xl text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            style={{ backgroundColor: "#5912B9" }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Buy now</span>
          </button>
        </div>
      </div>

      {/* 
        Card Info Section:
        - 100% Fixed dimensions and static layout
        - Absolutely no expansion, push, or height change on hover
      */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between bg-white shrink-0">
        <div>
          {/* Title in Delius font */}
          <h3
            className="text-sm sm:text-base font-normal text-gray-800 line-clamp-1 group-hover:text-[#5912B9] transition-colors"
            style={{ fontFamily: "var(--font-delius), cursive" }}
          >
            {product.name}
          </h3>

          {/* Pricing Row */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 flex-wrap">
            {/* Original Strikethrough Price in Delius */}
            <span
              className="text-xs sm:text-sm text-gray-500 line-through font-normal"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              ₹{product.originalPrice}
            </span>

            {/* Sale Price in Delius */}
            <span
              className="text-xs sm:text-sm font-bold text-[#10B981]"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              ₹{product.salePrice}
            </span>

            {/* Offer Deal Tag in #D4183D with Arial numbers */}
            <span
              className="text-[9px] sm:text-[10px] font-semibold text-white px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-0.5"
              style={{
                backgroundColor: "#D4183D",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <span>{product.discountPercent}%</span>
              <span>OFF</span>
            </span>
          </div>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
          <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
          <span className="font-semibold text-gray-700">{product.rating}</span>
          <span>({product.reviewsCount} reviews)</span>
        </div>
      </div>
    </Link>
  );
}

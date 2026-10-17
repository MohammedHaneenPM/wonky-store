"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Ruler, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, placeOrder } = useProducts();

  const productId = searchParams.get("id") || products[0].id;
  const initialSize = searchParams.get("size") || "1-2 Years";
  const initialColor = searchParams.get("color") || "Charcoal";

  const product = products.find((p) => p.id === productId) || products[0];

  const [size, setSize] = useState(initialSize);
  const [color, setColor] = useState(initialColor);
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCharge = 50;
  const totalAmount = product.salePrice + deliveryCharge;

  const sizes = ["1-2 Years", "2-3 Years", "3-4 Years", "4-5 Years"];
  const colors = [
    { name: "Charcoal", hex: "#2B2B2B" },
    { name: "Oatmeal", hex: "#D4C7B8" },
    { name: "Terracotta", hex: "#D58A6D" },
    { name: "Slate Blue", hex: "#6F8EA1" },
  ];

  const handleConfirmAndPay = async () => {
    setIsProcessing(true);
    try {
      const order = await placeOrder(product, size, color);
      setIsProcessing(false);
      // Navigate to dedicated order success page
      router.push(`/order-success?orderId=${order.id}`);
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 flex-1">
      {/* Navigation link / Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/product/${product.id}`}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#A93717] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Product</span>
        </Link>
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
          Secure Checkout
        </span>
      </div>

      {/* Two Column Layout Matching checkout.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Selection Summary (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EFE4DC] p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          <div className="relative w-full aspect-4/5 max-h-[420px] rounded-xl overflow-hidden bg-[#FAF9F7]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
              priority
            />
          </div>

          <div>
            <h1
              className="text-2xl font-normal text-gray-800"
              style={{ fontFamily: "var(--font-delius), cursive" }}
            >
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="flex items-center gap-3 mt-3">
              <span
                className="text-xl font-bold text-emerald-600"
                style={{ fontFamily: "var(--font-delius), cursive" }}
              >
                ₹{product.salePrice}
              </span>
              <span
                className="text-sm text-gray-400 line-through"
                style={{ fontFamily: "var(--font-delius), cursive" }}
              >
                ₹{product.originalPrice}
              </span>
              <span
                className="text-[11px] font-semibold text-white px-2 py-0.5 rounded-sm uppercase tracking-wide inline-flex items-center gap-0.5"
                style={{
                  backgroundColor: "#D4183D",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                <span>{product.discountPercent}%</span>
                <span>OFF</span>
              </span>
            </div>

            {/* Select Options */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Select Options
              </h3>

              {/* Size Selector */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span>
                    Size: <strong className="text-gray-900">{size}</strong>
                  </span>
                  <span className="flex items-center gap-1 text-[#A93717] cursor-pointer">
                    <Ruler className="w-3 h-3" /> Size Chart
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-2 text-xs rounded-lg border font-medium transition cursor-pointer ${
                        size === s
                          ? "border-[#A93717] text-[#A93717] bg-[#F8EDE7]"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <span className="text-xs text-gray-600 block mb-2">
                  Color: <strong className="text-gray-900">{color}</strong>
                </span>
                <div className="flex items-center gap-2.5">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition cursor-pointer ${
                        color === c.name
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
          </div>
        </div>

        {/* Right Column: Order Summary Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col gap-6 sticky top-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">
            Summary
          </h2>

          <div className="flex flex-col gap-3.5 text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <span>Price :</span>
              <span className="font-semibold text-gray-900">
                ₹{product.salePrice}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery Charge :</span>
              <span className="font-semibold text-gray-900">
                ₹{deliveryCharge}
              </span>
            </div>
            <div className="border-t border-gray-200 my-1" />
            <div className="flex justify-between items-center text-lg font-bold text-gray-900">
              <span>Total Amount :</span>
              <span className="text-[#A93717]">₹{totalAmount}</span>
            </div>
          </div>

          {/* Confirm & Pay Button */}
          <button
            onClick={handleConfirmAndPay}
            disabled={isProcessing}
            className="w-full py-4 rounded-xl text-white font-semibold text-base shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            style={{ backgroundColor: "#E45028" }}
          >
            {isProcessing ? (
              <span>Processing Payment...</span>
            ) : (
              <>
                <span>Confirm &amp; Pay ₹{totalAmount}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed 256-bit Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF9]">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center p-12 text-gray-500">
            Loading checkout...
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}

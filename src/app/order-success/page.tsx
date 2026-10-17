"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShoppingBag, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { orders } = useProducts();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-8 py-12 flex-1 flex flex-col items-center">
      {/* Top Banner Ribbon (matching order-comfirm.png) */}
      <div className="w-full py-3.5 px-6 rounded-t-2xl bg-[#E7F8EE] text-[#1E7E34] font-medium text-sm sm:text-base border border-[#D4EDDA] text-center mb-8 shadow-xs">
        Order Successful
      </div>

      <div className="w-full bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 shadow-sm flex flex-col items-center text-center">
        {/* Large Green Checkmark Circle */}
        <div className="w-24 h-24 rounded-full bg-[#4CD924] flex items-center justify-center text-white shadow-xl mb-6">
          <Check className="w-12 h-12 stroke-[3]" />
        </div>

        {/* Title */}
        <h1
          className="text-3xl font-semibold text-gray-900 tracking-tight mb-2"
          style={{ fontFamily: "var(--font-public-sans), sans-serif" }}
        >
          Thank you for shopping
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed mb-8">
          Your order has been successfully placed and is now being processed.
        </p>

        {/* Order Details Card if order found */}
        {currentOrder && (
          <div className="w-full max-w-md bg-[#FAF9F7] rounded-xl p-5 border border-[#EFE4DC] mb-8 text-left text-xs sm:text-sm text-gray-700 flex flex-col gap-2">
            <div className="flex justify-between font-semibold text-gray-900 pb-2 border-b border-gray-200">
              <span>Order ID:</span>
              <span className="text-[#A93717]">{currentOrder.id}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Item:</span>
              <span className="font-medium text-gray-900">{currentOrder.product.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Options:</span>
              <span>Size: {currentOrder.size} | Color: {currentOrder.color}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-dashed">
              <span>Amount Paid:</span>
              <span className="text-emerald-600">₹{currentOrder.totalAmount}</span>
            </div>
          </div>
        )}

        {/* Action Button: Go to Orders / Continue Shopping */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            href="/"
            className="flex-1 py-3.5 px-6 rounded-xl text-white font-semibold shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: "#E45028" }}
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/admin"
            className="py-3.5 px-6 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-700 font-medium transition-all flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4 text-gray-500" />
            <span>View All Orders</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF9]">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center p-12 text-gray-500">
            Loading confirmation...
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}

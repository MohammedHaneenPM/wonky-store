"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { Product } from "@/data/products";

interface CheckoutModalProps {
  product: Product | null;
  size: string;
  color: string;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  product,
  size,
  color,
  isOpen,
  onClose,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !product) return null;

  const deliveryCharge = 50;
  const totalAmount = product.salePrice + deliveryCharge;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onOrderSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Breadcrumb / Title */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Checkout
          </span>
          <h2
            className="text-xl sm:text-2xl font-normal text-gray-800 mt-1"
            style={{ fontFamily: "var(--font-delius), cursive" }}
          >
            Review Your Order
          </h2>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Product Summary */}
          <div className="flex gap-4 p-4 rounded-xl bg-[#FAF9F7] border border-[#EFE4DC]">
            <div className="relative w-24 h-32 rounded-lg overflow-hidden shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3
                  className="font-normal text-base text-gray-900"
                  style={{ fontFamily: "var(--font-delius), cursive" }}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">Size: {size}</p>
                <p className="text-xs text-gray-500">Color: {color}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-emerald-600">
                  ₹{product.salePrice}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Cost Breakdown (Matching checkout.png) */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">
              Summary
            </h3>

            <div className="flex flex-col gap-2.5 text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <span>Price :</span>
                <span className="font-medium text-gray-900">₹{product.salePrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Charge :</span>
                <span className="font-medium text-gray-900">₹{deliveryCharge}</span>
              </div>
              <div className="border-t border-dashed my-1" />
              <div className="flex justify-between items-center text-base font-bold text-gray-900">
                <span>Total Amount :</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Confirm & Pay Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={isProcessing}
              className="mt-4 w-full py-3.5 rounded-xl text-white font-semibold shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              style={{ backgroundColor: "#E45028" }}
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <span>Confirm &amp; Pay ₹{totalAmount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

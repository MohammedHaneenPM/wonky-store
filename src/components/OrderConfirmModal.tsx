"use client";

import { Check, ArrowRight } from "lucide-react";

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderConfirmModal({
  isOpen,
  onClose,
}: OrderConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center">
        {/* Top subtle banner strip */}
        <div className="w-full -mx-8 -mt-8 py-3.5 bg-[#E7F8EE] text-[#1E7E34] font-medium text-sm border-b border-[#D4EDDA] mb-8">
          Order Successful
        </div>

        {/* Big Green Circle Checkmark (Matching order-comfirm.png) */}
        <div className="w-20 h-20 rounded-full bg-[#4CD924] flex items-center justify-center text-white shadow-lg mb-6 transform scale-100 animate-in zoom-in-75 duration-300">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">
          Thank you for shopping
        </h2>

        {/* Body Text */}
        <p className="text-sm text-gray-600 max-w-xs leading-relaxed mb-8">
          Your order has been successfully placed and is now being processed.
        </p>

        {/* Go to Orders Button */}
        <button
          onClick={onClose}
          className="w-full max-w-xs py-3.5 px-6 rounded-xl text-white font-semibold shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          style={{ backgroundColor: "#E45028" }}
        >
          <span>Go to Orders</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

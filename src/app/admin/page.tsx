"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, Package, Check, Upload, ImageIcon, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/data/products";

export default function AdminDashboardPage() {
  const { products, orders, addProduct, deleteProduct } = useProducts();

  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [showAddModal, setShowAddModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // New product form state
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState(1999);
  const [salePrice, setSalePrice] = useState(1399);
  const [category, setCategory] = useState<"arrivals" | "deals">("arrivals");
  const [selectedImg, setSelectedImg] = useState("/images/product-img1.png");
  const [customUploadedImg, setCustomUploadedImg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableImgs = [
    "/images/product-img1.png",
    "/images/product-img2.png",
    "/images/product-img3.png",
    "/images/product-img4.png",
    "/images/product-img5.png",
    "/images/product-img6.png",
    "/images/product-img7.jpg",
    "/images/product-img8.jpg",
    "/images/product-img9.png",
    "/images/product-img10.png",
    "/images/product-img11.png",
    "/images/product-img12.png",
  ];

  const [isUploading, setIsUploading] = useState(false);

  // Handle image file upload directly to Vercel Blob
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Direct POST to our server-side Vercel Blob endpoint
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        }
      );

      if (response.ok) {
        const blobData = await response.json();
        if (blobData?.url) {
          setCustomUploadedImg(blobData.url);
          setSelectedImg(blobData.url);
          setIsUploading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Direct blob upload failed, falling back to data URL:", err);
    }

    // 2. Fallback to FileReader if Vercel token is not active locally
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setCustomUploadedImg(result);
      setSelectedImg(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const discountPercent = Math.round(
      ((originalPrice - salePrice) / originalPrice) * 100
    );

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      originalPrice,
      salePrice,
      discountPercent: discountPercent > 0 ? discountPercent : 0,
      rating: 4.5,
      reviewsCount: 0,
      image: selectedImg,
      category,
    };

    addProduct(newProd);
    setName("");
    setCustomUploadedImg(null);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF9]">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Link href="/" className="hover:text-[#A93717] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Wonky Store Admin
            </h1>
            <p className="text-xs text-gray-500">
              Manage live catalog products, upload product images &amp; track customer orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex rounded-lg bg-gray-100 p-1 text-xs font-medium">
              <button
                onClick={() => setActiveTab("products")}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  activeTab === "products"
                    ? "bg-white shadow-xs text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-white shadow-xs text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Orders ({orders.length})
              </button>
            </div>

            {/* Add Product Button */}
            {activeTab === "products" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-lg text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-1.5 cursor-pointer hover:brightness-105"
                style={{ backgroundColor: "#A93717" }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === "products" && (
          <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full bg-gray-50">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                    <span
                      className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white px-2 py-0.5 rounded-sm uppercase"
                      style={{ backgroundColor: "#A93717" }}
                    >
                      {p.category}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-1">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-emerald-600 font-semibold text-sm">
                          ₹{p.salePrice}
                        </span>
                        <span className="text-gray-400 text-xs line-through">
                          ₹{p.originalPrice}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({p.discountPercent}% off)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                      <Link
                        href={`/product/${p.id}`}
                        className="text-xs text-[#A93717] hover:underline"
                      >
                        View in Store →
                      </Link>

                      <button
                        onClick={() => setProductToDelete(p)}
                        className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === "orders" && (
          <div className="mt-8">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-gray-400 bg-white rounded-2xl border border-gray-200">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-base font-medium text-gray-700">No orders placed yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  Place an order from any product checkout to see it recorded here.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF9F7] text-gray-600 uppercase font-semibold text-[11px] border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Item</th>
                      <th className="py-3.5 px-4">Options</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50/60">
                        <td className="py-3.5 px-4 font-mono font-medium text-[#A93717]">
                          {o.id}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-gray-900">
                          {o.product.name}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-gray-500">
                          Size: {o.size} | Color: {o.color}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-600">
                          ₹{o.totalAmount}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-gray-400">
                          {o.createdAt}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Check className="w-3 h-3" /> Paid &amp; Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Add New Product
              </h2>

              <form onSubmit={handleCreateProduct} className="flex flex-col gap-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Linen Summer Romper"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#A93717]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={salePrice}
                      onChange={(e) => setSalePrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#A93717]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#A93717]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category Section
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as "arrivals" | "deals")}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#A93717]"
                  >
                    <option value="arrivals">New Arrivals</option>
                    <option value="deals">Top Deals</option>
                  </select>
                </div>

                {/* Upload Image Section */}
                <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#EFE4DC]">
                  <label className="block text-xs font-semibold text-gray-800 mb-2">
                    Product Image
                  </label>

                  {/* Hidden Native File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Upload Trigger Button & Preview */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-lg border border-dashed border-[#A93717] bg-[#F8EDE7]/60 hover:bg-[#F8EDE7] text-[#A93717] font-medium text-xs flex items-center gap-2 cursor-pointer transition shadow-2xs disabled:opacity-60"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isUploading ? "Uploading to Vercel Blob..." : "Upload Image (Vercel Blob)"}</span>
                    </button>

                    {/* Preview box */}
                    {selectedImg && (
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-300 shrink-0">
                          <Image
                            src={selectedImg}
                            alt="Selected preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-[11px] text-gray-500">
                          {customUploadedImg ? "Custom Upload Active" : "Selected"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Preset Assets Picker */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-[11px] text-gray-500 mb-2">
                      Or choose from catalog presets:
                    </p>
                    <div className="grid grid-cols-6 gap-2 max-h-28 overflow-y-auto p-1 border rounded-lg bg-white">
                      {availableImgs.map((img) => (
                        <button
                          type="button"
                          key={img}
                          onClick={() => {
                            setSelectedImg(img);
                            setCustomUploadedImg(null);
                          }}
                          className={`relative aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                            selectedImg === img && !customUploadedImg
                              ? "border-[#A93717] ring-2 ring-[#A93717]/30"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image src={img} alt="Thumb" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-white font-medium cursor-pointer shadow-xs hover:brightness-105"
                    style={{ backgroundColor: "#A93717" }}
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center">
              {/* Alert Icon */}
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7" />
              </div>

              {/* Confirmation Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Are you sure to delete this product?
              </h3>

              {/* Product Info Preview */}
              <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-xs">
                You are about to delete <span className="font-semibold text-gray-800">"{productToDelete.name}"</span>. This item will be permanently removed from the store catalog.
              </p>

              {/* Action Buttons: Cancel and Delete */}
              <div className="flex items-center justify-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteProduct(productToDelete.id);
                    setProductToDelete(null);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-medium text-sm transition shadow-sm cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

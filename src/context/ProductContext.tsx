"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, Product } from "@/data/products";
import {
  fetchProductsFromFirebase,
  saveProductToFirebase,
  deleteProductFromFirebase,
  fetchOrdersFromFirebase,
  saveOrderToFirebase,
} from "@/lib/firestoreService";
import { isFirebaseConfigured } from "@/lib/firebase";

export interface OrderItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  price: number;
  deliveryCharge: number;
  totalAmount: number;
  createdAt: string;
}

interface ProductContextType {
  products: Product[];
  orders: OrderItem[];
  isLoading: boolean;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  placeOrder: (product: Product, size: string, color: string) => Promise<OrderItem>;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data: Firestore if configured, otherwise localStorage
  useEffect(() => {
    async function initData() {
      setIsLoading(true);

      if (isFirebaseConfigured) {
        try {
          const fbProducts = await fetchProductsFromFirebase();
          if (fbProducts && fbProducts.length > 0) {
            setProducts(fbProducts);
          }
          const fbOrders = await fetchOrdersFromFirebase();
          if (fbOrders) {
            setOrders(fbOrders);
          }
          setIsLoading(false);
          return;
        } catch (e) {
          console.warn("Firebase fetch error, falling back to local storage:", e);
        }
      }

      // LocalStorage fallback
      try {
        const savedProducts = localStorage.getItem("wonky_products");
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
        const savedOrders = localStorage.getItem("wonky_orders");
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch {
        // Ignore
      }
      setIsLoading(false);
    }

    initData();
  }, []);

  const saveProductsLocal = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem("wonky_products", JSON.stringify(newProducts));
    } catch {
      // Ignore
    }
  };

  const addProduct = async (product: Product) => {
    const updated = [product, ...products];
    saveProductsLocal(updated);

    if (isFirebaseConfigured) {
      try {
        await saveProductToFirebase(product);
      } catch (err) {
        console.error("Failed to sync new product to Firestore:", err);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProductsLocal(updated);

    if (isFirebaseConfigured) {
      try {
        await deleteProductFromFirebase(id);
      } catch (err) {
        console.error("Failed to delete product from Firestore:", err);
      }
    }
  };

  const updateProduct = async (product: Product) => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    saveProductsLocal(updated);

    if (isFirebaseConfigured) {
      try {
        await saveProductToFirebase(product);
      } catch (err) {
        console.error("Failed to update product in Firestore:", err);
      }
    }
  };

  const placeOrder = async (
    product: Product,
    size: string,
    color: string
  ): Promise<OrderItem> => {
    const newOrder: OrderItem = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      product,
      size,
      color,
      price: product.salePrice,
      deliveryCharge: 50,
      totalAmount: product.salePrice + 50,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem("wonky_orders", JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (isFirebaseConfigured) {
      try {
        await saveOrderToFirebase(newOrder);
      } catch (err) {
        console.error("Failed to sync order to Firestore:", err);
      }
    }

    return newOrder;
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        isLoading,
        addProduct,
        deleteProduct,
        updateProduct,
        placeOrder,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

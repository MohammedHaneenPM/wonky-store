import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from "@/data/products";
import { OrderItem } from "@/context/ProductContext";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";

// 1. Fetch All Products (Firestore -> fallback to localStorage / defaults)
export async function fetchProductsFromFirebase(): Promise<Product[]> {
  if (!isFirebaseConfigured || !db) {
    return [];
  }

  try {
    const q = query(collection(db, PRODUCTS_COLLECTION));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Seed default products to Firestore if empty
      const seedList: Product[] = [];
      for (const prod of DEFAULT_PRODUCTS) {
        await setDoc(doc(db, PRODUCTS_COLLECTION, prod.id), prod);
        seedList.push(prod);
      }
      return seedList;
    }

    const items: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ ...(docSnap.data() as Product), id: docSnap.id });
    });
    return items;
  } catch (error) {
    console.warn("Firestore fetch error, falling back to local:", error);
    return [];
  }
}

// 2. Add / Update Product in Firebase
export async function saveProductToFirebase(product: Product): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    await setDoc(doc(db, PRODUCTS_COLLECTION, product.id), {
      ...product,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving product to Firebase:", error);
    throw error;
  }
}

// 3. Delete Product from Firebase
export async function deleteProductFromFirebase(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting product from Firebase:", error);
    throw error;
  }
}

// 4. Fetch Orders from Firebase
export async function fetchOrdersFromFirebase(): Promise<OrderItem[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const items: OrderItem[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ ...(docSnap.data() as OrderItem), id: docSnap.id });
    });
    return items;
  } catch (error) {
    console.warn("Firestore orders fetch error:", error);
    return [];
  }
}

// 5. Save Order to Firebase
export async function saveOrderToFirebase(order: OrderItem): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    await setDoc(doc(db, ORDERS_COLLECTION, order.id), order);
  } catch (error) {
    console.error("Error saving order to Firebase:", error);
    throw error;
  }
}

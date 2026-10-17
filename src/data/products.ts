export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: "arrivals" | "deals" | "both";
  isFavorite?: boolean;
  colors?: string[];
  sizes?: string[];
}

export const PRODUCTS: Product[] = [
  // New Arrivals
  {
    id: "prod-1",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img1.png",
    category: "arrivals",
    colors: ["#3D3A37", "#D4C5B9", "#E5A086", "#6F8E9C"],
    sizes: ["1-2 Years", "2-3 Years", "3-4 Years", "4-5 Years"],
  },
  {
    id: "prod-2",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img2.png",
    category: "arrivals",
    isFavorite: true,
  },
  {
    id: "prod-3",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img3.png",
    category: "arrivals",
  },
  {
    id: "prod-4",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img4.png",
    category: "arrivals",
  },
  // Top Deals
  {
    id: "prod-5",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img5.png",
    category: "deals",
  },
  {
    id: "prod-6",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img6.png",
    category: "deals",
  },
  {
    id: "prod-7",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img7.jpg",
    category: "deals",
  },
  {
    id: "prod-8",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img8.jpg",
    category: "deals",
  },
  {
    id: "prod-9",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img9.png",
    category: "deals",
  },
  {
    id: "prod-10",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img10.png",
    category: "deals",
  },
  {
    id: "prod-11",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img11.png",
    category: "deals",
  },
  {
    id: "prod-12",
    name: "Floral Summer Dress",
    originalPrice: 1999,
    salePrice: 1399,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 0,
    image: "/images/product-img12.png",
    category: "deals",
  },
];

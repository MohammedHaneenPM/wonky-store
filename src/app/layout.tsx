import type { Metadata } from "next";
import { Delius, Public_Sans } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";

const delius = Delius({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delius",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wonky - Online Kids Clothing & eCommerce Store",
  description: "Shop comfortable, trendy, and high-quality kids clothing at Wonky. Summer sale is on!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${delius.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ProductProvider>
          {children}
        </ProductProvider>
      </body>
    </html>
  );
}

import React from "react";
import Products from "@/components/Products/Products";

/* =========================
   SEO METADATA (EN)
========================= */
export const metadata = {
  title: "Morion PPF Products | Premium Paint Protection Films",

  description:
    "Explore Morion’s premium Paint Protection Film (PPF) products designed to protect vehicles from scratches, rock chips, UV damage, and environmental wear. Trusted by professional installers.",

  keywords: [
    "Morion PPF products",
    "Paint Protection Film products",
    "Car PPF films",
    "Automotive paint protection film",
    "Clear PPF",
    "Matte PPF",
    "Self healing PPF",
    "Car coating films",
    "PPF Saudi Arabia"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/en/products",
    languages: {
      en: "https://www.morionppf.com/en/products",
      ar: "https://www.morionppf.com/ar/products"
    }
  },

  openGraph: {
    title: "Morion Paint Protection Film Products",
    description:
      "High-performance Paint Protection Film products engineered for clarity, durability, and long-term vehicle protection.",
    url: "https://www.morionppf.com/en/products",
    siteName: "Morion Paint Protection Film",
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Morion PPF Products",
    description:
      "Premium automotive paint protection films trusted by professionals.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  }
};

const ProductPageEn = () => {
  return <Products />;
};

export default ProductPageEn;

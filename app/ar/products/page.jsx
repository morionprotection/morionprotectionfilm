import React from "react";
import Products from "@/components/Products/Products";

/* =========================
   SEO METADATA (AR)
========================= */
export const metadata = {
  title: "منتجات موريون | أفلام حماية طلاء السيارات PPF",

  description:
    "تعرّف على منتجات موريون لفيلم حماية طلاء السيارات (PPF)، المصممة لحماية السيارة من الخدوش، العوامل البيئية، وأشعة الشمس مع جودة عالية وضمان طويل الأمد.",

  keywords: [
    "منتجات موريون",
    "فيلم حماية الطلاء",
    "حماية طلاء السيارات",
    "PPF سيارات",
    "أفلام حماية السيارات",
    "PPF السعودية",
    "حماية السيارة من الخدوش",
    "فيلم حماية شفاف",
    "فيلم حماية مطفي"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/ar/products",
    languages: {
      ar: "https://www.morionppf.com/ar/products",
      en: "https://www.morionppf.com/en/products"
    }
  },

  openGraph: {
    title: "منتجات موريون – أفلام حماية طلاء السيارات",
    description:
      "منتجات عالية الجودة لفيلم حماية طلاء السيارات تجمع بين الشفافية، المتانة، والتقنية المتقدمة.",
    url: "https://www.morionppf.com/ar/products",
    siteName: "Morion Paint Protection Film",
    locale: "ar_SA",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "منتجات موريون لحماية طلاء السيارات",
    description:
      "اكتشف مجموعة أفلام حماية الطلاء من موريون المصممة خصيصاً لبيئة المملكة.",
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

const ProductPageAr = () => {
  return <Products />;
};

export default ProductPageAr;

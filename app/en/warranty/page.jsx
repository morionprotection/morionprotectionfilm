import React from "react";
import Warranty from "@/components/Warranty/Warranty";

/* =========================
   SEO METADATA (EN)
========================= */
export const metadata = {
  title: "Morion PPF Warranty | Long-Term Paint Protection Coverage",

  description:
    "Learn about Morion’s comprehensive Paint Protection Film (PPF) warranty, covering manufacturing defects, durability, and long-term vehicle paint protection when installed by authorized dealers.",

  keywords: [
    "Morion PPF warranty",
    "Paint Protection Film warranty",
    "Car PPF warranty coverage",
    "PPF long term warranty",
    "Automotive paint protection guarantee",
    "PPF warranty Saudi Arabia",
    "Authorized PPF installer warranty",
    "Car paint protection coverage"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/en/warranty",
    languages: {
      en: "https://www.morionppf.com/en/warranty",
      ar: "https://www.morionppf.com/ar/warranty"
    }
  },

  openGraph: {
    title: "Morion Paint Protection Film Warranty",
    description:
      "Official Morion warranty coverage for Paint Protection Film installed by authorized dealers.",
    url: "https://www.morionppf.com/en/warranty",
    siteName: "Morion Paint Protection Film",
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Morion PPF Warranty",
    description:
      "Discover Morion’s official Paint Protection Film warranty and coverage details.",
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

const WarrantyPageEn = () => {
  return <Warranty />;
};

export default WarrantyPageEn;

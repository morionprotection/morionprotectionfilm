import React from "react";
import Technology from "@/components/Technology/Technology";

/* =========================
   SEO METADATA (EN)
========================= */
export const metadata = {
  title: "Morion PPF Technology | Advanced Paint Protection Film Innovation",

  description:
    "Discover Morion’s advanced Paint Protection Film (PPF) technology, featuring self-healing properties, UV resistance, hydrophobic layers, and long-term durability engineered for premium vehicle protection.",

  keywords: [
    "Morion PPF technology",
    "Paint Protection Film technology",
    "Advanced car coating technology",
    "Self healing PPF",
    "Automotive paint protection innovation",
    "PPF UV protection",
    "Hydrophobic PPF coating",
    "Car paint protection technology"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/en/technology",
    languages: {
      en: "https://www.morionppf.com/en/technology",
      ar: "https://www.morionppf.com/ar/technology"
    }
  },

  openGraph: {
    title: "Morion PPF Technology – Advanced Paint Protection Innovation",
    description:
      "Next-generation paint protection film technology delivering durability, clarity, and superior vehicle protection.",
    url: "https://www.morionppf.com/en/technology",
    siteName: "Morion Paint Protection Film",
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Morion Paint Protection Film Technology",
    description:
      "Learn how Morion’s advanced PPF technology protects vehicles with industry-leading performance.",
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

const TechnologyPageEn = () => {
  return <Technology />;
};

export default TechnologyPageEn;

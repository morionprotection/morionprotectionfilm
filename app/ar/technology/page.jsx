import React from "react";
import Technology from "@/components/Technology/Technology";

/* =========================
   SEO METADATA (AR)
========================= */
export const metadata = {
  title: "تقنية موريون | تكنولوجيا فيلم حماية طلاء السيارات",

  description:
    "اكتشف تقنية موريون المتقدمة في فيلم حماية طلاء السيارات (PPF)، بما في ذلك المعالجة الذاتية، مقاومة الخدوش، الحماية من الأشعة فوق البنفسجية، والمتانة طويلة الأمد.",

  keywords: [
    "تقنية فيلم حماية الطلاء",
    "تكنولوجيا PPF",
    "فيلم حماية طلاء السيارات",
    "تقنية المعالجة الذاتية",
    "حماية الطلاء من الخدوش",
    "PPF متطور",
    "تقنية حماية السيارات",
    "فيلم حماية الطلاء السعودية"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/ar/technology",
    languages: {
      ar: "https://www.morionppf.com/ar/technology",
      en: "https://www.morionppf.com/en/technology"
    }
  },

  openGraph: {
    title: "تقنية موريون – تكنولوجيا فيلم حماية الطلاء",
    description:
      "تقنيات متقدمة لحماية طلاء السيارات تجمع بين الابتكار، الأداء العالي، والجودة طويلة الأمد.",
    url: "https://www.morionppf.com/ar/technology",
    siteName: "Morion Paint Protection Film",
    locale: "ar_SA",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "تقنية موريون لحماية طلاء السيارات",
    description:
      "تعرف على أحدث تقنيات فيلم حماية الطلاء من موريون المصممة لبيئة المملكة.",
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

const TechnologyPageAr = () => {
  return <Technology />;
};

export default TechnologyPageAr;

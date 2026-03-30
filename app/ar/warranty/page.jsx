import React from "react";
import Warranty from "@/components/Warranty/Warranty";

/* =========================
   SEO METADATA (AR)
========================= */
export const metadata = {
  title: "ضمان موريون | ضمان فيلم حماية طلاء السيارات",

  description:
    "تعرّف على ضمان موريون لفيلم حماية طلاء السيارات (PPF)، والذي يشمل عيوب التصنيع والمتانة طويلة الأمد عند التركيب لدى وكلاء موريون المعتمدين داخل المملكة العربية السعودية.",

  keywords: [
    "ضمان موريون",
    "ضمان فيلم حماية الطلاء",
    "ضمان PPF السيارات",
    "حماية طلاء السيارات ضمان",
    "فيلم حماية الطلاء السعودية",
    "وكلاء موريون المعتمدين",
    "ضمان حماية السيارات",
    "PPF مع ضمان"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/ar/warranty",
    languages: {
      ar: "https://www.morionppf.com/ar/warranty",
      en: "https://www.morionppf.com/en/warranty"
    }
  },

  openGraph: {
    title: "ضمان موريون لفيلم حماية طلاء السيارات",
    description:
      "ضمان رسمي من موريون على أفلام حماية الطلاء عند التركيب لدى مراكز معتمدة.",
    url: "https://www.morionppf.com/ar/warranty",
    siteName: "Morion Paint Protection Film",
    locale: "ar_SA",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "ضمان موريون",
    description:
      "تعرف على تفاصيل ضمان فيلم حماية طلاء السيارات من موريون.",
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

const WarrantyPageAr = () => {
  return <Warranty />;
};

export default WarrantyPageAr;

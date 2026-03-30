import React from "react";
import BecomeDealer from "@/components/BecomeDealer/BecomeDealer";

/* =========================
   SEO METADATA (AR)
========================= */
export const metadata = {
  title: "كن وكيلاً معتمداً لموريون | برنامج وكلاء فيلم حماية الطلاء",

  description:
    "قدّم الآن لتصبح وكيلاً معتمداً لفيلم حماية الطلاء (PPF) من موريون. انضم إلى شبكة التركيب الاحترافية ووسّع نشاطك في مجال حماية السيارات داخل المملكة العربية السعودية.",

  keywords: [
    "وكيل موريون",
    "كن وكيلاً لفيلم حماية الطلاء",
    "فيلم حماية الطلاء PPF",
    "موزع PPF في السعودية",
    "تركيب حماية الطلاء للسيارات",
    "شراكة حماية السيارات",
    "وكيل أفلام حماية السيارات",
    "PPF معتمد",
    "تجارة إكسسوارات السيارات"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/ar/become-dealer",
    languages: {
      ar: "https://www.morionppf.com/ar/become-dealer",
      en: "https://www.morionppf.com/en/become-dealer"
    }
  },

  openGraph: {
    title: "كن وكيلاً معتمداً لموريون – فيلم حماية الطلاء",
    description:
      "انضم إلى برنامج وكلاء موريون المعتمدين واحصل على منتجات حماية طلاء عالية الجودة، دعم فني، وضمان رسمي.",
    url: "https://www.morionppf.com/ar/become-dealer",
    siteName: "Morion Paint Protection Film",
    locale: "ar_SA",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "برنامج وكلاء موريون المعتمدين",
    description:
      "فرصة شراكة لمراكز حماية السيارات ومحلات التلميع في السعودية.",
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

const BecomeDealerPage = () => {
  return <BecomeDealer />;
};

export default BecomeDealerPage;

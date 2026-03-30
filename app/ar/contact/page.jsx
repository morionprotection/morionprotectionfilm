import React from "react";
import Contact from "@/components/Contact/Contact";

/* =========================
   SEO METADATA (AR)
========================= */
export const metadata = {
  title: "تواصل معنا | مورايون فيلم حماية طلاء السيارات",

  description:
    "تواصل مع فريق مورايون لفيلم حماية الطلاء (PPF). نحن جاهزون للإجابة على استفساراتك حول الوكلاء المعتمدين، الضمان، وخدمات حماية السيارات داخل المملكة العربية السعودية.",

  keywords: [
    "تواصل مع مورايون",
    "اتصل بنا حماية الطلاء",
    "فيلم حماية الطلاء السعودية",
    "PPF سيارات السعودية",
    "وكلاء مورايون المعتمدين",
    "خدمة عملاء مورايون",
    "حماية طلاء السيارات",
    "استفسار حماية السيارات"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/ar/contact",
    languages: {
      ar: "https://www.morionppf.com/ar/contact",
      en: "https://www.morionppf.com/en/contact"
    }
  },

  openGraph: {
    title: "تواصل معنا – مورايون فيلم حماية الطلاء",
    description:
      "هل لديك استفسار عن حماية الطلاء أو الوكلاء المعتمدين؟ تواصل معنا الآن وسيقوم فريق مورايون بمساعدتك.",
    url: "https://www.morionppf.com/ar/contact",
    siteName: "Morion Paint Protection Film",
    locale: "ar_SA",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "تواصل معنا | مورايون",
    description:
      "تواصل مع مورايون للحصول على أفضل حلول حماية طلاء السيارات في السعودية.",
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

const ContactPageAr = () => {
  return <Contact />;
};

export default ContactPageAr;

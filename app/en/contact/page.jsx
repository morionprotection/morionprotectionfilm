import React from "react";
import Contact from "@/components/Contact/Contact";

/* =========================
   SEO METADATA (EN)
========================= */
export const metadata = {
  title: "Contact Morion PPF | Paint Protection Film Experts",

  description:
    "Contact Morion Paint Protection Film (PPF) for inquiries about premium car paint protection solutions, authorized dealers, warranties, and business partnerships in Saudi Arabia.",

  keywords: [
    "Contact Morion PPF",
    "Paint Protection Film contact",
    "Car PPF Saudi Arabia",
    "Morion PPF support",
    "PPF warranty support",
    "Automotive paint protection",
    "Car coating inquiries",
    "PPF dealers Saudi Arabia"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/en/contact",
    languages: {
      en: "https://www.morionppf.com/en/contact",
      ar: "https://www.morionppf.com/ar/contact"
    }
  },

  openGraph: {
    title: "Contact Morion | Paint Protection Film Specialists",
    description:
      "Get in touch with Morion for premium automotive paint protection film solutions, dealer inquiries, and customer support.",
    url: "https://www.morionppf.com/en/contact",
    siteName: "Morion Paint Protection Film",
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Morion PPF",
    description:
      "Reach Morion for expert paint protection film solutions and dealership opportunities.",
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

const ContactPageEn = () => {
  return <Contact />;
};

export default ContactPageEn;

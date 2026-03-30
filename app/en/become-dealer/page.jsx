import React from "react";
import BecomeDealer from "@/components/BecomeDealer/BecomeDealer";

export const metadata = {
  title: {
    default: "Become a Morion PPF Dealer | Authorized Paint Protection Film Partner",
    template: "%s | Morion PPF"
  },

  description:
    "Apply to become an authorized Morion Paint Protection Film (PPF) dealer. Join our professional installer network and grow your car detailing or auto protection business in Saudi Arabia and the Middle East.",

  keywords: [
    "Morion PPF dealer",
    "Become PPF dealer",
    "Paint Protection Film dealership",
    "PPF distributor Saudi Arabia",
    "Car PPF installer program",
    "Automotive paint protection dealer",
    "PPF supplier KSA",
    "Car detailing business partnership",
    "PPF dealership application",
    "Authorized PPF dealer"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/en/become-dealer",
    languages: {
      en: "https://www.morionppf.com/en/become-dealer",
      ar: "https://www.morionppf.com/ar/become-dealer"
    }
  },

  openGraph: {
    title: "Become a Morion Authorized Dealer | PPF Installer Network",
    description:
      "Partner with Morion and become a certified Paint Protection Film dealer. Premium products, dealer support, training, and long-term warranty.",
    url: "https://www.morionppf.com/en/become-dealer",
    siteName: "Morion Paint Protection Film",
    images: [
      {
        url: "https://www.morionppf.com/og-dealer.jpg",
        width: 1200,
        height: 630,
        alt: "Become a Morion PPF Dealer"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Become a Morion PPF Dealer",
    description:
      "Join Morion’s global Paint Protection Film dealer network and grow your automotive business.",
    images: ["https://www.morionppf.com/og-dealer.jpg"]
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

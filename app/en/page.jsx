import BeforeAfterSlider from "@/components/Home/BeforeAfterSlider";
import CoatingSection from "@/components/Home/CoatingSection";
import ComparisonSection from "@/components/Home/ComparisonSection";
import CoverageDiagram from "@/components/Home/CoverageDiagram";
import FilmTable from "@/components/Home/FilmTable";
import GetQuoteSection from "@/components/Home/GetQouteSection";
import Hero from "@/components/Home/Hero";
import TrustedDealersSection from "@/components/Home/TrustedDealerSection";
import WhyChose from "@/components/Home/WhyChose";

/* =========================
   SEO METADATA (EN HOME)
========================= */
export const metadata = {
  title: "Morion PPF | Premium Paint Protection Film for Cars",

  description:
    "Morion delivers premium Paint Protection Film (PPF) solutions designed to protect your vehicle from scratches, rock chips, UV damage, and environmental wear. Trusted by authorized dealers and professional installers.",

  keywords: [
    "Morion PPF",
    "Paint Protection Film",
    "Car PPF",
    "Automotive paint protection",
    "Premium PPF films",
    "Self healing paint protection film",
    "Car coating protection",
    "PPF Saudi Arabia",
    "Vehicle paint protection"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/en",
    languages: {
      en: "https://www.morionppf.com/en",
      ar: "https://www.morionppf.com/ar"
    }
  },

  openGraph: {
    title: "Morion Paint Protection Film | Premium Car Protection",
    description:
      "Advanced paint protection film engineered for durability, clarity, and long-term vehicle protection.",
    url: "https://www.morionppf.com/en",
    siteName: "Morion Paint Protection Film",
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Morion Paint Protection Film",
    description:
      "Premium paint protection film solutions trusted by professionals.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChose />
      <CoverageDiagram />
      <BeforeAfterSlider
        beforeSrc="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768143883/before1_rxz16u_hkqkfy.png"
        afterSrc="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768143876/Gemini_Generated_Image_iyytf9iyytf9iyyt_yxlw5g.png"
      />
      <CoatingSection />
      <ComparisonSection />
     <section
  id="film-table"
  className="scroll-mt-32" // important for navbar offset
>
  <FilmTable />
</section>

<section id="find-dealer">
      <TrustedDealersSection />

</section>
      <GetQuoteSection />
    </>
  );
}

import BeforeAfterSlider from "@/components/Home/BeforeAfterSlider";
import CoatingSection from "@/components/Home/CoatingSection";
import ComparisonSection from "@/components/Home/ComparisonSection";
import CoverageDiagram from "@/components/Home/CoverageDiagram";
import GetQuoteSection from "@/components/Home/GetQouteSection";
import Hero from "@/components/Home/Hero";
import TrustedDealersSection from "@/components/Home/TrustedDealerSection";
import WhyChose from "@/components/Home/WhyChose";
import FilmTable from "@/components/Home/FilmTable";

/* =========================
   SEO METADATA (AR HOME)
========================= */
export const metadata = {
  title: "موريون | أفضل فيلم حماية طلاء السيارات PPF في السعودية",

  description:
    "موريون تقدم أفضل حلول فيلم حماية طلاء السيارات (PPF) في السعودية، بحماية متقدمة من الخدوش، أشعة الشمس، والعوامل البيئية مع ضمان رسمي ووكلاء معتمدين.",

  keywords: [
    "موريون",
    "فيلم حماية طلاء السيارات",
    "PPF السعودية",
    "حماية طلاء السيارات",
    "فيلم حماية السيارات",
    "أفضل PPF في السعودية",
    "حماية السيارة من الخدوش",
    "عازل طلاء السيارات",
    "أفلام حماية السيارات"
  ],

  alternates: {
    canonical: "https://www.morionppf.com/ar",
    languages: {
      ar: "https://www.morionppf.com/ar",
      en: "https://www.morionppf.com/en"
    }
  },

  openGraph: {
    title: "موريون – فيلم حماية طلاء السيارات في السعودية",
    description:
      "حلول متقدمة لحماية طلاء السيارات باستخدام أحدث تقنيات PPF مع جودة عالية وضمان رسمي.",
    url: "https://www.morionppf.com/ar",
    siteName: "Morion Paint Protection Film",
    locale: "ar_SA",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "موريون فيلم حماية طلاء السيارات",
    description:
      "أفضل حلول حماية طلاء السيارات (PPF) في المملكة العربية السعودية.",
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
              beforeSrc="https://res.cloudinary.com/dl9d4khcs/image/upload/v1766576535/before1_rxz16u.png"
              afterSrc="https://res.cloudinary.com/dl9d4khcs/image/upload/v1766576556/after2_ixrvsg.png"
            />
      <CoatingSection />
      <ComparisonSection />
      <section
       id="film-table"
       className="scroll-mt-32" // important for navbar offset
     >
       <FilmTable />
     </section>
      <TrustedDealersSection />
      <GetQuoteSection />
    </>
  );
}

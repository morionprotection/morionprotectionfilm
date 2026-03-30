"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react"; // Install lucide-react if needed, or replace with SVG

// --- DATA ---
const contentData = {
  en: {
    tabs: [
      { id: "solid", label: "SOLID GLOSS" },
      { id: "metallic", label: "METALLIC GLOSS" },
      { id: "matte", label: "MATTE/SATIN" },
      { id: "color-shift", label: "COLOR-SHIFT" },
      { id: "liquid", label: "LIQUID" },
    ],
    series: {
      title: "SOLID SERIES",
      description:
        "PRISM PPF's Solid Series is a premium collection of gloss finish color paint protection film (PPF), inspired by exclusive OEM car colors from top luxury and performance brands. Featuring a unique palette of pastel car wrap colors, heritage tones, and bold solid hues, this series offers a stunning alternative to traditional vinyl wraps. Designed for car enthusiasts who want both protection and style, Solid Series PPF delivers high-gloss depth, self-healing properties, and long-lasting resistance to rock chips, UV damage, and environmental wear. Ideal for full color-change wraps, this is the ultimate upgrade for any vehicle.",
      cta: "Explore Collection",
    },
  },
  ar: {
    tabs: [
      { id: "solid", label: "صلب لامع" },
      { id: "metallic", label: "معدني لامع" },
      { id: "matte", label: "مات / ساتان" },
      { id: "color-shift", label: "متغير اللون" },
      { id: "liquid", label: "سائل" },
    ],
    series: {
      title: "السلسلة الصلبة",
      description:
        "سلسلة PURE PPF الصلبة هي مجموعة فاخرة من أفلام حماية الطلاء الملونة ذات اللمسة النهائية اللامعة، مستوحاة من ألوان سيارات OEM الحصرية من أرقى العلامات التجارية. تتميز بلوحة فريدة من ألوان الباستيل والنغمات الكلاسيكية والجريئة، لتقدم بديلاً مذهلاً لتغليف الفينيل التقليدي. صُممت لعشاق السيارات الذين يجمعون بين الحماية والأناقة، حيث توفر السلسلة عمقاً عالي اللمعان، وخاصية المعالجة الذاتية، ومقاومة طويلة الأمد لضربات الحصى والأشعة فوق البنفسجية. الخيار الأمثل لتغيير لون السيارة بالكامل.",
      cta: "استكشف المجموعة",
    },
  },
};

export default function SolidSeriesSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const [activeTab, setActiveTab] = useState("solid");

  const data = isArabic ? contentData.ar : contentData.en;
  const { title, description, cta } = data.series;

  return (
    <section className="w-full bg-black text-white" dir={isArabic ? "rtl" : "ltr"}>
      
    

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
        
        {/* A. Background Image (The "Front" of the car) */}
        <div className="absolute inset-0 z-0">
          <Image
            // Using the 'Premium' image as a placeholder for the background
            src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218599/solid_uzguxn.png" 
            alt="Background Car"
            fill
            className="object-cover opacity-60 md:opacity-100" // Dimmed on mobile for text readability
            priority
          />
          {/* Gradient Overlay to make text pop on the left/right */}
          <div className={`absolute inset-0 bg-gradient-to-r ${isArabic ? 'from-transparent via-black/60 to-black/90' : 'from-black/90 via-black/60 to-transparent'} z-0`} />
        </div>

        {/* B. Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="max-w-xl space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-lg">
              {title}
            </h2>
            
            <p className="text-sm md:text-base leading-relaxed text-gray-200 font-light drop-shadow-md text-justify">
              {description}
            </p>

            
          </div>

          {/* Right Column: Floating Image (The "Rear" of the car) */}
          <div className="hidden md:block relative h-[400px] w-full shadow-2xl rounded-sm overflow-hidden border border-white/10 animate-fade-in-right">
             <Image
               // Using the 'Luxury' image as a placeholder for the inset image
               src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218599/solid_uzguxn.png"
               alt="Car Detail"
               fill
               className="object-cover hover:scale-105 transition-transform duration-700"
             />
          </div>

        </div>

      </div>

      {/* --- STYLES --- */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
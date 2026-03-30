"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react"; 

// --- DATA ---
const contentData = {
  en: {
    tabs: [
      { id: "solid", label: "SOLID GLOSS", link: "/products/solid" },
      { id: "metallic", label: "METALLIC GLOSS", link: "/products/metallic" }, // Active
      { id: "matte", label: "MATTE/SATIN", link: "/products/matte" },
      { id: "color-shift", label: "COLOR-SHIFT", link: "/products/color-shift" },
      { id: "liquid", label: "LIQUID", link: "/products/liquid" },
    ],
    series: {
      title: "METALLIC SERIES",
      description:
        "PRISM PPF’s Metallic Series is a standout collection of colored PPF that delivers the bold, reflective look of premium metallic car wraps with the durability of advanced PPF films. Designed for full vehicle color changes, these high-gloss finishes feature rich metallic flake and deep saturation—bringing luxury OEM-inspired tones to life. Unlike traditional vinyl wraps, Metallic Series paint protection film offers long-term defense against rock chips, UV rays, and environmental damage, all with self-healing technology. For car enthusiasts who want style without compromise, this is the future of color-infused automotive protection.",
      cta: "Explore Collection",
    },
  },
  ar: {
    tabs: [
      { id: "solid", label: "صلب لامع", link: "/ar/products/solid" },
      { id: "metallic", label: "معدني لامع", link: "/ar/products/metallic" }, // Active
      { id: "matte", label: "مات / ساتان", link: "/ar/products/matte" },
      { id: "color-shift", label: "متغير اللون", link: "/ar/products/color-shift" },
      { id: "liquid", label: "سائل", link: "/ar/products/liquid" },
    ],
    series: {
      title: "السلسلة المعدنية",
      description:
        "سلسلة PURE PPF المعدنية هي مجموعة متميزة من أفلام الحماية الملونة التي توفر المظهر الجريء والعاكس لتغليف السيارات المعدني الفاخر مع متانة أفلام PPF المتقدمة. صُممت لتغيير لون السيارة بالكامل، وتتميز هذه التشطيبات عالية اللمعان برقائق معدنية غنية وتشبع عميق - مما يعيد الحياة إلى نغمات OEM الفاخرة. على عكس تغليف الفينيل التقليدي، توفر سلسلة الحماية المعدنية دفاعًا طويل الأمد ضد رقائق الصخور والأشعة فوق البنفسجية والأضرار البيئية، كل ذلك مع تقنية الشفاء الذاتي. لعشاق السيارات الذين يريدون الأناقة دون المساومة، هذا هو مستقبل حماية السيارات الملونة.",
      cta: "استكشف المجموعة",
    },
  },
};

export default function MetallicSeriesSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  
  // Set default active tab to 'metallic' for this specific component
  const [activeTab, setActiveTab] = useState("metallic");

  const data = isArabic ? contentData.ar : contentData.en;
  const { title, description, cta } = data.series;

  return (
    <section className="w-full bg-black text-white" dir={isArabic ? "rtl" : "ltr"}>
      
     

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        
        {/* A. Background Image (Darkened) */}
        <div className="absolute inset-0 z-0">
          <Image
            // Using a dark/moody metallic car image for background
            src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218597/Mettalic_bfdo3c.png" 
            alt="Metallic Background"
            fill
            className="object-cover opacity-50 grayscale scale-110" // Grayscale + Zoom for dramatic effect
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div className={`absolute inset-0 bg-gradient-to-r ${isArabic ? 'from-transparent via-black/80 to-black' : 'from-black via-black/80 to-transparent'} z-0`} />
        </div>

        {/* B. Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Column */}
          <div className="max-w-xl space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide drop-shadow-2xl">
              {title}
            </h2>
            
            <p className="text-sm md:text-base leading-relaxed text-gray-300 font-light drop-shadow-md text-justify border-l-2 border-white/20 pl-6">
              {description}
            </p>

         
          </div>

          {/* Image Column (Floating Card Effect) */}
          <div className="hidden md:block relative h-[500px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden border border-white/10 animate-fade-in-right group">
             
             {/* Main Image */}
             <Image
               // Using the "Luxury/Blue" image as it fits "Metallic" best
                src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218597/Mettalic_bfdo3c.png"
               alt="Metallic Series Car"
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-110"
             />
             
             {/* Optional: Shine Effect on Hover */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>

        </div>

      </div>

      {/* --- STYLES --- */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-in-right { animation: fade-in-right 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
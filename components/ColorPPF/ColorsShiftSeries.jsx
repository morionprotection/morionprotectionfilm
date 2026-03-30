"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react"; 

// --- DATA ---
const contentData = {
  en: {
 
    series: {
      title: "COLOR-SHIFT SERIES",
      description:
        "PRISM PPF’s Color-Shift Series offers a dynamic, head-turning take on colored paint protection film (PPF) with a multi-tone finish that transforms depending on the viewing angle and lighting. Inspired by exotic chameleon paints, this collection blends mesmerizing style with high-performance protection. Whether you're going for a subtle pearl effect or a bold spectrum change, Color-Shift Series delivers rich, moving hues while shielding your paint from rock chips, UV rays, and harsh environmental elements. Featuring self-healing technology and long-lasting durability, it’s the perfect fusion of exotic style and premium PPF film performance.",
      cta: "Explore Collection",
    },
  },
  ar: {
   
    series: {
      title: "سلسلة متغيرة اللون",
      description:
        "تقدم سلسلة PURE PPF متغيرة اللون (Color-Shift) لمسة ديناميكية وملفتة للنظر لأفلام حماية الطلاء الملونة (PPF) مع لمسة نهائية متعددة الألوان تتحول حسب زاوية الرؤية والإضاءة. مستوحاة من دهانات الحرباء الغريبة، تمزج هذه المجموعة بين الأسلوب الساحر والحماية عالية الأداء. سواء كنت تبحث عن تأثير لؤلؤي دقيق أو تغيير جريء في الطيف، توفر السلسلة ألوانًا غنية ومتحركة مع حماية طلاءك من رقائق الصخور والأشعة فوق البنفسجية والعناصر البيئية. مع تقنية الشفاء الذاتي والمتانة، إنها الاندماج المثالي بين الأسلوب الغريب وأداء الحماية الفائق.",
      cta: "استكشف المجموعة",
    },
  },
};

export default function ColorShiftSeriesSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  
  // Set default active tab to 'color-shift'
  const [activeTab, setActiveTab] = useState("color-shift");

  const data = isArabic ? contentData.ar : contentData.en;
  const { title, description, cta } = data.series;

  return (
    <section className="w-full bg-black text-white" dir={isArabic ? "rtl" : "ltr"}>
    

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        
        {/* A. Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            // Using the 'Premium' image as placeholder - ideally this is a car with color-shift paint
            src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218601/colorshift_tovnvs.png" 
            alt="Color Shift Background"
            fill
            className="object-cover opacity-60 scale-105" 
            priority
          />
          
          {/* Iridescent Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-green-900/20 mix-blend-overlay pointer-events-none" />
          
          {/* Gradient Overlay for Text Readability */}
          <div className={`absolute inset-0 bg-gradient-to-r ${isArabic ? 'from-transparent via-black/80 to-black' : 'from-black via-black/80 to-transparent'} z-0`} />
        </div>

        {/* B. Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Column */}
          <div className="max-w-xl space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
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
               src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218601/colorshift_tovnvs.png"
               alt="Color Shift Detail"
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-110"
             />
             
             {/* Dynamic Holographic Shine Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-color-dodge" />
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
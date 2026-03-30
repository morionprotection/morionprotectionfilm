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
      { id: "metallic", label: "METALLIC GLOSS", link: "/products/metallic" },
      { id: "matte", label: "MATTE/SATIN", link: "/products/matte" }, // Active
      { id: "color-shift", label: "COLOR-SHIFT", link: "/products/color-shift" },
      { id: "liquid", label: "LIQUID", link: "/products/liquid" },
    ],
    series: {
      title: "MATTE SERIES",
      description:
        "PRISM PPF’s Matte Series offers a sleek, modern take on colored paint protection film (PPF) with a smooth satin-matte finish that transforms any vehicle with a refined, stealthy look. Inspired by factory matte options from leading automotive brands, this collection blends sophisticated style with high-performance protection. Whether you're going for an understated monochrome or a bold color-change wrap, Matte Series colored PPF delivers rich, non-reflective hues while shielding your paint from rock chips, UV rays, and harsh environmental elements. Featuring self-healing technology and long-lasting durability, it’s the perfect fusion of matte style and premium PPF film performance.",
      cta: "Explore Collection",
    },
  },
  ar: {
    tabs: [
      { id: "solid", label: "صلب لامع", link: "/ar/products/solid" },
      { id: "metallic", label: "معدني لامع", link: "/ar/products/metallic" },
      { id: "matte", label: "مات / ساتان", link: "/ar/products/matte" }, // Active
      { id: "color-shift", label: "متغير اللون", link: "/ar/products/color-shift" },
      { id: "liquid", label: "سائل", link: "/ar/products/liquid" },
    ],
    series: {
      title: "سلسلة مات / ساتان",
      description:
        "تقدم سلسلة PURE PPF غير اللامعة (مات) لمسة عصرية وأنيقة لأفلام حماية الطلاء الملونة (PPF) مع لمسة نهائية ناعمة من الساتان غير اللامع تحول أي مركبة بمظهر راقٍ وخفي. مستوحاة من خيارات المصانع غير اللامعة من العلامات التجارية الرائدة للسيارات، تمزج هذه المجموعة بين الأسلوب المتطور والحماية عالية الأداء. سواء كنت تبحث عن لون أحادي خافت أو تغليف جريء متغير اللون، توفر سلسلة PPF الملونة غير اللامعة درجات غنية غير عاكسة مع حماية طلاءك من رقائق الصخور والأشعة فوق البنفسجية والعناصر البيئية القاسية. تتميز بتقنية الشفاء الذاتي والمتانة طويلة الأمد، إنها الاندماج المثالي بين النمط غير اللامع وأداء فيلم PPF المتميز.",
      cta: "استكشف المجموعة",
    },
  },
};

export default function MatteSeriesSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  
  // Set default active tab to 'matte'
  const [activeTab, setActiveTab] = useState("matte");

  const data = isArabic ? contentData.ar : contentData.en;
  const { title, description, cta } = data.series;

  return (
    <section className="w-full bg-black text-white" dir={isArabic ? "rtl" : "ltr"}>
      

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        
        {/* A. Background Image (Darkened) */}
        <div className="absolute inset-0 z-0">
          <Image
            // Using a Matte/Frost style image (blue matte bmw)
            src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218602/Matte_zi1qlt.png" 
            alt="Matte Series Background"
            fill
            className="object-cover opacity-60 grayscale-[30%]" 
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
             
             {/* Main Image - Using the matte/fogg image for the inset */}
             <Image
               src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768218602/Matte_zi1qlt.png"
               alt="Matte Series Car Detail"
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-110"
             />
             
             {/* Matte Sheen Overlay */}
             <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
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
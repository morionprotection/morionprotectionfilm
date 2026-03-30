"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- DATA: TEXT CONTENT ---
const contentData = {
  en: {
    hero: {
      title: "MATTE SERIES",
      description: "PURE PPF’s Matte Series offers a sleek, modern take on colored paint protection film (PPF) with a smooth satin-matte finish that transforms any vehicle with a refined, stealthy look. Inspired by factory matte options from leading automotive brands, this collection blends sophisticated style with high-performance protection. Whether you're going for an understated monochrome or a bold color-change wrap, Matte Series colored PPF delivers rich, non-reflective hues while shielding your paint from rock chips, UV rays, and harsh environmental elements. Featuring self-healing technology and long-lasting durability, it’s the perfect fusion of matte style and premium PPF film performance.",
      cta: "Explore Collection",
      subHeading: "View Our Collection"
    },
    sections: {
      collection: "The Collection"
    },
    ctaBanner: {
      text: "Go Stealth Mode Today",
      btn: "Find An Installer",
      link: "/en/contact"
    }
  },
  ar: {
    hero: {
      title: "سلسلة مات / ساتان",
      description: "تقدم سلسلة PURE PPF غير اللامعة (مات) لمسة عصرية وأنيقة لأفلام حماية الطلاء الملونة (PPF) مع لمسة نهائية ناعمة من الساتان غير اللامع تحول أي مركبة بمظهر راقٍ وخفي. مستوحاة من خيارات المصانع غير اللامعة من العلامات التجارية الرائدة للسيارات، تمزج هذه المجموعة بين الأسلوب المتطور والحماية عالية الأداء. سواء كنت تبحث عن لون أحادي خافت أو تغليف جريء متغير اللون، توفر سلسلة PPF الملونة غير اللامعة درجات غنية غير عاكسة مع حماية طلاءك من رقائق الصخور والأشعة فوق البنفسجية والعناصر البيئية القاسية. تتميز بتقنية الشفاء الذاتي والمتانة طويلة الأمد، إنها الاندماج المثالي بين النمط غير اللامع وأداء فيلم PPF المتميز.",
      cta: "استكشف المجموعة",
      subHeading: "شاهد مجموعتنا"
    },
    sections: {
      collection: "المجموعة الكاملة"
    },
    ctaBanner: {
      text: "احصل على المظهر الخفي اليوم",
      btn: "ابحث عن مثبت",
      link: "/ar/contact"
    }
  }
};

// --- COLOR MAP (Hex Codes) ---
const COLOR_MAP = {
  "Ice Blue": "#A5F2F3",
  "Gloss Bullet": "#595959", // Dark Grey
  "Gold Dust Gray": "#9C9C94",
  "Dubai Gray": "#66676C",
  "Metallic Rose Gold": "#C48E94",
  "Metallic Moscato": "#E6CFCF",
  "Platinum": "#E0E0E0",
  "Galaxy Black": "#1F1F1F",
  "Prism Black (Rainbow Reflection)": "#000000", // Special Handling
  "Gloss Snow White": "#FFFFFF",
  "Luma White (Rainbow Reflection)": "#FAFAFA", // Special Handling
  "Graphite Gray": "#4A4D52",
  "Satin Stainless Steel": "#85878A",
  "Satin Dark Gray": "#363636",
  "Satin Ashen Gray": "#5E6363",
  "Liquid Sapphire": "#082567",
  "Liquid Red Wine": "#5E1923",
  "Satin Liquid Tungsten Steel": "#575757"
};

// --- COLORS LIST ---
const matteColors = [
  "Ice Blue",
  "Gloss Bullet",
  "Gold Dust Gray",
  "Dubai Gray",
  "Metallic Rose Gold",
  "Metallic Moscato",
  "Platinum",
  "Galaxy Black",
  "Prism Black (Rainbow Reflection)",
  "Gloss Snow White",
  "Luma White (Rainbow Reflection)",
  "Graphite Gray",
  "Satin Stainless Steel",
  "Satin Dark Gray",
  "Satin Ashen Gray",
  "Liquid Sapphire",
  "Liquid Red Wine",
  "Satin Liquid Tungsten Steel"
];

// --- COMPONENTS ---

const ColorCard = ({ name }) => {
  const colorHex = COLOR_MAP[name] || "#CCCCCC"; 
  
  // Logic for Holographic/Prism colors
  const isPrism = name.includes("Rainbow");
  const prismStyle = isPrism ? {
    background: `linear-gradient(135deg, ${colorHex} 20%, #ff0000 40%, #00ff00 50%, #0000ff 60%, ${colorHex} 80%)`,
    backgroundSize: '300% 300%',
    animation: 'shimmer 6s ease infinite'
  } : {
    backgroundColor: colorHex
  };

  return (
    <div className="group flex flex-col items-center gap-4 p-4 animate-fade-in-up">
      {/* Card Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-100  overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 border border-gray-200">
        
        {/* Main "Roll" Representation */}
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 relative">
            {/* Base Color */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={prismStyle}
            />
            
            {/* Satin/Matte Finish Overlay - Soft, diffused light, no sharp reflections */}
            <div 
                className="absolute inset-0 w-full h-full opacity-50"
                style={{ 
                    background: `linear-gradient(105deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.05) 55%, rgba(0,0,0,0.2) 100%)`
                }}
            />
            
            {/* Noise Texture for Matte Realism */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
        </div>

        {/* Circle Swatch Overlay */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg z-10 bg-white">
           <div 
             className="w-full h-full relative" 
             style={prismStyle} 
           >
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
           </div>
        </div>
      </div>
      
      {/* Color Name */}
      <h3 className="mt-4 text-sm md:text-base font-medium text-gray-900 text-center uppercase tracking-wide group-hover:text-blue-600 transition-colors">
        {name.replace(" (Rainbow Reflection)", "")}
        {isPrism && <span className="block text-[10px] text-gray-400 normal-case tracking-normal">Rainbow Reflection</span>}
      </h3>
    </div>
  );
};

export default function MatteSeriesCollection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const t = isArabic ? contentData.ar : contentData.en;

  return (
    <section className="w-full bg-white pb-24" dir={isArabic ? "rtl" : "ltr"}>
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 2. COLLECTION GRID --- */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 border-b border-gray-200 pb-4 text-gray-900">
            {t.sections.collection}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {matteColors.map((colorName, idx) => (
              <ColorCard key={idx} name={colorName} />
            ))}
          </div>
        </div>

     
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
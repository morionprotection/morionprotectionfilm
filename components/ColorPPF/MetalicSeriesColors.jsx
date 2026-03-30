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
      text: "Transform your vehicle with a stealth look",
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
      text: "حول سيارتك بمظهر خفي وأنيق",
      btn: "ابحث عن مثبت",
      link: "/ar/contact"
    }
  }
};

// --- COLOR MAP (Hex Codes & Styles) ---
const COLOR_MAP = {
  "Ice Blue": "#A5F2F3",
  "Gloss Bullet": "#6d7378", // Dark Metallic Grey
  "Gold Dust Gray": "#9a9a90", // Gray with gold undertone
  "Dubai Gray": "#58595b", // Solid Dark Gray
  "Metallic Rose Gold": "#b76e79", 
  "Metallic Moscato": "#e3c8c7", // Champagne Pink
  "Platinum": "#e5e4e2",
  "Galaxy Black": "#2c2c2c", // Black with sparkles
  "Prism Black (Rainbow Reflection)": "#1a1a1a", // Deep black base
  "Gloss Snow White": "#ffffff",
  "Luma White (Rainbow Reflection)": "#f8f9fa", // White base
  "Graphite Gray": "#4b4e53"
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
  "Graphite Gray"
];

// --- COMPONENTS ---

const ColorCard = ({ name }) => {
  const colorHex = COLOR_MAP[name] || "#CCCCCC"; 
  
  // Custom style for "Prism" or "Rainbow" colors to add a holographic effect
  const isPrism = name.toLowerCase().includes("rainbow") || name.toLowerCase().includes("prism");
  const prismStyle = isPrism ? {
    backgroundImage: `linear-gradient(115deg, ${colorHex}, #ff0000 20%, #00ff00 40%, #0000ff 60%, ${colorHex})`,
    backgroundSize: '400% 400%',
    animation: 'shimmer 5s ease infinite'
  } : {
    backgroundColor: colorHex
  };

  return (
    <div className="group flex flex-col items-center gap-4 p-4 animate-fade-in-up">
      {/* Card Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 border border-gray-100">
        
        {/* Main "Roll" Representation */}
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 relative">
            {/* Base Color Layer */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={prismStyle}
            />
            {/* Matte/Satin Texture Overlay (Diffused Light) */}
            <div 
                className="absolute inset-0 w-full h-full opacity-60"
                style={{ 
                    background: `linear-gradient(105deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0.1) 100%)`
                }}
            />
            {/* Matte Grain/Noise (Optional for realism) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>

        {/* Circle Swatch Overlay */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg z-10 bg-white">
           <div 
             className="w-full h-full" 
             style={prismStyle} 
           >
             {/* Swatch Highlight */}
             <div className="w-full h-full bg-gradient-to-tr from-black/10 to-transparent" />
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
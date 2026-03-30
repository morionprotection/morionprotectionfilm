"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- DATA: TEXT CONTENT ---
const contentData = {
  en: {
    hero: {
      title: "METALLIC SERIES",
      description: "PURE PPF’s Metallic Series is a standout collection of colored PPF that delivers the bold, reflective look of premium metallic car wraps with the durability of advanced PPF films. Designed for full vehicle color changes, these high-gloss finishes feature rich metallic flake and deep saturation—bringing luxury OEM-inspired tones to life. Unlike traditional vinyl wraps, Metallic Series paint protection film offers long-term defense against rock chips, UV rays, and environmental damage, all with self-healing technology. For car enthusiasts who want style without compromise, this is the future of color-infused automotive protection.",
      cta: "Explore Collection",
      subHeading: "View Our Collection"
    },
    sections: {
      standard: "The Collection",
      popular: "Our Most Popular"
    },
    ctaBanner: {
      text: "Ready to transform your vehicle?",
      btn: "Become A Dealer",
      link: "/en/become-dealer"
    }
  },
  ar: {
    hero: {
      title: "السلسلة المعدنية",
      description: "سلسلة PURE PPF المعدنية هي مجموعة متميزة من أفلام الحماية الملونة التي توفر المظهر الجريء والعاكس لتغليف السيارات المعدني الفاخر مع متانة أفلام PPF المتقدمة. صُممت لتغيير لون السيارة بالكامل، وتتميز هذه التشطيبات عالية اللمعان برقائق معدنية غنية وتشبع عميق - مما يعيد الحياة إلى نغمات OEM الفاخرة. على عكس تغليف الفينيل التقليدي، توفر سلسلة الحماية المعدنية دفاعًا طويل الأمد ضد رقائق الصخور والأشعة فوق البنفسجية والأضرار البيئية، كل ذلك مع تقنية الشفاء الذاتي. لعشاق السيارات الذين يريدون الأناقة دون المساومة، هذا هو مستقبل حماية السيارات الملونة.",
      cta: "استكشف المجموعة",
      subHeading: "شاهد مجموعتنا"
    },
    sections: {
      standard: "المجموعة الكاملة",
      popular: "الأكثر شعبية لدينا"
    },
    ctaBanner: {
      text: "جاهز لتحويل مظهر سيارتك؟",
      btn: "كن موزعاً",
      link: "/ar/become-dealer"
    }
  }
};

// --- COLOR MAP (Hex Codes) ---
const COLOR_MAP = {
  "Crayon Gray": "#B0B3B5",
  "Cement Gray": "#8A8D8F",
  "Shark Gray": "#484A4D",
  "Powder Blue": "#B0E0E6",
  "Beach Blue": "#7BBFD6",
  "Miami Blue": "#45A7CA",
  "Teal Topaz": "#008B8B",
  "Lagoon Blue": "#0093AF",
  "Dolphin Blue": "#5A7E9A",
  "Candy Blue": "#205EA6",
  "Tanz Blue": "#1F305E",
  "Mineral Blue": "#3E5F8A",
  "Mystic Green": "#6B8E23",
  "Metallic Sage": "#9DC183",
  "Metallic Forest Green": "#228B22",
  "Satin Snow White": "#F5F5F5",
  "Frozen White": "#F0F8FF",
  "Satin Balloon White": "#EAEAEA",
  "Solar Yellow": "#FFD700",
  "Signal Yellow": "#F2A900",
  "Satin Stainless Steel": "#A0A0A0",
  "Satin Bullet": "#696969",
  "Satin Blue Rock": "#4682B4",
  "Frozen Sapphire": "#0F52BA",
  "Pacific Green (Blue Dominant)": "#008080",
  "Turkish Green (Green Dominant)": "#40E0D0",
  "Obsidian Green": "#013220",
  "Leaf Green": "#228B22",
  "Fresh Mint": "#3EB489",
  "Matcha Green": "#B2C248",
  "Venice Green": "#00A877",
  "Veteran Violet": "#8A2BE2",
  "Gloss Ivory": "#FFFFF0",
  "Gloss Machiato": "#D2B48C",
  "Sandstorm Green": "#BDB76B",
  "Siam Beige": "#F5F5DC",
  "Viola Purple": "#EE82EE",
  "Pearl Opal": "#FAFAD2",
  "Metallic Bubblegum": "#FF69B4",
  "Gloss Tangerine": "#F28500",
  "Love Pink": "#FFC0CB",
  "Fruit Punch": "#DE3163",
  "Gloss Scarlet": "#FF2400",
  "Stallion Red": "#DC143C"
};

// --- LISTS ---
const standardColors = [
  "Crayon Gray", "Cement Gray", "Shark Gray",
  "Powder Blue", "Beach Blue", "Miami Blue",
  "Teal Topaz", "Lagoon Blue", "Dolphin Blue",
  "Candy Blue", "Tanz Blue", "Mineral Blue",
  "Mystic Green", "Metallic Sage", "Metallic Forest Green",
  "Satin Snow White", "Frozen White", "Satin Balloon White",
  "Solar Yellow", "Signal Yellow"
];

const popularColors = [
  "Satin Stainless Steel", "Satin Bullet", "Satin Blue Rock",
  "Frozen Sapphire", "Pacific Green (Blue Dominant)", "Turkish Green (Green Dominant)",
  "Obsidian Green", "Leaf Green", "Fresh Mint",
  "Matcha Green", "Venice Green", "Veteran Violet",
  "Gloss Ivory", "Gloss Machiato", "Sandstorm Green",
  "Siam Beige", "Viola Purple", "Pearl Opal",
  "Metallic Bubblegum", "Gloss Tangerine", "Love Pink",
  "Fruit Punch", "Gloss Scarlet", "Stallion Red"
];

// --- COMPONENTS ---

// Helper for metallic gradient style
const getGradientStyle = (hex) => ({
  background: `linear-gradient(135deg, ${hex} 0%, #ffffff 50%, ${hex} 100%)`, // Simulates light hitting a roll
  boxShadow: `inset 0 0 20px rgba(0,0,0,0.2)`
});

const getSolidStyle = (hex) => ({
    backgroundColor: hex,
});

const ColorCard = ({ name }) => {
  const colorHex = COLOR_MAP[name] || "#CCCCCC"; // Fallback gray

  return (
    <div className="group flex flex-col items-center gap-4 p-4 animate-fade-in-up">
      {/* Card Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 border border-gray-100">
        
        {/* Main "Roll" Representation */}
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 relative">
            {/* Base Color Layer */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: colorHex }}
            />
            {/* Sheen Overlay to look like a Roll/Cylinder */}
            <div 
                className="absolute inset-0 w-full h-full opacity-40"
                style={{ 
                    background: `linear-gradient(105deg, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0.4) 100%)`
                }}
            />
        </div>

        {/* Circle Swatch Overlay */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg z-10 bg-white">
           <div 
             className="w-full h-full" 
             style={{ 
                backgroundColor: colorHex,
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${colorHex} 60%)`
             }} 
           />
        </div>
      </div>
      
      {/* Color Name */}
      <h3 className="mt-4 text-sm md:text-base font-medium text-gray-900 text-center uppercase tracking-wide group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
    </div>
  );
};

export default function MetallicSeriesCollection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const t = isArabic ? contentData.ar : contentData.en;

  return (
    <section className="w-full bg-white pb-24" dir={isArabic ? "rtl" : "ltr"}>
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 2. STANDARD COLLECTION --- */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 border-b border-gray-200 pb-4 text-gray-900">
            {t.sections.standard}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {standardColors.map((colorName, idx) => (
              <ColorCard key={idx} name={colorName} />
            ))}
          </div>
        </div>

        {/* --- 3. POPULAR COLLECTION --- */}
        <div className="mb-20">
           <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 border-b border-gray-200 pb-4 text-gray-900">
            {t.sections.popular}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {popularColors.map((colorName, idx) => (
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
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- DATA: TEXT CONTENT ---
const contentData = {
  en: {
    hero: {
      title: "COLOR-SHIFT SERIES",
      description: "PURE PPF’s Color-Shift Series offers a dynamic, head-turning take on colored paint protection film (PPF) with a multi-tone finish that transforms depending on the viewing angle and lighting. Inspired by exotic chameleon paints, this collection blends mesmerizing style with high-performance protection. Whether you're going for a subtle pearl effect or a bold spectrum change, Color-Shift Series delivers rich, moving hues while shielding your paint from rock chips, UV rays, and harsh environmental elements. Featuring self-healing technology and long-lasting durability, it’s the perfect fusion of exotic style and premium PPF film performance.",
      subHeading: "View Our Collection"
    },
    sections: {
      collection: "The Collection"
    },
    ctaBanner: {
      text: "Experience the Shift",
      btn: "Find An Installer",
      link: "/en/contact"
    }
  },
  ar: {
    hero: {
      title: "سلسلة متغيرة اللون",
      description: "تقدم سلسلة PURE PPF متغيرة اللون (Color-Shift) لمسة ديناميكية وملفتة للنظر لأفلام حماية الطلاء الملونة (PPF) مع لمسة نهائية متعددة الألوان تتحول حسب زاوية الرؤية والإضاءة. مستوحاة من دهانات الحرباء الغريبة، تمزج هذه المجموعة بين الأسلوب الساحر والحماية عالية الأداء. سواء كنت تبحث عن تأثير لؤلؤي دقيق أو تغيير جريء في الطيف، توفر السلسلة ألوانًا غنية ومتحركة مع حماية طلاءك من رقائق الصخور والأشعة فوق البنفسجية والعناصر البيئية. مع تقنية الشفاء الذاتي والمتانة، إنها الاندماج المثالي بين الأسلوب الغريب وأداء الحماية الفائق.",
      subHeading: "شاهد مجموعتنا"
    },
    sections: {
      collection: "المجموعة الكاملة"
    },
    ctaBanner: {
      text: "جرب التحول في الألوان",
      btn: "ابحث عن مثبت",
      link: "/ar/contact"
    }
  }
};

// --- COLOR CONFIGURATION (The Chameleon Effect) ---
const SHIFT_CONFIG = {
  "Unicorns Blood": {
    stops: ["#800000", "#D4AF37", "#008000"], // Red -> Gold -> Green
    finish: "gloss"
  },
  "Purple Rain": {
    stops: ["#4B0082", "#0000FF", "#FF00FF"], // Indigo -> Blue -> Magenta
    finish: "gloss"
  },
  "Rainforest": {
    stops: ["#006400", "#B8860B", "#8B4513"], // Green -> Gold -> Brown
    finish: "gloss"
  },
  "Frozen Jade": {
    stops: ["#00A86B", "#C0C0C0", "#E0FFFF"], // Jade -> Silver -> Cyan
    finish: "satin"
  },
  "Satin Olive Green": {
    stops: ["#556B2F", "#8FBC8F", "#BDB76B"], // Olive -> Sage -> Khaki
    finish: "satin"
  },
  "Satin Champagne": {
    stops: ["#FAD6A5", "#FFF8DC", "#E6E6FA"], // Champagne -> Cornsilk -> Lavender
    finish: "satin"
  },
  "Satin Arctic Blue": {
    stops: ["#00BFFF", "#E0FFFF", "#C0C0C0"], // Deep Sky -> Light Cyan -> Silver
    finish: "satin"
  },
  "Frozen Berry": {
    stops: ["#C71585", "#800080", "#FF69B4"], // Red Violet -> Purple -> Hot Pink
    finish: "satin"
  }
};

const shiftColors = Object.keys(SHIFT_CONFIG);

// --- COMPONENTS ---

const ColorCard = ({ name }) => {
  const config = SHIFT_CONFIG[name];
  const stops = config?.stops || ["#000", "#333"];
  const isSatin = config?.finish === "satin";

  // Create the Chameleon Gradient
  const gradient = `linear-gradient(115deg, ${stops[0]} 0%, ${stops[1]} 40%, ${stops[2]} 80%)`;
  
  // Dynamic Shine Animation
  const shineStyle = {
    background: `linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 4s infinite linear'
  };

  return (
    <div className="group flex flex-col items-center gap-4 p-4 animate-fade-in-up">
      {/* Card Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-50  overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-200">
        
        {/* Main "Roll" Representation */}
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 relative">
            
            {/* Base Shift Layer */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ background: gradient }}
            />

            {/* Finish Overlay */}
            {isSatin ? (
               // Satin Noise Overlay
               <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            ) : (
               // Gloss Shine Overlay
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-60"></div>
            )}
            
            {/* Shifting Light Animation (The Chameleon Effect) */}
            <div 
               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{
                 background: `linear-gradient(135deg, ${stops[2]} 0%, ${stops[0]} 100%)`, // Reverse gradient on hover to simulate shifting angle
                 mixBlendMode: 'overlay'
               }}
            />

        </div>

        {/* Circle Swatch Overlay */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg z-10 bg-white">
           <div 
             className="w-full h-full relative" 
             style={{ background: gradient }}
           >
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
           </div>
        </div>
      </div>
      
      {/* Color Name */}
      <h3 className="mt-4 text-sm md:text-base font-bold text-gray-900 text-center uppercase tracking-wide group-hover:text-purple-600 transition-colors">
        {name}
      </h3>
    </div>
  );
};

export default function ColorShiftCollection() {
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
            {shiftColors.map((colorName, idx) => (
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
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// --- DATA: TEXT CONTENT ---
const contentData = {
  en: {
    hero: {
      title: "LIQUID SERIES",
      description: "PURE PPF’s Liquid Series is a cutting-edge collection of colored PPF that mimics the flowing, multi-dimensional look of liquid metal and hyper-gloss finishes. Designed for car enthusiasts who want their vehicle to stand out with intense depth, movement, and color shift effects, the Liquid Series brings a futuristic edge to traditional car wraps. These ultra-gloss PPF films not only deliver eye-catching visual impact but also provide advanced protection against rock chips, UV rays, and environmental damage. With self-healing properties and a mirror-like finish, the Liquid Series redefines what’s possible in paint protection film aesthetics.",
      subHeading: "View Our Collection"
    },
    sections: {
      collection: "The Collection"
    }
  },
  ar: {
    hero: {
      title: "السلسلة السائلة",
      description: "سلسلة PURE PPF السائلة هي مجموعة متطورة من أفلام الحماية الملونة (PPF) التي تحاكي المظهر الانسيابي ومتعدد الأبعاد للمعدن السائل والتشطيبات فائقة اللمعان. صُممت لعشاق السيارات الذين يريدون أن تتميز مركباتهم بعمق وكثافة وتأثيرات تغيير اللون، تضفي السلسلة السائلة لمسة مستقبلية على تغليف السيارات التقليدي. لا توفر أفلام PPF فائقة اللمعان هذه تأثيرًا بصريًا لافتًا للنظر فحسب، بل توفر أيضًا حماية متقدمة ضد رقائق الصخور والأشعة فوق البنفسجية والأضرار البيئية. مع خصائص الشفاء الذاتي واللمسة النهائية التي تشبه المرآة، تعيد السلسلة السائلة تعريف ما هو ممكن في جماليات أفلام حماية الطلاء.",
      subHeading: "شاهد مجموعتنا"
    },
    sections: {
      collection: "المجموعة الكاملة"
    }
  }
};

// --- COLOR MAP & STYLES ---
const COLOR_CONFIG = {
  "Liquid Sapphire": {
    hex: "#082567",
    style: "gloss" // High gloss liquid look
  },
  "Liquid Red Wine": {
    hex: "#5E0010", // Deep Wine Red
    style: "gloss"
  },
  "Satin Liquid Tungsten Steel": {
    hex: "#4A4A4A",
    style: "satin" // Metallic but with satin overlay
  }
};

// --- COLORS LIST ---
const liquidColors = [
  "Liquid Sapphire",
  "Liquid Red Wine",
  "Satin Liquid Tungsten Steel"
];

// --- COMPONENTS ---

const ColorCard = ({ name }) => {
  const config = COLOR_CONFIG[name];
  const colorHex = config?.hex || "#000";
  const isSatin = config?.style === "satin";

  // 1. LIQUID GLOSS STYLE (Wet Look)
  const glossStyle = {
    background: `linear-gradient(135deg, ${colorHex} 0%, ${colorHex} 40%, #ffffff 50%, ${colorHex} 60%, ${colorHex} 100%)`,
    backgroundSize: '200% 200%',
    boxShadow: `inset 0 0 15px rgba(0,0,0,0.5)` // Depth
  };

  // 2. SATIN LIQUID STYLE (Metallic + Matte Overlay)
  const satinStyle = {
    backgroundColor: colorHex,
    background: `linear-gradient(120deg, ${colorHex} 10%, #999 50%, ${colorHex} 90%)`
  };

  return (
    <div className="group flex flex-col items-center gap-4 p-4 animate-fade-in-up">
      {/* Card Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-200">
        
        {/* Main "Roll" Representation */}
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000 relative">
            
            {/* Base Layer */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={isSatin ? satinStyle : glossStyle}
            />

            {/* Satin Overlay (Only for Tungsten) */}
            {isSatin && (
                <div 
                    className="absolute inset-0 w-full h-full opacity-40"
                    style={{ 
                        background: `linear-gradient(105deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0.1) 100%)`
                    }}
                />
            )}
            
            {/* High Gloss Glare (Only for Liquid) */}
            {!isSatin && (
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-80 pointer-events-none" />
            )}
        </div>

        {/* Circle Swatch Overlay */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg z-10 bg-white">
           <div 
             className="w-full h-full relative" 
             style={isSatin ? satinStyle : glossStyle} 
           >
             {/* Swatch Reflection */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
           </div>
        </div>
      </div>
      
      {/* Color Name */}
      <h3 className="mt-4 text-sm md:text-base font-bold text-gray-900 text-center uppercase tracking-wide group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
    </div>
  );
};

export default function LiquidSeriesCollection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const t = isArabic ? contentData.ar : contentData.en;

  return (
    <section className="w-full bg-white pb-24" dir={isArabic ? "rtl" : "ltr"}>
      
   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 2. COLLECTION GRID --- */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 border-b border-gray-200 pb-4 text-gray-900">
            {t.sections.collection}
          </h2>
          {/* Centered Grid for just 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {liquidColors.map((colorName, idx) => (
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
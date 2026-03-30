"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react"; 

// --- DATA ---
const contentData = {
  en: {
    series: {
      title: "LIQUID SERIES",
      description:
        "PRISM PPF’s Liquid Series is a cutting-edge collection of colored PPF that mimics the flowing, multi-dimensional look of liquid metal and hyper-gloss finishes. Designed for car enthusiasts who want their vehicle to stand out with intense depth, movement, and color shift effects, the Liquid Series brings a futuristic edge to traditional car wraps. These ultra-gloss PPF films not only deliver eye-catching visual impact but also provide advanced protection against rock chips, UV rays, and environmental damage. With self-healing properties and a mirror-like finish, the Liquid Series redefines what’s possible in paint protection film aesthetics.",
      cta: "Explore Collection",
    },
  },
  ar: {
    series: {
      title: "السلسلة السائلة",
      description:
        "سلسلة PURE PPF السائلة هي مجموعة متطورة من أفلام الحماية الملونة (PPF) التي تحاكي المظهر الانسيابي ومتعدد الأبعاد للمعدن السائل والتشطيبات فائقة اللمعان. صُممت لعشاق السيارات الذين يريدون أن تتميز مركباتهم بعمق وكثافة وتأثيرات تغيير اللون، تضفي السلسلة السائلة لمسة مستقبلية على تغليف السيارات التقليدي. لا توفر أفلام PPF فائقة اللمعان هذه تأثيرًا بصريًا لافتًا للنظر فحسب، بل توفر أيضًا حماية متقدمة ضد رقائق الصخور والأشعة فوق البنفسجية والأضرار البيئية. مع خصائص الشفاء الذاتي واللمسة النهائية التي تشبه المرآة، تعيد السلسلة السائلة تعريف ما هو ممكن في جماليات أفلام حماية الطلاء.",
      cta: "استكشف المجموعة",
    },
  },
};

export default function LiquidSeriesSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  const data = isArabic ? contentData.ar : contentData.en;
  const { title, description, cta } = data.series;

  return (
    <section className="w-full bg-black text-white" dir={isArabic ? "rtl" : "ltr"}>
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        
        {/* A. Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            // Using the 'Luxury' Blue car as it represents the "Liquid/Gloss" look perfectly
            src="https://res.cloudinary.com/dl9d4khcs/image/upload/v1766582672/LuxuryLevelCrystal_pp8fun.png" 
            alt="Liquid Series Background"
            fill
            className="object-cover opacity-60 scale-105" 
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div className={`absolute inset-0 bg-gradient-to-r ${isArabic ? 'from-transparent via-black/80 to-black' : 'from-black via-black/80 to-transparent'} z-0`} />
          
          {/* Optional: 'Wet' Look Overlay using CSS gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent mix-blend-overlay pointer-events-none" />
        </div>

        {/* B. Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Column */}
          <div className="max-w-xl space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              {title}
            </h2>
            
            <p className="text-sm md:text-base leading-relaxed text-gray-200 font-light drop-shadow-md text-justify border-l-2 border-blue-500/50 pl-6">
              {description}
            </p>

            
          </div>

          {/* Image Column (Floating Card Effect) */}
          <div className="hidden md:block relative h-[500px] w-full shadow-[0_20px_60px_rgba(0,10,50,0.6)] rounded-xl overflow-hidden border border-white/10 animate-fade-in-right group">
             
             {/* Main Image */}
             <Image
               src="https://res.cloudinary.com/dl9d4khcs/image/upload/v1766580740/2_yoknvq.png"
               alt="Liquid Series Detail"
               fill
               className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
             />
             
             {/* Liquid Sheen Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none transform -translate-x-full group-hover:translate-x-full ease-in-out" style={{ transitionDuration: '1.5s' }} />
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
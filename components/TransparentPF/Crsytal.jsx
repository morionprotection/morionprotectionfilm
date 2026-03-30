'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, MoveRight, Layers, Maximize2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

const CrystalSeries = () => {
  const pathname = usePathname() || '';
  const isArabic = pathname.startsWith('/ar');

  // Content Data
  const content = {
    en: {
      verticalText: "PREMIUM PROTECTION",
      title: "CRYSTAL",
      subtitle: "SERIES",
      tagline: "High-Fidelity Paint Protection",
      description: "Experience the invisible shield. Engineered for extreme gloss and 99% optical clarity. This film doesn't just protect; it enhances your vehicle's paint depth while repelling road debris with military-grade resilience.",
      stats: [
        { label: "Warranty", value: "10 YR", icon: ShieldCheck },
        { label: "Clarity", value: "99%", icon: Maximize2 },
        { label: "Finish", value: "Ultra Gloss", icon: Sparkles },
      ]
    },
    ar: {
      verticalText: "حماية فائقة",
      title: "كريستال",
      subtitle: "سيريس",
      tagline: "حماية طلاء عالية الدقة",
      description: "جرب الدرع غير المرئي. صُمم لتوفير لمعان فائق ووضوح بصري بنسبة ٩٩٪. هذا الفيلم لا يحمي فقط؛ بل يعزز عمق طلاء مركبتك مع صد حطام الطريق بمرونة عالية.",
      stats: [
        { label: "الضمان", value: "١٠ سنوات", icon: ShieldCheck },
        { label: "الوضوح", value: "٩٩٪", icon: Maximize2 },
        { label: "المظهر", value: "لمعان فائق", icon: Sparkles },
      ]
    }
  };

  const t = isArabic ? content.ar : content.en;
  const accentColor = "#3ab5a7";

  return (
    <div 
      dir={isArabic ? 'rtl' : 'ltr'} 
      className={`relative w-full min-h-[800px] bg-neutral-950 mt-20 overflow-hidden text-white selection:bg-[#3ab5a7] selection:text-black ${isArabic ? 'font-arabic' : 'font-sans'}`}
    >
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Massive Background Text (Creative Element) */}
      <div className={`absolute top-20 pointer-events-none select-none opacity-5 overflow-hidden w-full ${isArabic ? 'left-[-10%]' : 'right-[-10%]'}`}>
        <h1 className="text-[15vw] leading-none font-black text-transparent stroke-text uppercase tracking-widest whitespace-nowrap"
            style={{ WebkitTextStroke: '2px white' }}>
          {content.en.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row h-full relative z-10 min-h-[800px]">
        
        {/* --- LEFT SIDEBAR (Tech Strip) --- */}
        <div className="w-full lg:w-20 border-b lg:border-b-0 lg:border-r border-white/10 flex lg:flex-col items-center justify-between bg-neutral-950 z-20 p-4 lg:py-12">
          <div className="w-2 h-2 bg-[#3ab5a7]" />
          <div className={`text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase whitespace-nowrap hidden lg:block ${isArabic ? '' : 'rotate-180'} [writing-mode:vertical-lr]`}>
            {t.verticalText}
          </div>
          <div className="w-2 h-2 border border-white/20" />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Top Border Line with Tech Markers */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 hidden lg:block">
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-950 border border-white/20" />
            <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-950 border border-white/20" />
          </div>

          <div className="flex-1 p-6 md:p-16 lg:p-24 flex flex-col justify-center relative">
            
            <motion.div 
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl relative z-20"
            >
              
              {/* Category Tag */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-[#3ab5a7]"></span>
                <span className="text-[#3ab5a7] uppercase tracking-[0.2em] text-sm font-bold">
                  {t.tagline}
                </span>
              </div>

              {/* Main Title Block */}
              <div className="relative mb-8">
                <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                  {t.title}
                </h1>
                <h2 className={`text-4xl md:text-5xl font-light uppercase tracking-[0.2em] text-neutral-500 mt-2 ${isArabic ? 'mr-2' : 'ml-2'}`}>
                  {t.subtitle}
                </h2>
              </div>

              {/* Description */}
              <p className="text-neutral-400 text-lg leading-relaxed max-w-lg mb-12 border-l-2 border-white/10 pl-6">
                {t.description}
              </p>

              {/* Tech Specs Bar - Sharp & Clean */}
              <div className="flex flex-wrap border border-white/10 bg-neutral-900/40 backdrop-blur-none w-fit">
                {t.stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`p-6 md:px-10 md:py-6 flex flex-col gap-2 hover:bg-white/5 transition-colors duration-300 ${index !== t.stats.length - 1 ? (isArabic ? 'border-l' : 'border-r') + ' border-white/10' : ''}`}
                  >
                    <stat.icon size={20} className="text-[#3ab5a7] mb-1" strokeWidth={1.5} />
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs uppercase tracking-wider text-neutral-500">{stat.label}</span>
                  </div>
                ))}
              </div>

            </motion.div>

          </div>

          {/* --- IMAGE COMPOSITION (Sharp, no blur) --- */}
          <div className={`absolute bottom-0 h-[60%] lg:h-[85%] w-full lg:w-[65%] z-0 pointer-events-none mix-blend-normal ${isArabic ? 'left-0' : 'right-0'}`}>
             
             {/* The Image */}
             <motion.img 
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308324/LuxuryCrystalSeries_bwvt5z.png" 
                alt="Crystal Series Car" 
                className={`w-full h-full object-contain object-bottom ${isArabic ? '-scale-x-100' : ''}`}
             />

             {/* Gradient Mask for seamless floor blend (Sharp gradient, no blur) */}
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent h-1/3 bottom-0" />
             
             {/* Side Gradient for text readability */}
             <div className={`absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent w-3/4 ${isArabic ? 'bg-gradient-to-l right-0' : 'left-0'}`} />
          </div>

        </div>
      </div>
      
      {/* Decorative Corner Borders */}
      <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-white/10 pointer-events-none hidden md:block"></div>
      <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-white/10 pointer-events-none hidden md:block"></div>

    </div>
  )
}

export default CrystalSeries;
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Snowflake, Wind, ThermometerSnowflake,  Maximize2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

const FrostSeries = () => {
  const pathname = usePathname() || '';
  const isArabic = pathname.startsWith('/ar');

  // Content Data
  const content = {
    en: {
      verticalText: "FROZEN FINISH",
      title: "FROST",
      subtitle: "SERIES",
      tagline: "Cryogenic Matte Protection",
      description: "Freeze time. This advanced film creates a sophisticated, semi-transparent frozen matte finish. It eliminates glare and accentuates body lines while providing a hard-shell defense against the elements.",
      stats: [
        { label: "Warranty", value: "10 YR", icon: ShieldCheck },
        { label: "Temp", value: "Cool", icon: ThermometerSnowflake },
        { label: "Texture", value: "Frozen", icon: Snowflake },
      ]
    },
    ar: {
      verticalText: "لمسة مثلجة",
      title: "فروست",
      subtitle: "سيريس",
      tagline: "حماية مطفية متطورة",
      description: "جمّد الزمن. يخلق هذا الفيلم المتطور لمسة نهائية مطفية شبه شفافة ومتطورة. يزيل الانعكاسات ويبرز خطوط الهيكل مع توفير دفاع صلب ضد العوامل الجوية.",
      stats: [
        { label: "الضمان", value: "١٠ سنوات", icon: ShieldCheck },
        { label: "الحرارة", value: "بارد", icon: ThermometerSnowflake },
        { label: "الملمس", value: "مُثلج", icon: Snowflake },
      ]
    }
  };

  const t = isArabic ? content.ar : content.en;
  const accentColor = "#22d3ee"; // Cyan-400

  return (
    <div 
      dir={isArabic ? 'rtl' : 'ltr'} 
      className={`relative w-full min-h-[800px] bg-slate-950 overflow-hidden text-white selection:bg-cyan-500 selection:text-black ${isArabic ? 'font-arabic' : 'font-sans'}`}
    >
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* The "Ice Fracture" - Diagonal Geometric Line */}
      <div className={`absolute top-0 h-full w-[1px] bg-cyan-900/50 pointer-events-none ${isArabic ? 'left-1/3 skew-x-[15deg]' : 'right-1/3 -skew-x-[15deg]'}`} />
      
      {/* Massive Background Text */}
      <div className={`absolute top-40 pointer-events-none select-none opacity-[0.04] overflow-hidden w-full ${isArabic ? 'left-[-5%]' : 'right-[-5%]'}`}>
        <h1 className="text-[18vw] leading-none font-black text-cyan-100 uppercase tracking-widest whitespace-nowrap">
          {content.en.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row h-full relative z-10 min-h-[800px]">
        
        {/* --- LEFT SIDEBAR (Tech Strip) --- */}
        <div className="w-full lg:w-20 border-b lg:border-b-0 lg:border-r border-slate-800/50 flex lg:flex-col items-center justify-between bg-slate-950/80 backdrop-blur-sm z-20 p-4 lg:py-12">
          <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <div className={`text-xs font-bold tracking-[0.3em] text-slate-500 uppercase whitespace-nowrap hidden lg:block ${isArabic ? '' : 'rotate-180'} [writing-mode:vertical-lr]`}>
            {t.verticalText}
          </div>
          <div className="w-2 h-2 border border-slate-700" />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Top Border Line with Tech Markers */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 hidden lg:block">
             <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-16 h-[1px] bg-cyan-500/50" />
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
                <Snowflake size={16} className="text-cyan-400 animate-pulse" />
                <span className="text-cyan-400 uppercase tracking-[0.2em] text-sm font-bold">
                  {t.tagline}
                </span>
              </div>

              {/* Main Title Block */}
              <div className="relative mb-8">
                <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                  {t.title}
                </h1>
                <h2 className={`text-4xl md:text-5xl font-light uppercase tracking-[0.2em] text-slate-500 mt-2 ${isArabic ? 'mr-2' : 'ml-2'}`}>
                  {t.subtitle}
                </h2>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-12 border-l-2 border-cyan-900/30 pl-6">
                {t.description}
              </p>

              {/* Tech Specs Bar - Slate/Cyan Theme */}
              <div className="flex flex-wrap border border-slate-800 bg-slate-900/40 backdrop-blur-none w-fit">
                {t.stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`p-6 md:px-10 md:py-6 flex flex-col gap-2 hover:bg-cyan-950/20 transition-colors duration-300 ${index !== t.stats.length - 1 ? (isArabic ? 'border-l' : 'border-r') + ' border-slate-800' : ''}`}
                  >
                    <stat.icon size={20} className="text-cyan-400 mb-1" strokeWidth={1.5} />
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </div>

            </motion.div>

          </div>

          {/* --- IMAGE COMPOSITION (Frozen Look) --- */}
          <div className={`absolute bottom-0 h-[60%] lg:h-[85%] w-full lg:w-[65%] z-0 pointer-events-none mix-blend-normal ${isArabic ? 'left-0' : 'right-0'}`}>
             
             {/* The Image - Using CSS filters to create the "Frozen/Cold" temperature look */}
             <motion.img 
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308327/LuxuryFrostSeries_uyrdmx.png" 
                alt="Frost Series Car" 
                // Using contrast, brightness, and grayscale to force the image into the color palette
                className={`w-full h-full object-cover object-center lg:object-right opacity-80 contrast-[1.2] brightness-75 grayscale-[0.8] sepia-[0.3] hue-rotate-[170deg] ${isArabic ? '-scale-x-100' : ''}`}
                style={{ clipPath: isArabic ? 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 0, 80% 0, 100% 100%, 0% 100%)' }}
             />

             {/* Cold Overlay Gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-cyan-900/10 to-transparent mix-blend-overlay" />

             {/* Floor Fade Mask */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent h-1/2 bottom-0" />
             
             {/* Text Readability Mask (Side Fade) */}
             <div className={`absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full lg:w-2/3 ${isArabic ? 'bg-gradient-to-l right-0' : 'left-0'}`} />
          </div>

        </div>
      </div>
      
      {/* Decorative Geometric Shards */}
      <div className="absolute bottom-10 left-10 w-4 h-4 border border-cyan-500/30 rotate-45 pointer-events-none hidden md:block" />
      <div className="absolute top-10 right-10 w-24 h-[1px] bg-cyan-500/20 pointer-events-none hidden md:block" />

    </div>
  )
}

export default FrostSeries;
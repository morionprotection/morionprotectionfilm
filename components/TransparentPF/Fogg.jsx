'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CloudFog, EyeOff, Maximize2, MoveRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const FogSeries = () => {
  const pathname = usePathname() || '';
  const isArabic = pathname.startsWith('/ar');

  // Content Data
  const content = {
    en: {
      verticalText: "SATIN AESTHETICS",
      title: "FOG",
      subtitle: "SERIES",
      tagline: "Satin Finish Paint Protection",
      description: "Stealth mode engaged. This film transforms any glossy paint into a stunning frozen satin finish without altering the original color. Engineered for those who prefer an understated, modern aesthetic with industrial-grade protection.",
      stats: [
        { label: "Warranty", value: "5 YR", icon: ShieldCheck },
        { label: "Opacity", value: "Satin", icon: EyeOff }, // EyeOff represents "Stealth/Matte"
        { label: "Finish", value: "Frozen", icon: CloudFog },
      ]
    },
    ar: {
      verticalText: "جماليات الساتان",
      title: "فوج",
      subtitle: "سيريس",
      category: "حماية طلاء ساتان",
      tagline: "حماية بلمسة ساتان",
      description: "نمط التخفي. يحول هذا الفيلم أي طلاء لامع إلى لمسة ساتان مجمدة مذهلة دون تغيير اللون الأصلي. صمم لأولئك الذين يفضلون الجمالية العصرية والهادئة مع حماية صناعية.",
      stats: [
        { label: "الضمان", value: "٥ سنوات", icon: ShieldCheck },
        { label: "الشفافية", value: "ساتان", icon: EyeOff },
        { label: "المظهر", value: "مُجمد", icon: CloudFog },
      ]
    }
  };

  const t = isArabic ? content.ar : content.en;
  
  // Zinc/Slate accent color for the "Fog" theme
  const accentColor = "#94a3b8"; 

  return (
    <div 
      dir={isArabic ? 'rtl' : 'ltr'} 
      className={`relative w-full min-h-[800px] bg-neutral-950 overflow-hidden text-white selection:bg-zinc-500 selection:text-white ${isArabic ? 'font-arabic' : 'font-sans'}`}
    >
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      {/* Sharp Grid Pattern - slightly different opacity for "Mood" */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Noise Texture for "Matte" feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 mix-blend-overlay pointer-events-none"></div>

      {/* Massive Background Text */}
      <div className={`absolute top-32 pointer-events-none select-none opacity-[0.03] overflow-hidden w-full ${isArabic ? 'left-[-5%]' : 'right-[-5%]'}`}>
        <h1 className="text-[18vw] leading-none font-black text-white uppercase tracking-widest whitespace-nowrap">
          {content.en.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row h-full relative z-10 min-h-[800px]">
        
        {/* --- LEFT SIDEBAR (Tech Strip) --- */}
        <div className="w-full lg:w-20 border-b lg:border-b-0 lg:border-r border-white/10 flex lg:flex-col items-center justify-between bg-neutral-950/80 backdrop-blur-sm z-20 p-4 lg:py-12">
          <div className="w-2 h-2 bg-zinc-500" />
          <div className={`text-xs font-bold tracking-[0.3em] text-zinc-600 uppercase whitespace-nowrap hidden lg:block ${isArabic ? '' : 'rotate-180'} [writing-mode:vertical-lr]`}>
            {t.verticalText}
          </div>
          <div className="w-2 h-2 border border-zinc-700" />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Top Border Line with Tech Markers */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 hidden lg:block">
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-zinc-800" />
            <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-zinc-800" />
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
                <span className="w-8 h-[1px] bg-zinc-500"></span>
                <span className="text-zinc-400 uppercase tracking-[0.2em] text-sm font-bold flex items-center gap-2">
                  {t.tagline}
                </span>
              </div>

              {/* Main Title Block */}
              <div className="relative mb-8">
                <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                  {t.title}
                </h1>
                <h2 className={`text-4xl md:text-5xl font-thin uppercase tracking-[0.2em] text-zinc-600 mt-2 ${isArabic ? 'mr-2' : 'ml-2'}`}>
                  {t.subtitle}
                </h2>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mb-12 border-l-2 border-zinc-800 pl-6">
                {t.description}
              </p>

              {/* Tech Specs Bar - Zinc/Monochrome Theme */}
              <div className="flex flex-wrap border border-zinc-800 bg-neutral-900/60 backdrop-blur-none w-fit">
                {t.stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`p-6 md:px-10 md:py-6 flex flex-col gap-2 hover:bg-zinc-900 transition-colors duration-300 ${index !== t.stats.length - 1 ? (isArabic ? 'border-l' : 'border-r') + ' border-zinc-800' : ''}`}
                  >
                    <stat.icon size={20} className="text-zinc-500 mb-1" strokeWidth={1.5} />
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs uppercase tracking-wider text-zinc-600">{stat.label}</span>
                  </div>
                ))}
              </div>

            </motion.div>

          </div>

          {/* --- IMAGE COMPOSITION (Matte/Satin Vibe) --- */}
          <div className={`absolute bottom-0 h-[55%] lg:h-[80%] w-full lg:w-[70%] z-0 pointer-events-none mix-blend-normal ${isArabic ? 'left-0' : 'right-0'}`}>
             
             {/* The Image - Applied grayscale/contrast to ensure "Matte" look regardless of image source */}
             <motion.img 
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308323/EntryFoggSeries_gzcehb.png" 
                alt="Fog Series Car" 
                className={`w-full h-full object-contain object-bottom contrast-[1.1] grayscale-[0.2] ${isArabic ? '-scale-x-100' : ''}`}
             />

             {/* Floor Fade Mask */}
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent h-1/2 bottom-0" />
             
             {/* Text Readability Mask (Side Fade) */}
             <div className={`absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent w-full lg:w-3/4 ${isArabic ? 'bg-gradient-to-l right-0' : 'left-0'}`} />
          </div>

        </div>
      </div>
      
      {/* Decorative Corner Borders (Bottom Left / Top Right) */}
      <div className="absolute bottom-12 left-12 w-32 h-[1px] bg-zinc-900 pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-12 left-12 w-[1px] h-32 bg-zinc-900 pointer-events-none hidden md:block"></div>
      
      {/* Top Right Accent */}
      <div className="absolute top-0 right-12 w-[1px] h-20 bg-gradient-to-b from-zinc-700 to-transparent hidden md:block"></div>

    </div>
  )
}

export default FogSeries;
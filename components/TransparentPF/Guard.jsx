'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CarFront, ShieldCheck, Activity, Target } from 'lucide-react';
import { usePathname } from 'next/navigation';

const GuardSeries = () => {
  const pathname = usePathname() || '';
  const isArabic = pathname.startsWith('/ar');

  // Content Data
  const content = {
    en: {
      verticalText: "ESSENTIAL ARMOR",
      title: "GUARD",
      subtitle: "SERIES",
      tagline: "High-Durability Standard Protection",
      description: "The baseline for professional paint protection. Guard Series provides a high-impact resistance layer specifically calibrated for daily drivers. It offers a clear, high-gloss sacrificial barrier against stone chips, road salt, and environmental abrasion.",
      stats: [
        { label: "Coverage", value: "5 YR", icon: Shield },
        { label: "Durability", value: "High", icon: Activity },
        { label: "Purpose", value: "Daily", icon: Target },
      ]
    },
    ar: {
      verticalText: "درع أساسي",
      title: "جارد",
      subtitle: "سيريس",
      tagline: "حماية قياسية عالية المتانة",
      description: "الأساس للحماية الاحترافية للطلاء. توفر فئة جارد طبقة مقاومة عالية التأثير تمت معايرتها خصيصاً للقيادة اليومية. توفر حاجزاً واضحاً وعالي اللمعان ضد رقائق الحجارة وملح الطريق والتآكل البيئي.",
      stats: [
        { label: "التغطية", value: "٥ سنوات", icon: Shield },
        { label: "المتانة", value: "عالية", icon: Activity },
        { label: "الغرض", value: "يومي", icon: Target },
      ]
    }
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div 
      dir={isArabic ? 'rtl' : 'ltr'} 
      className={`relative w-full min-h-[800px] bg-neutral-950 overflow-hidden text-white selection:bg-neutral-100 selection:text-black ${isArabic ? 'font-arabic' : 'font-sans'}`}
    >
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      {/* Heavy Industrial Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      
      {/* Diagonal Technical Stripes (Creative Element) */}
      <div className={`absolute top-0 w-32 h-full opacity-5 pointer-events-none bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,transparent_10px,transparent_20px)] ${isArabic ? 'left-10' : 'right-10'}`} />

      {/* Massive Background Text */}
      <div className={`absolute bottom-20 pointer-events-none select-none opacity-[0.03] overflow-hidden w-full ${isArabic ? 'left-[-5%]' : 'right-[-5%]'}`}>
        <h1 className="text-[20vw] leading-none font-black text-white uppercase tracking-[0.1em] whitespace-nowrap">
          {content.en.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row h-full relative z-10 min-h-[800px]">
        
        {/* --- LEFT SIDEBAR (Tech Strip) --- */}
        <div className="w-full lg:w-20 border-b lg:border-b-0 lg:border-r border-white/10 flex lg:flex-col items-center justify-between bg-neutral-900/50 backdrop-blur-sm z-20 p-4 lg:py-12">
          <div className="w-4 h-[2px] bg-neutral-500" />
          <div className={`text-xs font-bold tracking-[0.4em] text-neutral-600 uppercase whitespace-nowrap hidden lg:block ${isArabic ? '' : 'rotate-180'} [writing-mode:vertical-lr]`}>
            {t.verticalText}
          </div>
          <div className="w-4 h-[2px] bg-neutral-500" />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Top Border Markers */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 hidden lg:block">
             <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-4 h-4 border border-white/10 flex items-center justify-center">
                <div className="w-[1px] h-full bg-white/20 rotate-45" />
             </div>
          </div>

          <div className="flex-1 p-6 md:p-16 lg:p-24 flex flex-col justify-center relative">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl relative z-20"
            >
              
              {/* Category Tag */}
              <div className="flex items-center gap-3 mb-6 bg-white/5 w-fit px-4 py-1 border border-white/10">
                <ShieldCheck size={14} className="text-neutral-400" />
                <span className="text-neutral-400 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">
                  {t.tagline}
                </span>
              </div>

              {/* Main Title Block */}
              <div className="relative mb-8">
                <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.8]">
                  {t.title}
                </h1>
                <h2 className={`text-4xl md:text-5xl font-light uppercase tracking-[0.15em] text-neutral-600 mt-2 ${isArabic ? 'mr-1' : 'ml-1'}`}>
                  {t.subtitle}
                </h2>
              </div>

              {/* Description (Rigid box look) */}
              <div className="max-w-lg mb-12 relative">
                <p className="text-neutral-400 text-lg leading-relaxed border-l-4 border-neutral-700 pl-6 py-2">
                  {t.description}
                </p>
              </div>

              {/* Tech Specs Bar - Monochromatic/Industrial */}
              <div className="flex flex-wrap border border-white/10 bg-transparent w-fit">
                {t.stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`p-6 md:px-12 md:py-8 flex flex-col gap-2 hover:bg-neutral-900 transition-colors duration-300 ${index !== t.stats.length - 1 ? (isArabic ? 'border-l' : 'border-r') + ' border-white/10' : ''}`}
                  >
                    <stat.icon size={20} className="text-neutral-500 mb-1" strokeWidth={1.5} />
                    <span className="text-3xl font-bold text-white tracking-tighter">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">{stat.label}</span>
                  </div>
                ))}
              </div>

            </motion.div>

          </div>

          {/* --- CAR IMAGE --- */}
          <div className={`absolute bottom-0 h-[50%] lg:h-[80%] w-full lg:w-[65%] z-0 pointer-events-none mix-blend-normal ${isArabic ? 'left-0' : 'right-0'}`}>
             
             <motion.img 
                initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308338/EntryGuardSeries_uttsi7.png" 
                alt="Guard Series Protection" 
                className={`w-full h-full object-contain object-bottom contrast-[1.1] brightness-[0.8] grayscale ${isArabic ? '-scale-x-100' : ''}`}
             />

             {/* Industrial Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent h-1/3 bottom-0" />
             
             {/* Readability Gradient */}
             <div className={`absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent w-full lg:w-3/4 ${isArabic ? 'bg-gradient-to-l right-0' : 'left-0'}`} />
          </div>

        </div>
      </div>
      
   

    </div>
  )
}

export default GuardSeries;
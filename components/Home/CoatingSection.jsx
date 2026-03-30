"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

// --- DATA ---
const productsEn = [
  { id: 1, name: "Midnight Black", category: "Gloss", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305605/MidnightBlack_powufi.png" },
  { id: 2, name: "Cosmic Blue", category: "Matte", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305381/CosmicBlue_bpwued.png" }, // Replaced placeholder with working roll image for demo
  { id: 3, name: "Satin Red", category: "Satin", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305381/SatinRed_u8qait.png" }, // Replaced placeholder
  { id: 4, name: "Metallic Grey", category: "Metallic", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305380/MettalicGrey_xrfdro.png" }, // Replaced placeholder
    { id: 5, name: "Ice Blue", category: "Metallic", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305380/IceBlue_tlssq6.png" },
    { id: 6, name: "Forest Green", category: "Metallic", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305374/ForstGreen_mtgn6d.png" },
    { id: 7, name: "Veteran Violet", category: "Metallic", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305380/VeteranViolet_o3byi9.png" },

];

const productsAr = [
  { id: 1, name: "أسود ليلي", category: "لامع", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305605/MidnightBlack_powufi.png" },
  { id: 2, name: "أزرق كوني", category: "مطفى", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305381/CosmicBlue_bpwued.png" },
  { id: 3, name: "أحمر ساتان", category: "ساتان", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305381/SatinRed_u8qait.png" },
  { id: 4, name: "رمادي معدني", category: "معدني", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305380/MettalicGrey_xrfdro.png" },
   { id: 5, name: "الجليد الأزرق", category: "معدني", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305380/IceBlue_tlssq6.png" },
    { id: 6, name: "الغابة الخضراء", category: "معدني", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305374/ForstGreen_mtgn6d.png" },
    { id: 7, name: "المخضرم البنفسجي", category: "معدني", src: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768305380/VeteranViolet_o3byi9.png" },
];

const textContent = {
  en: {
    title: "PRISM Protection",
    description: "A must-have upgrade for your new PRISM Protection, this Hydrophobic coating locks in clarity, enhances gloss, and makes maintenance effortless.",
  },
  ar: {
    title: "تغليف بريزم بي بي أف",
    description: "ترقية أساسية لتجليد PRISM الجديد، يحافظ هذا الطلاء المقاوم للماء على الوضوح، ويعزز اللمعان، ويجعل العناية بالسيارة سهلة للغاية.",
  }
};

// --- CARD COMPONENT ---
const PrismCard = ({ name, category, src, isArabic }) => {
  // Split name for styling (e.g. "Midnight" small, "Black" big)
  const nameParts = name.split(' ');
  const firstWord = nameParts[0];
  const secondWord = nameParts.slice(1).join(' ');

  return (
    <div className="relative w-[280px] h-[170px] md:w-[340px] md:h-[250px] flex-shrink-0 snap-center group select-none">
      
      {/* 1. White Card Body */}
      <div className={`
          bg-white w-full h-full 
          rounded-[24px] 
          ${isArabic ? 'rounded-bl-[90px]' : 'rounded-br-[90px]'} 
          relative z-10 overflow-hidden 
          transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]
      `}>
        
        {/* 2. Product Image (Roll) - ENLARGED */}
        <div className={`
            absolute 
            -bottom-8  /* Pushed down slightly to anchor it */
            ${isArabic ? '-right-10' : '-left-10'} /* Pulled outwards */
            w-[140%] h-[140%] /* Much larger container */
            z-0
        `}>
           <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
              <img 
                  src={src} 
                  alt={name}
                  className={`
                    w-full h-full 
                    object-contain object-bottom /* Ensures it sits at bottom */
                    drop-shadow-2xl 
                    ${isArabic ? '-scale-x-100' : ''}
                  `}
              />
           </div>
        </div>

        {/* 3. Typography (Top Corner) */}
        <div className={`absolute top-6 ${isArabic ? 'left-6 text-left' : 'right-6 text-right'} z-10 leading-none`}>
          <span className="block text-gray-800 font-bold text-lg md:text-xl tracking-wide">
            {firstWord}
          </span>
          <span className="block text-black font-black text-2xl md:text-3xl tracking-tight mt-1">
            {secondWord}
          </span>
        </div>

      </div>

      {/* 4. Floating Action Button */}
      <button className={`
          absolute -bottom-2 ${isArabic ? '-left-2' : '-right-2'} z-20 
          w-12 h-12 md:w-14 md:h-14 
          rounded-full 
          bg-[#2DD4BF] 
          flex items-center justify-center 
          text-white
          shadow-[0_0_20px_rgba(45,212,191,0.6)]
          border-4 border-black
          transition-all duration-300 
          hover:scale-110 hover:bg-white hover:text-[#2DD4BF] hover:shadow-[0_0_30px_rgba(45,212,191,0.8)]
      `}>
        <Plus size={24} strokeWidth={3} />
      </button>

    </div>
  );
};

export default function PrismSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const products = isArabic ? productsAr : productsEn;
  const text = isArabic ? textContent.ar : textContent.en;
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 360; 
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-black py-20 relative overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#2DD4BF] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- Header --- */}
        <div className="max-w-4xl mb-14">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-wide text-[#2DD4BF] drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                {text.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl font-light">
                {text.description}
            </p>
        </div>

        {/* --- Carousel Area --- */}
        <div className="relative w-full group/carousel">
            
            {/* Left Nav */}
            <button 
                onClick={() => scroll(isArabic ? 'right' : 'left')}
                className={`
                    hidden md:flex absolute top-1/2 -translate-y-1/2 z-30 
                    w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2DD4BF]/30
                    items-center justify-center text-[#2DD4BF]
                    shadow-[0_0_15px_rgba(45,212,191,0.1)]
                    transition-all hover:scale-110 hover:bg-[#2DD4BF] hover:text-black hover:border-[#2DD4BF]
                    ${isArabic ? '-right-16' : '-left-16'}
                `}
            >
                {isArabic ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>

            {/* Scrollable Container */}
            <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-6 md:gap-10 pb-16 pt-4 snap-x snap-mandatory no-scrollbar px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((item, index) => (
                    <PrismCard key={index} {...item} isArabic={isArabic} />
                ))}
            </div>

            {/* Right Nav */}
            <button 
                onClick={() => scroll(isArabic ? 'left' : 'right')}
                className={`
                    hidden md:flex absolute top-1/2 -translate-y-1/2 z-30 
                    w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2DD4BF]/30
                    items-center justify-center text-[#2DD4BF]
                    shadow-[0_0_15px_rgba(45,212,191,0.1)]
                    transition-all hover:scale-110 hover:bg-[#2DD4BF] hover:text-black hover:border-[#2DD4BF]
                    ${isArabic ? '-left-16' : '-right-16'}
                `}
            >
                 {isArabic ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>

        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
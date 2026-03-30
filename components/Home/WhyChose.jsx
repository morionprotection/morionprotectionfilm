"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

// --- DATA ---
const morionLinksEn = [
  {
    category: 'LUXURY LEVEL',
    series: 'CRYSTAL SERIES',
    warranty: '10 YEARS WARRANTY',
    description: 'Engineered for extreme gloss and unmatched clarity. This ultra-transparent protection film enhances your vehicle’s natural shine.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767789474/1_v5fbef.png', 
    link: '/en/products/crystal'
  },
  {
    category: 'ENTRY LEVEL',
    series: 'GUARD SERIES',
    warranty: '5 YEARS WARRANTY',
    description: 'Reliable protection for daily drivers. Provides a durable shield against road debris and scratches while maintaining a clear finish.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767789474/Gemini_Generated_Image_m0ydbum0ydbum0yd_ggqnam.png',
    link: '/en/products/guard'
  },
  {
    category: 'LUXURY LEVEL',
    series: 'FROST SERIES',
    warranty: '10 YEARS WARRANTY',
    description: 'Freeze your original paint color into a sophisticated matte finish. Preserves vibrancy while adding a soft, satin texture.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767790064/3_lhzlmu.png',
    link: '/en/products/frost'
  },
  {
    category: 'ENTRY LEVEL',
    series: 'FOGG SERIES',
    warranty: '5 YEARS WARRANTY',
    description: 'Transform your vehicle’s look with a satin finish at an accessible entry point. Combines style with reliable paint protection.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767790064/4_zxns1x.png',
    link: '/en/products/fogg'
  },
   {
    category: 'PREMIUM COLOR',
    series: 'COLOR WRAPS',
    warranty: '10 YEARS WARRANTY',
    description: 'Transform your vehicle with Ultra-Gloss Solid Color Wraps. TPU construction that delivers an exceptionally authentic paint-like appearance.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767790064/5_e3yqbj.png',
    link: '/en/products/wraps'
  },
];

const morionLinksAr = [
  {
    category: 'سلسلة فاخرة',
    series: 'كريستال',
    warranty: 'ضمان ١٠ سنوات',
    description: 'مصممة لمعان فائق ووضوح لا مثيل له. يعزز فيلم الحماية فائق الشفافية هذا اللمعان الطبيعي لسيارتك.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767789474/1_v5fbef.png', 
    link: '/ar/products/crystal'
  },
  {
    category: 'سلسلة اقتصادية',
    series: 'جارد',
    warranty: 'ضمان ٥ سنوات',
    description: 'حماية موثوقة للقيادة اليومية. يوفر درعًا متينًا ضد حطام الطريق والخدوش مع الحفاظ على لمسة نهائية واضحة.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767789474/Gemini_Generated_Image_m0ydbum0ydbum0yd_ggqnam.png',
    link: '/ar/products/guard'
  },
  {
    category: 'سلسلة فاخرة',
    series: 'فروست',
    warranty: 'ضمان ١٠ سنوات',
    description: 'حول لون طلاءك الأصلي إلى لمسة نهائية غير لامعة ومتطورة. يحافظ على الحيوية مع إضافة ملمس حريري ناعم.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767790064/3_lhzlmu.png',
    link: '/ar/products/frost'
  },
    {
    category: 'سلسلة اقتصادية',
    series: 'فوج',
    warranty: 'ضمان ٥ سنوات',
    description: 'غير مظهر سيارتك بلمسة نهائية ساتان بنقطة دخول ميسورة التكلفة. يجمع بين الأناقة وحماية الطلاء الموثوقة.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767790064/4_zxns1x.png',
    link: '/ar/products/fogg'
  },
  {
    category: 'أفلام ملونة',
    series: 'تغليف فاخر',
    warranty: 'ضمان ١٠ سنوات',
    description: 'غير سيارتك بتغليف ملون فائق اللمعان. هيكل TPU يوفر مظهرًا يشبه الطلاء الأصلي بشكل استثنائي.',
    imageUrl: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1767790064/5_e3yqbj.png',
    link: '/ar/products/wraps'
  },
];

// --- Hexagon Background ---
const HexFloor = () => (
  <div className="absolute bottom-0 inset-x-0 h-[60%] z-0 pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
      <defs>
        <pattern id="hexagons" width="40" height="34" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
          <path d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z" fill="none" stroke="#2DD4BF" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
  </div>
);

// --- Product Card ---
const ProductCard = ({ category, series, warranty, description, imageUrl, link }) => (
  <div className={`
    group relative flex-shrink-0 
    w-[90vw] md:w-[45vw] lg:w-[30vw] /* Wide Cards */
    h-[560px] md:h-[660px] /* Tall Cards */
    bg-black 
    rounded-md 
    overflow-hidden 
    flex flex-col items-center text-center p-8 snap-center
    border border-[#2DD4BF]  md:border-white/10
    transition-all duration-300
    hover:border-[#2DD4BF] hover:bg-[#0a0a0a]
  `}>
    
    <HexFloor />

    {/* Top Text */}
    <div className="relative z-10 flex flex-col items-center gap-2 mt-2">
      <h3 className="text-white font-black text-3xl tracking-widest uppercase">
        {category}
      </h3>
      <h4 className="text-gray-400 font-light text-2xl tracking-[0.2em] uppercase group-hover:text-gray-200 transition-colors">
        {series}
      </h4>
      <div className="px-3 py-1 mt-2 border border-[#2DD4BF]/30 rounded-full">
         <span className="text-[#2DD4BF] font-light text-xl tracking-widest">
            {warranty}
         </span>
      </div>
    </div>

    {/* Large Car Image (Static) */}
    <div className="relative mt-10 z-10 w-[120%] -ml-[10%] h-[300px] -mt-2 group-hover:scale-105 transition-transform duration-500 ease-out">
      <Image
        src={imageUrl}
        alt={`${category} ${series}`}
        fill
        className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
        sizes="(max-width: 768px) 85vw, 26vw"
        priority={false}
      />
    </div>

    {/* Bottom Content */}
    <div className="relative z-10 mt-auto w-full flex items-end justify-between gap-6 pb-1">
      <p className="text-gray-500 text-sm md:text-lg leading-relaxed text-left line-clamp-3 group-hover:text-gray-400">
        {description}
      </p>
      
     
    </div>

  </div>
);


export default function QuickLinksCarousel() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const scrollRef = useRef(null);

  const links = isArabic ? morionLinksAr : morionLinksEn;

  // Native CSS Scroll - Smooth and performant
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 450; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-[#050505] py-20 relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Full Width Container */}
      <div className="w-full px-0 relative z-10">
        
        {/* Navigation Arrows */}
        <div className="hidden md:flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-8 z-30 pointer-events-none">
            <button 
                onClick={() => scroll(isArabic ? 'right' : 'left')}
                className="pointer-events-auto w-12 h-12 rounded-full bg-black/80 border border-[#2DD4BF]/50 flex items-center justify-center text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-black hover:scale-105 transition-all shadow-lg"
            >
                {isArabic ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
            <button 
                onClick={() => scroll(isArabic ? 'left' : 'right')}
                className="pointer-events-auto w-12 h-12 rounded-full bg-black/80 border border-[#2DD4BF]/50 flex items-center justify-center text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-black hover:scale-105 transition-all shadow-lg"
            >
                {isArabic ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
        </div>

        {/* Carousel Container */}
        {/* 'pl-4 md:pl-8' gives it that starting offset so it doesn't stick to the edge immediately */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-4 md:px-8 items-start"
        >
          {links.map((link, index) => (
            <ProductCard key={index} {...link} />
          ))}
          
          {/* Spacer to allow last item to be fully viewed */}
          <div className="w-4 md:w-8 flex-shrink-0"></div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
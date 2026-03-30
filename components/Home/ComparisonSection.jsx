"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// --- Hexagon Floor Pattern SVG (Reused for consistency) ---
const HexFloor = () => (
  <div className="absolute bottom-0 inset-x-0 h-[50%] z-0 opacity-20 pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons-comp" width="40" height="34" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
          <path d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z" fill="none" stroke="#2DD4BF" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons-comp)" />
    </svg>
    {/* Fade out top */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
  </div>
);

export default function ComparisonSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  // --- CONTENT ---
  const text = {
    subHeader: isArabic ? "الفرق مذهل..." : "The Difference is Mind Blowing....",
    titleStart: isArabic ? "تجليد الفينيل" : "Vinyl Wrap",
    titleVs: isArabic ? "مقابل" : "vs",
    titleEnd: isArabic ? "بيور " : "PRISM Protection", // Using "PRISM " based on image context
    headerBenefit: isArabic ? "المزايا" : "Benifets", // Keeping typo "Benifets" if you want 1:1 match, or fix to "Benefits"
    headerVinyl: isArabic ? "تجليد فينيل" : "Vinaly Warp", // Keeping typo "Vinaly Warp" if 1:1, or "Vinyl Wrap"
    headerPrism: isArabic ? "بيور " : "PRISM Protection",
  };

  const COMPARISON_DATA = [
    {
      label: isArabic ? "التركيب" : "Construction",
      vinyl: isArabic ? "بولي فينيل كلورايد" : "Polyvinyl Chloride (PVC)",
      prism: isArabic ? "ثيرموبلاستيك" : "Thermoplastic (TPU)",
    },
    {
      label: isArabic ? "طريقة التركيب" : "Application",
      vinyl: isArabic ? "جاف" : "Dry",
      prism: isArabic ? "رطب" : "Wet",
    },
    {
      label: isArabic ? "السماكة" : "Thickness",
      vinyl: isArabic ? "3-4 ميل (رقيق)" : "3-4 mil (Thin)",
      prism: isArabic ? "8 ميل (سميك)" : "7.8 mil (Thick)",
    },
    {
      label: isArabic ? "الملمس / اللمعان" : "Texture / Finish",
      vinyl: isArabic ? "عالي (قشر البرتقال)" : "High (Orange Peel)",
      prism: isArabic ? "ناعم جداً (زجاجي)" : "Ultra Smooth (Glassy)",
    },
    {
      label: isArabic ? "العمر الافتراضي" : "Life Span",
      vinyl: isArabic ? "2-3 سنوات" : "2-3 Years",
      prism: isArabic ? "7-10 سنوات" : "5-10 Years",
    },
    {
      label: isArabic ? "الشفاء الذاتي" : "Self Healing",
      vinyl: isArabic ? "لا" : "No",
      prism: isArabic ? "نعم" : "Yes",
    },
    {
      label: isArabic ? "طرد المياه" : "Hydrophobic",
      vinyl: isArabic ? "لا" : "No",
      prism: isArabic ? "نعم" : "Yes",
    },
    {
      label: isArabic ? "الحماية من الحصى" : "Rock Chip Protection",
      vinyl: isArabic ? "لا" : "No",
      prism: isArabic ? "نعم" : "Yes",
    },
  ];

  return (
    <section 
      className="w-full bg-black py-20 relative overflow-hidden text-white" 
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Hexagon Floor Background */}
      <HexFloor />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        
        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Text + Car Image */}
          <div className="flex flex-col">
            {/* Header Text */}
            <div className="mb-8">
                <p className="text-white text-lg font-medium mb-1">
                    {text.subHeader}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-[#2DD4BF]">{text.titleStart}</span>{" "}
                    <span className="text-white text-2xl align-middle px-1">{text.titleVs}</span>{" "}
                    <span className="text-[#2DD4BF]">{text.titleEnd}</span>
                </h2>
            </div>

            {/* Car Image (Static) */}
            <div className="relative w-full aspect-[16/9] lg:aspect-[4/3]">
                {/* Replace src with the URL provided.
                   Ensure the image has a transparent background for best results on black.
                */}
                <img
                    src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1767787799/CoatingSection_aje8jl.png"
                    alt="Car Comparison"
                    className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                />
            </div>
          </div>


          {/* RIGHT COLUMN: Comparison Table */}
          <div className="w-full flex flex-col justify-center">
             
             <div className="w-full bg-transparent overflow-hidden">
                
                {/* TABLE HEADER (Teal Background) */}
                <div className="grid grid-cols-3 bg-[#1bd1c8] text-white py-3 px-4">
                    <div className={`font-bold text-sm md:text-base ${isArabic ? 'text-right' : 'text-left'}`}>
                        {text.headerBenefit}
                    </div>
                    <div className="font-bold text-sm md:text-base text-center">
                        {text.headerVinyl}
                    </div>
                    <div className="font-bold text-sm md:text-base text-center">
                        {text.headerPrism}
                    </div>
                </div>

                {/* TABLE BODY */}
                <div className="flex flex-col">
                    {COMPARISON_DATA.map((row, index) => (
                        <div 
                            key={index}
                            className="grid grid-cols-3 py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                            {/* Feature Label */}
                            <div className="text-white font-medium text-xs md:text-sm flex items-center">
                                {row.label}
                            </div>

                            {/* Vinyl Value */}
                            <div className="text-gray-400 text-xs md:text-sm text-center flex items-center justify-center">
                                {row.vinyl}
                            </div>

                            {/* Prism Value */}
                            <div className="text-white font-semibold text-xs md:text-sm text-center flex items-center justify-center">
                                {row.prism}
                            </div>
                        </div>
                    ))}
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
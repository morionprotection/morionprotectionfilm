"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// --- DATA: ENGLISH ---
const dataEn = {
  hero: {
    title: "PREMIUM COLORED PPF FILMS",
    subtitle: "View Our Collection",
    image: "https://res.cloudinary.com/dl9d4khcs/image/upload/v1766580740/2_yoknvq.png", 
  },
  // IDs must match the ID you give to the sections in your page.js
  categories: [
    { id: "solid-section", label: "SOLID GLOSS" },
    { id: "metallic-section", label: "METALLIC GLOSS" },
    { id: "matte-section", label: "MATTE/SATIN" },
    { id: "color-shift-section", label: "COLOR-SHIFT" },
    { id: "liquid-section", label: "LIQUID" },
  ],
};

// --- DATA: ARABIC ---
const dataAr = {
  hero: {
    title: "أفلام حماية الطلاء الملونة الفاخرة",
    subtitle: "شاهد مجموعتنا",
    image: "https://res.cloudinary.com/dl9d4khcs/image/upload/v1766580740/2_yoknvq.png",
  },
  categories: [
    { id: "solid-section", label: "صلب لامع" },
    { id: "metallic-section", label: "معدني لامع" },
    { id: "matte-section", label: "مات/ساتان" },
    { id: "color-shift-section", label: "متغير اللون" },
    { id: "liquid-section", label: "سائل" },
  ],
};

export default function PremiumColoredPPFSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const data = isArabic ? dataAr : dataEn;
  
  // State to track which section is currently visible
  const [activeId, setActiveId] = useState("");

  // Function to handle smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the sticky header height (approx 80px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  return (
    <>
      <section className="w-full bg-black text-white" dir={isArabic ? "rtl" : "ltr"}>
        {/* --- HERO SECTION --- */}
        <div className="relative w-full h-[40vh] md:h-[50vh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={data.hero.image}
              alt={data.hero.title}
              fill
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center px-4 animate-fade-in-up">
            <p className="text-sm md:text-base font-light uppercase tracking-[0.2em] mb-2">
              {data.hero.subtitle}
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
              {data.hero.title}
            </h2>
          </div>
        </div>

        {/* --- STICKY CATEGORY NAVIGATION --- */}
        <div className="w-full border-b border-white/20 bg-black/90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex overflow-x-auto no-scrollbar py-4 space-x-8 md:justify-center" dir="ltr">
              {data.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={`
                    whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-widest transition-colors duration-300 pb-2 border-b-2 
                    ${activeId === category.id
                      ? "text-white border-white"
                      : "text-white/60 border-transparent hover:text-white/80"
                    } 
                    ${isArabic ? 'ml-8 last:ml-0' : ''}
                  `}
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* --- GLOBAL STYLES --- */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </>
  );
}
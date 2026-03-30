"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");


  if(pathname.startsWith('/en/dashboard') || pathname.startsWith('/ar/dashboard')){
    return null
  }

  // --- CONTENT CONFIG (Color PPF Series Links) ---
  const links = {
    product: [
      { name: "Solid Series", nameAr: "سلسلة صلبة", href: isArabic ? "/ar/color-ppf-series#solid-section" : "/en/color-ppf-series#solid-section" },
      { name: "Metallic Series", nameAr: "سلسلة معدنية", href: isArabic ? "/ar/color-ppf-series#metallic-section" : "/en/color-ppf-series#metallic-section" },
      { name: "Matte Series", nameAr: "سلسلة مات", href: isArabic ? "/ar/color-ppf-series#matte-section" : "/en/color-ppf-series#matte-section" },
      { name: "Liquid Series", nameAr: "سلسلة سائلة", href: isArabic ? "/ar/color-ppf-series#liquid-section" : "/en/color-ppf-series#liquid-section" },
      { name: "Color Shift Series", nameAr: "سلسلة تغيير اللون", href: isArabic ? "/ar/color-ppf-series#color-shift-section" : "/en/color-ppf-series#color-shift-section" },
    ],
    company: [
      { name: "Our Technology", nameAr: "تقنيتنا", href: isArabic ? "/ar/technology" : "en/technology" },
      { name: "Warranty Info", nameAr: "معلومات الضمان", href: isArabic ?  "ar//warranty" : "en/warranty" },
      { name: "Find a Dealer", nameAr: "اعثر على وكيل", href: isArabic ? "/ar#find-dealer" : "/en#find-dealer" },
      { name: "Contact Support", nameAr: "الدعم الفني", href: isArabic ? "/ar/contact" :"/en/contact" },
    ],
    legal: [
      { name: "Crystal Series", nameAr: "سلسلة كريستال", href: isArabic ? "/ar/transparent-pf#crystal-section" : "/en/transparent-pf#crystal-section" },
      { name: "Frost Series", nameAr: "سلسلة فروست", href: isArabic ? "/ar/transparent-pf#frost-section" : "/en/transparent-pf#frost-section" },
      { name: "Guard Series", nameAr: "سلسلة جارد", href: isArabic ? "/ar/transparent-pf#guard-series" : "/en/transparent-pf#guard-series" },
      { name: "Fogg Series", nameAr: "سلسلة فوج", href: isArabic ? "/ar/transparent-pf#fogg-section" : "/en/transparent-pf#fogg-section" },
    ],
  };

  const text = {
    productHeader: isArabic ? "المنتجات" : "PRODUCTS",
    companyHeader: isArabic ? "الشركة" : "COMPANY",
    legalHeader: isArabic ? "شفاف PPF" : "TRANSPARENT PF",
    contactBtn: isArabic ? "تواصل معنا" : "Contact Us",
    copyright: isArabic ? "© 2024 مورايون لأنظمة الحماية. جميع الحقوق محفوظة." : "© 2024 MORION PPF SYSTEMS. ALL RIGHTS RESERVED.",
    tagline: isArabic 
      ? "هندسة الحماية للمستقبل." 
      : "Engineered Protection For The Future.",
  };

  return (
    <footer 
      className="bg-black text-white relative overflow-hidden border-t border-white/10"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Background Texture (Subtle Grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
          
          {/* --- BRAND COLUMN --- */}
          <div className="lg:w-1/3 space-y-8">
           {/* --- BRAND COLUMN --- */}
<div className="lg:w-1/3 space-y-8">
  <Link href="/" className="group inline-flex items-center gap-3">
    
    

    {/* Brand Text */}
    <div className="flex flex-col">
      <span className="text-2xl font-bold tracking-tight leading-none transition-colors group-hover:text-gray-300">
        <Image
          src="/L.png"  // text logo or full logo
          alt="Morion"
          width={160}
          height={40}
          priority
        />
      </span>
    </div>

  </Link>
</div>

            
            <p className="text-gray-500 text-sm font-mono max-w-xs leading-relaxed">
               {text.tagline}
            </p>

             {/* Contact Button moved here for mobile flow, or keep in column 3 */}
             <div className="pt-2">
                <Link 
                    href={isArabic ? "/ar/contact" : "/en/contact"}
                    className="inline-block bg-white text-black px-8 py-3 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                    {text.contactBtn}
                </Link>
            </div>
          </div>

          {/* --- LINKS COLUMNS --- */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            {/* Product Links */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/20 pb-4 inline-block min-w-[50px]">
                {text.productHeader}
              </h4>
              <ul className="space-y-4">
                {links.product.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                      <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      {isArabic ? link.nameAr : link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/20 pb-4 inline-block min-w-[50px]">
                {text.companyHeader}
              </h4>
              <ul className="space-y-4">
                {links.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                       <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                       {isArabic ? link.nameAr : link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/20 pb-4 inline-block min-w-[50px]">
                {text.legalHeader}
              </h4>
              <ul className="space-y-4">
                {links.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                       <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                       {isArabic ? link.nameAr : link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-mono tracking-wider uppercase">
            <span>{text.copyright}</span>
            <div className="flex gap-4">
                <span className="hover:text-gray-400 cursor-pointer">Instagram</span>
                <span className="hover:text-gray-400 cursor-pointer">Twitter / X</span>
                <span className="hover:text-gray-400 cursor-pointer">LinkedIn</span>
            </div>
        </div>

      </div>
    </footer>
  );
}
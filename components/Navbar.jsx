"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Track dropdown visibility
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Track mobile accordion state
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  const NAV_LINKS = [
    { 
      name: "TRANSPARENT PROTECTION FILM", 
      nameAr: "شفاف", 
      href: isArabic ? "/ar/transparent-pf" : "/en/transparent-pf",
      // ADDED DROPDOWN HERE
      dropdown: [
        { name: "CRYSTAL SERIES", nameAr: "كريستال", id: "crystal-section" },
        { name: "GUARD SERIES", nameAr: "سلسلة جارد", id: "guard-series" },
        { name: "FROST SERIES", nameAr: "فروست", id: "frost-section" },
        { name: "FOGG SERIES", nameAr: "فوج", id: "fogg-section" },
      ]
    },
    { 
      name: "COLOR PROTECTION", 
      nameAr: "حماية اللون", 
      href: isArabic ? "/ar/color-ppf-series" : "/en/color-ppf-series",
      // Dropdown Menu Items
      dropdown: [
        { name: "SOLID GLOSS", nameAr: "صلب لامع", id: "solid-section" },
        { name: "METALLIC GLOSS", nameAr: "معدني لامع", id: "metallic-section" },
        { name: "MATTE/SATIN", nameAr: "مات / ساتان", id: "matte-section" },
        { name: "COLOR-SHIFT", nameAr: "متغير اللون", id: "color-shift-section" },
        { name: "LIQUID", nameAr: "سائل", id: "liquid-section" },
      ]
    },
    { 
      name: "WINDOWS FILM", 
      nameAr: "فيلم ويندوز", 
      href: isArabic ? "/ar#film-table" : "/en#film-table" 
    },
    { name: "PRODUCT", nameAr: "المنتج", href: isArabic ? "/ar/products" : "/en/products" },
    { name: "TECHNOLOGY", nameAr: "التقنية", href: isArabic ? "/ar/technology" : "/en/technology" },
    { name: "WARRANTY", nameAr: "الضمان", href: isArabic ? "/ar/warranty" : "/en/warranty" },
    { name: "BECOME DEALER", nameAr: "كن موزعاً", href: isArabic ? "/ar/become-dealer" : "/en/become-dealer" },
  ];

  // Lock body scroll ONLY when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  if(pathname === "/ar/login" || pathname === "/en/login" || pathname?.startsWith('/en/dashboard') || pathname?.startsWith('/ar/dashboard')) {
    return null; 
  }

  const handleLanguageSwitch = () => {
    const currentPath = pathname;
    let newPath;
    if (isArabic) {
      if (currentPath === '/ar') newPath = '/en';
      else newPath = currentPath.replace(/^\/ar/, '/en');
    } else {
      if (currentPath === '/en') newPath = '/ar';
      else if (currentPath === '/') newPath = '/ar';
      else newPath = currentPath.replace(/^\/en/, '/ar');
    }
    window.location.href = newPath;
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <nav
        className="absolute top-0 left-0 right-0 z-50 py-4 bg-gradient-to-b from-black/80 to-transparent"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="max-w-8xl mx-auto px-4 md:px-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative z-50 group flex items-center gap-2">
            <div className="w-32 h-16 md:w-48 md:h-16 relative">
              <Image
                src="/MorionLogoW.png" 
                alt="Morion Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, index) => {
               const isActive = pathname === link.href;
               const hasDropdown = link.dropdown?.length > 0;

               return (
                <div 
                  key={index} 
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    if (hasDropdown) setActiveDropdown(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    if (hasDropdown) setActiveDropdown(null);
                  }}
                >
                  <Link href={link.href} className="relative px-4 py-2 block">
                    <span
                      className={`relative z-10 text-[10px] font-bold tracking-widest transition-colors duration-300
                        ${isActive ? "text-[#33b5a8]" : "text-gray-200 group-hover:text-[#33b5a8]"}
                      `}
                    >
                      {isArabic ? link.nameAr : link.name}
                    </span>

                    {/* Active Dot */}
                    {isActive && (
                      <motion.div 
                          layoutId="nav-active"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#33b5a8] rounded-full shadow-[0_0_8px_#33b5a8]"
                      />
                    )}
                  </Link>
                  
                  {/* --- DROPDOWN MENU --- */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        // CRITICAL: pt-6 creates an invisible bridge so mouse doesn't leave the area
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-6 w-64 z-50"
                      >
                         {/* Dropdown Box */}
                         <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
                           
                           {/* Decoration Line */}
                           <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#33b5a8] to-transparent opacity-80" />

                           <div className="py-2">
                             {link.dropdown.map((item, i) => (
                               <Link 
                                 key={i}
                                 href={`${link.href}#${item.id}`} 
                                 className="group/item flex items-center justify-between px-5 py-3 transition-all hover:bg-white/5"
                               >
                                 <span className="text-[11px] font-bold text-gray-400 group-hover/item:text-white uppercase tracking-widest transition-colors">
                                   {isArabic ? item.nameAr : item.name}
                                 </span>
                                 
                                 {/* Arrow Icon */}
                                 <svg 
                                    className={`w-3 h-3 text-[#33b5a8] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 ${isArabic ? 'rotate-180' : ''}`} 
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                 </svg>
                               </Link>
                             ))}
                           </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
               );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={handleLanguageSwitch}
              className="text-sm font-mono text-gray-400 hover:text-[#33b5a8] transition-colors uppercase flex items-center gap-2 relative group"
            >
                <img src="/globe.svg" alt="Language" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 font-bold">{isArabic ? "EN" : "AR"}</span>
            </button>
            <Link 
                href={isArabic ? "/ar/contact" : "/en/contact"}
                className="group relative overflow-hidden bg-white text-black px-6 py-2.5 font-bold text-xs uppercase tracking-widest skew-x-[-10deg] hover:scale-105 transition-transform"
            >
                <span className="relative z-10 block skew-x-[10deg]">{isArabic ? "احصل على عرض سعر" : "Get Quotation"}</span>
                <div className="absolute inset-0 bg-[#33b5a8]/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            className="lg:hidden relative z-60 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.span 
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                className="w-8 h-[2px] bg-[#33b5a8] block transition-all duration-300"
            />
            <motion.span 
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-8 h-[2px] bg-[#33b5a8] block transition-all duration-300"
            />
            <motion.span 
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                className="w-8 h-[2px] bg-[#33b5a8] block transition-all duration-300"
            />
          </button>
        </div>
      </nav>

      {/* --- MOBILE FULL SCREEN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl h-[100dvh] w-screen flex flex-col lg:hidden overflow-hidden touch-none"
            dir={isArabic ? "rtl" : "ltr"}
          >
             <div className="flex justify-end p-6">
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white/50 hover:text-[#33b5a8] transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
             </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <nav className="flex flex-col items-center gap-4 relative z-10 w-full px-6 overflow-y-auto pb-20">
              {NAV_LINKS.map((link, index) => {
                  const hasDropdown = link.dropdown?.length > 0;
                  const isDropdownOpen = mobileDropdownOpen === index;

                  return (
                    <div key={index} className="w-full flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (index * 0.05) }}
                        className="w-full text-center relative"
                    >
                        {hasDropdown ? (
                            <button
                                onClick={() => setMobileDropdownOpen(isDropdownOpen ? null : index)}
                                className="w-full flex items-center justify-center gap-2 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 hover:to-[#33b5a8] transition-all uppercase tracking-tighter py-3"
                            >
                                {isArabic ? link.nameAr : link.name}
                                <motion.span
                                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                    className="text-[#33b5a8] text-xl"
                                >
                                    ▼
                                </motion.span>
                            </button>
                        ) : (
                            <Link 
                                href={link.href} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 hover:to-[#33b5a8] transition-all uppercase tracking-tighter py-3"
                            >
                                {isArabic ? link.nameAr : link.name}
                            </Link>
                        )}
                    </motion.div>

                    {/* Mobile Dropdown Accordion */}
                    <AnimatePresence>
                        {hasDropdown && isDropdownOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-col gap-3 w-full items-center bg-white/5 rounded-xl border border-white/5"
                            >
                                <div className="py-4 flex flex-col items-center gap-3 w-full">
                                    {link.dropdown.map((subItem, j) => (
                                        <Link
                                            key={j}
                                            href={`${link.href}#${subItem.id}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-sm font-bold text-gray-400 hover:text-[#33b5a8] uppercase tracking-widest w-full text-center py-1"
                                        >
                                            {isArabic ? subItem.nameAr : subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                );
              })}

              <div className="w-full h-[1px] bg-white/10 my-4" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-4 w-full items-center"
              >
                <button
                  onClick={handleLanguageSwitch}
                  className="w-full max-w-xs border border-white/20 py-3 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
                >
                  {isArabic ? "Switch to English" : "تغيير الى العربية"}
                </button>

                 <Link
                    href={isArabic ? "/ar/contact" : "/en/contact"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full max-w-xs bg-[#33b5a8] text-black py-3 font-bold uppercase tracking-widest text-sm text-center hover:bg-white transition-all duration-300 rounded-lg shadow-lg shadow-[#33b5a8]/20"
                 >
                    {isArabic ? "تواصل معنا" : "Contact Us"}
                 </Link>
              </motion.div>
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
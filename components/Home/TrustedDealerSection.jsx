"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Search, MapPin, Globe, Phone, Mail, ArrowRight, ArrowUpRight } from "lucide-react";

// --- Hexagon Floor Pattern (Reused for consistency) ---
const HexFloor = () => (
  <div className="absolute bottom-0 right-0 w-[80%] h-[80%] z-0 opacity-10 pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons-dealers" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <path d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z" fill="none" stroke="#2DD4BF" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons-dealers)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div>
  </div>
);

export default function TrustedDealersClean() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  // --- STATE ---
  const [dealers, setDealers] = useState([]);
  const [activeDealerId, setActiveDealerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- DATA FETCHING ---
  useEffect(() => {
    async function fetchDealers() {
      try {
        const res = await fetch("/api/dealers/dealers");
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch");

        const formattedDealers = (data.dealers || []).map((dealer) => ({
          id: dealer.id,
          name: dealer.shop_name,
          nameAr: dealer.shop_name,
          contactPerson: dealer.contact_name,
          address: dealer.shop_address || "Location Data Unavailable",
          phone: dealer.phone,
          email: dealer.email,
          website: dealer.shop_website,
        }));

        setDealers(formattedDealers);
        if (formattedDealers.length > 0) {
          setActiveDealerId(formattedDealers[0].id);
        }
      } catch (err) {
        console.error("Error loading dealers:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDealers();
  }, []);

  const filteredDealers = dealers.filter((dealer) => {
    const term = searchTerm.toLowerCase();
    const name = dealer.name ? dealer.name.toLowerCase() : "";
    const address = dealer.address ? dealer.address.toLowerCase() : "";
    return name.includes(term) || address.includes(term);
  });

  const activeDealer = dealers.find((d) => d.id === activeDealerId);

  // Translations
  const text = {
    title: isArabic ? "شبكة الوكلاء" : "Dealer Network",
    subtitle: isArabic ? "شركاء موثوقون" : "Trusted Partners",
    searchPlaceholder: isArabic ? "ابحث عن وكيل..." : "Search dealers...",
    loading: "Loading...",
    noResults: isArabic ? "لا توجد نتائج" : "No results found",
    noDealers: isArabic ? "لا يوجد وكلاء حالياً" : "No dealers available right now",
    directions: isArabic ? "الاتجاهات" : "Get Directions",
    website: isArabic ? "زيارة الموقع" : "Visit Website",
    contactInfo: isArabic ? "معلومات الاتصال" : "Contact Info",
    dealerId: isArabic ? "رقم الوكيل" : "Dealer ID",
  };

  return (
    <section 
      className="w-full h-screen bg-black text-white font-sans overflow-hidden selection:bg-[#2DD4BF] selection:text-black" 
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        
        {/* =======================
            LEFT: NAV (LIST) - Dark Sidebar
           ======================= */}
        <div className="w-full lg:w-[450px] flex flex-col h-full bg-[#0a0a0a] border-r border-white/10 z-20 relative">
          
          {/* Header */}
          <div className="pt-12 px-8 pb-8 bg-[#0a0a0a] z-10 border-b border-white/5">
            <span className="text-[#2DD4BF] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                {text.subtitle}
            </span>
            <h1 className="text-3xl font-bold tracking-tight mb-8 text-white">
                {text.title}
            </h1>
            
            {/* Search Input */}
            <div className="relative group">
                <input
                  type="text"
                  placeholder={text.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#111] text-sm text-white px-12 py-4 rounded-lg border border-white/10 focus:outline-none focus:border-[#2DD4BF] transition-all placeholder:text-gray-600"
                />
                <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 ${isArabic ? 'right-4' : 'left-4'}`} />
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent px-4 py-4 space-y-2">
            {isLoading ? (
              <div className="py-8 text-center">
                  <div className="w-6 h-6 border-2 border-[#2DD4BF] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <span className="text-xs font-mono text-gray-500">{text.loading}</span>
              </div>
            ) : dealers.length === 0 ? (
               <div className="py-8 text-center text-xs font-bold text-gray-600 uppercase tracking-widest">{text.noDealers}</div>
            ) : filteredDealers.length > 0 ? (
              filteredDealers.map((dealer) => (
                <button
                  key={dealer.id}
                  onClick={() => setActiveDealerId(dealer.id)}
                  className={`
                    group w-full text-left p-4 rounded-xl flex items-center justify-between transition-all duration-300 border
                    ${activeDealerId === dealer.id 
                        ? "bg-[#1a1a1a] border-[#2DD4BF]/50 shadow-[0_0_15px_rgba(45,212,191,0.1)]" 
                        : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
                    }
                  `}
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <span 
                      className={`text-base font-bold transition-colors duration-300 ${
                        activeDealerId === dealer.id ? "text-white" : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {dealer.name}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-500 transition-colors">
                        <MapPin size={12} />
                        <span className="text-xs font-mono truncate max-w-[200px]">
                            {dealer.address}
                        </span>
                    </div>
                  </div>

                  {/* Active Indicator Arrow */}
                  {activeDealerId === dealer.id && (
                    <motion.div 
                      layoutId="activeArrow" 
                      className={`text-[#2DD4BF] ${isArabic ? "rotate-180" : ""}`}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  )}
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-xs font-mono text-gray-600">{text.noResults}</div>
            )}
          </div>
        </div>

        {/* =======================
            RIGHT: CANVAS (DETAILS) - The Professional "Stage"
           ======================= */}
        <main className="flex-1 h-full bg-black flex flex-col justify-center relative p-8 lg:p-20 overflow-hidden">
            
            {/* Hexagon Background */}
            <HexFloor />

            <AnimatePresence mode="wait">
                {activeDealer ? (
                <motion.div
                    key={activeDealer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-5xl mx-auto flex flex-col h-full justify-center relative z-10"
                >
                    {/* Dealer Status Tag */}
                    <div className="mb-8 flex items-center gap-4">
                         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                            <span className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full animate-pulse shadow-[0_0_8px_#2DD4BF]"></span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2DD4BF]">Verified Dealer</span>
                         </div>
                         <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                            {text.dealerId}: {activeDealer.id.slice(0,6).toUpperCase()}
                         </span>
                    </div>

                    {/* Massive Name */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white mb-6">
                        {activeDealer.name}
                    </h2>

                    {/* Address */}
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed mb-12 border-l-2 border-[#2DD4BF] pl-6">
                        {activeDealer.address}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {activeDealer.phone && (
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-[#111] border border-white/10 text-gray-400 group-hover:text-[#2DD4BF] group-hover:border-[#2DD4BF] transition-all">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Phone</span>
                                    <a href={`tel:${activeDealer.phone}`} className="text-lg text-white font-mono hover:text-[#2DD4BF] transition-colors">
                                        {activeDealer.phone}
                                    </a>
                                </div>
                            </div>
                        )}
                        {activeDealer.email && (
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-[#111] border border-white/10 text-gray-400 group-hover:text-[#2DD4BF] group-hover:border-[#2DD4BF] transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Email</span>
                                    <a href={`mailto:${activeDealer.email}`} className="text-lg text-white font-mono hover:text-[#2DD4BF] transition-colors break-all">
                                        {activeDealer.email}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                         <a 
                             href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeDealer.address)}`}
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex items-center gap-3 px-8 py-4 bg-[#2DD4BF] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(45,212,191,0.2)] rounded-sm"
                         >
                             <MapPin size={18} />
                             {text.directions}
                         </a>

                         {activeDealer.website && (
                             <a 
                                 href={activeDealer.website}
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                             >
                                 {text.website}
                                 <ArrowUpRight size={18} />
                             </a>
                         )}
                    </div>

                </motion.div>
                ) : !isLoading && dealers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-30">
                        <h3 className="text-4xl font-bold tracking-tighter text-center max-w-md leading-tight text-gray-500">
                            {text.noDealers}
                        </h3>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                         {/* Loading State */}
                    </div>
                )}
            </AnimatePresence>
        </main>
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
}
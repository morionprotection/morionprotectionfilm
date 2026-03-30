"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// 1. Translation Dictionary
const DICTIONARY = {
  en: {
    overview: "OVERVIEW",
    status: "System Status: Online",
    total_dealers: "Total Dealers",
    pending: "Pending",
    approved: "Approved",
    warranties: "Warranties",
    admins: "Admins",
    recent_dealers: "Recent Dealers",
    recent_warranties: "Recent Warranties",
    no_data: "No Data Available",
    loading: "Initializing System...",
    error: "Error: Failed to sync dashboard data",
  },
  ar: {
    overview: "نظرة عامة",
    status: "حالة النظام: متصل",
    total_dealers: "إجمالي الوكلاء",
    pending: "قيد الانتظار",
    approved: "تمت الموافقة",
    warranties: "الضمانات",
    admins: "مسؤل",
    recent_dealers: "أحدث الوكلاء",
    recent_warranties: "أحدث الضمانات",
    no_data: "لا توجد بيانات متاحة",
    loading: "جاري تهيئة النظام...",
    error: "خطأ: فشل مزامنة بيانات لوحة التحكم",
  },
};

export default function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 2. Detect Language
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const lang = isArabic ? "ar" : "en";
  const t = DICTIONARY[lang];
  const dir = isArabic ? "rtl" : "ltr";

  useEffect(() => {
    fetch("/api/dashboard", { cache: "no-store" })
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } },
  };

  // Loading State
  if (loading) {
    return (
      <div dir={dir} className="p-8 w-full h-screen grid place-content-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border border-neutral-800 border-t-white animate-spin rounded-none" />
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest animate-pulse">
            {t.loading}
          </p>
        </div>
      </div>
    );
  }

  if (!data?.success) {
    return (
      <div dir={dir} className="p-8 flex items-center justify-center h-[50vh] border border-red-900/50 bg-red-950/10 text-red-500 font-mono text-sm uppercase tracking-widest">
        {t.error}
      </div>
    );
  }

  const { stats, recent } = data;

  return (
    <motion.div 
      dir={dir}
      variants={containerVars}
      initial="hidden"
      animate="show"
      className={`
        p-8 space-y-8 min-h-screen bg-black text-white selection:bg-white selection:text-black
        ${isArabic ? 'font-sans' : 'font-sans'} 
      `}
    >
      {/* Header Area */}
      <motion.div variants={itemVars} className="pb-4 border-b border-neutral-800 flex justify-between items-end">
        <h1 className="text-4xl font-light tracking-tighter uppercase">{t.overview}</h1>
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{t.status}</div>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard variants={itemVars} title={t.total_dealers} value={stats.dealers.total} index="01" />
        <StatCard variants={itemVars} title={t.pending} value={stats.dealers.pending} index="02" warning={stats.dealers.pending > 0} />
        <StatCard variants={itemVars} title={t.approved} value={stats.dealers.approved} index="03" />
        <StatCard variants={itemVars} title={t.warranties} value={stats.warranties.total} index="04" />
       <StatCard variants={itemVars} title={t.admins} value={stats.admins.total} index="04" />

      </div>

      {/* RECENT DATA LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentSection
          variants={itemVars}
          title={t.recent_dealers}
          items={recent.dealers}
          noDataText={t.no_data}
          render={(d, i) => (
             <ListItem key={d.id} index={i + 1} isArabic={isArabic}>
                <span className="font-bold">{d.shop_name}</span>
                <StatusBadge status={d.status} />
             </ListItem>
          )}
        />

        <RecentSection
          variants={itemVars}
          title={t.recent_warranties}
          items={recent.warranties}
          noDataText={t.no_data}
          render={(w, i) => (
            <ListItem key={w.id} index={i + 1} isArabic={isArabic}>
               <span className="font-bold">{w.owner_first_name}</span>
               <span className="text-neutral-500 font-mono text-xs uppercase" dir="ltr">
                  {w.car_make} {w.car_model}
               </span>
            </ListItem>
          )}
        />
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

const StatCard = ({ title, value, index, warning, variants }) => (
  <motion.div 
    variants={variants}
    className={`
      group relative h-40 p-6 border border-neutral-800 bg-neutral-950
      transition-colors duration-300 ease-in-out cursor-default
      hover:bg-white hover:border-white
    `}
  >
    <div className="flex justify-between items-start mb-8">
      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-black/60 transition-colors">
        {title}
      </span>
      <span className="text-[10px] font-mono text-neutral-700 group-hover:text-black/40">
        /{index}
      </span>
    </div>
    
    <div className={`
      text-5xl font-light tracking-tighter
      group-hover:text-black transition-colors
      ${warning ? "text-orange-500" : "text-white"}
    `}>
      {value}
    </div>

    {/* Decorative corner accent - Logic aware (border-s = start, border-t = top) */}
    <div className="absolute bottom-0 end-0 w-3 h-3 border-s border-t border-neutral-800 group-hover:border-black/20 transition-colors" />
  </motion.div>
);

const RecentSection = ({ title, items, render, variants, noDataText }) => (
  <motion.div variants={variants} className="flex flex-col">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-1 h-1 bg-white" />
      <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400">{title}</h3>
    </div>
    
    <div className="border-t border-neutral-800">
      {items.length ? (
        items.map(render)
      ) : (
        <div className="p-6 text-neutral-600 font-mono text-xs uppercase border-b border-neutral-800">
            {noDataText}
        </div>
      )}
    </div>
  </motion.div>
);

const ListItem = ({ children, index, isArabic }) => (
  <div className="
    group flex items-center justify-between p-4 
    border-b border-neutral-800 bg-black
    transition-all duration-300
    hover:bg-neutral-900 
    hover:ps-6 cursor-pointer
  ">
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-mono text-neutral-600 group-hover:text-neutral-400 w-4">
        {index < 10 ? `0${index}` : index}
      </span>
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm text-neutral-300 group-hover:text-white transition-colors">
        {children}
      </div>
    </div>
    {/* Arrow Icon: Mirrored for Arabic */}
    <span className={`
      opacity-0 transition-all duration-300 text-neutral-500 text-xs
      group-hover:opacity-100 group-hover:translate-x-0
      ${isArabic ? 'translate-x-2 rotate-180' : '-translate-x-2'}
    `}>
      →
    </span>
  </div>
);

const StatusBadge = ({ status }) => {
  const isApproved = status?.toLowerCase() === 'approved';
  // Note: Depending on your data, you might want to map 'status' text to Arabic as well here.
  
  return (
    <span className={`
      text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 border
      ${isApproved 
        ? 'border-green-900 text-green-500 bg-green-900/10' 
        : 'border-yellow-900 text-yellow-500 bg-yellow-900/10'
      }
    `}>
      {status}
    </span>
  );
}
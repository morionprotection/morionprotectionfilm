'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// --- ASSETS ---
const assets = {
  // Hero: Abstract Metallic/Geometric to represent "Special Engineering"
  heroBg: "https://images.pexels.com/photos/9545548/pexels-photo-9545548.jpeg",
  
  // Visuals for Sections
  microscope: "https://www.pexels.com/download/video/8817503/", // Lab/Quality
  healing: "/ThermalHealing.png", // Healing/Heat
  
  // Layer Textures (Used in the Split "Composition" Section)
  layers: {
    topcoat: "/topCoat.png", // Hydrophobic/Water
    healing: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2632&auto=format&fit=crop", // Elastic/Polymer
    uv: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=2670&auto=format&fit=crop", // Light/Prism
    tpu: "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?q=80&w=2670&auto=format&fit=crop", // Strong/Structure
    glue: "https://images.unsplash.com/photo-1592458352660-1f060ab28d65?q=80&w=2660&auto=format&fit=crop", // Adhesive
  }
};

// --- CONTENT ---
const content = {
  en: {
    hero: { 
      title: "MOLECULAR ARMOR", 
      desc: "Morion is engineered specifically for flat-plane stainless steel geometry and extreme environmental stress. This is what makes us special.", 
      cta: "View Specifications" 
    },
    layers: { 
      title: "MATERIAL COMPOSITION", 
      desc: "5-Stage Lamination Process. Hover to analyze layer properties.",
      list: [
        { id: 'topcoat', name: "Hydrophobic Top Coat", micron: "15µm", img: assets.layers.topcoat, desc: "Nano-ceramic infusion repels water & dirt." },
        { id: 'healing', name: "Self-Healing Polymer", micron: "30µm", img: assets.layers.healing, desc: "Elastomeric memory chains reset structure." },
        { id: 'uv', name: "UV Shielding Layer", micron: "25µm", img: assets.layers.uv, desc: "Anti-yellowing blockers ensure 99% clarity." },
        { id: 'tpu', name: "Impact TPU Core", micron: "100µm", img: assets.layers.tpu, desc: "High-density absorption for maximum durability." },
        { id: 'glue', name: "Acrylic Adhesive", micron: "20µm", img: assets.layers.glue, desc: "High-tack sheer bond for complex geometry." },
      ]
    },
    lab: { 
      title: "MANUFACTURING QUALITY", 
      intro: "Tested rigorously under ISO 527 standards for extreme durability.",
      stats: [
        { label: "Tensile Strength", val: "30 MPa" },
        { label: "Elongation Break", val: "400%" },
        { label: "Optical Clarity", val: ">99%" },
        { label: "Total Thickness", val: "190 µm" },
      ]
    },
    healing: {
      title: "THERMAL HEALING",
      status: "60°C ACTIVATION",
      desc: "The surface actively rearranges polymer chains to erase scratches when exposed to heat (Sunlight or Hot Water).",
      matrix: [
        { l: "Scratch Resist", v: "Class A" },
        { l: "Response Time", v: "Instant" },
        { l: "Warranty", v: "10 Years" },
      ]
    }
  },
  ar: {
    hero: { 
      title: "درع جزيئي", 
      desc: "تم تصميم موريون خصيصاً لهندسة الفولاذ المقاوم للصدأ والأسطح المستوية والضغط البيئي الشديد. هذا ما يجعلنا مميزين.", 
      cta: "عرض المواصفات" 
    },
    layers: { 
      title: "تركيب المواد", 
      desc: "عملية تصفيح من 5 مراحل. مرر المؤشر لتحليل خصائص الطبقة.",
      list: [
        { id: 'topcoat', name: "طبقة علوية طاردة", micron: "15µm", img: assets.layers.topcoat, desc: "نانو سيراميك مدمج يصد الماء والأوساخ." },
        { id: 'healing', name: "بوليمر معالجة", micron: "30µm", img: assets.layers.healing, desc: "سلاسل ذاكرة مطاطية تعيد ضبط الهيكل." },
        { id: 'uv', name: "طبقة حجب UV", micron: "25µm", img: assets.layers.uv, desc: "موانع الاصفرار تضمن وضوح بنسبة 99%." },
        { id: 'tpu', name: "قلب TPU المقاوم", micron: "100µm", img: assets.layers.tpu, desc: "امتصاص عالي الكثافة لأقصى قدر من المتانة." },
        { id: 'glue', name: "لاصق أكريليك", micron: "20µm", img: assets.layers.glue, desc: "رابط عالي الالتصاق للهندسة المعقدة." },
      ]
    },
    lab: { 
      title: "جودة التصنيع", 
      intro: "تم اختباره بصرامة وفق معايير ISO 527 للمتانة القصوى.",
      stats: [
        { label: "قوة الشد", val: "30 MPa" },
        { label: "استطالة الكسر", val: "400%" },
        { label: "الوضوح البصري", val: ">99%" },
        { label: "السمك الكلي", val: "190 µm" },
      ]
    },
    healing: {
      title: "المعالجة الحرارية",
      status: "تنشيط 60 درجة مئوية",
      desc: "يعيد السطح ترتيب سلاسل البوليمر بشكل نشط لمحو الخدوش عند التعرض للحرارة (أشعة الشمس أو الماء الساخن).",
      matrix: [
        { l: "مقاومة الخدش", v: "فئة A" },
        { l: "وقت الاستجابة", v: "فوري" },
        { l: "الضمان", v: "10 سنوات" },
      ]
    }
  }
};

export default function TechnologyPageVertical() {
  const pathname = usePathname();
  const [isArabic, setIsArabic] = useState(false);
  const [activeLayer, setActiveLayer] = useState(content.en.layers.list[0]);

  // Language & Init
  useEffect(() => {
    if (pathname) setIsArabic(pathname.startsWith('/ar'));
  }, [pathname]);

  useEffect(() => {
    setActiveLayer(isArabic ? content.ar.layers.list[0] : content.en.layers.list[0]);
  }, [isArabic]);

  const t = isArabic ? content.ar : content.en;
  const dir = isArabic ? 'rtl' : 'ltr';
  const mono = isArabic ? 'font-sans' : 'font-mono';

  // --- STYLES ---
  const verticalText = "absolute top-32 text-white/40 text-sm font-bold uppercase tracking-[0.5em] z-20 select-none hidden lg:block";
  const verticalTextPos = isArabic 
    ? "right-0 origin-top-right -rotate-90 mr-12" 
    : "left-0 origin-top-left rotate-90 ml-12"; 

  return (
    <div dir={dir} className="w-full mt-25 bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* === SECTION 1: HERO (Matches Product Hero) === */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-end border-b border-white/20">
        <div className="absolute inset-0 z-0">
            <Image src={assets.heroBg} alt="Tech Hero" fill className="object-cover opacity-50 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>

        <span className={`${verticalText} ${verticalTextPos}`}>TECH // 01</span>

        <div className="relative z-10 p-8 lg:p-24 pb-24 lg:pb-32 max-w-7xl mx-auto w-full">
            <h1 className="text-6xl lg:text-9xl font-black uppercase leading-[0.8] mb-8 tracking-tighter">
                {t.hero.title}
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-10 max-w-lg border-s-4 border-white ps-6 font-light">
                {t.hero.desc}
            </p>
            <button className="bg-white text-black px-10 py-5 font-black uppercase tracking-widest hover:bg-black hover:text-white border-2 border-white transition-all duration-300">
                {t.hero.cta}
            </button>
        </div>
      </section>


      {/* === SECTION 2: MATERIAL COMPOSITION (Split Interactive) === */}
      <section className="relative w-full lg:min-h-screen flex flex-col lg:flex-row border-b border-white/20">
        <span className={`${verticalText} ${verticalTextPos}`}>COMPOSITION // 02</span>

        {/* Left: Texture Image (Sticky) */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-screen relative lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-e border-white/10 group">
            <Image 
              src={activeLayer?.img || assets.layers.topcoat} 
              alt="Layer Texture" 
              fill
              className="object-cover transition-opacity duration-500 opacity-60 group-hover:opacity-100" 
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-8 left-8 border border-white/50 bg-black/50 backdrop-blur-md px-4 py-2">
                <span className={`text-xs font-bold uppercase tracking-widest ${mono}`}>
                    FIG 2.{activeLayer?.id?.toUpperCase()} // MAGNIFIED 500X
                </span>
            </div>
        </div>

        {/* Right: Layer List Controls (Scrollable) */}
        <div className="w-full lg:w-1/2 bg-neutral-900 flex flex-col justify-center p-8 lg:p-24 relative z-10 min-h-[50vh]">
            <h2 className="text-4xl font-black uppercase mb-4 text-white">{t.layers.title}</h2>
            <p className="text-sm opacity-50 mb-12 uppercase tracking-widest">{t.layers.desc}</p>
            
            <div className="space-y-4">
                {t.layers.list.map((layer) => (
                    <button 
                        key={layer.id}
                        onMouseEnter={() => setActiveLayer(layer)} // Desktop Hover
                        onClick={() => setActiveLayer(layer)}      // Mobile Tap
                        className={`w-full group cursor-pointer border border-white/20 p-6 flex flex-col items-start transition-all duration-300 ${activeLayer?.id === layer.id ? 'bg-white text-black scale-[1.02]' : 'hover:bg-black hover:border-white'}`}
                    >
                        <div className="w-full flex justify-between items-center mb-1">
                            <span className="text-lg lg:text-xl font-bold uppercase tracking-widest">{layer.name}</span>
                            <span className={`text-xs font-bold ${mono} opacity-60`}>{layer.micron}</span>
                        </div>
                        <span className={`text-xs uppercase tracking-wide opacity-70 ${mono} text-start`}>{layer.desc}</span>
                    </button>
                ))}
            </div>
        </div>
      </section>


      {/* === SECTION 3: DURABILITY & QUALITY (Split Data) === */}
      <section className="relative w-full bg-neutral-900 border-b border-white/20">
         <span className={`${verticalText} ${verticalTextPos}`}>QUALITY // 03</span>
         
         <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text / Data */}
            <div className="p-8 lg:p-24 flex flex-col justify-center order-2 lg:order-1">
                <h2 className="text-4xl lg:text-6xl font-black uppercase mb-4">{t.lab.title}</h2>
                <p className="text-sm opacity-50 mb-12 uppercase tracking-widest">{t.lab.intro}</p>
                
                <div className="border border-white/20 bg-black/50 backdrop-blur-sm">
                    {t.lab.stats.map((stat, i) => (
                        <div key={i} className="flex justify-between items-center p-6 border-b border-white/20 last:border-0 hover:bg-white hover:text-black transition-colors group">
                            <span className="text-sm font-bold uppercase opacity-70 group-hover:opacity-100">{stat.label}</span>
                            <span className={`text-2xl lg:text-4xl font-black uppercase ${mono}`}>{stat.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual / Texture */}
            <div className="relative h-[400px] lg:h-auto order-1 lg:order-2 border-b lg:border-b-0 lg:border-s border-white/10 overflow-hidden group">
               <div className="relative w-full h-full group overflow-hidden rounded-xl">
  <video
    src={assets.microscope}
    autoPlay
    loop
    muted
    playsInline
    className="object-cover opacity-40 grayscale mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 w-full h-full"
  />
  
  {/* Overlay Pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
</div>

                {/* HUD Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 animate-ping"></div>
            </div>
         </div>
      </section>


      {/* === SECTION 4: SELF-HEALING (Split Performance) === */}
      <section className="relative w-full bg-black min-h-[70vh] flex flex-col justify-center border-b border-white/20">
         <span className={`${verticalText} ${verticalTextPos}`}>HEALING // 04</span>

         <div className="max-w-7xl mx-auto w-full p-8 lg:p-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Visual Side */}
            <div className="relative h-[400px] lg:h-auto border border-white/20 group overflow-hidden">
                <Image src={assets.healing} alt="Healing" fill className="object-cover opacity-60 transition-all duration-1000 group-hover:opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
                        <span className={`text-red-500 font-bold text-xs tracking-widest ${mono}`}>{t.healing.status}</span>
                    </div>
                    <h3 className="text-3xl font-black uppercase">{t.healing.title}</h3>
                </div>
            </div>

            {/* Data Side */}
            <div className="flex flex-col justify-center">
                <p className="text-xl leading-relaxed mb-12 opacity-80">{t.healing.desc}</p>
                
                <div className="space-y-0 border-t border-white/20">
                    {t.healing.matrix.map((row, i) => (
                        <div key={i} className="flex justify-between items-center py-6 border-b border-white/20">
                            <span className="text-sm font-bold uppercase opacity-60">{row.l}</span>
                            <span className="text-2xl font-black uppercase text-white">{row.v}</span>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-white p-12 text-center border-t border-white/20">
         <h2 className="text-[12vw] font-black uppercase leading-none opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default select-none">
            MORION
         </h2>
      </footer>

    </div>
  );
}
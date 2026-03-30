'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// --- ASSETS ---
const assets = {
  hero: "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg",
  beading: "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308853/ChatGPT_Image_Jan_13_2026_03_53_44_PM_wnu63i.png",
  products: {
    crystal: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308324/LuxuryCrystalSeries_bwvt5z.png', 
    guard: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308338/EntryGuardSeries_uttsi7.png',
    frost: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308327/LuxuryFrostSeries_uyrdmx.png',
    fogg: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308323/EntryFoggSeries_gzcehb.png',
    colored: 'https://res.cloudinary.com/dhev1s5wb/image/upload/v1768308330/PremiumColorPPF_ogc1jb.png',
  }
};

// --- CONTENT ---
const content = {
  en: {
    hero: {
      title: "PRODUCT LINEUP",
      subtitle: "The absolute standard in vehicle protection. Engineered for geometry.",
      cta: "Configure Specification"
    },
    products: {
      crystal: {
        id: 'crystal',
        title: "LUXURY CRYSTAL SERIES",
        warranty: "10 YEARS WARRANTY",
        desc: "Engineered for extreme gloss and unmatched clarity. This ultra-transparent protection film enhances your vehicle’s natural shine while providing a self-healing barrier.",
        specs: [
          { label: "Grade", val: "Luxury / Top-Tier" },
          { label: "Finish", val: "Ultra-High Gloss" },
          { label: "Thickness", val: "7.8 MIL (TPU)" },
          { label: "Clarity", val: "99.9% Optical Clear" }
        ]
      },
      guard: {
        id: 'guard',
        title: "ENTRY GUARD SERIES",
        warranty: "5 YEARS WARRANTY",
        desc: "Reliable protection for daily drivers. Provides a durable shield against road debris and scratches while maintaining a clear finish at an accessible price point.",
        specs: [
          { label: "Grade", val: "Entry Level" },
          { label: "Finish", val: "Standard Gloss" },
          { label: "Thickness", val: "7.5 MIL (TPU)" },
          { label: "Impact", val: "Standard Resistance" }
        ]
      },
      frost: {
        id: 'frost',
        title: "LUXURY FROST SERIES",
        warranty: "10 YEARS WARRANTY",
        desc: "Freeze your original paint color into a sophisticated matte finish. Preserves vibrancy while adding a soft, satin texture that feels as premium as it looks.",
        specs: [
          { label: "Grade", val: "Luxury / Matte" },
          { label: "Finish", val: "Frozen / Satin" },
          { label: "Texture", val: "Soft-Touch" },
          { label: "Hydrophobic", val: "Ceramic Infused" }
        ]
      },
      fogg: {
        id: 'fogg',
        title: "ENTRY FOGG SERIES",
        warranty: "5 YEARS WARRANTY",
        desc: "Transform your vehicle’s look with a satin finish at an accessible entry point. Combines stealth style with reliable paint protection against daily wear.",
        specs: [
          { label: "Grade", val: "Entry Level" },
          { label: "Finish", val: "Standard Satin" },
          { label: "Maintenance", val: "Easy Clean" },
          { label: "Air Release", val: "Standard" }
        ]
      },
      colored: {
        id: 'colored',
        title: "PREMIUM COLORED PPF",
        warranty: "10 YEARS WARRANTY",
        desc: "Transform your vehicle with Ultra-Gloss Solid Color Wraps. Full TPU construction delivers an exceptionally authentic paint-like appearance with actual protection.",
        specs: [
          { label: "Type", val: "Color Change TPU" },
          { label: "Finish", val: "Paint-Like Gloss" },
          { label: "Thickness", val: "8 MIL" },
          { label: "Install", val: "Dry Application" }
        ]
      }
    },
    warnings: {
      title: "CRITICAL ADVISORIES",
      consumer: {
        head: "CONSUMER PURCHASE WARNING",
        text: "There is ABSOLUTELY NO WARRANTY or technical support for DIY kits or materials resold online. Morion PPF is only sold by authorized shops to be installed by accredited professionals."
      },
      disclaimer: {
        head: "WARRANTY DISCLAIMER",
        text: "Warranty covers manufacturing defects (bubbling, cracking, delamination, discoloration). It DOES NOT extend to damages from road debris, misuse, acts of nature, or improper maintenance."
      }
    },
    maintenance: {
      title: "AFTER-CARE PROTOCOL",
      list: [
        "NO Drive-Thru Car Washes (Brush or Touchless).",
        "NO Buffing or Polishing the film surface.",
        "Wash bi-weekly with pH NEUTRAL SOAP ONLY.",
        "Remove bird droppings/bugs within 24 hours.",
        "Hand-wash vehicle in shade only to prevent spotting."
      ]
    }
  },
  ar: {
    hero: {
      title: "تشكيلة المنتجات",
      subtitle: "المعيار المطلق في حماية المركبات. صمم هندسياً للكمال.",
      cta: "تكوين المواصفات"
    },
    products: {
      crystal: {
        id: 'crystal',
        title: "سلسلة كريستال الفاخرة",
        warranty: "ضمان 10 سنوات",
        desc: "صُممت لتوفير لمعان فائق ووضوح لا مثيل له. يعزز هذا الفيلم الشفاف للغاية اللمعان الطبيعي لسيارتك مع توفير حاجز معالجة ذاتي.",
        specs: [
          { label: "الفئة", val: "فاخرة / نخبة" },
          { label: "المظهر", val: "لمعان فائق" },
          { label: "السمك", val: "8.5 ميل (TPU)" },
          { label: "الوضوح", val: "نقاء بصري 99.9%" }
        ]
      },
      guard: {
        id: 'guard',
        title: "سلسلة جارد (اقتصادية)",
        warranty: "ضمان 5 سنوات",
        desc: "حماية موثوقة للاستخدام اليومي. يوفر درعًا متينًا ضد حطام الطريق والخدوش مع الحفاظ على لمسة نهائية واضحة بسعر مناسب.",
        specs: [
          { label: "الفئة", val: "اقتصادية" },
          { label: "المظهر", val: "لمعان قياسي" },
          { label: "السمك", val: "7.5 ميل (TPU)" },
          { label: "المقاومة", val: "مقاومة قياسية" }
        ]
      },
      frost: {
        id: 'frost',
        title: "سلسلة فروست الفاخرة",
        warranty: "ضمان 10 سنوات",
        desc: "جمّد لون طلائك الأصلي بلمسة نهائية مطفية متطورة. يحافظ على الحيوية مع إضافة ملمس حريري ناعم يبدو فاخراً للغاية.",
        specs: [
          { label: "الفئة", val: "فاخرة / مطفي" },
          { label: "المظهر", val: "ثلجي / ساتان" },
          { label: "الملمس", val: "نعم الملمس" },
          { label: "طارد للماء", val: "مدمج بالسيراميك" }
        ]
      },
      fogg: {
        id: 'fogg',
        title: "سلسلة فوج (اقتصادية)",
        warranty: "ضمان 5 سنوات",
        desc: "غيّر مظهر سيارتك بلمسة نهائية ساتان (حريرية) بسعر في المتناول. يجمع بين الأناقة الخفية وحماية الطلاء الموثوقة ضد التآكل اليومي.",
        specs: [
          { label: "الفئة", val: "اقتصادية" },
          { label: "المظهر", val: "ساتان قياسي" },
          { label: "الصيانة", val: "سهل التنظيف" },
          { label: "تفريغ الهواء", val: "قياسي" }
        ]
      },
      colored: {
        id: 'colored',
        title: "أفلام الحماية الملونة",
        warranty: "ضمان 10 سنوات",
        desc: "حول سيارتك بألوان صلبة فائقة اللمعان. هيكل TPU كامل يوفر مظهراً أصلياً يشبه الطلاء تماماً مع حماية حقيقية.",
        specs: [
          { label: "النوع", val: "TPU تغيير لون" },
          { label: "المظهر", val: "لمعان يشبه الطلاء" },
          { label: "السمك", val: "8.5 ميل" },
          { label: "التركيب", val: "تطبيق جاف" }
        ]
      }
    },
    warnings: {
      title: "تحذيرات هامة",
      consumer: {
        head: "تحذير الشراء للمستهلك",
        text: "لا يوجد ضمان مطلقاً أو دعم فني لمجموعات التركيب الذاتي (DIY) أو المواد التي تباع عبر الإنترنت. يباع موريون PPF فقط من قبل المتاجر المعتمدة ليتم تركيبه من قبل محترفين معتمدين."
      },
      disclaimer: {
        head: "إخلاء مسؤولية الضمان",
        text: "يغطي الضمان عيوب التصنيع (الفقاعات، التشقق، التصفيح، تغير اللون). لا يمتد إلى الأضرار الناجمة عن حطام الطريق، سوء الاستخدام، الكوارث الطبيعية، أو الصيانة غير السليمة."
      }
    },
    maintenance: {
      title: "بروتوكول ما بعد العناية",
      list: [
        "ممنوع غسيل السيارات الآلي (سواء بالفرشاة أو بدون لمس).",
        "ممنوع تلميع أو صنفرة سطح الفيلم.",
        "غسيل كل أسبوعين بصابون متعادل (pH Neutral) فقط.",
        "إزالة فضلات الطيور/الحشرات خلال 24 ساعة.",
        "غسل السيارة يدوياً في الظل فقط لمنع التبقع."
      ]
    }
  }
};

export default function ProductPageVertical() {
  const pathname = usePathname();
  const [isArabic, setIsArabic] = useState(false);
  const [activeLine, setActiveLine] = useState('crystal'); // Default to Luxury Crystal

  useEffect(() => {
    if (pathname) setIsArabic(pathname.startsWith('/ar'));
  }, [pathname]);

  const t = isArabic ? content.ar : content.en;
  const dir = isArabic ? 'rtl' : 'ltr';
  const mono = isArabic ? 'font-sans' : 'font-mono';
  
  // Current Product Data
  const currentProd = t.products[activeLine];
  const currentImg = assets.products[activeLine];

  // Styles
  const verticalText = "absolute top-32 text-white/40 text-sm font-bold uppercase tracking-[0.5em] z-20 select-none hidden lg:block";
  const verticalTextPos = isArabic 
    ? "right-0 origin-top-right -rotate-90 mr-12" 
    : "left-0 origin-top-left rotate-90 ml-12"; 

  return (
    <div dir={dir} className="w-full bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* === SECTION 1: HERO === */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col justify-end border-b border-white/20">
        <div className="absolute inset-0 z-0">
            <Image src={assets.hero} alt="Cybertruck Hero" fill className="object-cover opacity-60 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        </div>

        <span className={`${verticalText} ${verticalTextPos}`}>LINEUP // 01</span>

        <div className="relative z-10 p-8 lg:p-24 pb-16 max-w-7xl mx-auto w-full">
            <div className={`inline-block border border-white/40 px-4 py-1 mb-6 text-xs ${mono} tracking-[0.3em] bg-black/60 backdrop-blur-md`}>
                CYBER-SPEC READY
            </div>
            <h1 className="text-6xl lg:text-9xl font-black uppercase leading-[0.8] mb-8 tracking-tighter">
                {t.hero.title}
            </h1>
            <p className="text-xl opacity-80 mb-0 max-w-xl border-s-4 border-white ps-6 font-light">
                {t.hero.subtitle}
            </p>
        </div>
      </section>


      {/* === SECTION 2: PRODUCT SPLIT (Interactive) === */}
      <section className="relative w-full lg:min-h-screen flex flex-col lg:flex-row border-b border-white/20">
        <span className={`${verticalText} ${verticalTextPos}`}>SELECT // 02</span>

        {/* LEFT: Dynamic Image (Sticky) */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto lg:min-h-screen relative lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-e border-white/10 group overflow-hidden bg-black">
            {currentImg ? (
                <Image 
                  key={activeLine} // Triggers animation on change
                  src={currentImg} 
                  alt={currentProd.title} 
                  fill
                  className="object-cover lg:object-contain transition-all duration-700 animate-fadeIn" 
                />
            ) : (
                <div className="flex items-center justify-center h-full text-white/20">IMAGE PLACEHOLDER</div>
            )}
            
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Warranty Badge Overlay */}
            <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 border-2 border-white bg-black/80 backdrop-blur-md p-4 lg:p-6 z-10">
                <span className="block text-[10px] lg:text-xs font-bold uppercase text-white/50 mb-1">Coverage Term</span>
                <span className="block text-xl lg:text-3xl font-black uppercase whitespace-nowrap">{currentProd.warranty}</span>
            </div>
        </div>

        {/* RIGHT: Controls & Specs */}
        <div className="w-full lg:w-1/2 bg-neutral-900 flex flex-col p-6 lg:p-24 relative z-10 min-h-[50vh]">
            
            {/* Vertical Menu Selector */}
            <div className="grid grid-cols-1 gap-2 mb-12">
                {Object.keys(t.products).map((key) => {
                    const item = t.products[key];
                    const isActive = activeLine === key;
                    return (
                        <button 
                            key={key}
                            onClick={() => setActiveLine(key)}
                            className={`text-left px-6 py-4 border transition-all duration-300 flex justify-between items-center group
                                ${isActive 
                                    ? 'bg-white text-black border-white' 
                                    : 'bg-transparent text-white/60 border-white/10 hover:border-white/40 hover:text-white'
                                }`}
                        >
                            <span className="font-bold uppercase tracking-wider text-sm">{item.title}</span>
                            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-500' : 'bg-transparent group-hover:bg-white/50'}`}></span>
                        </button>
                    )
                })}
            </div>

            {/* Content Display */}
            <div className="animate-fadeIn">
                <h2 className="text-3xl lg:text-5xl font-black uppercase mb-6 leading-none text-white">{currentProd.title}</h2>
                <p className="text-sm lg:text-lg opacity-60 mb-12 leading-relaxed font-light">{currentProd.desc}</p>
                
                <h3 className={`text-xs font-bold text-white/40 tracking-[0.2em] mb-6 uppercase ${mono}`}>Technical Specifications</h3>
                <div className="space-y-4">
                    {currentProd.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center py-4 border-b border-white/10">
                            <span className="font-bold uppercase text-xs lg:text-sm text-white/80">{spec.label}</span>
                            <span className={`font-mono text-xs lg:text-sm text-blue-400`}>{spec.val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>


      {/* === SECTION 3: MAINTENANCE PROTOCOL (Checklist) === */}
      <section className="relative w-full bg-black border-b border-white/20 grid grid-cols-1 lg:grid-cols-12">
         <span className={`${verticalText} ${verticalTextPos}`}>CARE // 03</span>
         
         {/* Visual */}
         <div className="lg:col-span-5 relative h-[300px] lg:h-auto border-b lg:border-b-0 lg:border-e border-white/10 grayscale">
             <Image src={assets.beading} alt="Water Beading" fill className="object-cover opacity-50" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             <div className="absolute bottom-12 left-12">
                 <h3 className="text-4xl font-black uppercase mb-2">pH Neutral</h3>
                 <p className={`text-xs ${mono} opacity-60`}>MAINTENANCE REQUIREMENT</p>
             </div>
         </div>

         {/* List */}
         <div className="lg:col-span-7 p-8 lg:p-24 bg-neutral-900">
             <h2 className="text-3xl font-black uppercase mb-12">{t.maintenance.title}</h2>
             <ul className="space-y-6">
                 {t.maintenance.list.map((item, i) => (
                     <li key={i} className="flex items-start gap-6 group cursor-default">
                         <span className={`text-xs font-bold text-white/30 pt-1 group-hover:text-blue-500 transition-colors ${mono}`}>0{i+1}</span>
                         <span className="text-lg font-medium uppercase leading-tight opacity-70 group-hover:opacity-100 transition-opacity">{item}</span>
                     </li>
                 ))}
             </ul>
         </div>
      </section>


      {/* === SECTION 4: WARNINGS (High Contrast) === */}
      <section className="relative w-full bg-white text-black p-8 lg:p-24 flex flex-col gap-12">
         <span className={`${verticalText} ${verticalTextPos} !text-black/20`}>LEGAL // 04</span>

         <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
             
             {/* Consumer Warning (Red Border) */}
             <div className="border-4 border-red-600 p-8 lg:p-12 relative">
                 <div className="absolute -top-4 left-8 bg-white px-4">
                     <span className="text-red-600 font-black uppercase tracking-widest text-sm">CRITICAL ALERT</span>
                 </div>
                 <h3 className="text-2xl font-black uppercase mb-4">{t.warnings.consumer.head}</h3>
                 <p className="text-sm font-bold leading-relaxed uppercase opacity-80">
                     {t.warnings.consumer.text}
                 </p>
             </div>

             {/* Disclaimer (Black Border) */}
             <div className="border-4 border-black p-8 lg:p-12 relative bg-neutral-100">
                 <div className="absolute -top-4 left-8 bg-neutral-100 px-4">
                     <span className="text-black font-black uppercase tracking-widest text-sm">COVERAGE LIMITS</span>
                 </div>
                 <h3 className="text-2xl font-black uppercase mb-4">{t.warnings.disclaimer.head}</h3>
                 <p className="text-sm font-medium leading-relaxed opacity-70">
                     {t.warnings.disclaimer.text}
                 </p>
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
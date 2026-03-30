'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// --- ASSETS ---
const images = {
  hero: "https://images.pexels.com/photos/952338/pexels-photo-952338.jpeg", // Abstract Network
  map: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop", // Dark Map
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" // Brutalist Building
};

// --- CONTENT ---
const content = {
  en: {
    hero: { 
      title: "INITIATE UPLINK", 
      desc: "Direct line to Morion technical support and sales engineering.", 
      cta: "Start Transmission" 
    },
    form: {
      title: "INPUT DATA",
      fields: { name: "Identity // Name", email: "Return // Email", subject: "Subject // Class", msg: "Payload // Message" },
      submit: "TRANSMIT DATA",
      subjects: ["Technical Support", "Sales Inquiry", "Installer Application"]
    },
    info: {
      title: "STATUS",
      items: [
        { label: "Operational Status", val: "Online" },
        { label: "Response Latency", val: "< 24 Hrs" },
        { label: "Location", val: "Riyadh, KSA" },
      ]
    },
    hours: {
      title: "ACTIVE HOURS",
      list: [
        { day: "MON - THU", time: "09:00 - 18:00" },
        { day: "FRIDAY", time: "14:00 - 20:00" },
        { day: "SAT - SUN", time: "CLOSED" },
      ]
    },
    map: {
      title: "GLOBAL NETWORK",
      stat: "SECTOR 7G // LOCKED",
      cta: "Locate Nearest Facility"
    }
  },
  ar: {
    hero: { 
      title: "ابدأ الاتصال", 
      desc: "خط مباشر للدعم الفني وهندسة المبيعات في موريون.", 
      cta: "بدء الإرسال" 
    },
    form: {
      title: "إدخال البيانات",
      fields: { name: "الهوية // الاسم", email: "الرد // البريد", subject: "الموضوع // التصنيف", msg: "الحمولة // الرسالة" },
      submit: "إرسال البيانات",
      subjects: ["دعم فني", "استفسار مبيعات", "طلب تركيب"]
    },
    info: {
      title: "الحالة",
      items: [
        { label: "الحالة التشغيلية", val: "متصل" },
        { label: "زمن الاستجابة", val: "< 24 ساعة" },
        { label: "الموقع", val: "الرياض، السعودية" },
      ]
    },
    hours: {
      title: "ساعات العمل",
      list: [
        { day: "الاثنين - الخميس", time: "09:00 - 18:00" },
        { day: "الجمعة", time: "14:00 - 20:00" },
        { day: "السبت - الأحد", time: "مغلق" },
      ]
    },
    map: {
      title: "الشبكة العالمية",
      stat: "القطاع 7G // مقفل",
      cta: "تحديد أقرب منشأة"
    }
  }
};

export default function ContactPageVertical() {
  const pathname = usePathname();
  const [isArabic, setIsArabic] = useState(false);
  const [formFocus, setFormFocus] = useState(null);

  useEffect(() => {
    if (pathname) setIsArabic(pathname.startsWith('/ar'));
  }, [pathname]);

  const t = isArabic ? content.ar : content.en;
  const dir = isArabic ? 'rtl' : 'ltr';

  // --- STYLES ---
  const verticalText = "absolute top-32 text-white/40 text-sm font-bold uppercase tracking-[0.5em] z-20 select-none hidden lg:block";
  const verticalTextPos = isArabic 
    ? "right-0 origin-top-right -rotate-90 mr-12" 
    : "left-0 origin-top-left rotate-90 ml-12"; 

  return (
    <div dir={dir} className="w-full bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* === SECTION 1: HERO (Matches Product Hero) === */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-end border-b border-white/20">
        <div className="absolute inset-0 z-0">
            <Image src={images.hero} alt="Contact Hero" fill className="object-cover opacity-50 grayscale mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>

        <span className={`${verticalText} ${verticalTextPos}`}>CONTACT // 01</span>

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

      {/* === SECTION 2: FORM & INFO (Matches Split Layout) === */}
      <section className="relative w-full lg:min-h-screen flex flex-col lg:flex-row border-b border-white/20">
        <span className={`${verticalText} ${verticalTextPos}`}>TRANSMISSION // 02</span>

        {/* LEFT: FORM (Sticky behavior similar to image side) */}
        <div className="w-full lg:w-1/2 relative border-b lg:border-b-0 lg:border-e border-white/10 bg-neutral-900">
            <div className="p-8 lg:p-24 h-full flex flex-col justify-center">
                <h2 className="text-4xl font-black uppercase mb-12 text-white">{t.form.title}</h2>
                <form className="space-y-8">
                     {/* Inputs styled like the Color Selector Buttons */}
                    {['name', 'email'].map((field) => (
                        <div key={field} className={`group border-b-2 transition-colors duration-300 ${formFocus === field ? 'border-white' : 'border-white/20'}`}>
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">{t.form.fields[field]}</label>
                            <input 
                                type="text"
                                onFocus={() => setFormFocus(field)}
                                onBlur={() => setFormFocus(null)}
                                className="w-full bg-transparent py-4 text-xl font-bold uppercase text-white focus:outline-none"
                            />
                        </div>
                    ))}
                    
                    <div className="group border-b-2 border-white/20">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">{t.form.fields.subject}</label>
                         <select className="w-full bg-transparent py-4 text-xl font-bold uppercase text-white focus:outline-none appearance-none cursor-pointer">
                            {t.form.subjects.map((s, i) => <option key={i} className="bg-black text-white">{s}</option>)}
                        </select>
                    </div>

                    <div className={`group border-b-2 transition-colors duration-300 ${formFocus === 'msg' ? 'border-white' : 'border-white/20'}`}>
                         <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">{t.form.fields.msg}</label>
                         <textarea 
                            rows="2"
                            onFocus={() => setFormFocus('msg')}
                            onBlur={() => setFormFocus(null)}
                            className="w-full bg-transparent py-4 text-xl font-bold uppercase text-white focus:outline-none resize-none"
                         ></textarea>
                    </div>

                    <button className="w-full bg-white text-black py-6 text-xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 border-2 border-transparent">
                        {t.form.submit}
                    </button>
                </form>
            </div>
        </div>

        {/* RIGHT: INFO (Scrollable Content) */}
        <div className="w-full lg:w-1/2 bg-black flex flex-col justify-center relative z-10">
            {/* Status Section (Matches 'Tech Specs' style) */}
            <div className="p-8 lg:p-24 border-b border-white/20">
                <h2 className="text-4xl font-black uppercase mb-12 text-white">{t.info.title}</h2>
                <div className="border border-white/20 bg-neutral-900/50 backdrop-blur-sm">
                    {t.info.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-6 border-b border-white/20 last:border-0 hover:bg-white hover:text-black transition-colors group">
                            <span className="text-sm font-mono uppercase opacity-70 group-hover:opacity-100">{item.label}</span>
                            <span className="text-xl lg:text-2xl font-black uppercase flex items-center gap-3">
                                {i === 0 && <span className="w-2 h-2 bg-green-500 animate-pulse block"></span>}
                                {item.val}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hours Section (Matches Colors List style) */}
            <div className="p-8 lg:p-24 bg-neutral-900">
                <h2 className="text-4xl font-black uppercase mb-12 text-white">{t.hours.title}</h2>
                <div className="space-y-4">
                    {t.hours.list.map((h, i) => (
                        <div key={i} className="w-full border border-white/20 p-6 flex items-center justify-between hover:bg-white hover:text-black transition-all duration-300">
                             <span className="text-lg font-bold uppercase tracking-widest">{h.day}</span>
                             <span className="text-sm font-mono opacity-70">{h.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* === SECTION 3: MAP / LOCATOR (Matches Blueprint/Tech Style) === */}
      <section className="relative w-full border-b border-white/20 bg-neutral-900">
         <span className={`${verticalText} ${verticalTextPos}`}>LOCATOR // 03</span>
         
         <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Map Visual (Texture) */}
            <div className="relative h-[500px] lg:h-auto border-b lg:border-b-0 lg:border-e border-white/10 group overflow-hidden">
                <Image src={images.map} alt="Map" fill className="object-cover opacity-40 grayscale invert contrast-125 transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20"></div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
                
                {/* Center Target */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border border-white/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 animate-ping"></div>
                </div>
            </div>

            {/* Content / Interaction */}
            <div className="p-8 lg:p-24 flex flex-col justify-center bg-black">
                <h2 className="text-4xl lg:text-6xl font-black uppercase mb-8">{t.map.title}</h2>
                <div className="border border-white/20 p-8 flex flex-col items-center text-center hover:bg-neutral-900 transition-colors">
                    <p className="font-mono text-blue-500 text-sm mb-6 animate-pulse">{t.map.stat}</p>
                    <button className="border-2 border-white px-8 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 w-full">
                        {t.map.cta}
                    </button>
                </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white p-12 text-center border-t border-white/20">
         <h2 className="text-[12vw] font-black uppercase leading-none opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default select-none">
            MORION
         </h2>
      </footer>

      {/* FLOATING LIVE CHAT (Sharp Square) */}
      <div className={`fixed bottom-8 ${isArabic ? 'left-8' : 'right-8'} z-50`}>
          <button className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center border-2 border-transparent hover:border-white transition-all shadow-none">
             <div className="w-3 h-3 bg-white animate-pulse"></div>
          </button>
      </div>

    </div>
  );
}
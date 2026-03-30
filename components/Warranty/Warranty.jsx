"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* ================== ASSETS ================== */
const assets = {
  hero: "https://images.pexels.com/photos/17191610/pexels-photo-17191610.jpeg",
  texture: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
};

/* ================== CONTENT CONFIG ================== */
// Note: The main policy text is now directly in the JSX to handle the complex formatting (lists, pricing) better.
const content = {
  en: {
    form: {
      owner: "OWNER IDENTIFICATION",
      vehicle: "VEHICLE SPECIFICATIONS",
      install: "INSTALLATION DATA",
      dealer: "AUTHORIZED DEALER",
      ack: "ACKNOWLEDGMENT",
      submit: "INITIATE PROTOCOL",
      processing: "SYNCING...",
      successTitle: "REGISTRATION COMPLETE",
      successText: "Warranty sequence successfully registered in the database. We'll be back to you shortly.",
    },
  },
  ar: {
    form: {
      owner: "بيانات العميل",
      vehicle: "مواصفات المركبة",
      install: "بيانات التركيب",
      dealer: "مركز التركيب",
      ack: "إقرار العميل",
      submit: "تفعيل البروتوكول",
      processing: "جاري المزامنة...",
      successTitle: "اكتمل البروتوكول",
      successText: "تم تسجيل تسلسل الضمان بنجاح في قاعدة البيانات العالمية.",
    },
  },
};

/* ================== COMPONENTS ================== */

const InputField = ({ label, name, type = "text", required = false, placeholder = "" }) => (
  <div className="group relative w-full pt-6 pb-2 border-b border-white/20 hover:border-white transition-colors duration-300">
    <label className="absolute top-0 left-0 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-focus-within:text-blue-500 transition-colors">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full bg-transparent py-2 text-lg font-medium text-white placeholder-white/10 outline-none"
    />
  </div>
);

const SelectField = ({ label, name, children, required }) => (
  <div className="group relative w-full pt-6 pb-2 border-b border-white/20 hover:border-white transition-colors duration-300">
    <label className="absolute top-0 left-0 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-focus-within:text-blue-500 transition-colors">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      required={required}
      className="w-full bg-transparent py-2 text-lg font-medium text-white outline-none appearance-none [&>option]:bg-neutral-900 cursor-pointer"
    >
      {children}
    </select>
    <div className="absolute right-0 bottom-4 pointer-events-none opacity-50 group-hover:opacity-100">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M0 0L5 6L10 0H0Z" fill="currentColor" />
      </svg>
    </div>
  </div>
);

const CheckboxField = ({ label, name, required }) => (
  <label className="flex items-start gap-4 group cursor-pointer py-4 border-b border-white/10 hover:border-white/30 transition-colors">
    <div className="relative mt-1">
      <input type="checkbox" name={name} required={required} className="peer sr-only" />
      <div className="w-5 h-5 border border-white/40 peer-checked:bg-white peer-checked:border-white transition-all duration-300" />
      <svg
        className="absolute top-[2px] left-[2px] w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      >
        <path d="M20 6L9 17L4 12" />
      </svg>
    </div>
    <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors leading-relaxed">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
  </label>
);

const SectionHeader = ({ title, num }) => (
  <div className="flex items-end gap-4 mb-8 mt-12 opacity-100">
    <span className="text-xs font-bold text-blue-500 font-mono tracking-widest">{num}</span>
    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
      {title}
    </h3>
  </div>
);

/* ================== PAGE ================== */

export default function WarrantyPageVertical() {
  const pathname = usePathname();
  const [isArabic, setIsArabic] = useState(false);

  // Logic State
  const [dealers, setDealers] = useState([]);
  const [loadingDealers, setLoadingDealers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (pathname) setIsArabic(pathname.startsWith('/ar'));
  }, [pathname]);

  const t = isArabic ? content.ar : content.en;
  const dir = isArabic ? 'rtl' : 'ltr';

  // Helper styles
  const verticalText = "absolute top-32 text-white/40 text-sm font-bold uppercase tracking-[0.5em] z-20 select-none hidden lg:block";
  const verticalTextPos = isArabic 
    ? "right-0 origin-top-right -rotate-90 mr-12" 
    : "left-0 origin-top-left rotate-90 ml-12"; 

  // --- LOGIC: FETCH DEALERS ---
  useEffect(() => {
    setLoadingDealers(true);
    fetch("/api/dealers/approved")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load dealers");
        return json;
      })
      .then((data) => setDealers(data.dealers || []))
      .catch((err) => {
        console.error("Error loading dealers:", err);
        // alert("Failed to load dealers list. Please refresh."); 
      })
      .finally(() => setLoadingDealers(false));
  }, []);

  // --- LOGIC: SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    data.maintenance_briefed = formData.get("maintenance_briefed") === "on";
    data.ppf_limitations_ack = formData.get("ppf_limitations_ack") === "on";

    if (data.car_year) data.car_year = Number(data.car_year);
    if (data.warranty_years) data.warranty_years = Number(data.warranty_years);

    try {
      const res = await fetch("/api/warranties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(json?.error || "Submission failed. Please check your inputs.");
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir={dir} className="w-full bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
      
      {/* === SECTION 1: HERO === */}
      <header className="relative mt-20 w-full h-[60vh] lg:h-[90vh] flex flex-col justify-end border-b border-white/20">
        <div className="absolute inset-0 z-0">
            <Image src={assets.hero} alt="Hero" fill className="object-cover opacity-50 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        </div>

        <span className={`${verticalText} ${verticalTextPos}`}>START // 01</span>

        <div className="relative z-10 p-8 lg:p-24 pb-16 max-w-7xl mx-auto w-full">
            <div className={`inline-block border border-white/40 px-4 py-1 mb-6 text-xs font-mono tracking-[0.3em] bg-black/60 backdrop-blur-md`}>
                SYSTEM ONLINE
            </div>
            <h1 className="text-5xl lg:text-9xl font-black uppercase leading-[0.8] mb-4 tracking-tighter mix-blend-overlay text-white">
                WARRANTY <br /> PROTOCOL
            </h1>
            <p className="text-xl opacity-80 mb-0 max-w-xl border-s-4 border-white ps-6 font-light">
                Official registration portal for Morion Paint Protection Films.
            </p>
        </div>
      </header>

      {/* === SECTION 2: LEGAL & POLICY (New Content) === */}
      <section className="relative w-full border-b border-white/20 bg-neutral-900">
         <span className={`${verticalText} ${verticalTextPos}`}>POLICY // 02</span>
         
         {/* Background Texture */}
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image src={assets.texture} fill className="object-cover grayscale" alt="texture" />
         </div>

         <div className="relative z-10 max-w-7xl mx-auto p-8 lg:p-24 flex flex-col lg:flex-row gap-16">
            
            {/* Left Column: Key Stats & Pricing */}
            <div className="w-full lg:w-4/12 space-y-12">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/50 mb-8">COVERAGE SPECS</h3>
                    <div className="space-y-6">
                        {[
                            { y: "10", sub: "YEARS", desc: "COLORED SERIES FILMS" },
                            { y: "10", sub: "YEARS", desc: "TRANSPARENT SERIES FILMS" },
                            { y: "05", sub: "YEARS", desc: "TRANSPARENT SERIES (ENTRY)" }
                        ].map((item, i) => (
                            <div key={i} className="group pb-6 border-b border-white/10">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-white group-hover:text-blue-500 transition-colors">{item.y}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.sub}</span>
                                </div>
                                <p className="text-xs font-bold uppercase tracking-wider text-white/80 mt-2">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-black/50 p-6 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-6">MINIMUM PRICING (USA)</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between border-b border-dashed border-white/20 pb-2">
                            <span className="text-white/60">Coupes</span>
                            <span className="font-mono font-bold">$6,500</span>
                        </li>
                        <li className="flex justify-between border-b border-dashed border-white/20 pb-2">
                            <span className="text-white/60">Sedans</span>
                            <span className="font-mono font-bold">$7,500</span>
                        </li>
                        <li className="flex justify-between border-b border-dashed border-white/20 pb-2">
                            <span className="text-white/60">SUVs</span>
                            <span className="font-mono font-bold">$8,500</span>
                        </li>
                        <li className="flex justify-between pb-2">
                            <span className="text-white/60">Cybertruck</span>
                            <span className="font-mono font-bold">$5,500</span>
                        </li>
                    </ul>
                </div>
                
                <div className="border border-red-500/30 bg-red-950/20 p-6">
                    <h3 className="text-red-500 font-bold text-xs uppercase tracking-widest mb-3">CONSUMER WARNING</h3>
                    <p className="text-[10px] leading-relaxed text-red-200/70 uppercase">
                        No authorized personnel are approved to resale materials or sell DIY kits. 
                        Purchasing online results in <span className="text-red-400 font-bold">ABSOLUTELY NO WARRANTY</span> coverage.
                    </p>
                </div>
            </div>

            {/* Right Column: Detailed Text */}
            <div className="w-full lg:w-8/12 space-y-12 text-sm leading-7 text-white/70 font-light">
                
                {/* Intro */}
                <div>
                    <h2 className="text-3xl font-black text-white uppercase mb-6 tracking-tight">Terms of Coverage</h2>
                    <p className="mb-4">
                        To activate the warranty coverage for MORION PPF, it is imperative to have it professionally installed by an accredited MORION PPF Installer. MORION PPF guarantees that its product is free from any manufacturing defects, such as bubbling, cracking, delamination, or discoloration, for the specified period.
                    </p>
                    <p className="mb-4">
                        Please be aware that this warranty does not extend to damages resulting from regular wear and tear, road debris, misuse, acts of nature, or lack of proper maintenance using appropriate shampoos (pH Neutral).
                    </p>
                    <p className="bg-white/5 p-4 border-l-2 border-white text-white italic">
                        It is crucial to note that this warranty is transferable but follows all the original purchaser's signed agreements with the original authorized installer.
                    </p>
                </div>

                {/* Disclaimer */}
                <div>
                    <h3 className="text-xl font-bold text-white uppercase mb-4">Pricing & Standards</h3>
                    <p className="mb-4">
                        MORION PPF is committed to maintaining the highest standards. Any dealer found to be advertising or performing installations significantly below the minimum pricing thresholds will be considered in violation of our brand protection policy.
                    </p>
                    <p className="text-white font-medium">
                        Undercutting of our products will result in the immediate <span className="underline decoration-red-500 decoration-2 underline-offset-4">voiding of the manufacturer’s warranty</span> on those installations.
                    </p>
                </div>

                {/* Promise */}
                <div>
                    <h3 className="text-xl font-bold text-white uppercase mb-4">Our Promise to You</h3>
                    <p>
                        Only in the event of an approved warranty claim will MORION PPF provide replacement material for the specified amount of product deemed defective. This material will be directly sent to the original authorized installer. MORION PPF does not cover labor costs associated with replacements caused by improper installation unless explicitly approved at our sole discretion.
                    </p>
                </div>

                {/* Exclusions */}
                <div>
                    <h3 className="text-xl font-bold text-white uppercase mb-4">Exclusions & Voidance</h3>
                    <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                        <li>Warranty is void if not installed by an authorized facility.</li>
                        <li>Does not cover workmanship errors or installation mistakes.</li>
                        <li>Void if non-approved cleaning agents are used.</li>
                        <li>Applies <strong className="text-white">exclusively to OEM clear-coat surfaces</strong>. Installation on repainted surfaces, primer, carbon fiber, chrome, or lights is excluded.</li>
                        <li>Does not cover road debris, rock chips, or extreme weather events.</li>
                    </ul>
                </div>

                {/* Claims */}
                <div className="pt-8 border-t border-white/10">
                    <h3 className="text-lg font-bold text-white uppercase mb-2">Filing A Claim</h3>
                    <p className="mb-4">
                        The original installer must initiate a warranty claim within 30 days of the issue. 
                        For questions, contact: <a href="mailto:inf@MORIONprotectionfilm.com" className="text-blue-500 hover:text-white transition-colors">inf@MORIONprotectionfilm.com</a>
                    </p>
                </div>

            </div>
         </div>
      </section>

      {/* === SECTION 3: FORM (Moved here) === */}
      <section className="relative w-full bg-black min-h-screen">
        <span className={`${verticalText} ${verticalTextPos} !top-24`}>INPUT // 03</span>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto p-8 lg:p-24">
            {!submitted ? (
                 <div>
                    <div className="mb-12 border-b border-white/20 pb-8">
                         <h2 className="text-4xl lg:text-5xl font-black uppercase text-white mb-4">Registration Protocol</h2>
                         <p className="text-white/50 max-w-2xl">
                            Please complete the fields below to register the warranty sequence in the global database. 
                            Ensure all vehicle and film data matches the invoice.
                         </p>
                    </div>

                    <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        
                        {/* 01 Owner */}
                        <div className="mb-16">
                            <SectionHeader num="01" title={t.form.owner} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="First Name" name="owner_first_name" required />
                                <InputField label="Last Name" name="owner_last_name" required />
                                <InputField label="Email Address" name="owner_email" type="email" required />
                                <InputField label="Mobile Number" name="owner_phone" type="tel" required />
                            </div>
                        </div>

                        {/* 02 Vehicle */}
                        <div className="mb-16">
                            <SectionHeader num="02" title={t.form.vehicle} />
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                <div className="md:col-span-6">
                                    <InputField label="Make" name="car_make" required placeholder="BMW" />
                                </div>
                                <div className="md:col-span-6">
                                    <InputField label="Model" name="car_model" required placeholder="M4 Competition" />
                                </div>
                                <div className="md:col-span-4">
                                    <InputField label="Model Year" name="car_year" type="number" required placeholder="2024" />
                                </div>
                                <div className="md:col-span-8">
                                    <InputField label="VIN Number" name="vin_number" placeholder="XXXXXXXXXXXXXXXXX" />
                                </div>
                            </div>
                        </div>

                        {/* 03 Install */}
                        <div className="mb-16">
                            <SectionHeader num="03" title={t.form.install} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <SelectField label="Film Series" name="film_type" required>
                                    <option value="">Select Series</option>
                                    <option value="gloss">Gloss Finish</option>
                                    <option value="matte">Matte Finish</option>
                                    <option value="colored">Colored Series</option>
                                </SelectField>

                                <SelectField label="Duration" name="warranty_years" required>
                                    <option value="">Select Duration</option>
                                    <option value="10">10 Years</option>
                                    <option value="12">12 Years</option>
                                </SelectField>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <SelectField label="Coverage Area" name="coverage_type" required>
                                    <option value="">Select Coverage</option>
                                    <option value="full">Full Body</option>
                                    <option value="front">Front End Package</option>
                                    <option value="partial">Custom / Partial</option>
                                </SelectField>
                                <InputField label="Roll Serial Reference" name="roll_serial_number" required placeholder="MOR-0000-0000" />
                            </div>
                            <div className="mt-8">
                                 <InputField label="Installation Date" name="install_date" type="date" required />
                            </div>
                        </div>

                        {/* 04 Dealer */}
                        <div className="mb-16">
                            <SectionHeader num="04" title={t.form.dealer} />
                            <SelectField label="Select Authorized Center" name="dealer_id" required>
                                <option value="">
                                    {loadingDealers ? "Loading Database..." : "Select Installer"}
                                </option>
                                {dealers.map((d) => (
                                    <option key={d.id} value={d.id}>{d.shop_name}</option>
                                ))}
                            </SelectField>
                        </div>

                        {/* 05 Ack */}
                        <div className="mb-16">
                            <SectionHeader num="05" title={t.form.ack} />
                            <div className="space-y-4">
                                <CheckboxField 
                                    name="maintenance_briefed" 
                                    label="I confirm that the client has been briefed on proper maintenance protocols." 
                                    required 
                                />
                                <CheckboxField 
                                    name="ppf_limitations_ack" 
                                    label="I confirm the client understands the material limitations and warranty exclusions." 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white text-black py-6 text-sm font-black uppercase tracking-[0.25em] hover:bg-neutral-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isSubmitting ? t.form.processing : t.form.submit}
                        </button>
                    </form>
                 </div>
            ) : (
                /* SUCCESS STATE */
                <div className="h-full min-h-[50vh] flex items-center justify-center animate-in zoom-in-95 duration-500">
                     <div className="w-full max-w-lg border-4 border-white bg-neutral-100 text-black p-12 relative">
                         <div className="absolute -top-4 left-8 bg-neutral-100 px-4">
                             <span className="text-black font-black uppercase tracking-widest text-sm">STATUS REPORT</span>
                         </div>
                         
                         <h2 className="text-4xl font-black uppercase mb-6">{t.form.successTitle}</h2>
                         <p className="text-lg font-bold leading-relaxed opacity-80 mb-12">
                             {t.form.successText}
                         </p>

                         <button 
                            onClick={() => window.location.reload()}
                            className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:opacity-50 transition-opacity"
                        >
                            Start New Session
                        </button>
                     </div>
                </div>
            )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-white p-12 lg:p-24 text-center border-t border-white/10">
         <h2 className="text-[12vw] font-black uppercase leading-none opacity-10 hover:opacity-30 transition-opacity duration-500 cursor-default select-none">
            MORION
         </h2>
      </footer>

    </div>
  );
}
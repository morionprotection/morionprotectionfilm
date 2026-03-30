"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// --- FILM SERIES DATA ---
const FILM_SERIES = [
  { id: 'solid_gloss', nameEn: 'SOLID GLOSS SERIES', nameAr: 'سلسلة صلب لامع' },
  { id: 'metallic_gloss', nameEn: 'METALLIC GLOSS SERIES', nameAr: 'سلسلة معدني لامع' },
  { id: 'matte_satin', nameEn: 'MATTE / SATIN SERIES', nameAr: 'سلسلة مات / ساتان' },
  { id: 'color_shift', nameEn: 'COLOR-SHIFT SERIES', nameAr: 'سلسلة متغير اللون' },
  { id: 'liquid', nameEn: 'LIQUID SERIES', nameAr: 'سلسلة سائل' },
];

// --- HEXAGON FLOOR PATTERN (Visual Only) ---
const HexFloor = () => (
  <div className="absolute top-0 right-0 w-full h-full z-0 opacity-10 pointer-events-none overflow-hidden">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons-quote" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(3)">
          <path d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z" fill="none" stroke="#2DD4BF" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons-quote)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
  </div>
);

export default function GetQuoteSection() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    vehicle: "",
    series: "", 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // --- TRANSLATIONS ---
  const text = {
    title: isArabic ? "طلب عرض سعر" : "REQUEST A QUOTE",
    subtitle: isArabic ? "المواصفات الفنية // تقدير التكلفة" : "TECHNICAL SPECS // COST ESTIMATION",
    firstName: isArabic ? "الاسم الأول" : "FIRST NAME",
    lastName: isArabic ? "اسم العائلة" : "LAST NAME",
    email: isArabic ? "البريد الإلكتروني" : "EMAIL ADDRESS",
    phone: isArabic ? "رقم الهاتف" : "PHONE NUMBER",
    city: isArabic ? "المدينة والمنطقة" : "CITY / REGION",
    vehicle: isArabic ? "بيانات المركبة (الموديل والسنة)" : "VEHICLE DETAILS (YEAR, MAKE, MODEL)",
    seriesLabel: isArabic ? "اختر السلسلة المطلوبة" : "SELECT FILM SERIES",
    selectPlaceholder: isArabic ? "-- اختر السلسلة --" : "-- Select Series --",
    submit: isArabic ? "تأكيد الطلب" : "Get Estimate",
    submitting: isArabic ? "جاري المعالجة..." : "Processing...",
    successTitle: isArabic ? "تم تأكيد الطلب" : "Request Received",
    successMsg: isArabic 
      ? "تم تسجيل بياناتك في النظام. سيتواصل الفريق التقني معك قريباً." 
      : "We have received your details. Our team will contact you shortly with a personalized quote.",
    errorTitle: isArabic ? "حدث خطأ" : "Submission Failed",
    errorBtn: isArabic ? "حاول مرة أخرى" : "Try Again",
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormState({
          firstName: "", lastName: "", email: "", phone: "",
          city: "", vehicle: "", series: ""
        });
      } else {
        setErrorMsg(data.error || (isArabic ? "حدث خطأ ما. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again."));
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg(isArabic ? "خطأ في الشبكة. يرجى التحقق من الاتصال." : "Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="w-full bg-black text-white py-24 md:py-32 relative" // Removed overflow-hidden to help sticky positioning in some contexts, or keep it if no overflow issues.
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Background Decor - Wrapped to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HexFloor />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left Side: Sticky Header & Info */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
                <motion.div 
                    initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 uppercase leading-[0.9]">
                        {text.title}
                    </h2>
                    <div className="flex items-center gap-4 text-[#2DD4BF] text-xs font-bold tracking-[0.25em] uppercase mb-8">
                        <span className="w-16 h-[2px] bg-[#2DD4BF]"></span>
                        {text.subtitle}
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed max-w-sm font-light border-l border-white/20 pl-6">
                        {isArabic 
                            ? "املأ النموذج للحصول على عرض سعر دقيق لخدمات حماية وتغليف السيارات."
                            : "Fill out the form to receive an accurate quotation for our premium automotive film services."}
                    </p>
                </motion.div>
            </div>

            {/* Right Side: The Form Card (Scrolling) */}
            <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                {isSuccess ? (
                    // --- SUCCESS STATE (Square) ---
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#111] p-12 text-center flex flex-col items-center justify-center min-h-[600px] border border-white/10 relative overflow-hidden" // Removed rounded-xl
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent opacity-50"></div>

                        <div className="w-24 h-24 bg-[#2DD4BF]/10 flex items-center justify-center mb-8 border border-[#2DD4BF]/20 shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                            <svg className="w-10 h-10 text-[#2DD4BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-wide uppercase">{text.successTitle}</h3>
                        <p className="text-gray-400 max-w-md mx-auto leading-relaxed text-sm font-mono">
                            {text.successMsg}
                        </p>
                    </motion.div>

                ) : errorMsg ? (
                    // --- ERROR STATE (Square) ---
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#111] p-12 text-center flex flex-col items-center justify-center min-h-[600px] border border-red-900/30 relative overflow-hidden" // Removed rounded-xl
                    >
                        <div className="w-24 h-24 bg-red-900/10 flex items-center justify-center mb-8 border border-red-500/20">
                            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-wide uppercase">{text.errorTitle}</h3>
                        <p className="text-red-400 font-medium max-w-md mx-auto leading-relaxed mb-8 text-sm font-mono">
                            {errorMsg}
                        </p>
                        <button 
                            onClick={() => setErrorMsg(null)}
                            className="text-sm font-bold uppercase tracking-widest text-white border-b border-[#2DD4BF] hover:text-[#2DD4BF] transition-colors pb-1"
                        >
                            {text.errorBtn}
                        </button>
                    </motion.div>

                ) : (
                    // --- FORM STATE (Square) ---
                    <motion.div
                        key="form-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0a0a0a] p-8 md:p-16 border border-white/10 relative shadow-2xl" // Removed rounded-xl
                    >
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                            <TechInput 
                                name="firstName" label={text.firstName} value={formState.firstName} onChange={handleChange} isArabic={isArabic}
                            />
                            <TechInput 
                                name="lastName" label={text.lastName} value={formState.lastName} onChange={handleChange} isArabic={isArabic}
                            />
                            <TechInput 
                                name="email" label={text.email} type="email" value={formState.email} onChange={handleChange} isArabic={isArabic}
                            />
                            <TechInput 
                                name="phone" label={text.phone} type="tel" value={formState.phone} onChange={handleChange} isArabic={isArabic}
                            />
                            
                            <div className="md:col-span-2">
                                <TechSelect 
                                    name="series"
                                    label={text.seriesLabel}
                                    value={formState.series}
                                    onChange={handleChange}
                                    options={FILM_SERIES}
                                    placeholder={text.selectPlaceholder}
                                    isArabic={isArabic}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <TechInput 
                                name="city" label={text.city} value={formState.city} onChange={handleChange} isArabic={isArabic}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <TechInput 
                                name="vehicle" label={text.vehicle} value={formState.vehicle} onChange={handleChange} isArabic={isArabic}
                                />
                            </div>

                            {/* Submit Button (Square) */}
                            <div className="md:col-span-2 mt-8">
                                <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full bg-[#2DD4BF] text-black font-black text-sm uppercase tracking-[0.2em] py-6 transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden" // Removed rounded-sm
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? text.submitting : text.submit}
                                        {!isSubmitting && (
                                        <svg className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                        )}
                                    </span>
                                </button>
                            </div>

                        </form>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
}

// --- COMPONENT: Professional Dark Mode Input ---
function TechInput({ name, label, value, onChange, type = "text", isArabic }) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative group">
      <label
        className={`
            block text-[10px] font-bold uppercase tracking-[0.15em] mb-3 transition-colors duration-300 
            ${isFocused ? "text-[#2DD4BF]" : "text-gray-500"} 
            ${isArabic ? "text-right" : "text-left"}
        `}
      >
        {label}
      </label>
      <div className="relative">
        <input
            type={type} name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
            className={`
                w-full bg-transparent text-lg py-3 border-b border-white/10 focus:border-transparent focus:outline-none placeholder-transparent font-medium transition-colors duration-300
                ${isFocused ? "text-white" : "text-gray-300"} 
                ${isArabic ? "text-right" : "text-left"}
            `}
        />
        {/* Animated Bottom Line */}
        <div className={`absolute bottom-0 h-[2px] bg-[#2DD4BF] transition-all duration-300 ease-out shadow-[0_0_10px_#2DD4BF] ${isArabic ? "right-0" : "left-0"} ${isFocused ? "w-full" : "w-0"}`} />
      </div>
    </div>
  );
}

// --- COMPONENT: Professional Dark Mode Select ---
function TechSelect({ name, label, value, onChange, options, placeholder, isArabic }) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;  

    return (
      <div className="relative group">
        <label
          className={`
            block text-[10px] font-bold uppercase tracking-[0.15em] mb-3 transition-colors duration-300 
            ${isFocused ? "text-[#2DD4BF]" : "text-gray-500"} 
            ${isArabic ? "text-right" : "text-left"}
          `}
        >
          {label}
        </label>
        
        <div className="relative">
            <select
                name={name}
                value={value || ""}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                    w-full bg-transparent text-lg py-3 border-b border-white/10 focus:border-transparent focus:outline-none appearance-none cursor-pointer font-medium transition-colors duration-300
                    ${hasValue ? "text-white" : "text-gray-600"}
                    ${isArabic ? "text-right pr-4 pl-4" : "text-left pl-0 pr-8"}
                `}
            >
                <option value="" disabled className="bg-black text-gray-500">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.id} value={isArabic ? opt.nameAr : opt.nameEn} className="bg-black text-white py-2">
                        {isArabic ? opt.nameAr : opt.nameEn}
                    </option>
                ))}
            </select>

            {/* Custom Arrow Icon */}
            <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-hover:text-[#2DD4BF] transition-colors ${isArabic ? 'left-0' : 'right-0'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Animated Bottom Line */}
            <div className={`absolute bottom-0 h-[2px] bg-[#2DD4BF] transition-all duration-300 ease-out shadow-[0_0_10px_#2DD4BF] ${isArabic ? "right-0" : "left-0"} ${isFocused ? "w-full" : "w-0"}`} />
        </div>
      </div>
    );
}
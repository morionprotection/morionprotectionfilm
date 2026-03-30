'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

/* ================== ASSETS ================== */
const assets = {
  hero: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg",
};

/* ================== CONTENT ================== */
const content = {
  en: {
    hero: {
      title: "PARTNER NETWORK",
      subtitle: "Join the elite tier of authorized Morion installation centers.",
      badge: "STATUS: APPLICATIONS OPEN",
      ref: "REF: B2B-2025",
    },
    sidebar: {
      title: "THE PROCESS",
      steps: [
        { num: "01", title: "APPLICATION", desc: "Submit facility details." },
        { num: "02", title: "VIRTUAL AUDIT", desc: "Showroom & team verification." },
        { num: "03", title: "ONBOARDING", desc: "Training & territory assignment." },
        { num: "04", title: "AUTHORIZATION", desc: "Receive official dealer code." },
      ],
      requirements:
        "MINIMUM REQS: Commercial Registration, Dust-Free Bay, 2+ Trained Installers.",
      contact: "DIRECT B2B LINE: +966 50 000 0000",
    },
    form: {
      sections: {
        contact: "REPRESENTATIVE INFO",
        business: "BUSINESS PROFILE",
        verification: "VERIFICATION",
      },
      submit: "SUBMIT APPLICATION",
    },
    success: {
      badge: "STATUS: UNDER REVIEW",
      title: "APPLICATION LOGGED",
      desc: "Your facility profile has been securely uploaded to our B2B server. Our network auditors will review your credentials within 48 hours.",
      btn: "RETURN TO HOME",
    },
  },
  ar: {
    hero: {
      title: "شبكة الشركاء",
      subtitle: "انضم إلى النخبة من مراكز التركيب المعتمدة لدى موريون.",
      badge: "الحالة: التسجيل متاح",
      ref: "مرجع: B2B-2025",
    },
    sidebar: {
      title: "مراحل الاعتماد",
      steps: [
        { num: "01", title: "التقديم", desc: "إرسال بيانات المركز." },
        { num: "02", title: "التقييم", desc: "التحقق من المعرض والفريق." },
        { num: "03", title: "التدريب", desc: "التدريب وتحديد المنطقة." },
        { num: "04", title: "الاعتماد", desc: "استلام كود الوكيل الرسمي." },
      ],
      requirements:
        "الحد الأدنى: سجل تجاري ساري، غرفة معزولة للغبار، فنيين عدد ٢+.",
      contact: "خط الأعمال المباشر: 0500000000",
    },
    form: {
      sections: {
        contact: "بيانات الممثل",
        business: "ملف المنشأة",
        verification: "التحقق",
      },
      submit: "إرسال طلب الانضمام",
    },
    success: {
      badge: "الحالة: قيد المراجعة",
      title: "تم استلام الطلب",
      desc: "تم رفع ملف المنشأة بشكل آمن إلى خوادم الأعمال لدينا. سيقوم فريق التدقيق بمراجعة بياناتك خلال 48 ساعة.",
      btn: "العودة للرئيسية",
    },
  },
};

/* ================== UI COMPONENTS ================== */

const InputField = ({ label, name, type = "text", required = false }) => (
  <div className="group relative border border-white/10 bg-neutral-900/50">
    <div className="absolute top-0 start-0 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
      {label}
    </div>
    <input
      name={name}
      type={type}
      required={required}
      className="w-full bg-transparent p-4 pt-8 text-sm font-bold uppercase text-white outline-none focus:bg-white/5 transition-colors"
    />
  </div>
);

const FileField = ({
  label,
  name,
  required = false,
  multiple = false,
  accept = "image/*",
}) => (
  <div className="group relative border border-white/10 bg-neutral-900/50 hover:border-white/30 transition-colors">
    <div className="absolute top-0 start-0 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
      {label}
    </div>
    <input
      name={name}
      type="file"
      required={required}
      multiple={multiple}
      accept={accept}
      className="w-full bg-transparent p-4 pt-10 text-sm text-white outline-none file:mr-4 file:py-2 file:px-4 file:bg-white/10 file:text-white file:border-0 file:text-xs file:uppercase file:font-bold hover:file:bg-white/20 transition-all cursor-pointer"
    />
  </div>
);

/* ================== PAGE ================== */

export default function DealerPage() {
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = pathname.startsWith('/ar');
  const t = isArabic ? content.ar : content.en;

  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ================== SUBMIT ================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Simulated API call
    const res = await fetch("/api/dealers/apply", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("Submission failed. Please check your connection.");
    }
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="bg-black text-white min-h-screen pt-[80px]">

      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] border-b border-white/10">
        <Image src={assets.hero} fill className="object-cover opacity-20 grayscale" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 p-8 lg:p-16 h-full flex flex-col justify-end pb-12">
          <span className="text-xs text-green-500 font-bold tracking-[0.2em] uppercase mb-2 block">{t.hero.badge}</span>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter">
            {t.hero.title}
          </h1>
          <p className="text-white/60 max-w-xl mt-4 font-light">{t.hero.subtitle}</p>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 min-h-screen">

        {/* ================= SIDEBAR ================= */}
        <aside className="lg:col-span-4 border-e border-white/10 p-8 lg:p-12 bg-neutral-950">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-12">
            {t.sidebar.title}
          </h3>

          {t.sidebar.steps.map((s, i) => (
            <div key={i} className="mb-8 group">
              <div className="text-blue-500 font-mono text-xs mb-2 group-hover:text-white transition-colors">0{i + 1} //</div>
              <h4 className="font-black uppercase text-xl mb-1">{s.title}</h4>
              <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}

          <div className="mt-16 p-6 border border-white/10 bg-white/5 text-xs text-white/70 leading-relaxed font-mono">
            {t.sidebar.requirements}
          </div>
        </aside>

        {/* ================= FORM / SUCCESS ================= */}
        <main className="lg:col-span-8 p-8 lg:p-20 bg-black">

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">

              {/* CONTACT */}
              <div className="mb-16">
                <h2 className="font-black uppercase mb-6 text-xl tracking-wider flex items-center gap-2">
                   <span className="w-2 h-2 bg-white/20"></span> {t.form.sections.contact}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                     <InputField label="Full Name" name="contact_name" required />
                  </div>
                  <InputField label="Phone Number" name="phone" required />
                  <InputField label="Email Address" name="email" type="email" required />
                </div>
              </div>

              {/* BUSINESS */}
              <div className="mb-16">
                <h2 className="font-black uppercase mb-6 text-xl tracking-wider flex items-center gap-2">
                   <span className="w-2 h-2 bg-white/20"></span> {t.form.sections.business}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                     <InputField label="Registered Company Name" name="shop_name" required />
                  </div>
                  <div className="md:col-span-2">
                     <InputField label="Full Address / City" name="shop_address" required />
                  </div>
                  <InputField label="Website (Optional)" name="shop_website" />
                  <InputField label="Instagram Handle" name="shop_instagram" />
                </div>
              </div>

              {/* VERIFICATION */}
              <div className="mb-16">
                <h2 className="font-black uppercase mb-6 text-xl tracking-wider flex items-center gap-2">
                   <span className="w-2 h-2 bg-white/20"></span> {t.form.sections.verification}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FileField
                    label="Commercial Reg (CR)"
                    name="cr_license_url"
                    required
                    accept="image/*,.pdf"
                  />
                  <FileField
                    label="Workshop Photos (Max 5)"
                    name="portfolio_images"
                    required
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>

              <button className="w-full bg-white text-black py-6 font-black uppercase tracking-[0.25em] hover:bg-neutral-200 transition-colors">
                {t.form.submit}
              </button>
            </form>
          ) : (
            /* ================= CORRECTED SUCCESS STATE ================= */
            <div className="min-h-[50vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-700">
                
                <div className="relative w-full max-w-lg bg-neutral-900/50 border border-green-500/20 p-12 overflow-hidden text-center">
                    
                    {/* Green Glow Effects */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.6)]"></div>
                    <div className="absolute -top-[50px] -right-[50px] w-[150px] h-[150px] bg-green-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                    {/* Animated Icon */}
                    <div className="relative w-20 h-20 mx-auto mb-10 flex items-center justify-center">
                        <div className="absolute inset-0 border border-green-500/30 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                        <div className="absolute inset-2 border border-green-500/50 rounded-full bg-neutral-900"></div>
                        <svg className="w-8 h-8 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="inline-block px-4 py-1.5 mb-8 border border-green-500/30 bg-green-900/20 rounded-full">
                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                {t.success.badge}
                            </span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-black uppercase text-white mb-6 tracking-tight">
                            {t.success.title}
                        </h2>
                        
                        <p className="text-white/60 font-light text-sm leading-loose mb-12 border-t border-b border-white/5 py-8">
                            {t.success.desc}
                        </p>

                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="w-full py-4 border border-white/10 bg-white/5 hover:bg-green-500/10 hover:border-green-500/40 text-white hover:text-green-400 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                        >
                            {t.success.btn}
                        </button>
                    </div>
                </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
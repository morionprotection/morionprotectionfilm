"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat, Dancing_Script } from "next/font/google";

// 1. Configure Fonts
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-montserrat"
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script"
});

export default function HeroResponsive() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  // Content Dictionary
  const content = isArabic
    ? {
        subHeading: "اختبر العصر الجديد",
        titleLine1: "من الفخامة",
        titleLine2: "في التجليد",
        btnDealer: "كن موزعاً",
        btnInstaller: "ابحث عن مركز تركيب",
        linkDealer: "/ar/become-dealer",
        linkInstaller: "/ar/contact",
      }
    : {
        subHeading: "EXPERIENCE THE NEXT",
        titleLine1: "OF LUXURY",
        titleLine2: "COLOR WRAPS",
        btnDealer: "BECOME A DEALER",
        btnInstaller: "FIND AN INSTALLER",
        linkDealer: "/en/become-dealer",
        linkInstaller: "/en/contact",
      };

  return (
    <section
      className={`relative w-full h-[70dvh] md:h-[100dvh] overflow-hidden flex flex-col items-center justify-start bg-[#0a0a0a] ${montserrat.variable} ${dancingScript.variable} font-sans`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      
      {/* ================= BACKGROUND LAYER ================= */}
      <div className="absolute inset-0 z-0">
        
        {/* Desktop Image */}
        <div className="hidden md:block relative w-full h-full">
            <Image
              src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1767785327/HeroDesktop_dwmwrx.png"
              alt="Morion Luxury Car Wrap"
              fill
              priority
              className="object-cover object-center"
              quality={100}
            />
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden relative w-full h-full">
            <Image
              src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1767790997/HeroMobile_v64cs8.png"
              alt="Morion Luxury Car Wrap"
              fill
              priority
              className="object-cover object-bottom" // Anchors car to bottom
              quality={100}
            />
        </div>

        {/* Creative Overlay: Darkens top for text, fades bottom for blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/90 z-[1]"></div>
      </div>


      {/* ================= CONTENT LAYER ================= */}
      
      {/* Main Text Container - Positioned in the upper half to avoid covering the car */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-[18vh] md:mt-[22vh] px-4 w-full max-w-7xl mx-auto">
        
        {/* 1. Subheading */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <p className="text-white uppercase tracking-[0.25em] md:tracking-[0.4em] text-[10px] sm:text-sm md:text-base font-medium mb-0 drop-shadow-md">
                {content.subHeading}
            </p>
        </div>

      

     {/* 3. Main Headline - Massive Teal Text */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h1 className="flex flex-col items-center text-[#2DD4BF] font-black uppercase leading-[0.9] tracking-tight relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,1)]"> 
                {/* Responsive sizing: massive on desktop, readable on mobile */}
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem]">
                    {content.titleLine1}
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem]">
                    {content.titleLine2}
                </span>
            </h1>
        </div>
      </div>

      {/* Spacer to push buttons to bottom, but above the very edge */}
      <div className="flex-grow"></div>


      {/* ================= BUTTONS LAYER ================= */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row gap-4 items-center justify-center px-4 mb-[12vh] md:mb-[15vh] opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        
        {/* Button 1: Teal Glow */}
        <Link href={content.linkDealer}>
          <button
            className="min-w-[240px] px-4 py-2 md:px-8 md:py-4 rounded-full bg-[#2DD4BF] text-black font-extrabold text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(45,212,191,0.4)]"
          >
            {content.btnDealer}
          </button>
        </Link>

        {/* Button 2: Glassmorphism */}
        <Link href={content.linkInstaller}>
          <button
            className="min-w-[240px] px-4 py-2 md:px-8 md:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/40 text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
          >
            {content.btnInstaller}
          </button>
        </Link>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.0s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}
// src/components/AdminNavbar.jsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const Navbar = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  if (!user) return null;

  // Logic to determine language based on URL
  const isArabic = pathname.startsWith("/ar");

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace(isArabic ? "/ar/login" : "/en/login");
  };

  const languageSwitcher = () => {
    const currentPath = pathname;
    let newPath;
    if (isArabic) {
      // Switch from Arabic to English
      if (currentPath === "/ar") {
        newPath = "/en";
      } else {
        newPath = currentPath.replace(/^\/ar/, "/en");
      }
    } else {
      // Switch from English to Arabic
      if (currentPath === "/en") {
        newPath = "/ar";
      } else if (currentPath === "/") {
        // If on root path, redirect to Arabic home
        newPath = "/ar";
      } else {
        newPath = currentPath.replace(/^\/en/, "/ar");
      }
    }
    window.location.href = newPath;
  };

  // Text content object
  const texts = {
    brand: isArabic ? "لوحة التحكم" : "MORION DASHBOARD",
    userPlaceholder: isArabic ? "المسؤول" : "Administrator",
    logout: isArabic ? "خروج" : "LOGOUT",
    langLabel: isArabic ? "EN" : "عربي", // Label shows the TARGET language
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isArabic ? "md:mr-72" : "md:ml-72"
      } ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-neutral-800"
          : "bg-black border-transparent"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-4">
          <Link href={isArabic ? "/ar/dashboard" : "/en/dashboard"}>
            <h1 className="hidden md:block text-lg px-2 md:px-0 font-light tracking-tighter text-white hover:text-neutral-400 transition-colors uppercase">
              {texts.brand}
            </h1>
          </Link>
          
          {/* Divider */}
          <div className="h-4 w-[1px] bg-neutral-800 hidden md:block" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* User Email Display */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              {texts.userPlaceholder}
            </span>
            <span className="text-xs text-neutral-300 font-medium tracking-wide">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* LANGUAGE SWITCHER BUTTON */}
            <button
              onClick={languageSwitcher}
              className="
                h-9 px-3 py-2  
                flex items-center justify-center
                border border-neutral-800 bg-black 
                text-neutral-400 text-xs font-mono 
                hover:bg-white hover:text-black hover:border-white
                transition-all duration-300
              "
            >
              {texts.langLabel}
            </button>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="
                h-9 px-3 py-2
                flex items-center justify-center
                bg-red-900/20 border border-red-900/50 text-red-500
                text-xs font-mono uppercase tracking-widest
                hover:bg-red-600 hover:border-red-600 hover:text-white
                transition-all duration-300
              "
            >
              {texts.logout}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
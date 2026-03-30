// src/components/AdminSidebar.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Feather, // Icon for Blogs
  Briefcase,
  Settings,
  Menu,
  X,
  LayoutGrid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

    if (!user) return null;

  
  // Logic: Check if path starts with /ar
  const isArabic = pathname?.startsWith("/ar");
  const langPrefix = isArabic ? "/ar" : "/en";

  // Navigation Items with Bilingual Labels
  // Adjusted paths to match the pattern: /en/dashboard, /en/blogs, etc.
  const navItems = [
    { 
        id: "dashboard", 
        name: "Dashboard", 
        nameAr: "لوحة التحكم", 
        href: `${langPrefix}/dashboard`, 
        icon: LayoutGrid 
    },
    { 
        id: "dealers", 
        name: "Dealers", 
        nameAr: "التجار", 
        href: `${langPrefix}/dashboard/dealers`, 
        icon: Feather 
    },
    { 
        id: "warranties", 
        name: "Warranties", 
        nameAr: "الضمانات", 
        href: `${langPrefix}/dashboard/warranties`, 
        icon: Briefcase 
    },
    { 
        id: "settings", 
        name: "Settings", 
        nameAr: "الإعدادات", 
        href: `${langPrefix}/dashboard/settings`, 
        icon: Settings 
    },
  ];

  return (
    <>
      {/* --- Mobile Toggle Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-[60] p-2 text-white md:hidden hover:bg-zinc-900 transition-colors ${
          isArabic ? "right-4" : "left-4"
        }`}
      >
        {isOpen ? <X size={35} /> : <Menu size={35} />}
      </button>

      {/* --- Overlay (Mobile Only) --- */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            />
        )}
      </AnimatePresence>

      {/* --- Sidebar Container --- */}
      <aside
        className={`fixed inset-y-0 z-50 w-72 bg-black border-zinc-800 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-x-0 pt-20
          ${isArabic ? "right-0 border-l translate-x-full" : "left-0 border-r -translate-x-full"}
          ${isOpen ? "!translate-x-0" : ""}
        `}
      >
        
        {/* Navigation List */}
        <nav className="flex-1 px-4 mt-8">
            {/* Section Label */}
            <div className={`text-[10px] text-zinc-600 font-mono uppercase tracking-widest mb-4 ${isArabic ? "text-right" : "text-left"}`}>
                {isArabic ? "القائمة الرئيسية" : "Main Menu"}
            </div>

            <ul className="space-y-1">
                {navItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                    <li key={item.id}>
                    <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`group relative flex items-center gap-4 px-4 py-4 text-sm font-medium transition-all duration-300
                        ${
                            isActive
                            ? "text-white bg-zinc-900"
                            : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
                        }
                        ${isArabic ? "flex-row-reverse text-right" : "flex-row text-left"}
                        `}
                    >
                        {/* Icon */}
                        <item.icon
                        size={18}
                        strokeWidth={1.5}
                        className={`transition-colors duration-300 ${
                            isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                        }`}
                        />
                        
                        {/* Label */}
                        <span className="tracking-wide">
                            {isArabic ? item.nameAr : item.name}
                        </span>

                        {/* Active Line Indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="active-sidebar"
                                className={`absolute top-0 bottom-0 w-[2px] bg-white
                                    ${isArabic ? "left-0" : "right-0"}
                                `}
                            />
                        )}
                    </Link>
                    </li>
                );
                })}
            </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-zinc-900">
            <div className={`text-xs text-zinc-600 ${isArabic ? "text-right" : "text-left"}`}>
                <p>MORION {user?.email}</p>
                <p className="mt-1 opacity-50">v1.0.0</p>
            </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
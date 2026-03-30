"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function WhatsAppFloating() {
  const [isHovered, setIsHovered] = useState(false);

 

  return (
    <motion.a
      href='https://wa.me/966561585232'
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] flex items-center justify-end"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 1. Label Section (Slides out to the left) */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0,
        }}
        className="overflow-hidden bg-black border-y border-l border-neutral-800 h-14 flex items-center"
      >
        <span className="whitespace-nowrap px-4 text-xs font-mono uppercase tracking-widest text-white">
          Start Chat
        </span>
      </motion.div>

      {/* 2. Icon Box (Square) */}
      <div 
        className={`
          relative h-14 w-14 flex items-center justify-center
          bg-black border border-neutral-800
          transition-all duration-300 ease-out
          hover:bg-[#25D366] hover:border-[#25D366]
        `}
      >
        {/* Status Indicator (Pixel Dot) */}
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#25D366] group-hover:bg-black animate-pulse" />

        <WhatsAppIcon className="w-6 h-6 text-white transition-colors duration-300 group-hover:text-black" />
      </div>
    </motion.a>
  );
}

// Simple SVG Icon
const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.002 2C6.479 2 2.002 6.479 2.002 12c0 1.83.493 3.535 1.353 5.01L2 22l5.122-1.328A9.957 9.957 0 0012.002 22c5.523 0 10-4.479 10-10s-4.477-10-10-10zm0 18a7.96 7.96 0 01-4.048-1.103l-.291-.172-2.986.775.803-2.903-.193-.309A7.966 7.966 0 014.002 12c0-4.411 3.591-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.338-6.027c-.237-.118-1.405-.693-1.623-.772-.218-.08-.376-.119-.535.118-.158.238-.613.773-.752.931-.138.159-.277.178-.514.06-.238-.119-1.004-.37-1.913-1.181-.706-.63-1.183-1.408-1.321-1.646-.139-.237-.015-.366.104-.484.107-.107.237-.277.356-.416.119-.138.158-.237.238-.396.079-.158.04-.297-.02-.416-.06-.118-.535-1.287-.732-1.762-.193-.465-.386-.402-.53-.409-.134-.007-.287-.008-.44-.008-.153 0-.401.058-.61.286-.208.228-.792.772-.792 1.882 0 1.11.808 2.181.921 2.33.114.149 1.59 2.426 3.851 3.402.537.232.956.371 1.283.475.543.173 1.037.149 1.428.09.434-.065 1.405-.574 1.603-1.128.198-.554.198-1.03.139-1.128-.059-.099-.218-.159-.455-.277z" />
  </svg>
);
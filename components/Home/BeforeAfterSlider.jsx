"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export default function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  className = "",
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Core logic to calculate position
  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    // Clamp the percentage between 0 and 100
    const newPosition = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(newPosition);
  }, []);

  // Handle Mouse/Touch Down
  const handlePointerDown = (e) => {
    setIsDragging(true);
    // Update immediately on click
    updatePosition(e.clientX); 
  };

  // Global Event Listeners for smooth dragging outside container
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDragging) {
        updatePosition(e.clientX);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      // UPDATED: Added h-[400px] md:h-[600px] lg:h-[700px] to handle responsive height
      className={`relative w-full overflow-hidden select-none  cursor-ew-resize group touch-none h-[400px] md:h-[700px] lg:h-[1000px] ${className}`}
      onPointerDown={handlePointerDown}
    >
      {/* 1. The "After" Image (Background) */}
      <img
        src={afterSrc}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false} // Prevent image dragging ghost
      />
      
      {/* "After" Label Badge */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 text-sm font-medium rounded-full z-10 select-none">
        {afterLabel}
      </div>

      {/* 2. The "Before" Image (Foreground - Clipped) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={beforeSrc}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        
        {/* "Before" Label Badge - Inside clipped area so it hides when slider moves */}
        <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 text-sm font-medium rounded-full z-10 select-none shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* 3. The Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1  cursor-ew-resize z-20"
        style={{ left: `${position}%` }}
      >
        {/* The Knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-700 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
           {/* Arrows SVG */}
           <svg 
             xmlns="http://www.w3.org/2000/svg" 
             width="50" 
             height="50" 
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="2.5" 
             strokeLinecap="round" 
             strokeLinejoin="round" 
             className="text-white"
           >
             <path d="m15 18-6-6 6-6"/>
           </svg>
           <svg 
             xmlns="http://www.w3.org/2000/svg" 
             width="50" 
             height="50" 
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="2.5" 
             strokeLinecap="round" 
             strokeLinejoin="round" 
             className="text-white ml-[-8px]"
           >
             <path d="m9 18 6-6-6-6"/>
           </svg>
        </div>
      </div>
    </div>
  );
}
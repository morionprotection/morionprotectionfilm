"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Facebook, Instagram, Link as LinkIcon, Check } from "lucide-react";

export default function UltrfitVSPage() {
  /* ------------------ CAROUSEL DATA ------------------ */
  const images = [
    "https://res.cloudinary.com/dhev1s5wb/image/upload/v1768378242/MORIONIRX_qyauh9.png",
    "/FilmTable.png",
  ];

  /* ------------------ STATE MANAGEMENT ------------------ */
  const [index, setIndex] = useState(0);
  const [activeTag, setActiveTag] = useState(null);
  const [activeVlt, setActiveVlt] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  /* ------------------ HANDLERS ------------------ */
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  // Handle Facebook Share
  const handleFacebookShare = () => {
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  // Handle Instagram/Native Share
  const handleInstagramShare = async () => {
    // Note: Instagram doesn't support direct web URL sharing. 
    // We try to use the native Web Share API (works on mobile), otherwise open Instagram.
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Morion VS',
          text: 'Check out the Vivid Signature Series by Morion.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      window.open("https://www.instagram.com/", "_blank");
    }
  };

  // Handle Copy Link
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000); // Reset after 2s
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* ================= LEFT SIDE (Visuals) ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CAROUSEL CONTAINER */}
          <div className="relative w-full">
            {/* Main Image Area */}
            <div className="relative overflow-hidden group">
              <div 
                className="w-full h-[350px] sm:h-[450px] lg:h-[560px] flex items-center justify-center bg-white transition-all duration-300"
              >
                <img
                  key={index}
                  src={images[index]}
                  alt="Window Film Product"
                  className="w-full h-full object-contain animate-fadeIn"
                />
              </div>

              {/* Navigation Arrows */}
              {/* Mobile: Inside image | Desktop: Outside floating */}
              <button
                onClick={prev}
                aria-label="Previous Image"
                className="absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 
                shadow-lg lg:shadow-md rounded-full bg-white/90 lg:bg-white p-3 lg:p-4 
                text-neutral-800 hover:scale-110 active:scale-95 transition-all z-10 border border-neutral-100 lg:border-none"
              >
                <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
              </button>

              <button
                onClick={next}
                aria-label="Next Image"
                className="absolute right-2 lg:-right-6 top-1/2 -translate-y-1/2 
                shadow-lg lg:shadow-md rounded-full bg-white/90 lg:bg-white p-3 lg:p-4 
                text-neutral-800 hover:scale-110 active:scale-95 transition-all z-10 border border-neutral-100 lg:border-none"
              >
                <ChevronRight size={20} className="lg:w-6 lg:h-6" />
              </button>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 justify-center mt-4 overflow-x-auto py-2 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`relative flex-shrink-0 transition-all duration-300 rounded-md overflow-hidden border-2
                    ${index === i ? "border-black opacity-100 scale-105" : "border-transparent opacity-60 hover:opacity-100"}
                  `}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className="h-16 w-auto lg:h-20 object-contain bg-white"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE (Details) ================= */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-4">

          {/* HEADER */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
              MORION
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
              IRX (InfraRed eXtreme)
            </h1>
            <p className="text-sm text-neutral-500 mt-2 font-medium">
              Shipping calculated at checkout.
            </p>
          </div>

          <p className="text-neutral-600 leading-relaxed text-base lg:text-lg">
            The premier product of the IRX Series, the InfraRed eXtreme was
            constructed with unparalleled solar heat rejection, implementing
            the most ideal atmosphere for whenever you are on the road.
          </p>

          <hr className="border-neutral-100" />

          {/* TAGS */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 block">
              Collection
            </span>
            <div className="flex flex-wrap gap-2">
              {["IRX Series"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded border transition-all duration-200
                    ${
                      activeTag === t
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900 hover:text-neutral-900"
                    }
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* VLT SELECTION */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Product
              </span>
              {activeVlt && <span className="text-xs font-medium text-neutral-900">Selected: {activeVlt}%</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {["05", "15", "35", "50", "70"].map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVlt(v)}
                  className={`min-w-[3rem] px-3 py-2 text-xs font-bold rounded border transition-all duration-200
                    ${
                      activeVlt === v
                        ? "bg-black text-white border-black shadow-md transform scale-105"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                    }
                  `}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE SELECTION */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Size
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['60" x 30m'].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(s)}
                  className={`px-4 py-2 text-xs font-bold rounded border transition-all duration-200
                    ${
                      activeSize === s
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                    }
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* SHARE ACTIONS */}
          <div className="pt-6 mt-auto border-t border-neutral-200">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Share
            </div>
            <div className="flex gap-6 items-center">
              <button 
                onClick={handleFacebookShare}
                aria-label="Share on Facebook"
                className="text-neutral-800 hover:text-[#1877F2] cursor-pointer hover:scale-110 transition-all duration-300"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </button>
              
              <button 
                onClick={handleInstagramShare}
                aria-label="Share on Instagram"
                className="text-neutral-800 hover:text-[#E1306C] cursor-pointer hover:scale-110 transition-all duration-300"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </button>
              
              <div className="relative">
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy Link"
                  className={`flex items-center gap-2 cursor-pointer transition-all duration-300 
                    ${linkCopied ? "text-green-600 scale-105" : "text-neutral-800 hover:text-neutral-500 hover:scale-110"}
                  `}
                >
                  {linkCopied ? <Check size={20} /> : <LinkIcon size={20} strokeWidth={1.5} />}
                </button>
                
                {/* Copied Tooltip */}
                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded transition-opacity duration-300 ${linkCopied ? 'opacity-100' : 'opacity-0'}`}>
                  Copied
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
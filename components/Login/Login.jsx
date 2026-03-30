"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = pathname.startsWith("/ar");
  const [mounted, setMounted] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);




  const texts = {
    welcome: isArabic ? "مرحباً بك" : "Welcome Back",
    title: isArabic ? "تسجيل الدخول" : "Sign in to Morion",
    email: isArabic ? "البريد الإلكتروني" : "Email Address",
    password: isArabic ? "كلمة المرور" : "Password",
    button: isArabic ? "دخول" : "Continue",
    loading: isArabic ? "جاري التحميل..." : "Authenticating...",
    error: isArabic ? "بيانات غير صحيحة" : "Invalid credentials",
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      next: isArabic ? "/ar/dashboard" : "/en/dashboard",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setLoading(false);
    setError(data.error || texts.error);
    return;
  }

  // Refresh the router to update server components
  router.refresh();

  // Redirect to dashboard
  router.push(isArabic ? "/ar/dashboard" : "/en/dashboard");
};




  if (!mounted) return null;

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden selection:bg-white selection:text-black ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Atmospheric Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[400px] px-6"
      >
        {/* Header */}
        <div className="mb-12">
            <h2 className="text-zinc-500 text-sm font-medium tracking-wide mb-2 uppercase">
                {texts.welcome}
            </h2>
            <h1 className="text-3xl font-light tracking-tight text-white">
                {texts.title}
            </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-8">
          <MinimalInput
            id="email"
            type="email"
            label={texts.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <MinimalInput
            id="password"
            type="password"
            label={texts.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs font-medium mt-2"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full h-14 mt-8 bg-white text-black text-sm font-medium tracking-wide hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? texts.loading : texts.button}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="mt-12 text-center">
            <p className="text-zinc-600 text-xs tracking-wider">
                MORION &copy; {new Date().getFullYear()}
            </p>
        </div>
      </motion.div>
    </div>
  );
}

// Updated Sub-component with more padding
function MinimalInput({ label, id, type, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs tracking-wide
        ${
          focused || value
            ? "-top-6 text-zinc-500"  // Moved higher to account for taller input
            : "top-4 text-zinc-500 group-hover:text-zinc-400" // Moved down to center in new padding
        }`}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // CHANGED: py-3 -> py-4 for more internal height
        className="w-full bg-transparent border-b border-zinc-800 py-4 px-2 text-base text-white focus:outline-none transition-colors"
      />

      {/* The Active Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: focused ? "0%" : "-100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-white"
        />
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 1. Translation Dictionary
const DICTIONARY = {
  en: {
    title: "SETTINGS",
    system_status: "SYSTEM STATUS: SECURE",
    security: "SECURITY",
    change_password: "CHANGE PASSWORD",
    current_pass: "Current Password",
    new_pass: "New Password",
    confirm_pass: "Confirm Password",
    update_btn: "UPDATE CREDENTIALS",
    user_mgmt: "USER MANAGEMENT",
    add_user: "ADD NEW USER",
    email: "Email Address",
    create_btn: "CREATE USER ACCOUNT",
    processing: "PROCESSING...",
    success: "Success",
    error: "Error",
    pass_mismatch: "New passwords do not match",
    op_success: "Operation completed successfully.",
  },
  ar: {
    title: "الإعدادات",
    system_status: "حالة النظام: آمن",
    security: "الأمان",
    change_password: "تغيير كلمة المرور",
    current_pass: "كلمة المرور الحالية",
    new_pass: "كلمة المرور الجديدة",
    confirm_pass: "تأكيد كلمة المرور",
    update_btn: "تحديث البيانات",
    user_mgmt: "إدارة المستخدمين",
    add_user: "إضافة مستخدم جديد",
    email: "البريد الإلكتروني",
    create_btn: "إنشاء حساب مستخدم",
    processing: "جاري المعالجة...",
    success: "تم بنجاح",
    error: "خطأ",
    pass_mismatch: "كلمات المرور الجديدة غير متطابقة",
    op_success: "تمت العملية بنجاح تام.",
  },
};

export default function SettingsPage() {
  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // New User State
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(false);

  // Alert State
  const [alertState, setAlertState] = useState(null); // { type: 'success' | 'error', message: '' }

  // 2. Detect Language
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const t = DICTIONARY[isArabic ? "ar" : "en"];
  const dir = isArabic ? "rtl" : "ltr";

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } },
  };

  // --- HELPER: Trigger Alert ---
  const showAlert = (type, message) => {
    setAlertState({ type, message });
    // Auto hide after 4 seconds
    setTimeout(() => setAlertState(null), 4000);
  };

  // --- HANDLERS ---

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showAlert("error", t.pass_mismatch);
      return;
    }

    setIsPasswordLoading(true);

    try {
      const res = await fetch("/api/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          current_password: currentPassword, 
          new_password: newPassword 
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to change password");

      showAlert("success", t.op_success);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showAlert("error", error.message);
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    setIsUserLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create user");

      showAlert("success", t.op_success);
      setNewUserEmail("");
      setNewUserPassword("");
    } catch (error) {
      showAlert("error", error.message);
    } finally {
      setIsUserLoading(false);
    }
  };

  return (
    <motion.div
      dir={dir}
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="p-8 space-y-12 min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans relative"
    >
      {/* HEADER */}
      <motion.div variants={itemVars} className="pb-4 border-b border-neutral-800 flex justify-between items-end">
        <h1 className="text-4xl font-light tracking-tighter uppercase">{t.title}</h1>
        <div className="text-xs font-mono text-green-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
          {t.system_status}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT COL: CHANGE PASSWORD */}
        <motion.div variants={itemVars} className="space-y-8">
          <SectionHeader title={t.security} subtitle={t.change_password} />
          
          <form className="space-y-6" onSubmit={handleChangePassword}>
            <BrutalistInput
              type="password"
              label={t.current_pass}
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <BrutalistInput
              type="password"
              label={t.new_pass}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <BrutalistInput
              type="password"
              label={t.confirm_pass}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="pt-4">
              <ActionButton 
                label={isPasswordLoading ? t.processing : t.update_btn} 
                loading={isPasswordLoading} 
                isArabic={isArabic}
              />
            </div>
          </form>
        </motion.div>

        {/* RIGHT COL: ADD USER */}
        <motion.div variants={itemVars} className="space-y-8">
          <SectionHeader title={t.user_mgmt} subtitle={t.add_user} />

          <form className="space-y-6" onSubmit={handleAddUser}>
            <BrutalistInput
              type="email"
              label={t.email}
              placeholder="john@example.com"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
            />

            <BrutalistInput
              type="password"
              label={t.new_pass} 
              placeholder="••••••••"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              required
            />

            <div className="pt-4">
              <ActionButton 
                label={isUserLoading ? t.processing : t.create_btn} 
                loading={isUserLoading}
                isArabic={isArabic}
              />
            </div>
          </form>
        </motion.div>
      </div>

      {/* NEW: Brutalist Alert Overlay */}
      <BrutalistAlert 
        alert={alertState} 
        onClose={() => setAlertState(null)} 
        isArabic={isArabic}
        t={t}
      />

    </motion.div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

const SectionHeader = ({ title, subtitle }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 bg-white" />
      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">{title}</h3>
    </div>
    <h2 className="text-2xl font-light tracking-tight">{subtitle}</h2>
  </div>
);

const BrutalistInput = ({ label, type, placeholder, value, onChange, required }) => (
  <div className="group relative">
    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1 block group-focus-within:text-white transition-colors">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="
        w-full bg-transparent border-b border-neutral-800 py-3
        text-white text-lg font-light outline-none rounded-none
        placeholder:text-neutral-800
        focus:border-white focus:bg-neutral-900/50 focus:ps-4
        transition-all duration-300
      "
    />
    <div className="absolute bottom-0 start-0 h-[1px] w-0 bg-white group-focus-within:w-full transition-all duration-500" />
  </div>
);

const ActionButton = ({ label, loading, isArabic }) => (
  <button
    type="submit"
    disabled={loading}
    className="
      relative w-full overflow-hidden group
      border border-white bg-black text-white py-4 px-6
      font-mono text-xs uppercase tracking-widest
      transition-colors duration-300
      hover:bg-white hover:text-black
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white
    "
  >
    <span className="relative z-10 flex justify-between items-center">
      {label}
      {!loading && (
        <span className={`
          opacity-0 transition-all duration-300
          group-hover:opacity-100 group-hover:translate-x-0
          ${isArabic ? 'translate-x-2 rotate-180' : '-translate-x-2'}
        `}>
          →
        </span>
      )}
    </span>
  </button>
);

// ----------------------------------------------------------------------
// NEW: ALERT COMPONENT
// ----------------------------------------------------------------------
const BrutalistAlert = ({ alert, onClose, isArabic, t }) => {
  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`
            fixed bottom-8 ${isArabic ? 'start-8' : 'end-8'} z-50
            flex items-start gap-4 p-6
            border bg-black shadow-2xl
            min-w-[320px] max-w-md
            ${alert.type === 'error' ? 'border-red-600 text-red-500' : 'border-green-500 text-green-500'}
          `}
        >
          {/* Indicator Icon */}
          <div className={`
            w-2 h-2 mt-2 shrink-0
            ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'}
            animate-pulse
          `} />

          <div className="flex flex-col gap-1 w-full">
             {/* Title */}
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold">
              {alert.type === 'error' ? t.error : t.success}
            </h4>
            
            {/* Message Body */}
            <p className="text-sm font-light text-white/90 leading-relaxed">
              {alert.message}
            </p>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="text-xs opacity-50 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AdminShell({ children, user }) {
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");

  return (
    <div
      className={`min-h-screen text-white ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Navbar */}
      <Navbar isArabic={isArabic} user={user} />

      {/* Sidebar */}
      <Sidebar isArabic={isArabic} user={user} />

      {/* Main Content */}
      <main
        className={`
          pt-20
          relative
          transition-all duration-300
          ${isArabic ? "md:mr-72" : "md:ml-72"}
        `}
      >
        {children}
      </main>
    </div>
  );
}

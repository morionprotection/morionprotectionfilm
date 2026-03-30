"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; 

export default function Warranties() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const fileInputRef = useRef(null);

  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal & Action State
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [uploadTargetId, setUploadTargetId] = useState(null);

  // --- TRANSLATIONS ---
  const texts = {
    title: isArabic ? "طلبات الضمان" : "Warranty Applications",
    subtitle: isArabic ? "لوحة بيانات النظام" : "System Data Table",
    records: isArabic ? "سجلات" : "Records",
    loading: isArabic ? "جاري تحميل البيانات..." : "Loading system data...",
    errorPrefix: isArabic ? "خطأ: " : "Error: ",
    headers: {
      status: isArabic ? "الحالة" : "Status",
      owner: isArabic ? "المالك" : "Owner",
      vehicle: isArabic ? "المركبة" : "Vehicle",
      dealer: isArabic ? "التاجر" : "Dealer",
      actions: isArabic ? "إجراءات" : "Actions",
    },
    status: {
      pending: isArabic ? "قيد الانتظار" : "PENDING",
      approved: isArabic ? "تم الاعتماد" : "APPROVED",
      rejected: isArabic ? "مرفوض" : "REJECTED",
    },
    actions: {
      view: isArabic ? "عرض" : "VIEW",
      upload: isArabic ? "رفع الفاتورة" : "UPLOAD PDF",
      reupload: isArabic ? "تغيير الفاتورة" : "RE-UPLOAD",
      uploading: isArabic ? "جاري الرفع..." : "UPLOADING...",
      approve: isArabic ? "اعتماد الطلب" : "APPROVE APPLICATION",
      reject: isArabic ? "رفض الطلب" : "REJECT APPLICATION",
      close: isArabic ? "إغلاق" : "CLOSE",
      viewInvoice: isArabic ? "عرض الفاتورة" : "VIEW INVOICE",
      noInvoice: isArabic ? "لا توجد فاتورة" : "NO INVOICE ATTACHED",
    },
    modal: {
      title: isArabic ? "تفاصيل الضمان" : "WARRANTY DOSSIER",
      contact: isArabic ? "معلومات الاتصال" : "CONTACT INFO",
      vehicle: isArabic ? "بيانات المركبة" : "VEHICLE DATA",
      install: isArabic ? "بيانات التركيب" : "INSTALLATION DATA",
      docs: isArabic ? "المستندات" : "DOCUMENTATION",
    },
    labels: {
        phone: isArabic ? "الهاتف" : "Owner Phone",
        email: isArabic ? "البريد" : "Owner Email",
        vin: isArabic ? "رقم الهيكل" : "VIN",
        shop: isArabic ? "المعرض" : "Dealer Shop",
        date: isArabic ? "التاريخ" : "Date",
    },
    badges: {
        invoice: isArabic ? "فاتورة" : "INVOICE"
    },
    unknownDealer: isArabic ? "تاجر غير معروف" : "Unknown Dealer",
  };

  // --- FETCH DATA ---
  const fetchWarranties = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/warranties", {
        method: "GET",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      
      // Ensure status exists
      setWarranties(
        (data.warranties || []).map(w => ({
            ...w,
            status: w.status || "pending"
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  // --- HANDLE STATUS UPDATE ---
  const handleUpdateStatus = async (id, newStatus) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/warranties`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            id, 
            status: newStatus,
            // Optional: Send date if you want to store approval time in DB
            approved_at: newStatus === 'approved' ? new Date().toISOString() : null 
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      
      // Update Local State Optimistically
      setWarranties(prev =>
        prev.map(w =>
            w.id === id
            ? {
                ...w,
                status: newStatus,
                approved_at: newStatus === "approved" ? new Date().toISOString() : null
                }
            : w
        )
      );
      
      // Close modal if the active item was updated
      if (selectedWarranty?.id === id) {
          setSelectedWarranty(null);
      }

    } catch (err) {
      alert("Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  // --- HANDLE INVOICE UPLOAD ---
  const triggerFileInput = (id) => {
    setUploadTargetId(id);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input
        fileInputRef.current.click();
    }
  };

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file || !uploadTargetId) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Max file size is 5MB");
    return;
  }

  if (!file.type.includes("pdf") && !file.type.includes("image")) {
    alert("Only PDF or image files allowed");
    return;
  }

  setProcessingId(uploadTargetId);

  try {
    const ext = file.name.split(".").pop();
    const filePath = `${uploadTargetId}/${Date.now()}.${ext}`;

    // 1️⃣ Upload file
    const { error: uploadError } = await supabase.storage
      .from("invoices")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // 2️⃣ Save ONLY filePath in DB
    const res = await fetch("/api/warranties", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: uploadTargetId,
        invoice_url: filePath,
      }),
    });

    if (!res.ok) throw new Error("Database update failed");

    // 3️⃣ Update UI state
    setWarranties(prev =>
      prev.map(w =>
        w.id === uploadTargetId
          ? { ...w, invoice_url: filePath }
          : w
      )
    );

  } catch (err) {
    console.error(err);
    alert("Upload failed: " + err.message);
  } finally {
    setProcessingId(null);
    setUploadTargetId(null);
  }
};



const openInvoice = async (invoicePath) => {
  try {
    const { data, error } = await supabase.storage
      .from("invoices")
      .createSignedUrl(invoicePath, 60 * 10); // 10 minutes

    if (error) throw error;

    window.open(data.signedUrl, "_blank");
  } catch (err) {
    alert("Failed to open invoice");
    console.error(err);
  }
};



  // --- HELPERS ---
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved": return "bg-emerald-900/30 text-emerald-400 border-emerald-900";
      case "rejected": return "bg-red-900/30 text-red-400 border-red-900";
      default: return "bg-amber-900/30 text-amber-400 border-amber-900";
    }
  };

  const getStatusText = (status) => {
    if (status === 'approved') return texts.status.approved;
    if (status === 'rejected') return texts.status.rejected;
    return texts.status.pending;
  }

  // --- RENDER ---
  if (loading) return <div className="p-12 text-zinc-500 font-mono text-xs tracking-widest uppercase animate-pulse">{texts.loading}</div>;
  if (error) return <div className="p-12 text-red-500 font-mono">{texts.errorPrefix} {error}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-zinc-200 p-8 md:p-12 relative"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* HIDDEN FILE INPUT */}
      <input 
        type="file" 
        accept="application/pdf,image/*" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />

      {/* HEADER */}
      <header className="mb-12 border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em] mb-2">{texts.subtitle}</h2>
          <h1 className="text-3xl font-light text-white tracking-tight">{texts.title}</h1>
        </div>
        <div className="font-mono text-xs text-zinc-500 border border-zinc-800 px-3 py-1 bg-zinc-900/50">
          <span className="text-white mr-2">{warranties.length}</span> {texts.records}
        </div>
      </header>

      {/* TABLE */}
      <div className="w-full overflow-x-auto border border-zinc-800 bg-black">
        <table className={`w-full text-sm ${isArabic ? "text-right" : "text-left"}`}>
          <thead className="bg-zinc-900/30 text-zinc-500 border-b border-zinc-800">
            <tr>
              {[texts.headers.status, texts.headers.owner, texts.headers.vehicle, texts.headers.dealer, texts.headers.actions].map((h, i) => (
                <th key={i} className="p-5 font-mono text-[10px] uppercase tracking-widest font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {warranties.map((w) => (
              <tr key={w.id} className="group hover:bg-white/[0.02] transition-colors">
                
                {/* Status + Invoice Badge */}
                <td className="p-5 align-top">
                    <div className="flex flex-col items-start gap-2">
                        <div className={`inline-block border px-2 py-1 text-[10px] font-mono uppercase tracking-wide ${getStatusStyle(w.status)}`}>
                            {getStatusText(w.status || 'pending')}
                        </div>
                        {w.invoice_url && (
                             <div className="inline-block border border-zinc-700 bg-zinc-900 text-zinc-400 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider">
                                {texts.badges.invoice}
                             </div>
                        )}
                    </div>
                </td>

                {/* Owner */}
                <td className="p-5 align-top">
                  <div className="text-white mb-1">{w.owner_first_name} {w.owner_last_name}</div>
                  <div className="text-zinc-600 font-mono text-[10px]">{w.owner_phone}</div>
                </td>

                {/* Vehicle */}
                <td className="p-5 align-top">
                  <div className="text-zinc-300"><span className="text-zinc-500">{w.car_year}</span> {w.car_make}</div>
                  <div className="text-zinc-500 text-xs">{w.car_model}</div>
                </td>

                {/* Dealer */}
                <td className="p-5 align-top">
                  <div className="text-zinc-300 text-xs">{w.profiles?.shop_name || texts.unknownDealer}</div>
                  <div className="text-zinc-600 font-mono text-[10px] uppercase">EMAIL: {w.profiles?.email}</div>
                  <div className="text-zinc-600 font-mono text-[10px] uppercase">PHONE: {w.profiles?.phone}</div>
                </td>

                {/* ACTIONS COLUMN */}
                <td className="p-5 align-top">
                    <div className="flex flex-col gap-2">
                        {/* 1. View Details Button */}
                        <button 
                            onClick={() => setSelectedWarranty(w)}
                            className="border border-zinc-700 bg-black hover:bg-white hover:text-black hover:border-white transition-all text-[10px] font-mono uppercase px-3 py-2 w-full text-center"
                        >
                            {texts.actions.view}
                        </button>

                        {/* 2. Upload Invoice Button */}
                        <button 
                            onClick={() => triggerFileInput(w.id)}
                            disabled={processingId === w.id}
                            className={`border transition-all text-[10px] font-mono uppercase px-3 py-2 w-full text-center flex items-center justify-center gap-2
                                ${processingId === w.id 
                                    ? "border-zinc-800 text-zinc-600 cursor-not-allowed" 
                                    : "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                                }
                            `}
                        >
                            {!processingId && (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            )}
                            
                            {processingId === w.id 
                                ? texts.actions.uploading 
                                : (w.invoice_url ? texts.actions.reupload : texts.actions.upload)
                            }
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedWarranty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedWarranty(null)} 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            {/* Modal */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }} 
                className="relative bg-black border border-zinc-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto" 
                dir={isArabic ? "rtl" : "ltr"}
            >
                
                {/* Header */}
                <div className="border-b border-zinc-800 p-6 flex justify-between items-center bg-zinc-900/20">
                    <div>
                        <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{texts.modal.title}</h3>
                        <h2 className="text-white text-xl mt-1">{selectedWarranty.car_year} {selectedWarranty.car_make} {selectedWarranty.car_model}</h2>
                    </div>
                    <button onClick={() => setSelectedWarranty(null)} className="text-zinc-500 hover:text-white transition-colors">✕</button>
                </div>

                {/* Body */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">{texts.modal.contact}</h4>
                        <div className="space-y-3">
                            <DetailRow label={texts.labels.phone} value={selectedWarranty.owner_phone} />
                            <DetailRow label={texts.labels.email} value={selectedWarranty.owner_email} />
                            <DetailRow label={texts.labels.shop} value={selectedWarranty.profiles?.shop_name} />
                        </div>
                    </div>
                    
                    {/* Vehicle Info */}
                    <div>
                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">{texts.modal.vehicle}</h4>
                        <div className="space-y-3">
                            <DetailRow label={texts.labels.vin} value={selectedWarranty.vin_number} mono />
                            <DetailRow label={texts.labels.date} value={new Date(selectedWarranty.created_at).toLocaleDateString()} mono />
                        </div>
                    </div>

                    {/* Invoice/Docs */}
                    <div className="md:col-span-2">
                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">{texts.modal.docs}</h4>
                       {selectedWarranty.invoice_url ? (
  <button
    onClick={() => openInvoice(selectedWarranty.invoice_url)}
    className="inline-flex items-center gap-2 border border-zinc-600 bg-zinc-900/50 hover:bg-white hover:text-black hover:border-white text-zinc-300 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all"
  >
    VIEW INVOICE
  </button>
) : (
  <div className="text-zinc-600 text-xs font-mono uppercase italic border border-dashed border-zinc-800 p-3 inline-block">
    NO INVOICE ATTACHED
  </div>
)}

                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 border-t border-zinc-800 flex flex-col md:flex-row gap-4 justify-end bg-zinc-900/20">
                    <button 
                        onClick={() => setSelectedWarranty(null)} 
                        className="px-6 py-3 text-xs font-mono uppercase text-zinc-400 hover:text-white transition-colors"
                    >
                        {texts.actions.close}
                    </button>
                    
                    {processingId === selectedWarranty.id ? (
                        <div className="px-6 py-3 text-xs font-mono uppercase text-zinc-500">{texts.actions.processing}</div>
                    ) : (
                        <>
                            {selectedWarranty.status !== 'rejected' && (
                                <button 
                                    onClick={() => handleUpdateStatus(selectedWarranty.id, 'rejected')} 
                                    className="px-6 py-3 border border-red-900/50 text-red-500 hover:bg-red-900/20 text-xs font-mono uppercase tracking-wide transition-all"
                                >
                                    {texts.actions.reject}
                                </button>
                            )}
                            
                            {selectedWarranty.status !== 'approved' && (
                                <button
                                    onClick={() => handleUpdateStatus(selectedWarranty.id, "approved")}
                                    className="px-6 py-3 bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-wide transition-all"
                                >
                                    {texts.actions.approve}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailRow({ label, value, mono = false }) {
    if (!value) return null;
    return (
        <div className="flex flex-col">
            <span className="text-zinc-600 text-[10px] uppercase">{label}</span>
            <span className={`text-zinc-300 text-sm ${mono ? 'font-mono' : ''}`}>{value}</span>
        </div>
    );
}
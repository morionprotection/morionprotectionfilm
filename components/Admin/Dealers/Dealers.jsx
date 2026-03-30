"use client";

import { useCallback, useEffect, useState } from "react";

export default function DealersDashboard() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const [actionLoading, setActionLoading] = useState(null);

  /* =========================
     FETCH DEALERS
  ========================= */
  const fetchDealers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dealers", { cache: "no-store" });
      const data = await res.json();

      if (data.dealers) {
        setDealers(data.dealers);
        calculateStats(data.dealers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  /* =========================
     STATS
  ========================= */
  const calculateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter((d) => d.status === "pending").length,
      approved: data.filter((d) => d.status === "approved").length,
    });
  };

  /* =========================
     UPDATE STATUS
  ========================= */
  const handleStatusUpdate = async (id, newStatus) => {
    setActionLoading(id);

    try {
      const endpoint =
        newStatus === "approved"
          ? "/api/dealers/update"
          : "/api/dealers/reject";

      const body =
        newStatus === "approved"
          ? { id, status: "approved" }
          : { id };

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Action failed");
      }
      await fetchDealers();
    } catch (err) {
      alert(err.message || "Failed to update dealer");
      await fetchDealers();
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================
     FILTER
  ========================= */
  const filteredDealers = dealers.filter(
    (d) =>
      d.shop_name.toLowerCase().includes(search.toLowerCase()) ||
      d.contact_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-xs font-mono tracking-widest text-neutral-500 uppercase">
        <span className="animate-pulse">Initializing System Data...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 p-6 md:p-12 font-sans selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto space-y-px bg-neutral-800 border border-neutral-800">
        
        {/* HEADER SECTION */}
        <div className="bg-black p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500"></div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">System Overview</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Dealer Network
            </h1>
            <p className="text-neutral-500 mt-2 max-w-md text-sm">
              Administration panel for authorized centers and pending applications.
            </p>
          </div>
          
          <button
            onClick={fetchDealers}
            className="group flex items-center gap-2 px-5 py-3 border border-neutral-800 bg-neutral-900 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <span className="text-xs font-mono uppercase font-bold tracking-wider">Sync Data</span>
            <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* METRICS & SEARCH STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-neutral-800">
            {/* Stat 1 */}
            <div className="bg-black p-6 flex flex-col justify-between h-32 hover:bg-neutral-950 transition-colors">
                <span className="text-xs font-mono text-neutral-500 uppercase">Total Nodes</span>
                <span className="text-4xl font-light text-white">{stats.total}</span>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-black p-6 flex flex-col justify-between h-32 hover:bg-neutral-950 transition-colors relative overflow-hidden">
                {stats.pending > 0 && <div className="absolute top-0 right-0 w-2 h-2 bg-amber-500"></div>}
                <span className="text-xs font-mono text-amber-500/80 uppercase">Pending Action</span>
                <span className="text-4xl font-light text-amber-500">{stats.pending}</span>
            </div>

            {/* Stat 3 */}
            <div className="bg-black p-6 flex flex-col justify-between h-32 hover:bg-neutral-950 transition-colors">
                <span className="text-xs font-mono text-neutral-500 uppercase">Active Network</span>
                <span className="text-4xl font-light text-white">{stats.approved}</span>
            </div>

            {/* Search Input Area */}
            <div className="bg-black p-6 flex flex-col justify-end h-32">
                <label className="text-xs font-mono text-neutral-500 uppercase mb-3">Filter Registry</label>
                <input
                    type="text"
                    placeholder="Search by name or facility..."
                    className="w-full bg-transparent border-b border-neutral-700 pb-2 text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-black overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-normal w-1/4">Facility Information</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-normal w-1/4">Point of Contact</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-normal">Documentation</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-normal">Current State</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-normal text-right">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filteredDealers.map((d) => (
                <tr key={d.id} className="group hover:bg-neutral-900/50 transition-colors">
                  
                  {/* Shop Details */}
                  <td className="p-6 align-top">
                    <div className="font-medium text-white mb-1 group-hover:underline decoration-neutral-700 underline-offset-4">{d.shop_name}</div>
                    <div className="text-xs text-neutral-500 font-mono">{d.shop_address}</div>
                  </td>

                  {/* Contact Details */}
                  <td className="p-6 align-top">
                    <div className="text-sm text-neutral-300 mb-1">{d.contact_name}</div>
                    <div className="text-xs text-neutral-600 font-mono">{d.email}</div>
                  </td>

                  {/* Docs */}
                  <td className="p-6 align-top">
                    {d.cr_license_url ? (
                      <a 
                        href={d.cr_license_url} 
                        target="_blank" 
                        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-800 px-3 py-1 bg-neutral-950 hover:border-neutral-600 transition-colors"
                      >
                        <span>PDF_VIEW</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    ) : (
                      <span className="text-neutral-800 text-xs font-mono uppercase">N/A</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-6 align-top">
                    <StatusBadge status={d.status} />
                  </td>

                  {/* Actions (UPDATED SECTION) */}
                  <td className="p-6 align-top text-right">
                    <div className="flex justify-end gap-px bg-neutral-800 border border-neutral-800 w-fit ml-auto">
                        
                        {/* If Rejected, hide Reject button */}
                        {d.status !== "rejected" && (
                            <button
                                disabled={actionLoading === d.id}
                                onClick={() => handleStatusUpdate(d.id, "rejected")}
                                className="bg-black px-4 py-2 text-xs text-neutral-400 hover:text-red-500 hover:bg-neutral-950 disabled:opacity-30 transition-colors font-medium"
                            >
                                Reject
                            </button>
                        )}
                        
                        {/* If Approved, hide Approve button */}
                        {d.status !== "approved" && (
                            <button
                                disabled={actionLoading === d.id}
                                onClick={() => handleStatusUpdate(d.id, "approved")}
                                className="bg-black px-4 py-2 text-xs text-white hover:text-emerald-400 hover:bg-neutral-950 disabled:opacity-30 transition-colors font-medium"
                            >
                                {actionLoading === d.id ? "..." : "Approve"}
                            </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDealers.length === 0 && (
                <tr>
                    <td colSpan={5} className="p-12 text-center text-neutral-600 font-mono text-sm uppercase tracking-widest">
                        No Records Found in Registry
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* FOOTER STRIP */}
        <div className="bg-neutral-900 p-2 flex justify-between items-center px-6 border-t border-neutral-800">
            <span className="text-[10px] font-mono text-neutral-600">SECURE CONNECTION</span>
            <span className="text-[10px] font-mono text-neutral-600">V.1.0.4</span>
        </div>

      </div>
    </div>
  );
}

/* =========================
   SUB COMPONENTS
========================= */

const StatusBadge = ({ status }) => {
  const styles = {
    approved: {
      dot: "bg-emerald-500",
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
      label: "Active"
    },
    pending: {
      dot: "bg-amber-500",
      text: "text-amber-500",
      bg: "bg-amber-500/10",
      label: "Review"
    },
    rejected: {
      dot: "bg-red-600",
      text: "text-red-600",
      bg: "bg-red-500/10",
      label: "Denied"
    },
  };

  const current = styles[status] || styles.pending;

  return (
    <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 ${current.dot}`}></span>
        <span className={`text-xs font-mono uppercase tracking-wider ${current.text}`}>
            {current.label}
        </span>
    </div>
  );
};
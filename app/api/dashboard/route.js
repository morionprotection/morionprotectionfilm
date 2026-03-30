import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseService";
import { authCheck } from "@/lib/authCheck";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // 🔒 Admin auth check
    await authCheck(req);

    /* =========================
       DEALERS STATS
    ========================= */
    const { data: dealers, error: dealerError } = await supabaseService
      .from("dealer_applications")
      .select("id, status");

    if (dealerError) throw dealerError;

    const totalDealers = dealers.length;
    const pendingDealers = dealers.filter(d => d.status === "pending").length;
    const approvedDealers = dealers.filter(d => d.status === "approved").length;

    /* =========================
       WARRANTIES STATS
    ========================= */
    const { data: warranties, error: warrantyError } = await supabaseService
      .from("warranties")
      .select("id");

    if (warrantyError) throw warrantyError;

    const totalWarranties = warranties.length;

    /* =========================
       ADMINS (AUTH USERS)
    ========================= */
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: usersData, error: usersError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (usersError) throw usersError;

    const totalAdmins = usersData.users.length;

    /* =========================
       RECENT ENTRIES
    ========================= */
    const { data: recentDealers } = await supabaseService
      .from("dealer_applications")
      .select("id, shop_name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    const { data: recentWarranties } = await supabaseService
      .from("warranties")
      .select("id, owner_first_name, car_make, car_model, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json({
      success: true,
      stats: {
        dealers: {
          total: totalDealers,
          pending: pendingDealers,
          approved: approvedDealers,
        },
        warranties: {
          total: totalWarranties,
        },
        admins: {
          total: totalAdmins,
        },
      },
      recent: {
        dealers: recentDealers ?? [],
        warranties: recentWarranties ?? [],
      },
    });

  } catch (err) {
    console.error("Dashboard fetch error:", err);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}

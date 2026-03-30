import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseService";

export async function GET() {
  try {
    const { data, error } = await supabaseService
      .from("dealer_applications")
      .select("id, shop_name")
      .eq("status", "approved")
      .order("shop_name", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ dealers: data || [] });
  } catch (err) {
    console.error("Approved dealers error:", err);
    return NextResponse.json(
      { error: "Failed to load approved dealers." },
      { status: 500 }
    );
  }
}

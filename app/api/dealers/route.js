import { NextResponse } from "next/server";
import { authCheck } from "@/lib/authCheck";
import { supabaseService } from "@/lib/supabaseService";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
 

    // 🔒 SERVICE ROLE QUERY (secure)
    const { data, error } = await supabaseService
      .from("dealer_applications")
      .select(`
        id,
        shop_name,
        shop_address,
        shop_website,
        shop_instagram,
        contact_name,
        phone,
        email,
        status,
        cr_license_url,
        portfolio_images,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      dealers: data ?? [],
    });
  } catch (err) {
    // Auth error
    if (err instanceof NextResponse) return err;

    console.error("Fetch dealers error:", err);

    return NextResponse.json(
      { error: "Failed to fetch dealers" },
      { status: 500 }
    );
  }
}

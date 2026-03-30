import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseService";
import { sendStatusEmail } from "@/lib/sendStatusEmail";
import { authCheck } from "@/lib/authCheck";

export async function PUT(req) {
  try {

    await authCheck(req);

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing dealer id" },
        { status: 400 }
      );
    }

    /* =========================
       GET DEALER (SAVE OLD STATUS)
    ========================= */
    const { data: dealer, error } = await supabaseService
      .from("dealer_applications")
      .select("id, shop_name, email, contact_name, status")
      .eq("id", id)
      .single();

    if (error || !dealer) {
      return NextResponse.json(
        { error: "Dealer not found" },
        { status: 404 }
      );
    }

    if (dealer.status === "rejected") {
  return NextResponse.json(
    { error: "Dealer already rejected" },
    { status: 409 }
  );
}


    const previousStatus = dealer.status;

    /* =========================
       UPDATE STATUS FIRST
    ========================= */
    const { error: updateError } = await supabaseService
      .from("dealer_applications")
      .update({ status: "rejected" })
      .eq("id", id);

    if (updateError) throw updateError;

    /* =========================
       SEND EMAIL AFTER UPDATE
    ========================= */
    try {
      await sendStatusEmail({
        to: dealer.email,
        name: dealer.contact_name,
        shop: dealer.shop_name,
        status: "rejected",
      });
    } catch (emailError) {
      console.error("Reject email failed, rolling back:", emailError);

      // 🔁 ROLLBACK STATUS
      await supabaseService
        .from("dealer_applications")
        .update({ status: previousStatus })
        .eq("id", id);

      return NextResponse.json(
        { error: "Email failed. Status reverted." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Reject dealer error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to reject dealer" },
      { status: 500 }
    );
  }
}

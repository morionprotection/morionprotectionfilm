import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseService";
import { sendStatusEmail } from "@/lib/sendStatusEmail";
import { authCheck } from "@/lib/authCheck";

export async function PUT(req) {
  try {

    await authCheck(req);

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    if (status !== "approved") {
      return NextResponse.json(
        { error: "Invalid status. Use /api/dealers/reject for rejection." },
        { status: 400 }
      );
    }

    /* =========================
       GET DEALER (SAVE OLD STATUS)
    ========================= */
    const { data: dealer, error: dealerError } = await supabaseService
      .from("dealer_applications")
      .select("id, shop_name, email, contact_name, status")
      .eq("id", id)
      .single();

   


    if (dealerError || !dealer) {
      return NextResponse.json(
        { error: "Dealer not found" },
        { status: 404 }
      );
    }

       if (dealer.status === "approved") {
  return NextResponse.json(
    { error: "Dealer already approved" },
    { status: 409 }
  );
}

    const previousStatus = dealer.status;

    /* =========================
       UPDATE STATUS FIRST
    ========================= */
    const { error: updateError } = await supabaseService
      .from("dealer_applications")
      .update({ status })
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
        status: "approved",
      });
    } catch (emailError) {
      console.error("Approval email failed, rolling back:", emailError);

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
    console.error("Approve dealer error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to approve dealer" },
      { status: 500 }
    );
  }
}

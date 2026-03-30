import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseService";
import { authCheck } from "@/lib/authCheck";
import { sendWarrantyStatusEmail } from "@/lib/sendWarrantyEmail";

export const dynamic = "force-dynamic";

/* =========================
   GET — ADMIN: ALL WARRANTIES
========================= */
export async function GET(req) {
  try {
    await authCheck(req);

    const { data, error } = await supabaseService
      .from("warranties")
      .select(`
        id,
        owner_first_name,
        owner_last_name,
        owner_email,
        owner_phone,
        car_make,
        car_model,
        car_year,
        vin_number,
        install_date,
        film_type,
        coverage_type,
        warranty_years,
        dealer_id,
        invoice_url,
        roll_serial_number,
        maintenance_briefed,
        ppf_limitations_ack,
        status,
        created_at,
        approved_at,

        profiles:dealer_id (
          id,
          shop_name,
          email,
          phone
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      warranties: data ?? [],
    });
  } catch (err) {
    console.error("GET warranties error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch warranties" },
      { status: 500 }
    );
  }
}

/* =========================
   POST — USER: SUBMIT WARRANTY
========================= */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.owner_first_name || !body.owner_email || !body.dealer_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      owner_first_name: body.owner_first_name.trim(),
      owner_last_name: body.owner_last_name?.trim() || "",
      owner_email: body.owner_email.trim(),
      owner_phone: body.owner_phone?.trim() || "",

      car_make: body.car_make.trim(),
      car_model: body.car_model.trim(),
      car_year: body.car_year ? Number(body.car_year) : null,
      vin_number: body.vin_number?.trim() || null,

      install_date: body.install_date,
      film_type: body.film_type,
      coverage_type: body.coverage_type,
      warranty_years: Number(body.warranty_years) || 10,

      dealer_id: body.dealer_id,
      roll_serial_number: body.roll_serial_number?.trim() || null,

      maintenance_briefed: body.maintenance_briefed === true,
      ppf_limitations_ack: body.ppf_limitations_ack === true,

      status: "pending"
    };

    const { data, error } = await supabaseService
      .from("warranties")
      .insert(payload)
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      warranty_id: data.id,
    });
  } catch (err) {
    console.error("POST warranty error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit warranty" },
      { status: 500 }
    );
  }
}

/* =========================
   PATCH — ADMIN: STATUS OR INVOICE
========================= */
/* =========================
   PATCH — ADMIN: STATUS OR INVOICE
========================= */
export async function PATCH(req) {
  try {
    await authCheck(req);

    const { id, status, invoice_url } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Warranty ID is required" },
        { status: 400 }
      );
    }

    const update = {};

    /* ---- STATUS UPDATE ---- */
    if (status) {
      if (!["pending", "approved", "rejected"].includes(status)) {
        return NextResponse.json(
          { error: "Invalid status value" },
          { status: 400 }
        );
      }

      update.status = status;
      update.approved_at =
        status === "approved" ? new Date().toISOString() : null;
    }

    /* ---- INVOICE UPDATE ---- */
    if (invoice_url) {
      update.invoice_url = invoice_url;
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: "Nothing to update" },
        { status: 400 }
      );
    }

    /* ---- UPDATE DB ---- */
    const { error } = await supabaseService
      .from("warranties")
      .update(update)
      .eq("id", id);

    if (error) throw error;

    /* ---- FETCH UPDATED DATA ---- */
    const { data: warranty } = await supabaseService
      .from("warranties")
      .select(`
        owner_email,
        owner_first_name,
        status,
        invoice_url,
        profiles:dealer_id ( shop_name )
      `)
      .eq("id", id)
      .single();

    /* ---- CREATE SIGNED INVOICE URL IF EXISTS ---- */
    let signedInvoiceUrl = null;

    if (warranty.invoice_url) {
      const { data } = await supabaseService.storage
        .from("invoices")
        .createSignedUrl(warranty.invoice_url, 60 * 60 * 24); // 24 hours

      signedInvoiceUrl = data?.signedUrl || null;
    }

    /* ---- SEND EMAIL (ONLY WHEN MEANINGFUL) ---- */
    if (status || invoice_url) {
      await sendWarrantyStatusEmail({
        to: warranty.owner_email,
        name: warranty.owner_first_name,
        shop: warranty.profiles?.shop_name || "Dealer",
        status: warranty.status,
        invoiceUrl: signedInvoiceUrl,
      });
    }

    return NextResponse.json({
      success: true,
      invoice_url: signedInvoiceUrl,
    });

  } catch (err) {
    console.error("PATCH warranty error:", err);
    return NextResponse.json(
      { error: err.message || "Update failed" },
      { status: 500 }
    );
  }
}


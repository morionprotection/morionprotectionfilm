import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseService";

export async function POST(req) {
  try {
    /* ===============================
       1️⃣ READ FORM DATA
    =============================== */
    const formData = await req.formData();

    const shop_name = formData.get("shop_name");
    const shop_address = formData.get("shop_address");

    const contact_name = formData.get("contact_name");
    const phone = formData.get("phone");
    const email = formData.get("email");

    const shop_website = formData.get("shop_website");
    const shop_instagram = formData.get("shop_instagram");

    const crFile = formData.get("cr_license_url"); // File
    const portfolioFiles = formData.getAll("portfolio_images"); // File[]

    /* ===============================
       2️⃣ VALIDATION
    =============================== */
    if (
      !shop_name ||
      !shop_address ||
      !contact_name ||
      !phone ||
      !email ||
      !crFile
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ===============================
       3️⃣ UPLOAD CR LICENSE
    =============================== */
    const crExt = crFile.name.split(".").pop();
    const crPath = `dealer-applications/cr/${Date.now()}-${crypto.randomUUID()}.${crExt}`;

    const { error: crUploadError } = await supabaseService.storage
      .from("dealer-documents")
      .upload(crPath, crFile, {
        contentType: crFile.type,
        upsert: false,
      });

    if (crUploadError) throw crUploadError;

    const { data: crPublic } = supabaseService.storage
      .from("dealer-documents")
      .getPublicUrl(crPath);

    /* ===============================
       4️⃣ UPLOAD PORTFOLIO IMAGES
    =============================== */
    const portfolio_urls = [];

    for (const file of portfolioFiles) {
      if (!file || !file.name) continue;

      const ext = file.name.split(".").pop();
      const path = `dealer-applications/portfolio/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { error } = await supabaseService.storage
        .from("dealer-documents")
        .upload(path, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) throw error;

      const { data: publicUrl } = supabaseService.storage
        .from("dealer-documents")
        .getPublicUrl(path);

      portfolio_urls.push(publicUrl.publicUrl);
    }

    /* ===============================
       5️⃣ INSERT INTO DATABASE
    =============================== */
    const payload = {
      shop_name: shop_name.trim(),
      shop_address: shop_address.trim(),

      contact_name: contact_name.trim(),
      phone: phone.trim(),
      email: email.trim(),

      shop_website: shop_website?.trim() || null,
      shop_instagram: shop_instagram?.trim() || null,

      cr_license_url: crPublic.publicUrl,
      portfolio_images: portfolio_urls,

      status: "pending",
    };

    const { data, error } = await supabaseService
      .from("dealer_applications")
      .insert(payload)
      .select("id")
      .single();

    if (error) throw error;

    /* ===============================
       6️⃣ SUCCESS RESPONSE
    =============================== */
    return NextResponse.json({
      success: true,
      dealer_application_id: data.id,
    });

  } catch (err) {
    console.error("Dealer apply error:", err);
    return NextResponse.json(
      { error: "Failed to submit dealer application" },
      { status: 500 }
    );
  }
}

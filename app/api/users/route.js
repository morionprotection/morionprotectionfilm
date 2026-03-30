import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authCheck } from "@/lib/authCheck";

export async function POST(req) {
  try {
    // 🔒 Only logged-in admin
    await authCheck(req);

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // 🔑 Service role client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user_id: data.user.id,
    });

  } catch (err) {
    console.error("Create user error:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function PUT(request) {
  try {
    const { new_password } = await request.json();

    if (!new_password) {
      return NextResponse.json(
        { error: "New password required" },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
          set(name, value, options) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name, options) {
            response.cookies.set({ name, value: "", ...options });
          },
        },
      }
    );

    // 🔐 Get session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔁 Update own password
    const { error } = await supabase.auth.updateUser({
      password: new_password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return response;

  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}

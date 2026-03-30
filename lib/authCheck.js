import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Simple auth check for ONE admin (no roles)
 * Use inside any API route
 */
export async function authCheck(req) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
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

  // ✅ MUST use getSession (NOT getUser)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return {
    user: session.user,
    response,
  };
}

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  /* =========================
     1️⃣ GLOBAL SITE LOCK
  ========================== */

  const siteLocked = process.env.SITE_LOCKED === "true";

  if (siteLocked) {
    // Allow blocked page
    if (pathname.startsWith("/access-blocked")) {
      return NextResponse.next();
    }

    // Allow Next.js internals & static files
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon") ||
      pathname.startsWith("/images")
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/access-blocked", req.url));
  }

  /* =========================
     2️⃣ SUPABASE AUTH LOGIC
  ========================== */

  let response = NextResponse.next();

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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  // Allow login pages
  if (
    pathname.startsWith("/en/login") ||
    pathname.startsWith("/ar/login")
  ) {
    return response;
  }

  // Protect dashboard
  if (
    pathname.startsWith("/en/dashboard") ||
    pathname.startsWith("/ar/dashboard")
  ) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/en/login", req.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: "/:path*", // 🔥 IMPORTANT: Apply to whole site
};
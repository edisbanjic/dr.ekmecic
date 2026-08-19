import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Without Supabase configured, let the request through — pages show setup help.
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isLogin = path === "/admin/login";
  const isSetPassword = path === "/admin/set-password";
  if (!user && !isLogin) {
    const to = request.nextUrl.clone();
    to.pathname = "/admin/login";
    return NextResponse.redirect(to);
  }
  if (user) {
    // onboarding: until a password is set, everything leads to that screen
    const mustSetPassword = user.user_metadata?.must_set_password === true;
    if (mustSetPassword && !isSetPassword) {
      const to = request.nextUrl.clone();
      to.pathname = "/admin/set-password";
      return NextResponse.redirect(to);
    }
    if (!mustSetPassword && (isLogin || isSetPassword)) {
      const to = request.nextUrl.clone();
      to.pathname = "/admin";
      return NextResponse.redirect(to);
    }
  }
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};

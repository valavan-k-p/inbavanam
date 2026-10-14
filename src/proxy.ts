import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

/**
 * Refreshes the Supabase session cookie on admin routes and sends signed-out
 * visitors to the login page. Redirects legacy /admin paths to /inbavanamadmin.
 * This is an optimistic check: every admin page and server action verifies
 * the user and role again on the server.
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Requirement 4: Redirect legacy /admin routes to their corresponding /inbavanamadmin routes
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const target = request.nextUrl.clone();
    target.pathname = pathname === "/admin" ? "/inbavanamadmin" : pathname.replace(/^\/admin/, "/inbavanamadmin");
    return NextResponse.redirect(target, 307);
  }

  const config = getSupabaseConfig();
  if (!config || pathname.startsWith("/inbavanamadmin/login")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    const login = request.nextUrl.clone();
    login.pathname = "/inbavanamadmin/login";
    login.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(login);
  }
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/inbavanamadmin/:path*", "/inbavanamadmin"],
};

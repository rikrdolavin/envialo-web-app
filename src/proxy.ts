import { NextRequest, NextResponse } from "next/server";

const excludedPaths = ["/public", "/api/public"];

const locales = new Set(["en", "es"]);
const defaultLocale = "es";

function getCurrentLanguageAndPathnameSegments(pathname: string) {
  const segments = pathname.split("/");
  const currentLocale = locales.has(segments[1]) ? segments[1] : defaultLocale;

  return { currentLocale, segments };
}

function extractLocaleFromReferer(referer: string | null): string {
  if (!referer) return defaultLocale;

  try {
    const url = new URL(referer);
    const segments = url.pathname.split("/");
    const locale = segments[1];
    return locales.has(locale) ? locale : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

function handleLocaleRedirect(request: NextRequest, pathname: string) {
  const { currentLocale, segments } =
    getCurrentLanguageAndPathnameSegments(pathname);

  if (!locales.has(segments[1])) {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}${pathname === "/" ? "/home" : pathname}`;
    return NextResponse.redirect(url);
  }

  return {
    currentLocale,
    pathWithoutLocale: "/" + segments.slice(2).join("/"),
  };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  const accessToken = request.cookies.get("access_token");
  const session = request.cookies.get("session");
  const isAuthRoute = /\/[a-z]{2}\/auth\/(login|signup)(\/|$)/i.test(pathname);

  const { currentLocale } = getCurrentLanguageAndPathnameSegments(pathname);

  if (isAuthRoute && accessToken?.value && session?.value) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/home`, request.url)
    );
  }

  if (isApiRoute) {
    const referer = request.headers.get("referer");
    const currentLocale = extractLocaleFromReferer(referer);

    const response = NextResponse.next();
    response.headers.set("Accept-Language", currentLocale);
    return response;
  }

  // 🌐 Manejo de locales
  const localeResult = handleLocaleRedirect(request, pathname);
  if (localeResult instanceof NextResponse) return localeResult;

  const { pathWithoutLocale } = localeResult;

  if (excludedPaths.some((path) => pathWithoutLocale.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect root path to /home
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/home`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/en/:path*",
    "/es/:path*",
    "/api/:path*",
    "/((?!_next|assets|favicon\\.ico).*)", // rutas sin idioma → se redirigen
  ],
};

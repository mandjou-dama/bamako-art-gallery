import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Activer/Désactiver le mode maintenance
const isUnderMaintenance = true;

export default function middleware(request: NextRequest) {
  // Vérifier si le site est en maintenance
  if (
    isUnderMaintenance &&
    !request.nextUrl.pathname.startsWith("/maintenance")
  ) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Continuer avec la gestion des langues si pas en maintenance
  return createMiddleware(routing)(request);
}

// Config matcher pour ne pas affecter /maintenance
export const config = {
  matcher: ["/", "/(fr|en)/:path*"],
};

// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(fr|en)/:path*"],
// };

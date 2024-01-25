import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      // console.log(req.nextUrl.origin);
      return redirectToSignIn({
        returnBackUrl: req.nextUrl.origin + "/service",
      });
    }
    // redirect them to organization selection page
    if (auth.userId && req.nextUrl.pathname === "/sign-in") {
      console.log(auth);
      return NextResponse.redirect(
        req.nextUrl.searchParams.get("redirect_url") ||
          req.nextUrl.origin + "/service"
      );
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

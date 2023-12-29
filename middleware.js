import { useAuth } from "@clerk/nextjs"; 
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import { UserDetails } from "./services/userDetails";
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes:["/"],
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to organization selection page
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
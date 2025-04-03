import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    console.error("Middleware called for:", req.nextUrl.pathname); // Debugging      

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Check if profile is complete     
    const isProfileComplete = token.isProfileComplete ?? false;
    console.log("Is Profile Complete:", isProfileComplete); // Debugging

    // If profile is incomplete, redirect to complete-profile     
    if (!isProfileComplete) {
        console.log("Redirecting to complete-profile..."); // Debugging
        const completeProfileUrl = new URL("/complete-profile", req.url);
        completeProfileUrl.searchParams.set("redirect", req.nextUrl.pathname);
        return NextResponse.redirect(completeProfileUrl);
    }

    // Proceed if everything is good     
    return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/profile/:path*"], };

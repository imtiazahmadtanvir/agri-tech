import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.error("Middleware called for:", pathname);

    if (["/login", "/register", "/complete-profile"].includes(pathname)) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Check if profile is complete

    // if (!isProfileComplete) {
    //     console.log("Redirecting to complete-profile...");
    //     const completeProfileUrl = new URL("/complete-profile", req.url);
    //     completeProfileUrl.searchParams.set("redirect", req.nextUrl.pathname);
    //     return NextResponse.redirect(completeProfileUrl);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};
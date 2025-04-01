import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    console.error("Middleware called for:", req.nextUrl.pathname); // Debugging

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(token);
    if (token) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}

// Apply middleware only on dashboard & profile pages
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};

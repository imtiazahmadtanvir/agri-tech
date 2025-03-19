import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("next-auth.session-token", "", {
        path: "/",
        expires: new Date(0),
        httpOnly: true,
    });
    return response;
}
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const token = await getToken({ req });

    if (token) {
        return NextResponse.next();
    }


    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
};

export const config = {
    matcher: ["/test", "/text/:path*", "/checkout/:path*"],
};

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Payment Failed!");

    // Redirect user to error page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-fail`);
}

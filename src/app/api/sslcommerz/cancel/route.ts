import { NextResponse } from "next/server";

export async function POST() {
    console.log("Payment Cancelled!");

    // Redirect user to error page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`);
}

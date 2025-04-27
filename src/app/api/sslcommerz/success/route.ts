import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.formData();

    console.log("Payment Success:", body);

    // You can update your database/order status here

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`);
}

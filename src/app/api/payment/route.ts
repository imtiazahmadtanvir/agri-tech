import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    const body = await req.json();

    const data = {
        store_id: process.env.SSLCOMMERZ_STORE_ID!,
        store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD!,
        total_amount: body.amount,
        currency: "BDT",
        tran_id: Math.random().toString(36).substring(7), // random ID
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/success`,
        fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/fail`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/cancel`,
        ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/ipn`,
        shipping_method: "NO",
        product_name: body.productName,
        product_category: "Ecommerce",
        product_profile: "general",
        cus_name: body.customerName,
        cus_email: body.customerEmail,
        cus_add1: body.customerAddress,
        cus_phone: body.customerPhone,
        cus_city: body.customerCity,
        cus_country: "Bangladesh",
    };

    try {
        const response = await axios.post(
            "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
            data
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
    }
}

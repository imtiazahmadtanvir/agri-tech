import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    const body = await req.json();
    const store_id = process.env.SSLCOMMERZ_STORE_ID;
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD
    console.log(body);
    console.log(store_id, "pass" + store_passwd);
    if (!store_id || !store_passwd) {
        return NextResponse.json({ error: "Missing Store ID or Password" }, { status: 500 });
    }

    const data = {
        store_id: "agro680fc75f907d1",
        store_passwd: "agro680fc75f907d1@ss",
        total_amount: body.amount,
        currency: 'BDT',
        tran_id: Math.random().toString(36).substring(7),
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/success`,
        fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/fail`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/cancel`,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: body.fullName,
        cus_email: body.userEmail,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: body.phoneNumber,
        cus_fax: body.phoneNumber,
        ship_name: body.fullName,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    console.log(data);
    try {
        const response = await axios.post(
            "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
            data
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
    }
}
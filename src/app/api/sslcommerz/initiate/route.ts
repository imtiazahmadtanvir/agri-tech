import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const store_id = process.env.SSLCOMMERZ_STORE_ID;
        const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;

        if (!store_id || !store_passwd) {
            return NextResponse.json({ error: "Missing store credentials" }, { status: 500 });
        }

        const data = {
            is_live: false,
            store_id,
            store_passwd,
            total_amount: 10,
            currency: "BDT",
            tran_id: `tran_${Date.now()}`,
            success_url: "http://localhost:3000/api/sslcommerz/success",
            fail_url: "http://localhost:3000/api/sslcommerz/fail",
            cancel_url: "http://localhost:3000/api/sslcommerz/cancel",
            cus_name: "Test User",
            cus_email: "test@example.com",
            cus_phone: "01700000000",
            product_name: "Test Product",
        };

        console.log("Sending payload:", data);

        const response = await axios.post(
            "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
            data,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Response from SSLCommerz:", response.data);

        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
    }
}

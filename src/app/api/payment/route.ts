import { NextResponse } from 'next/server';
import SSLCommerzPayment from 'sslcommerz-lts';

const store_id = 'agrit680d3c96f26bd';
const store_passwd = 'agrit680d3c96f26bd@ssl';
const is_live = false; // true for live, false for sandbox

export async function POST(request) {
    try {
        const body = await request.json();
        const { amount, customer } = body;

        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: `tran_${Date.now()}`,
            success_url: 'http://localhost:3000/success',
            fail_url: 'http://localhost:3000/fail',
            cancel_url: 'http://localhost:3000/cancel',
            ipn_url: 'http://localhost:3000/api/ipn',
            shipping_method: 'Courier',
            product_name: 'Product from app',
            product_category: 'General',
            product_profile: 'general',
            cus_name: customer.name,
            cus_email: customer.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: customer.phone,
            cus_fax: customer.phone,
            ship_name: customer.name,
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);
        const GatewayPageURL = apiResponse.GatewayPageURL;

        return NextResponse.json({ url: GatewayPageURL });
    } catch (error) {
        console.error('SSLCommerz Init Error:', error);
        return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
    }
}


import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount } = body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "bdt",
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "PaymentIntent creation failed" },
            { status: 500 }
        );
    }
}

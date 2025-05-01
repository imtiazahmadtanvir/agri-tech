// app/api/overview/route.ts
import { NextResponse } from 'next/server';

import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        if (!userEmail) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Connect to database
        const productsCollection = await dbConnect(collectionNameObj.listingsCollection);
        const ordersCollection = await dbConnect(collectionNameObj.orderCollection);

        // Get counts and recent data
        const [totalProducts, recentOrders, pendingOrders, completedOrders, grandTotalPrice, orders] = await Promise.all([
            productsCollection.countDocuments({ userEmail }),
            ordersCollection.find({ vendorEmail: userEmail })
                .sort({ orderDate: -1 })
                .limit(5)
                .toArray(),
            ordersCollection.countDocuments({
                vendorEmail: userEmail,
                status: "pending"
            }),
            ordersCollection.countDocuments({
                vendorEmail: userEmail,
                status: "delivered"
            }),
            ordersCollection.aggregate([
                { $match: { vendorEmail: userEmail } },
                {
                    $group: {
                        _id: null,
                        totalPrice: { $sum: "$totalPrice" }
                    }
                }
            ]).toArray(),
            ordersCollection.find({ vendorEmail: userEmail }).toArray()

        ]);

        return NextResponse.json({
            totalProducts,
            pendingOrders,
            completedOrders,
            orders,
            grandTotalPrice: grandTotalPrice[0]?.totalPrice || 0,
            recentOrders: recentOrders.map(order => ({
                id: order._id.toString().slice(-6),
                status: order.status,
                total: order.totalPrice,
                orderDate: order.orderDate,
            })),
        });

    } catch (error) {
        console.error("Dashboard overview error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
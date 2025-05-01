"use client";

import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import Image from "next/image";
import { useEffect, useState } from "react";

type OrderItem = {
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  price: number;
  photoUrl: string;
};

type Order = {
  _id: string;
  userEmail: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  status?: "pending" | "preparing" | "ready" | "delivered"; // optional
};

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/my-orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <ContainerSmall>
      <div className="p-6 min-h-[80vh]">
        <h1 className="text-xl font-semibold mb-4">Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-xl mb-6 bg-white shadow-md"
            >
              <p className="font-bold">Order ID: {order._id}</p>
              <p className="text-gray-600 mb-2">
                Date: {new Date(order.orderDate).toLocaleString()}
              </p>

              {/* Displaying Status */}
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-semibold
                    ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "preparing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "ready"
                        ? "bg-green-100 text-green-800"
                        : order.status === "delivered"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {order.status || "Pending"}
                </span>
              </p>

              {/* Order Items */}
              <ul className="space-y-3">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        width={48}
                        height={48}
                        src={item.photoUrl}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} {item.unit} × ৳{item.price}
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold">
                      ৳{item.quantity * item.price}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total Price */}
              <p className="text-right font-bold mt-4 text-green-600">
                Total: ৳{order.totalPrice}
              </p>
            </div>
          ))
        )}
      </div>
    </ContainerSmall>
  );
}

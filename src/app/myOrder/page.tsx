"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/my-orders");
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          setError("No orders found");
        }
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {orders.length === 0 ? (
        <p className="text-center text-gray-700 text-xl font-medium">
          No orders found
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Order ID: <span className="font-mono">{order._id}</span>
            </h3>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">User Email:</span>{" "}
              {order.userEmail}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Order Date:</span>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>

            <h4 className="text-lg font-semibold mb-3 text-gray-700">
              Order Items:
            </h4>
            <ul className="space-y-4">
              {order.body.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex items-center gap-4 border rounded-md p-3 bg-gray-50"
                >
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Price: <span className="font-medium">৳{item.price}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-right text-lg font-bold text-gray-900">
              Total Price: ৳{order.totalPrice}
            </h4>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;

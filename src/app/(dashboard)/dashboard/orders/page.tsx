"use client";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrderItem {
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  price: number;
  photoUrl: string;
}

interface Order {
  _id: string;
  vendorEmail: string;
  userEmail: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  status?: "pending" | "processing" | "delivered" | "cancel";
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/customer-orders");
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      await axios.patch(`/api/update-order-status/${orderId}`, {
        status: newStatus,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 hidden sm:table">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Items</th>
                <th className="py-2 px-4 border-b">Customer Email</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Total (৳)</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b font-mono text-sm text-gray-700">
                    #{order._id.slice(0, 8)}...
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={`${order._id}-${item.productId}`}
                          className="flex items-center gap-4"
                        >
                          <Image
                            width={40}
                            height={40}
                            src={item.photoUrl}
                            alt={item.productName}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} {item.unit} × ৳{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-sm text-blue-700">
                    {order.userEmail}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b font-bold">
                    ৳{order.totalPrice}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={order.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value as Order["status"]
                        )
                      }
                      className="px-2 py-1 rounded border border-gray-300 bg-white text-sm"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="processing">🛠️ Processing</option>
                      <option value="cancel">❌ Cancel</option>
                      <option value="delivered">📦 Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📱 Mobile Version */}
          <div className="sm:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="text-sm text-gray-600">
                  <strong>Order ID:</strong> #{order._id.slice(0, 8)}...
                </div>
                <div className="mt-2">
                  {order.items.map((item) => (
                    <div
                      key={`${order._id}-${item.productId}`}
                      className="flex items-center gap-3 mt-2"
                    >
                      <Image
                        width={40}
                        height={40}
                        src={item.photoUrl}
                        alt={item.productName}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} {item.unit} × ৳{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm text-blue-700">
                  <strong>Email:</strong> {order.userEmail}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div className="text-sm font-bold">
                  <strong>Total:</strong> ৳{order.totalPrice}
                </div>
                <div className="mt-2">
                  <select
                    value={order.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value as Order["status"]
                      )
                    }
                    className="w-full px-2 py-1 rounded border border-gray-300 bg-white text-sm"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="processing">🛠️ Processing</option>
                    <option value="cancel">❌ Cancel</option>
                    <option value="delivered">📦 Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

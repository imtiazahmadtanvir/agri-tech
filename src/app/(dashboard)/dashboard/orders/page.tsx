"use client";

import { Order } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/customer-orders");
        console.log(res);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
    setLoading(false);
  }, []);
  return <div>OrdersPage</div>;
}

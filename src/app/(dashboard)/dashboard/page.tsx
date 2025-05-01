"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { useSession } from "next-auth/react";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlinePendingActions } from "react-icons/md";
import OrderStatusChart from "@/components/OrderStatusChart/OrderStatusChart";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";

interface Order {
  id: string;
  customerName: string;
  status: "pending" | "processing" | "cancel" | "delivered";
  total: number;
  orderDate: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}

interface DashboardData {
  totalProducts: number;
  recentOrders: Order[];
  pendingOrders: number;
  completedOrders: number;
  grandTotalPrice: number;
  orders: Order[];
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome");
  const { data: session } = useSession();
  const userName = session?.user?.name || "there";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    axios
      .get<DashboardData>("/api/overview")
      .then((response) => {
        setDashboardData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch dashboard data", error);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-purple-100 text-purple-800";
      case "cancel":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading || !dashboardData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      {/* Greeting */}
      <h2 className="text-2xl font-semibold mb-6">
        {greeting}, {userName}&nbsp;👋
      </h2>
      <div className="mb-6">
        <WeatherCard />
      </div>

      {/* Statistics Cards */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h4 className="text-lg font-medium mb-4">Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-red-500 bg-[#FFE2E3] size-12 flex justify-center items-center rounded-sm">
              <IoCartOutline size={30} />
            </div>
            <div>
              <h4 className="font-bold text-xl">
                {dashboardData.totalProducts || 0}
              </h4>
              <p className="text-gray-500 text-sm">Total Products</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-yellow-500 bg-yellow-100 size-12 flex justify-center items-center rounded-sm">
              <MdOutlinePendingActions size={30} />
            </div>
            <div>
              <h4 className="font-bold text-xl">
                {dashboardData.pendingOrders || 0}
              </h4>
              <p className="text-gray-500 text-sm">Pending Orders</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-[#1BC2D6] bg-[#D6F4F8] size-12 flex justify-center items-center rounded-sm">
              <AiOutlineFileDone size={30} />
            </div>
            <div>
              <h4 className="font-bold text-xl">
                {dashboardData.completedOrders || 0}
              </h4>
              <p className="text-gray-500 text-sm">Completed Orders</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-green-500 bg-[#DDF6E8] size-12 flex justify-center items-center rounded-sm">
              <MdOutlineAttachMoney size={30} />
            </div>
            <div>
              <h4 className="font-bold text-xl">
                {dashboardData.grandTotalPrice || 0} ৳
              </h4>
              <p className="text-gray-500 text-sm">Total Sales</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Order Status Chart */}
        {dashboardData.orders && dashboardData.orders.length > 0 && (
          <OrderStatusChart orders={dashboardData.orders} />
        )}

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recent Orders</h3>
            <Link href="/dashboard/orders">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </Link>
          </div>

          {dashboardData.recentOrders &&
          dashboardData.recentOrders.length > 0 ? (
            <>
              {/* Desktop Table (hidden on mobile) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          ৳{order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards (shown on mobile) */}
              <div className="sm:hidden space-y-3">
                {dashboardData.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">#{order.id.slice(-6)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Total:</span> ৳
                        {order.total}
                      </p>
                    </div>
                    {order.items && order.items.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Items:</p>
                        <ul className="text-sm text-gray-600">
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.productName} (x{item.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

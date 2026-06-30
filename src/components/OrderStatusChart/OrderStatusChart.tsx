"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Order {
  id: string;
  status: "pending" | "processing" | "cancel" | "delivered";
  // ... other order fields
}

interface OrderStatusChartProps {
  orders: Order[];
}

const OrderStatusChart = ({ orders }: OrderStatusChartProps) => {
  // Define your status configuration
  const statusConfig = {
    pending: {
      label: "⏳ Pending",
      color: "#F59E0B",
    },
    processing: {
      label: "🛠️ Processing",
      color: "#3B82F6",
    },
    ready: {
      label: "✅ Ready",
      color: "#10B981",
    },
    cancel: {
      label: "❌ Cancel",
      color: "#EF4444",
    },
    delivered: {
      label: "📦 Delivered",
      color: "#8B5CF6",
    },
  };

  // Count orders by status
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<keyof typeof statusConfig, number>);

  // Prepare chart data
  const data = {
    labels: Object.keys(statusConfig).map(
      (status) => statusConfig[status as keyof typeof statusConfig].label
    ),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.keys(statusConfig).map(
          (status) => statusCounts[status as keyof typeof statusConfig] || 0
        ),
        backgroundColor: Object.keys(statusConfig).map(
          (status) => statusConfig[status as keyof typeof statusConfig].color
        ),
        borderColor: Object.keys(statusConfig).map(
          (status) =>
            `${statusConfig[status as keyof typeof statusConfig].color}80`
        ),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  // Chart configuration
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw as number;
            const total = orders.length;
            const percentage =
              total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Orders",
        },
        ticks: {
          stepSize: 1, // Ensures whole numbers only
        },
      },
      x: {
        title: {
          display: true,
          text: "Order Status",
        },
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h3 className="font-medium mb-4">Order Status Breakdown</h3>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default OrderStatusChart;

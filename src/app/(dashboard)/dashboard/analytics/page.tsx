import { FC } from "react";

// Define types for the components
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
}

interface ActivityItem {
  title: string;
  description: string;
  timestamp: string;
}

// Stat Card Component
const StatCard: FC<StatCardProps> = ({ title, value, change, changeType }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-semibold text-gray-800 mt-2">{value}</p>
    <span
      className={
        changeType === "positive"
          ? "text-green-500 text-sm"
          : "text-red-500 text-sm"
      }
    >
      {change}
    </span>
  </div>
);

// Analytics Page Component
const AnalyticsPage: FC = () => {
  // Sample data (in a real app, this would come from props or API)
  const stats: StatCardProps[] = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12% from last week",
      changeType: "positive",
    },
    {
      title: "Active Sessions",
      value: "567",
      change: "-5% from last week",
      changeType: "negative",
    },
    {
      title: "Revenue",
      value: "$12,345",
      change: "+8% from last week",
      changeType: "positive",
    },
  ];

  const activities: ActivityItem[] = [
    {
      title: "New user signup",
      description: "johndoe@example.com",
      timestamp: "2 hours ago",
    },
    {
      title: "Payment received",
      description: "$99.99 from Jane Smith",
      timestamp: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Analytics</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-gray-600 text-sm font-medium mb-4">User Growth</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">
            Chart would go here (e.g., using Chart.js)
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-gray-600 text-sm font-medium mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-medium">{activity.title}</p>
                <p className="text-gray-500 text-sm">{activity.description}</p>
              </div>
              <span className="text-gray-400 text-sm">
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

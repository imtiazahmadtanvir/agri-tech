import Weather from "@/components/weather-alart/Weather";

export default async function DashboardPage() {
  return (
    <div>
      <h2>Dashboard Content</h2>
      <p>Welcome to your dashboard!</p>
      <Weather></Weather>
    </div>
  );
}

import WeatherCard from "@/components/weather/WeatherCard";

export default async function DashboardPage() {
  return (
    <div>
      <h2>Dashboard Content</h2>
      <p>Welcome to your dashboard!</p>
      <WeatherCard />
    </div>
  );
}

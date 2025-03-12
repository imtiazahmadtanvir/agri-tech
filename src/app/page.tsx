import HomePage from "@/components/home-page/HomePage";
import Navbar from "@/components/shared/Navbar";
import TopInfoBar from "@/components/shared/TopInfoBar";

export default function Home() {
  return (
    <div className="">
      <TopInfoBar />
      <Navbar />
      <HomePage />
    </div>
  );
}

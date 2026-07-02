import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

type Data = {
  totalQuantity: number;
};

type DeliveryInfo = {
  fullName: string;
  phoneNumber: string;
  address: string;
  houseDetails: string;
  area: string;
  landmark: string;
  city: string;
  region: string;
};

export default function ProceedToPay({
  data,
  total,
  dInfo,
}: {
  data: Data;
  total: number;
  dInfo: DeliveryInfo | null;
}) {
  const { setTotal } = useGlobalContext();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotal(total);
  }, [total, setTotal]);

  const handlePaymentInitiation = async () => {
    if (!dInfo) {
      toast.error("Please provide delivery information first.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/sslcommerz/initiate", {
        amount: total + 100, // Total price + shipping fee
        fullName: dInfo.fullName,
        phoneNumber: dInfo.phoneNumber,
        userEmail: session?.user?.email || "",
      });

      if (response.data?.GatewayPageURL) {
        // Redirect user to the SSLCommerz sandbox gateway
        window.location.replace(response.data.GatewayPageURL);
      } else {
        toast.error("Could not initiate payment. Please try again.");
        console.error("Initiation error:", response.data);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment initiation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-fit zigzag-border lg:w-[32%] bg-[#F0F1F4] p-4 rounded-xl">
      <div className="space-y-4">
        <h3 className="pb-2 text-2xl font-medium">Order Summary</h3>
        <div className="flex justify-between text-sm">
          <span>Subtotal ({data.totalQuantity} items)</span>
          <span className="flex items-center font-semibold ">
            {total} <FaBangladeshiTakaSign />
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping Fee</span>
          <span className="flex items-center font-semibold ">
            100 <FaBangladeshiTakaSign />
          </span>
        </div>
        <div className="flex justify-between py-3 border-t border-b">
          <h3>TOTAL</h3>
          <span className="font-medium flex items-center text-green-800">
            {total + 100} <FaBangladeshiTakaSign />
          </span>
        </div>
        <button
          onClick={handlePaymentInitiation}
          disabled={dInfo == null || loading}
          className="text-white my-2 py-[12px] disabled:bg-gray-500 px-6 rounded-full lg:w-full bg-[#155628] font-semibold hover:bg-green-800 transition-colors"
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
}

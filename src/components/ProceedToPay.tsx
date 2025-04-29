import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
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
  setIsOpen,
}: {
  data: Data;
  total: number;
  dInfo: DeliveryInfo | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handelPayment = async () => {
    const formData = dInfo;
    console.log(formData);
    setIsOpen(true);

    try {
      const { data } = await axios.post("/api/sslcommerz/initiate", {
        ...formData,
        amount: total,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" h-fit zigzag-border lg:w-[32%] bg-[#F0F1F4]">
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
          disabled={dInfo == null}
          onClick={handelPayment}
          className="text-white my-2 py-[12px] disabled:bg-gray-500 px-6 rounded-full lg:w-full bg-[#155628]"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}

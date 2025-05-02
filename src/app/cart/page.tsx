"use client";
import QuantityBtn from "@/components/cart/QuantityBtn";
import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { useCart } from "@/Hook/useCart";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { CiLocationOn } from "react-icons/ci";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { TbAlertHexagonFilled } from "react-icons/tb";
type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  photoUrl: string;

  productName: string;
};

type CartData = {
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};

export default function Cart() {
  const { data, isLoading, refetch } = useCart() as {
    data: CartData;
    isLoading: boolean;
    refetch: () => Promise<{ data: CartData }>;
  };
  if (isLoading)
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  console.log(data);
  if (!data || !data.cart || data.totalQuantity === 0) {
    return (
      <ContainerSmall>
        <div className="p-4 flex items-center gap-1.5 mt-4 bg-[#F2F2F2] text-[#D18A18]">
          <TbAlertHexagonFilled />
          Your cart is empty.
        </div>
        <div className="my-10 flex justify-center">
          <Link
            href={"/marketplace"}
            className="bg-green-700 rounded-full py-3 px-6 text-white"
          >
            Return To Shop
          </Link>
        </div>
      </ContainerSmall>
    );
  }

  const handelDeleteItem = async (id: string) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("error to delete item");
    }
  };
  return (
    <ContainerSmall>
      <div className="bg-white flex flex-col lg:flex-row justify-between gap-15 my-6">
        <div className="lg:w-[68%] ">
          <div className="">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-2xl font-medium">
                Basket ({data.totalQuantity})
              </h2>
            </div>

            <div className="border-t pt-4">
              {data.cart.map((item) => (
                <div
                  className="flex border-b justify-between py-4 border-dashed 
                  flex-col md:flex-row md:items-center"
                  key={item.productId}
                >
                  <Link href={`/marketplace/product/${item.productId}`}>
                    <div className="flex gap-4 md:items-center mb-6 md:mb-0 text-sm">
                      <div className="border rounded-2xl overflow-hidden size-[70px] ">
                        <Image
                          height={70}
                          width={70}
                          alt={item.productName}
                          src={item.photoUrl}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm md:text-base pb-2">
                          {item.productName}
                        </h3>
                        <h4 className="flex items-center font-semibold text-emerald-700">
                          {item.price}.00 <FaBangladeshiTakaSign />
                        </h4>
                      </div>
                    </div>
                  </Link>
                  <div className="flex md:items-center justify-between gap-7">
                    <QuantityBtn
                      qn={item.quantity}
                      productId={item.productId}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => handelDeleteItem(item.productId)}
                    >
                      <IoMdClose size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 h-fit zigzag-border lg:w-[32%] bg-[#F0F1F4]">
          <div className="border-b pb-4 ">
            <h3 className="pb-2">Location</h3>
            <button className="flex items-center">
              <CiLocationOn size={25} /> <span>Barisal</span>
            </button>
          </div>
          <div className="space-y-4">
            <h3 className="pb-2 text-2xl font-medium">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Subtotal ({data.totalQuantity} items)</span>
              <span className="flex items-center font-semibold ">
                {data.totalPrice} <FaBangladeshiTakaSign />
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
                {data.totalPrice + 100} <FaBangladeshiTakaSign />
              </span>
            </div>
            <Link
              href={"/cart/checkout"}
              className="text-white my-2 py-[12px] px-6 rounded-full lg:w-full bg-[#155628]"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </ContainerSmall>
  );
}

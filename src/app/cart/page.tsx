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

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
};

type CartData = {
  cart: CartItem[];
  totalQuantity: number;
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
  if (!data || !data.cart || data.cart.length === 0) {
    return <div className="p-4">Your cart is empty.</div>;
  }

  const total = data.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
                  className="flex border-b justify-between py-4 border-dashed items-center"
                  key={item.productId}
                >
                  <Link href={`/marketplace/product/${item.productId}`}>
                    <div className="flex gap-4 items-center">
                      <div className="border rounded-2xl overflow-hidden">
                        <Image
                          height={70}
                          width={70}
                          alt={item.name}
                          src={item.photo}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold pb-2">{item.name}</h3>
                        <h4 className="flex items-center font-semibold text-emerald-700">
                          {item.price}.00 <FaBangladeshiTakaSign />
                        </h4>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center gap-7">
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

          <div className="w-full bg-white p-4"></div>
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
            <button className="text-white py-[12px] px-6 rounded-full lg:w-full bg-[#155628]">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </ContainerSmall>
  );
}

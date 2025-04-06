import ImageSlider from "@/components/market/marketplace/ImageSlider";
import { timeStamp } from "@/utils/timestamp";
import axios from "axios";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/listings/${id}`);
  console.log(res);
  return (
    <div className="mt-4">
      <div className="flex justify-between ">
        <div>
          <h3 className="font-semibold text-xl">{res?.data?.productName}</h3>
          <p>
            {timeStamp(res?.data?.listed)}, <span>{res?.data?.location}</span>{" "}
          </p>
        </div>
        <div>
          <p className="flex items-center">
            <IoShareSocialSharp />
            Share
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-2/3">
          <ImageSlider data={res?.data?.photos} />
          <div></div>
        </div>
        <div className="w-1/3 scroll-mt-4 sticky top-0 h-fit border rounded-sm">
          <div className="py-3 border-b px-3">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt={res?.data?.userName}
              src={res?.data?.userImage}
            />
            <div className="flex gap-1.5">
              <p>For sale by</p>
              <h3>{res?.data?.userName}</h3>
            </div>
          </div>
          <div className="py-3 border-b px-3">
            <FaPhoneAlt className="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

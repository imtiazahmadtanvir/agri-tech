import ImageSlider from "@/components/market/marketplace/ImageSlider";
import PhoneCall from "@/components/market/marketplace/PhoneCall";
import { timeStamp } from "@/utils/timestamp";
import axios from "axios";
import Image from "next/image";
import { IoMdChatboxes } from "react-icons/io";
import { IoShareSocialSharp } from "react-icons/io5";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/listings/${id}`);
  const {
    productName,
    listed,
    location,
    photos,
    price,
    isNegotiable,
    condition,
    organicStatus,
    userName,
    userImage,
    breed,
    age,
    healthStatus,
    description,
    plantingSeason,
    phoneNumber,
  } = res?.data;
  console.log(res?.data);
  return (
    <div className="mt-4">
      <div className="flex justify-between ">
        <div>
          <h3 className="font-semibold text-xl">{productName}</h3>
          <p>
            Posted on {timeStamp(listed)}, <span>{location}</span>
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
          <ImageSlider data={photos} />
          <div>
            <div className="flex gap-2 items-center text-sm">
              <h3 className="text-2xl font-bold text-green-500"> $ {price}</h3>
              <p className="italic">{isNegotiable ? "Negotiable" : ""}</p>
            </div>
            {condition && <p>Condition: {condition}</p>}
            <ul>
              {organicStatus && (
                <li>Organic: {organicStatus ? "Yes" : "No"}</li>
              )}
              {breed && <li>Breed : {breed}</li>}
              {healthStatus && <li>status : {healthStatus}</li>}
              {age && <li>Age : {age} month</li>}
              {plantingSeason && <li>Planting Season: {plantingSeason}</li>}
            </ul>
            <h2 className="font-semibold">Description</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="w-1/3 scroll-mt-4 sticky top-0 h-fit border rounded-sm">
          <div className="py-3 border-b px-3">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt={userName}
              src={userImage}
            />
            <div className="flex gap-1.5">
              <p>For sale by</p>
              <h3>{userName}</h3>
            </div>
          </div>
          <div className="">
            <PhoneCall phoneNumber={phoneNumber} />
          </div>
          <div className="p-3 flex gap-2">
            <span className="size-7  bg-green-500 rounded-full flex justify-center items-center">
              <IoMdChatboxes className="text-white " />
            </span>
            <span className="font-semibold">Chat Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

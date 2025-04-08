import ImageSlider from "@/components/market/marketplace/ImageSlider";
import PhoneCall from "@/components/market/marketplace/PhoneCall";
import { timeStamp } from "@/utils/timestamp";
import axios from "axios";
import Image from "next/image";
import { IoMdChatboxes } from "react-icons/io";
import { IoShareSocialSharp } from "react-icons/io5";
type PageProps = {
  params: { id: string };
};

export default async function ProductDetails({ params }: PageProps) {
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
    expiryData,
    yearOfManufacture,
    type,
    brand,
    volume,
    nutritionalContent,
  } = res?.data;
  return (
    <div className="my-4 p-4 border rounded-sm ">
      <div className="flex justify-between ">
        <div>
          <h3 className="font-semibold text-xl">{productName}</h3>
          <p className="text-gray-500">
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
            <div className="flex mt-2 gap-2 items-center text-sm">
              <h3 className="text-2xl font-bold text-green-500"> $ {price}</h3>
              <p className="italic">{isNegotiable ? "Negotiable" : ""}</p>
            </div>
            {condition && <p>Condition: {condition}</p>}
            <ul>
              {brand && <li>Brand : {brand}</li>}
              {yearOfManufacture && <li>Manufactured : {yearOfManufacture}</li>}
              {organicStatus && (
                <li>Organic: {organicStatus ? "Yes" : "No"}</li>
              )}
              {volume && <li>Volume : {volume}</li>}
              {breed && <li>Breed : {breed}</li>}
              {healthStatus && <li>status : {healthStatus}</li>}
              {age && <li>Age : {age} month</li>}
              {plantingSeason && <li>Planting Season: {plantingSeason}</li>}
              {type && <li>Organic : {type === "Organic" ? "yes" : "no"}</li>}
              {expiryData && <li> Expiry Date : {expiryData}</li>}
              {nutritionalContent && (
                <li>Nutritional : {nutritionalContent}</li>
              )}
            </ul>
            <h2 className="font-semibold">Description</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="w-1/3 scroll-mt-4 sticky top-0 h-fit border rounded-sm">
          <div className="py-3 border-b px-3 -z-10">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt={userName}
              src={userImage}
            />
            <div className="flex gap-1.5">
              <p className="text-gray-400">For sale by</p>
              <h3 className="font-semibold">{userName}</h3>
            </div>
          </div>
          <div className="">
            <PhoneCall phoneNumber={phoneNumber} />
          </div>
          <div className="p-3 flex gap-2">
            <span className="size-8  bg-green-500 rounded-full flex justify-center items-center">
              <IoMdChatboxes className="text-white " />
            </span>
            <span className="font-semibold">Chat Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

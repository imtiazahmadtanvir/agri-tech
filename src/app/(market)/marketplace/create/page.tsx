"use client";
import CategoryFields from "@/components/market/marketplace/CategoryFields";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import type { FormData } from "@/types/type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import { uploadPhotos } from "@/utils/imageUpload";
import toast from "react-hot-toast";
import useUserDetail from "@/Hook/useUserDetail";

const marketplaceCategories = [
  { name: "crops" },
  { name: "livestock" },
  { name: "Seeds & Plants" },
  { name: "fertilizers" },
  { name: "equipment" },
  { name: "pesticides" },
  { name: "Animal Feed" },
  { name: "fisheries" },
];

export default function CreateListing() {
  const { data } = useSession();
  const { userDetail } = useUserDetail();
  console.log(userDetail);
  console.log(data);
  const [previews, setPreviews] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [phoneNumberE, setPhoneNumberE] = useState("");
  const [photoError, setPhotoError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      location: "",
      unit: "",
      isNegotiable: false,
    },
  });

  const handelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length === 0) return;
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handelRemovePhoto = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsSubmitting(true);
    setPhoneNumberE("");
    try {
      if (!phoneNumber || (phoneNumber?.length ?? 0) < 14) {
        setPhoneNumberE("please fill the phone number");
        setIsSubmitting(false);
        return;
      }
      if (photos.length === 0) {
        setPhotoError("At least one photo is required to post a listing.");
        setIsSubmitting(false);
        return;
      }
      const photoUrls = await uploadPhotos(photos);
      const listingData = { ...formData, photos: photoUrls, phoneNumber };
      const { data } = await axios.post("/api/listings", listingData);
      if (data.success) {
        toast.success(data.message);
      }
      reset({
        productName: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        location: "",
        unit: "",
        isNegotiable: false,
      });
      setPhotos([]);
      setPreviews([]);
      setPhoneNumber("");
      setPhotoError("");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = watch("category");
  return (
    <div className="my-4 p-4 bg-[#F7F9F7] rounded-md border">
      <div className="">
        <h3 className="text-2xl font-semibold">Item for sale</h3>
        <p>Photos {previews.length}/4 - You can add up to 4 photos</p>
        {photoError && <p className="text-red-500 text-sm">{photoError}</p>}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* Photo Upload */}
        <div
          className={`col-span-2 gap-3 ${
            previews.length < 1 ? "" : "grid grid-cols-4"
          }`}
        >
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <div className="relative w-full h-40 rounded-md">
                <Image
                  className="object-cover rounded-md border"
                  fill
                  alt={`Preview ${index + 1}`}
                  src={preview}
                />
              </div>
              <button
                onClick={() => handelRemovePhoto(index)}
                className="absolute top-0 text-red-300 cursor-pointer right-0"
                type="button"
              >
                <IoMdCloseCircle size={25} />
              </button>
            </div>
          ))}

          {previews.length < 4 && (
            <div>
              <input
                multiple
                accept="image/*"
                className="hidden"
                id="file"
                type="file"
                onChange={handelFileChange}
              />
              <label
                className={`${
                  previews.length < 1 ? "w-full h-40" : "h-40"
                } border flex flex-col items-center bg-white cursor-pointer justify-center rounded-md`}
                htmlFor="file"
              >
                <MdOutlineAddPhotoAlternate
                  size={30}
                  className="text-green-400"
                />
                Add photo
              </label>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("productName", {
              required: "Product name is required",
            })}
            type="text"
            placeholder="product name"
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm">{errors.productName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 capitalize"
          >
            <option value="">Select a category</option>
            {marketplaceCategories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="col-span-2 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            placeholder="more details about the product"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="col-span-2 grid-cols-2 grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <select
              {...register("unit", { required: "Unit is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select unit</option>
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="piece">piece</option>
              <option value="litre">litre</option>
              <option value="dozen">dozen</option>
            </select>
            {errors.unit && (
              <p className="text-red-500 text-sm">{errors.unit.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Enter quantity"
              className="border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none p-2 rounded-md w-full"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price($)
            </label>
            <input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Pick a good price"
              className="border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none p-2 rounded-md w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              {...register("isNegotiable")}
              type="checkbox"
              id="isNegotiable"
              className="w-4 h-4"
            />
            <label htmlFor="isNegotiable" className="text-sm text-gray-700">
              Negotiable
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="e.g., Springfield Farm, IL"
              className="block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-4">
          {selectedCategory && (
            <div className="col-span-3">
              <CategoryFields
                register={register}
                errors={errors}
                watch={watch}
              />
            </div>
          )}
        </div>
        <div className="col-span-2">
          <h3>Contact details</h3>
          <div className="flex gap-12">
            <div>
              <p>Name</p>
              <h3>{data?.user?.name}</h3>
            </div>
            <div>
              <p>Email</p>
              <h3>{data?.user?.email}</h3>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <PhoneInput
            international
            defaultCountry="BD"
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {phoneNumberE && (
            <p className="text-red-500 text-sm">{phoneNumberE}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="col-span-2 w-fit flex justify-self-end py-2 px-10 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {isSubmitting ? "Posting..." : "Post Listing"}
        </button>
      </form>
    </div>
  );
}

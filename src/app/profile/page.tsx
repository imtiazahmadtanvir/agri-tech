"use client";
import useFetch from "@/Hook/useFetch";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

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

type Inputs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  village: string;
  district: string;
  landSize: number;
  categories: string[];
};

type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  village: string;
  district: string;
  landSize: number;
  categories: string[];
};

type UserApiResponse = {
  data: User;
};

export default function ProfilePage() {
  const { data, error, loading } =
    useFetch<UserApiResponse>("/api/userDetails");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    if (data?.data) {
      reset({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        phoneNumber: data.data.phoneNumber,
        village: data.data.village,
        district: data.data.district,
        landSize: data.data.landSize,
        categories: data.data.categories,
      });
      setValue("phoneNumber", data.data.phoneNumber);
    }
  }, [data, reset, setValue]);

  useEffect(() => {
    register("phoneNumber", { required: "Phone number is required" });
  }, [register]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log("Form Data:", data);
    try {
      const response = await axios.put("/api/userDetails", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error
  if (error) {
    return <div>Error fetching data.</div>;
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white border shadow-lg my-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌾 Your Account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* First Name */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            First Name
          </label>
          <input
            {...register("firstName", { required: "First name is required" })}
            placeholder="e.g., John"
            className="w-full p-1.5 border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            placeholder="e.g., Doe"
            className="w-full p-1.5 border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Contact</label>
          <PhoneInput
            defaultCountry="BD"
            value={data?.data?.phoneNumber}
            onChange={(value) => {
              setValue("phoneNumber", value || "");
              trigger("phoneNumber");
            }}
            className="w-full p-1.5 border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>

        {/* Village */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Village/Town
          </label>
          <input
            {...register("village", { required: "Village is required" })}
            placeholder="e.g., Bokultoli"
            className="w-full p-1.5 border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.village && (
            <span className="text-red-500">{errors.village.message}</span>
          )}
        </div>

        {/* District */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">District</label>
          <input
            {...register("district", { required: "District is required" })}
            placeholder="e.g., Dhaka"
            className="w-full p-1.5 border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.district && (
            <span className="text-red-500">{errors.district.message}</span>
          )}
        </div>

        {/* Land Size */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Land Size (acres)
          </label>
          <input
            type="number"
            {...register("landSize", {
              required: "Land size is required",
              min: { value: 0, message: "Must be a positive number" },
            })}
            placeholder="e.g., 5"
            className="w-full p-1.5 border focus:outline-none focus:ring-2 focus:ring-green-500"
            step="0.1"
          />
          {errors.landSize && (
            <span className="text-red-500">{errors.landSize.message}</span>
          )}
        </div>

        {/* Categories */}
        <div className="mb-3 col-span-2">
          <label className="block font-semibold text-gray-700 mb-2">
            Categories
          </label>
          <div className="grid grid-cols-3 gap-2">
            {marketplaceCategories.map((item) => (
              <label key={item.name} className="flex items-center">
                <input
                  type="checkbox"
                  value={item.name}
                  {...register("categories")}
                  className="mr-2 accent-green-500"
                />
                <span className="capitalize">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-center px-6 w-fit col-span-2 bg-green-600 text-white py-2 hover:bg-green-700 transition"
        >
          Finish
        </button>
      </form>
    </section>
  );
}

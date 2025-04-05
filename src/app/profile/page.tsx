"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<Inputs>();
  useEffect(() => {
    register("phoneNumber", { required: "Phone number is required" });
  }, [register]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form Data:", data);
  };

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
        {/* Phone Number */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Contact</label>
          <PhoneInput
            country={"bd"}
            onChange={(value) => {
              setValue("phoneNumber", value);
              trigger("phoneNumber");
            }}
            inputClass="w-full !p-1.5 !border !border-gray-300 focus:!outline-none focus:!ring-2 focus:!ring-green-500"
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

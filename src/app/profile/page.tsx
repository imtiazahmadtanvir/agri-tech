"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  village: string;
  exampleRequired: string;
};
export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <section className="max-w-4xl mx-auto p-6 bg-white border  shadow-lg my-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌾 Your Account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            First Name
          </label>
          <input
            {...register("firstName", { required: true })}
            placeholder="e.g., John Doe"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Last Name</label>
          <input
            {...register("lastName", { required: true })}
            placeholder="e.g., John Doe"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Contact</label>
          <input
            type="number"
            name="phoneNumber"
            placeholder="your phone number"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Village/Town
          </label>
          <input
            type="text"
            name="village"
            placeholder="e.g., Bokultoli"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700">District</label>
          <input
            type="text"
            name="district"
            placeholder="dhaka"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            land Size (acres)
          </label>
          <input
            type="number"
            name="landSize"
            placeholder="e.g., 5"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.1"
            required
          />
        </div>
        <div className="mb-3 col-span-2">
          <label className="block font-semibold text-gray-700 mb-2">
            Categories
          </label>
          <div className="space-y-2 grid-cols-3 grid">
            {marketplaceCategories.map((crop) => (
              <label key={crop.name} className="flex items-center">
                <input
                  type="checkbox"
                  value={crop.name}
                  className="mr-2 accent-green-500"
                />
                <p className="capitalize">{crop.name}</p>
              </label>
            ))}
          </div>
        </div>
        <div>
          <input type="checkbox" name="" id="" />
        </div>
        <button
          type="submit"
          className=" text-center px-6 w-fit col-span-2 bg-green-600 text-white py-2  hover:bg-green-700 transition disabled:bg-green-400"
        >
          {"Finish"}
        </button>
      </form>
    </section>
  );
}

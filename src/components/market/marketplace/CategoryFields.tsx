import { FormData } from "@/types/type";
import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";

interface CategoryFieldsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
}

export default function CategoryFields({
  register,
  errors,
  watch,
}: CategoryFieldsProps) {
  const category = watch("category");

  switch (category) {
    case "crops":
      return (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Crops Type
            </label>
            <select
              {...register("type", { required: "Crop type is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop Type</option>
              <option value="grains">Grains & Cereals 🌾</option>
              <option value="vegetables">Vegetables 🥦</option>
              <option value="fruits">Fruits 🍎</option>
              <option value="legumes">Legumes & Pulses 🌱</option>
              <option value="nuts">Nuts & Oilseeds 🥜</option>
              <option value="spices">Spices & Herbs 🌿</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harvest Date
            </label>
            <input
              type="date"
              {...register("harvestDate", {
                required: "Harvest date is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.harvestDate && (
              <p className="text-red-500 text-sm">
                {errors.harvestDate.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              {...register("condition", { required: "Condition is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select condition</option>
              <option value="Fresh">Fresh</option>
              <option value="Processed">Processed</option>
            </select>
            {errors.condition && (
              <p className="text-red-500 text-sm">{errors.condition.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("organicStatus")}
              className="mr-2 accent-green-500"
            />
            <label className="text-sm font-medium text-gray-700">Organic</label>
          </div>
        </div>
      );
    case "fertilizers":
      return (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Fertilizers Type
            </label>
            <select
              {...register("type", {
                required: "Fertilizer type is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Type</option>
              <option value="Organic">Organic</option>
              <option value="Chemical">Chemical</option>
              <option value="Compost">Compost</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Brand
            </label>
            <input
              type="text"
              {...register("chemicalComposition", {
                required: "Brand is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., NPK 20-20-20"
            />
            {errors.chemicalComposition && (
              <p className="text-red-500 text-sm">
                {errors.chemicalComposition.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("expiryData", {
                required: "Expiry date is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.expiryData && (
              <p className="text-red-500 text-sm">
                {errors.expiryData.message}
              </p>
            )}
          </div>
        </div>
      );
    case "equipment":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Equipment Type
            </label>
            <select
              {...register("type", {
                required: "Equipment type is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Equipment Category</option>
              <option value="Soil Preparation">🌿 Soil Preparation</option>
              <option value="Planting & Seeding">🌱 Planting & Seeding</option>
              <option value="Irrigation">💧 Irrigation</option>
              <option value="Crop Protection">🌾 Crop Protection</option>
              <option value="Harvesting">🌾 Harvesting</option>
              <option value="Post-Harvest Handling">
                📦 Post-Harvest Handling
              </option>
              <option value="Transport & Handling">
                🚚 Transport & Handling
              </option>
              <option value="Other">❓ Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              {...register("brand", { required: "Brand is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., John Deere"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              {...register("condition", { required: "Condition is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
            {errors.condition && (
              <p className="text-red-500 text-sm">{errors.condition.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year of Manufacture
            </label>
            <input
              type="date"
              {...register("yearOfManufacture", {
                required: "Year of manufacture is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.yearOfManufacture && (
              <p className="text-red-500 text-sm">
                {errors.yearOfManufacture.message}
              </p>
            )}
          </div>
        </div>
      );
    case "livestock":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Animal Type
            </label>
            <select
              {...register("type", {
                required: "Animal type is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Animal Type</option>
              <option value="Cow">Cattle 🐄</option>
              <option value="Buffalo">Buffalo 🐃</option>
              <option value="Goat">Goat 🐐</option>
              <option value="Sheep">Sheep 🐏</option>
              <option value="Chicken">Chicken 🐔</option>
              <option value="Duck">Duck 🦆</option>
              <option value="Turkey">Turkey 🦃</option>
              <option value="Horse">Horse 🐎</option>
              <option value="Camel">Camel 🐪</option>
              <option value="Other">Other ❓</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Breed
            </label>
            <input
              type="text"
              {...register("breed", { required: "Breed is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Holstein"
            />
            {errors.breed && (
              <p className="text-red-500 text-sm">{errors.breed.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age (month)
            </label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                valueAsNumber: true,
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 2"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Health Status
            </label>
            <select
              {...register("healthStatus", {
                required: "Health status is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Health Status</option>
              <option value="Healthy">Healthy</option>
              <option value="Vaccinated">Vaccinated</option>
              <option value="Sick">Sick</option>
              <option value="Under Treatment">Under Treatment</option>
              <option value="Pregnant">Pregnant</option>
              <option value="Lactating">Lactating</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
            {errors.healthStatus && (
              <p className="text-red-500 text-sm">
                {errors.healthStatus.message}
              </p>
            )}
          </div>
        </div>
      );
    case "Animal Feed":
      return (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feed Type
            </label>
            <select
              {...register("type", { required: "Feed type is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Feed Type</option>
              <option value="Poultry">🐔 Poultry Feed</option>
              <option value="Cattle">🐄 Cattle Feed</option>
              <option value="Fish">🐟 Fish Feed</option>
              <option value="Goat">🐐 Goat Feed</option>
              <option value="Sheep">🐏 Sheep Feed</option>
              <option value="Horse">🐎 Horse Feed</option>
              <option value="Other">❓ Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nutritional Content
            </label>
            <input
              type="text"
              {...register("nutritionalContent", {
                required: "Nutritional content is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 20% protein"
            />
            {errors.nutritionalContent && (
              <p className="text-red-500 text-sm">
                {errors.nutritionalContent.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("expiryData", {
                required: "Expiry date is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.expiryData && (
              <p className="text-red-500 text-sm">
                {errors.expiryData.message}
              </p>
            )}
          </div>
        </div>
      );
    case "Seeds & Plants":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seed/Plant Type
            </label>
            <select
              {...register("type", {
                required: "Seed/Plant type is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Type</option>
              <option value="Corn">🌽 Corn</option>
              <option value="Wheat">🌾 Wheat</option>
              <option value="Rice">🍚 Rice</option>
              <option value="Soybean">🌱 Soybean</option>
              <option value="Cotton">🌿 Cotton</option>
              <option value="Tomato">🍅 Tomato</option>
              <option value="Other">❓ Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Planting Season
            </label>
            <input
              type="text"
              {...register("plantingSeason", {
                required: "Planting season is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Spring"
            />
            {errors.plantingSeason && (
              <p className="text-red-500 text-sm">
                {errors.plantingSeason.message}
              </p>
            )}
          </div>
        </div>
      );
    case "pesticides":
      return (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pesticides Type
            </label>
            <select
              {...register("type", {
                required: "Pesticide type is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Type</option>
              <option value="Insecticide">🦟 Insecticide</option>
              <option value="Fungicide">🍄 Fungicide</option>
              <option value="Herbicide">🌾 Herbicide</option>
              <option value="Rodenticide">🐭 Rodenticide</option>
              <option value="Bactericide">🦠 Bactericide</option>
              <option value="Fungus Control">🧴 Fungus Control</option>
              <option value="Nematicide">🐛 Nematicide</option>
              <option value="Other">❓ Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              {...register("brand", { required: "Brand is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="brand name"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Volume
            </label>
            <input
              type="text"
              {...register("volume", {
                required: "Expiry date is required",
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="200ml, 2L"
            />
            {errors.expiryData && (
              <p className="text-red-500 text-sm">
                {errors.expiryData.message}
              </p>
            )}
          </div>
        </div>
      );
    case "fisheries":
      return (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fisheries Type
            </label>
            <select
              {...register("type", { required: "Fisheries type is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Type</option>
              <option value="Freshwater Fish">🐟 Freshwater Fish</option>
              <option value="Saltwater Fish">🌊 Saltwater Fish</option>
              <option value="Aquaculture">🌱 Aquaculture</option>
              <option value="Shellfish">🦪 Shellfish</option>
              <option value="Crustaceans">🦐 Crustaceans</option>
              <option value="Other">❓ Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              {...register("condition", { required: "Condition is required" })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select condition</option>
              <option value="Fresh">Fresh</option>
              <option value="Processed">Processed</option>
            </select>
            {errors.condition && (
              <p className="text-red-500 text-sm">{errors.condition.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age (month)
            </label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                valueAsNumber: true,
              })}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 2"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
}

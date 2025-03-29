import { FormData } from "@/types/type";
import React from "react";
interface CategoryFieldsProps {
  formData: FormData;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function CategoryFields({
  formData,
  handleChange,
  handleCheckboxChange,
}: CategoryFieldsProps) {
  switch (formData.category) {
    case "crops":
      return (
        <div className="grid  grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Crops Type
            </label>
            <select
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              name="cropType"
              value={formData.cropType || ""}
              onChange={handleChange}
            >
              <option value="">Select Crop Type</option>
              <option value="grains">Grains & Cereals 🌾</option>
              <option value="vegetables">Vegetables 🥦</option>
              <option value="fruits">Fruits 🍎</option>
              <option value="legumes">Legumes & Pulses 🌱</option>
              <option value="nuts">Nuts & Oilseeds 🥜</option>
              <option value="spices">Spices & Herbs 🌿</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harvest Date
            </label>
            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select condition</option>
              <option value="Fresh">Fresh</option>
              <option value="Processed">Processed</option>
            </select>
          </div>
          <div className="flex ">
            <input
              type="checkbox"
              name="organicStatus"
              checked={formData.organicStatus || false}
              onChange={handleCheckboxChange}
              className="mr-2 accent-green-500"
            />
            <label className="text-sm font-medium block text-gray-700 ">
              Organic
            </label>
          </div>
        </div>
      );
    case "fertilizers":
      return (
        <div className="grid grid-cols-3 gap-4">
          {/* type */}
          <div>
            <label
              htmlFor="chemicalComposition"
              className="block text-sm font-semibold text-gray-700"
            >
              Fertilizers Type
            </label>
            <select
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Type</option>
              <option value="Organic">Organic</option>
              <option value="Chemical">Chemical</option>
              <option value="Compost">Compost</option>
            </select>
          </div>
          {/* Chemical Composition */}
          <div>
            <label
              htmlFor="chemicalComposition"
              className="block text-sm font-semibold text-gray-700"
            >
              Brand
            </label>
            <input
              type="text"
              name="chemicalComposition"
              id="chemicalComposition"
              value={formData.chemicalComposition || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., NPK 20-20-20"
              aria-label="Chemical Composition"
            />
          </div>

          {/* Safety Certifications */}
          <div>
            <label
              htmlFor="safetyCertifications"
              className="block text-sm font-semibold text-gray-700"
            >
              Expiry Date
            </label>
            <input
              name="expiryData"
              value={formData.expiryData || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="date"
            />
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
              name="equipmentType"
              value={formData.type || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Equipment Type</option>
              <option value="Tractor">🚜 Tractor</option>
              <option value="Plow">⛏️ Plow</option>
              <option value="Harvester">🌾 Harvester</option>
              <option value="Seeder">🌱 Seeder</option>
              <option value="Sprayer">💧 Sprayer</option>
              <option value="Cultivator">🌿 Cultivator</option>
              <option value="Irrigation System">💦 Irrigation System</option>
              <option value="Mower">🌾 Mower</option>
              <option value="Other">❓ Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., John Deere"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year of Manufacture
            </label>
            <input
              type="date"
              name="yearOfManufacture"
              value={formData.yearOfManufacture || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 2020"
            />
          </div>
        </div>
      );
    case "livestock":
      return (
        <div className="grid grid-cols-2 gap-4">
          {/* Animal Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Animal Type
            </label>
            <select
              name="animalType"
              value={formData.animalType || ""}
              onChange={handleChange}
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
          </div>

          {/* Breed */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Breed
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Holstein"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age(month)
            </label>
            <input
              type=""
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 2 ,month"
            />
          </div>

          {/* Health Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Health Status
            </label>
            <select
              name="healthStatus"
              value={formData.healthStatus || ""}
              onChange={handleChange}
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
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Animal Feed Type</option>
              <option value="Poultry">🐔 Poultry Feed</option>
              <option value="Cattle">🐄 Cattle Feed</option>
              <option value="Fish">🐟 Fish Feed</option>
              <option value="Goat">🐐 Goat Feed</option>
              <option value="Sheep">🐏 Sheep Feed</option>
              <option value="Horse">🐎 Horse Feed</option>
              <option value="Other">❓ Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nutritional Content
            </label>
            <input
              type="text"
              name="nutritionalContent"
              value={formData.nutritionalContent || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 20% protein"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expire date
            </label>
            <input
              value={formData.expiryData || ""}
              type="date"
              onChange={handleChange}
              name="expiryData"
              placeholder="brand name"
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
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
              name="seedPlantType"
              value={formData.seedPlantType || ""}
              onChange={handleChange}
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Planting Season
            </label>
            <input
              type="text"
              name="plantingSeason"
              value={formData.plantingSeason || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Spring"
            />
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
              name="pesticideType"
              value={formData.type || ""}
              onChange={handleChange}
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              value={formData.brand}
              type="text"
              onChange={handleChange}
              name="brand"
              placeholder="brand name"
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expire date
            </label>
            <input
              value={formData.expiryData || ""}
              type="date"
              onChange={handleChange}
              name="expiryData"
              placeholder="brand name"
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      );
    case "fisheries":
      return (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="">Fisheries Type</label>
            <select
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select condition</option>
              <option value="Fresh">Fresh</option>
              <option value="Processed">Processed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age(month)
            </label>
            <input
              type=""
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 2 ,month"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}

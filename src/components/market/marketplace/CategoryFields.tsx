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
          <div className="flex items-center justify-center">
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
    // Other cases remain unchanged
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
    case "Farming Tools":
      return (
        <div className="grid grid-cols-2 gap-4">
          {/* Tool Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tool Type
            </label>
            <select
              name="toolType"
              value={formData.toolType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Tool Type</option>
              <option value="Shovel">Shovel</option>
              <option value="Hoe">Hoe</option>
              <option value="Rake">Rake</option>
              <option value="Spade">Spade</option>
              <option value="Plow">Plow</option>
              <option value="Pruning Shears">Pruning Shears</option>
              <option value="Trowel">Trowel</option>
              <option value="Sickle">Sickle</option>
              <option value="Sprayer">Sprayer</option>
              <option value="Seeder">Seeder</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Material
            </label>
            <select
              name="material"
              value={formData.material || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Material</option>
              <option value="Steel">Steel</option>
              <option value="Iron">Iron</option>
              <option value="Aluminum">Aluminum</option>
              <option value="Plastic">Plastic</option>
              <option value="Wood">Wood</option>
              <option value="Fiberglass">Fiberglass</option>
              <option value="Rubber">Rubber</option>
              <option value="Carbon Fiber">Carbon Fiber</option>
              <option value="Carbon Fiber">Other</option>
            </select>
          </div>

          {/* Condition */}
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
            </select>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dimensions (cm)
            </label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 24-inch blade"
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feed Type
            </label>
            <select
              name="feedType"
              value={formData.feedType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Feed Type</option>
              <option value="Hay">Hay</option>
              <option value="Grain">Grain</option>
              <option value="Silage">Silage</option>
              <option value="Other">Other</option>
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
              Weight(kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 50 kg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target Animal
            </label>
            <input
              type="text"
              name="targetAnimal"
              value={formData.targetAnimal || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Cattle"
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
    case "Irrigation & Watering Systems":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Irrigation & Watering System Type
            </label>
            <select
              name="systemType"
              value={formData.systemType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select System Type</option>
              <option value="Drip Irrigation">Drip Irrigation</option>
              <option value="Sprinkler System">Sprinkler System</option>
              <option value="Surface Irrigation">Surface Irrigation</option>
              <option value="Subsurface Irrigation">
                Subsurface Irrigation
              </option>
              <option value="Flood Irrigation">Flood Irrigation</option>
              <option value="Center Pivot Irrigation">
                Center Pivot Irrigation
              </option>
              <option value="Furrow Irrigation">Furrow Irrigation</option>
              <option value="Hand Watering">Hand Watering</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coverage Area(acre)
            </label>
            <input
              type="number"
              required
              name="coverageArea"
              value={formData.coverageArea || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 1 acre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Flow Rate (L/min)
            </label>
            <input
              type="number"
              name="flowRate"
              value={formData.flowRate || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 10 L/min"
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
            </select>
          </div>
        </div>
      );
    case "Storage & Packaging":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Type
            </label>
            <select
              name="itemType"
              value={formData.itemType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Item Type</option>
              <option value="Silo">Silo</option>
              <option value="Bin">Bin</option>
              <option value="Bag">Bag</option>
              <option value="Container">Container</option>
              <option value="Pallet">Pallet</option>
              <option value="Drum">Drum</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Storage Capacity
            </label>
            <input
              type="text"
              name="storageCapacity"
              value={formData.storageCapacity || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 500 kg or 1000 liters"
            />
          </div>
        </div>
      );

    case "Greenhouse Equipment":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Type
            </label>
            <select
              name="itemType"
              value={formData.itemType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Item Type</option>
              <option value="Ventilation Fan">Ventilation Fan</option>
              <option value="Cooling Pad">Cooling Pad</option>
              <option value="Drip Irrigation System">
                Drip Irrigation System
              </option>
              <option value="Water Tank">Water Tank</option>
              <option value="Sprinkler">Sprinkler</option>
              <option value="Other">Other</option>
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
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
        </div>
      );
    default:
      return null;
  }
}

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
    case "Harvested Products":
      return (
        <div className="grid  grid-cols-3 gap-4">
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
          <div className="flex items-center">
            <input
              type="checkbox"
              name="organicStatus"
              checked={formData.organicStatus || false}
              onChange={handleCheckboxChange}
              className="mr-2 accent-green-500"
            />
            <label className="text-sm font-medium text-gray-700">Organic</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quality Grade
            </label>
            <select
              name="qualityGrade"
              value={formData.qualityGrade || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Quality</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
          </div>
        </div>
      );
    // Other cases remain unchanged
    case "Fertilizers & Pesticides":
      return (
        <div className="grid grid-cols-2 gap-4">
          {/* Chemical Composition */}
          <div>
            <label
              htmlFor="chemicalComposition"
              className="block text-sm font-semibold text-gray-700"
            >
              Chemical Composition
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

          {/* Volume */}
          <div>
            <label
              htmlFor="volume"
              className="block text-sm font-semibold text-gray-700"
            >
              Volume(kg)
            </label>
            <input
              type="number"
              name="volume"
              id="volume"
              value={formData.volume || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 50 kg"
              aria-label="Volume"
            />
          </div>

          {/* Application Method */}
          <div>
            <label
              htmlFor="applicationMethod"
              className="block text-sm font-semibold text-gray-700"
            >
              Application Method
            </label>
            <select
              name="applicationMethod"
              id="applicationMethod"
              value={formData.applicationMethod || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Application Method"
            >
              <option value="">Select an Method</option>
              <option value="Spray">Spray</option>
              <option value="Fertigation">Fertigation</option>
              <option value="Soil Application">Soil Application</option>
              <option value="Foliar Application">Foliar Application</option>
              <option value="Drip Irrigation">Drip Irrigation</option>
              <option value="Granular Application">Granular Application</option>
              <option value="Broadcasting">Broadcasting</option>
              <option value="Injection">Injection</option>
              <option value="Top Dressing">Top Dressing</option>
              <option value="Root Dipping">Root Dipping</option>
              <option value="Seed Treatment">Seed Treatment</option>
              <option value="Aerial Application">Aerial Application</option>
              <option value="Systemic Application">Systemic Application</option>
            </select>
          </div>

          {/* Safety Certifications */}
          <div>
            <label
              htmlFor="safetyCertifications"
              className="block text-sm font-semibold text-gray-700"
            >
              Safety Certifications
            </label>
            <select
              name="safetyCertifications"
              id="safetyCertifications"
              value={formData.safetyCertifications || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Safety Certifications"
            >
              <option value="">Select Certification</option>
              <option value="EPA-approved">EPA-approved</option>
              <option value="FDA-approved">FDA-approved</option>
              <option value="OSHA-compliant">OSHA-compliant</option>
              <option value="CE-marked">CE-marked</option>
              <option value="ISO-certified">ISO-certified</option>
              <option value="Eco-friendly">Eco-friendly</option>
              <option value="Non-toxic">Non-toxic</option>
              <option value="Pesticide-free">Pesticide-free</option>
            </select>
          </div>
        </div>
      );
    case "Agricultural Machinery":
      return (
        <div className="grid grid-cols-2 gap-4">
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
              Model
            </label>
            <input
              type="text"
              name="model"
              value={formData.model || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., X500"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Horsepower
            </label>
            <input
              type="text"
              name="horsepower"
              value={formData.horsepower || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 50 HP"
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
    case "Livestock":
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
              <option value="Cow">Cow</option>
              <option value="Buffalo">Buffalo</option>
              <option value="Goat">Goat</option>
              <option value="Sheep">Sheep</option>
              <option value="Chicken">Chicken</option>
              <option value="Duck">Duck</option>
              <option value="Turkey">Turkey</option>
              <option value="Horse">Horse</option>
              <option value="Camel">Camel</option>
              <option value="Other">Other</option>
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
              Age(year)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 2 years"
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
            <input
              type="text"
              name="seedPlantType"
              value={formData.seedPlantType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Hybrid Corn"
            />
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
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Type
            </label>
            <input
              type="text"
              name="itemType"
              value={formData.itemType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Silo"
            />
          </div>
        </>
      );
    case "Greenhouse Equipment":
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Type
            </label>
            <input
              type="text"
              name="itemType"
              value={formData.itemType || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Ventilation Fan"
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
        </>
      );
    default:
      return null;
  }
}

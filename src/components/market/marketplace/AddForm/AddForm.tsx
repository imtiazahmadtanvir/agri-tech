"use client";
import React, { useState, FormEvent } from "react";
import { PiFarmBold } from "react-icons/pi";
import { IoLeafOutline, IoLeaf, IoColorPalette } from "react-icons/io5";
import axios from "axios"; // For API submission
import { useRouter } from "next/navigation"; // For redirect after submission

const marketplaceCategories = [
  { name: "Harvested Products", icon: <PiFarmBold /> },
  { name: "Fertilizers & Pesticides", icon: <IoLeafOutline /> },
  { name: "Agricultural Machinery", icon: <IoColorPalette /> },
  { name: "Farming Tools", icon: <IoLeaf /> },
  { name: "Livestock", icon: <PiFarmBold /> },
  { name: "Animal Feed", icon: <IoLeafOutline /> },
  { name: "Seeds & Plants", icon: <IoLeafOutline /> },
  { name: "Irrigation & Watering Systems", icon: <IoColorPalette /> },
  { name: "Storage & Packaging", icon: <IoLeaf /> },
  { name: "Greenhouse Equipment", icon: <PiFarmBold /> },
];

interface FormData {
  productName: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  location: string;
  contactInfo: string;
  photos: File | null;
  availabilityDate: string;
  // Category-specific fields
  cropType?: string;
  harvestDate?: string;
  organicStatus?: boolean;
  qualityGrade?: string;
  chemicalComposition?: string;
  volume?: string;
  applicationMethod?: string;
  safetyCertifications?: string;
  brand?: string;
  model?: string;
  condition?: string;
  yearOfManufacture?: string;
  horsepower?: string;
  toolType?: string;
  material?: string;
  dimensions?: string;
  animalType?: string;
  breed?: string;
  age?: string;
  healthStatus?: string;
  gender?: string;
  feedType?: string;
  nutritionalContent?: string;
  weight?: string;
  targetAnimal?: string;
  seedPlantType?: string;
  germinationRate?: string;
  plantingSeason?: string;
  systemType?: string;
  coverageArea?: string;
  flowRate?: string;
  itemType?: string;
}

export default function AddProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
    unit: "",
    location: "",
    contactInfo: "",
    photos: null,
    availabilityDate: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, photos: file }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (
      !formData.productName ||
      !formData.category ||
      !formData.price ||
      !formData.quantity
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value !== undefined && value !== null) {
          data.append(key, value instanceof File ? value : String(value));
        }
      }

      const response = await axios.post("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        router.push("/market/buyer-seller");
      } else {
        setError(response.data.message || "Failed to submit listing.");
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
      console.error(err);
    }
  };

  const renderCategoryFields = () => {
    switch (formData.category) {
      case "Harvested Products":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Crop Type
              </label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Wheat, Tomatoes"
              />
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
            <div className="flex items-center">
              <input
                type="checkbox"
                name="organicStatus"
                checked={formData.organicStatus || false}
                onChange={handleCheckboxChange}
                className="mr-2 accent-green-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Organic
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quality Grade
              </label>
              <input
                type="text"
                name="qualityGrade"
                value={formData.qualityGrade || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Grade A"
              />
            </div>
          </>
        );
      case "Fertilizers & Pesticides":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chemical Composition
              </label>
              <input
                type="text"
                name="chemicalComposition"
                value={formData.chemicalComposition || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., NPK 20-20-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Volume
              </label>
              <input
                type="text"
                name="volume"
                value={formData.volume || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 50 kg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Application Method
              </label>
              <input
                type="text"
                name="applicationMethod"
                value={formData.applicationMethod || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Spray"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Safety Certifications
              </label>
              <input
                type="text"
                name="safetyCertifications"
                value={formData.safetyCertifications || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., EPA-approved"
              />
            </div>
          </>
        );
      case "Agricultural Machinery":
        return (
          <>
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
                type="text"
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
          </>
        );
      case "Farming Tools":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tool Type
              </label>
              <input
                type="text"
                name="toolType"
                value={formData.toolType || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Shovel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Steel"
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dimensions
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
          </>
        );
      case "Livestock":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Animal Type
              </label>
              <input
                type="text"
                name="animalType"
                value={formData.animalType || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Cow"
              />
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 2 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Health Status
              </label>
              <input
                type="text"
                name="healthStatus"
                value={formData.healthStatus || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Fully vaccinated"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </>
        );
      case "Animal Feed":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Feed Type
              </label>
              <input
                type="text"
                name="feedType"
                value={formData.feedType || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Hay"
              />
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
                Weight
              </label>
              <input
                type="text"
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
          </>
        );
      case "Seeds & Plants":
        return (
          <>
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
                Germination Rate
              </label>
              <input
                type="text"
                name="germinationRate"
                value={formData.germinationRate || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 95%"
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
          </>
        );
      case "Irrigation & Watering Systems":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                System Type
              </label>
              <input
                type="text"
                name="systemType"
                value={formData.systemType || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Drip Irrigation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Coverage Area
              </label>
              <input
                type="text"
                name="coverageArea"
                value={formData.coverageArea || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 1 acre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Flow Rate
              </label>
              <input
                type="text"
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
          </>
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
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Add New Product Listing
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a category</option>
            {marketplaceCategories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price ($)*
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit
          </label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., kg, ton, piece"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Springfield Farm, IL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Information
          </label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 555-123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photos
          </label>
          <input
            type="file"
            name="photos"
            onChange={handleFileChange}
            className="mt-1 block w-full text-gray-700"
            accept="image/*"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability Date
          </label>
          <input
            type="date"
            name="availabilityDate"
            value={formData.availabilityDate}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category-Specific Fields */}
        {formData.category && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              Additional Details for {formData.category}
            </h3>
            {renderCategoryFields()}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}

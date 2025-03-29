"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  productName: string;
  category: string;
  subcategory: string;
  quantity: number;
  unit: string;
  price: number;
  negotiable: boolean;
  location: string;
  delivery: string;
  deliveryRadius?: number;
  description: string;
  condition: string;
  images: File[];
  stockStatus: string;
  contactMethod: string;
  // Category-specific fields
  harvestDate?: string; // Crops
  organicCertified?: boolean; // Crops, Seeds
  age?: number; // Livestock, Fisheries
  breed?: string; // Livestock
  brand?: string; // Equipment, Pesticides, Fertilizers
  manufactureYear?: number; // Equipment
  expiryDate?: string; // Pesticides, Fertilizers, Animal Feed
  feedType?: string; // Animal Feed
  species?: string; // Fisheries
}

const CreateListingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    subcategory: "",
    quantity: 0,
    unit: "",
    price: 0,
    negotiable: false,
    location: "",
    delivery: "",
    deliveryRadius: undefined,
    description: "",
    condition: "",
    images: [],
    stockStatus: "",
    contactMethod: "",
    harvestDate: undefined,
    organicCertified: false,
    age: undefined,
    breed: "",
    brand: "",
    manufactureYear: undefined,
    expiryDate: undefined,
    feedType: "",
    species: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your API call or backend logic here
  };

  // Main Categories
  const categories = [
    { name: "crops" },
    { name: "livestock" },
    { name: "seeds" },
    { name: "fertilizers" },
    { name: "equipment" },
    { name: "pesticides" },
    { name: "animal-feed" },
    { name: "fisheries" },
  ];

  // Subcategory options based on category
  const subcategoryOptions: { [key: string]: string[] } = {
    crops: ["Rice", "Wheat", "Corn", "Potato"],
    livestock: ["Cow", "Chicken", "Goat", "Sheep"],
    seeds: ["Rice Seed", "Wheat Seed", "Corn Seed"],
    fertilizers: ["Organic", "Chemical", "Compost"],
    equipment: ["Tractor", "Plow", "Harvester", "Sprayer"],
    pesticides: ["Insecticide", "Herbicide", "Fungicide"],
    "animal-feed": ["Poultry Feed", "Cattle Feed", "Fish Feed"],
    fisheries: ["Tilapia", "Carp", "Shrimp", "Catfish"],
  };

  // Condition options based on category
  const conditionOptions: { [key: string]: string[] } = {
    crops: ["Fresh", "Processed"],
    livestock: ["Live"],
    seeds: ["Fresh"],
    fertilizers: ["New"],
    equipment: ["New", "Used", "Refurbished"],
    pesticides: ["New"],
    "animal-feed": ["New"],
    fisheries: ["Live", "Processed"],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Create a Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Paddy Rice"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name.charAt(0).toUpperCase() +
                  cat.name.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory (Dynamic) */}
        {formData.category && (
          <div>
            <label
              htmlFor="subcategory"
              className="block font-medium text-gray-700"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Subcategory (Optional)</option>
              {subcategoryOptions[formData.category]?.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity & Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="quantity"
              className="block font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="unit" className="block font-medium text-gray-700">
              Unit
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Unit</option>
              <option value="kg">kg</option>
              <option value="ton">Ton</option>
              <option value="piece">Piece</option>
              <option value="liter">Liter</option>
            </select>
          </div>
        </div>

        {/* Price & Negotiable */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="negotiable"
              name="negotiable"
              checked={formData.negotiable}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label htmlFor="negotiable" className="ml-2 text-gray-700">
              Negotiable
            </label>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Rajshahi"
          />
        </div>

        {/* Delivery */}
        <div>
          <label className="block font-medium text-gray-700">
            Delivery Option
          </label>
          <select
            id="delivery"
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Delivery Option</option>
            <option value="pickup">Pickup Only</option>
            <option value="delivery">Delivery Available</option>
            <option value="both">Both</option>
          </select>
          {(formData.delivery === "delivery" ||
            formData.delivery === "both") && (
            <div className="mt-2">
              <label
                htmlFor="deliveryRadius"
                className="block font-medium text-gray-700"
              >
                Delivery Radius (km)
              </label>
              <input
                type="number"
                id="deliveryRadius"
                name="deliveryRadius"
                value={formData.deliveryRadius || ""}
                onChange={handleChange}
                min="1"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Organic rice, harvested March 2025"
          />
        </div>

        {/* Condition (Dynamic) */}
        {formData.category && (
          <div>
            <label
              htmlFor="condition"
              className="block font-medium text-gray-700"
            >
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Condition</option>
              {conditionOptions[formData.category]?.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category-Specific Fields */}
        {formData.category === "crops" && (
          <>
            <div>
              <label
                htmlFor="harvestDate"
                className="block font-medium text-gray-700"
              >
                Harvest Date
              </label>
              <input
                type="date"
                id="harvestDate"
                name="harvestDate"
                value={formData.harvestDate || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="organicCertified"
                name="organicCertified"
                checked={formData.organicCertified}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="organicCertified" className="ml-2 text-gray-700">
                Organic Certified
              </label>
            </div>
          </>
        )}

        {formData.category === "livestock" && (
          <>
            <div>
              <label htmlFor="age" className="block font-medium text-gray-700">
                Age (Months)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
                min="1"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="breed"
                className="block font-medium text-gray-700"
              >
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Holstein"
              />
            </div>
          </>
        )}

        {formData.category === "seeds" && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="organicCertified"
              name="organicCertified"
              checked={formData.organicCertified}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label htmlFor="organicCertified" className="ml-2 text-gray-700">
              Organic Certified
            </label>
          </div>
        )}

        {formData.category === "fertilizers" && (
          <>
            <div>
              <label
                htmlFor="brand"
                className="block font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Yara"
              />
            </div>
            <div>
              <label
                htmlFor="expiryDate"
                className="block font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}

        {formData.category === "equipment" && (
          <>
            <div>
              <label
                htmlFor="brand"
                className="block font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="e.g., John Deere"
              />
            </div>
            <div>
              <label
                htmlFor="manufactureYear"
                className="block font-medium text-gray-700"
              >
                Manufacture Year
              </label>
              <input
                type="number"
                id="manufactureYear"
                name="manufactureYear"
                value={formData.manufactureYear || ""}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}

        {formData.category === "pesticides" && (
          <>
            <div>
              <label
                htmlFor="brand"
                className="block font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Bayer"
              />
            </div>
            <div>
              <label
                htmlFor="expiryDate"
                className="block font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}

        {formData.category === "animal-feed" && (
          <>
            <div>
              <label
                htmlFor="feedType"
                className="block font-medium text-gray-700"
              >
                Feed Type
              </label>
              <input
                type="text"
                id="feedType"
                name="feedType"
                value={formData.feedType}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Protein Supplement"
              />
            </div>
            <div>
              <label
                htmlFor="expiryDate"
                className="block font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}

        {formData.category === "fisheries" && (
          <>
            <div>
              <label htmlFor="age" className="block font-medium text-gray-700">
                Age (Months)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
                min="1"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="species"
                className="block font-medium text-gray-700"
              >
                Species
              </label>
              <input
                type="text"
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Tilapia"
              />
            </div>
          </>
        )}

        {/* Images */}
        <div>
          <label htmlFor="images" className="block font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
          <p className="text-sm text-gray-500 mt-1">Max 5 images</p>
        </div>

        {/* Stock Status */}
        <div>
          <label
            htmlFor="stockStatus"
            className="block font-medium text-gray-700"
          >
            Stock Status
          </label>
          <select
            id="stockStatus"
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Stock Status</option>
            <option value="inStock">In Stock</option>
            <option value="preOrder">Pre-Order</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>

        {/* Contact Method */}
        <div>
          <label
            htmlFor="contactMethod"
            className="block font-medium text-gray-700"
          >
            Preferred Contact Method
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Contact Method</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="chat">In-App Chat</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListingForm;

import { FormData } from "@/types/type";
import React from "react";

interface CategoryFieldsProps {
  formData: FormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        <div className="space-y-4">
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
            <label className="text-sm font-medium text-gray-700">Organic</label>
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
        </div>
      );
  }
}

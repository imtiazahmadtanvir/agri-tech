"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormInput } from "@/types/type";
interface PhotoSelectionFormProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}
export default function PhotoSelectionForm({
  images,
  setImages,
  register,
  errors,
}: PhotoSelectionFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
      e.target.value = "";
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setImages((prev) => [...prev, ...droppedFiles]);
      e.dataTransfer.clearData();
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl pb-6">
      <h4 className=" px-6 py-4 font-medium mb-3 border-b">
        Add Product Photos
      </h4>
      <div
        className={`mx-6 relative border-2 border-dashed  rounded-lg p-4 transition-colors ${
          dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Upload className="w-10 h-10 text-green-500 mb-3" />
            <p className="text-base font-medium text-gray-700 mb-2 text-center">
              Drag and drop your images here
            </p>
            <p className="text-sm text-gray-500 mb-4 text-center">
              or click to browse files
            </p>
            <label
              htmlFor="image"
              className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors text-sm"
            >
              Browse image
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${idx}`}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {/* 2nd upload Button */}
            <label
              htmlFor="image"
              className={`flex items-center justify-center border-2 border-dashed rounded-md h-40 cursor-pointer hover:border-green-400 transition ${
                images.length > 2 && "hidden"
              }`}
            >
              <Upload className="w-6 h-6 text-green-500" />
            </label>
          </div>
        )}
        <input
          id="image"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <p className="text-xs px-6 mt-4 text-gray-400">
        You need to add at least 3 images. Pay attention to the quality of the
        pictures you add, comply with the background color standards.
      </p>
      {/* price info */}
      <div className="grid px-6 lg:grid-cols-1 gap-4">
        {/* regular price */}
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            id="price"
            className="border rounded-xl px-6 py-3 w-full mt-2 "
            placeholder="Enter product price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        {/* discount price */}
        <div>
          <label htmlFor="discountedPrice">Discounted Price</label>
          <input
            type="number"
            {...register("discountedPrice")}
            id="discountedPrice"
            className="border rounded-xl px-6 py-3 w-full mt-2 "
            placeholder="Enter product price"
          />
        </div>
      </div>
    </div>
  );
}

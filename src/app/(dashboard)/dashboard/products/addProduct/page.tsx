"use client";
import PhotoSelectionForm from "@/components/products/PhotoSelectionForm";
import ProductInfoForm from "@/components/products/ProductInfoForm";
import React, { useState } from "react";

export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false); // For policy checkbox

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the policy before submitting.");
      return;
    }

    // Submit logic here
    console.log({ images, tags });
  };

  return (
    <form className="grid lg:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <ProductInfoForm setTags={setTags} tags={tags} />
      <div>
        <PhotoSelectionForm images={images} setImages={setImages} />

        <div className=" mt-3 bg-white flex justify-between items-center px-6 py-3 rounded-2xl">
          <div className="">
            <label className="space-x-1.5">
              <input
                required
                type="checkbox"
                className=""
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-green-600 underline"
                >
                  product listing policy
                </a>
                .
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
}

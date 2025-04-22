"use client";
import PhotoSelectionForm from "@/components/products/PhotoSelectionForm";
import ProductInfoForm from "@/components/products/ProductInfoForm";
import { IFormInput } from "@/types/type";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function AddProduct() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <form
      className="grid lg:grid-cols-2 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProductInfoForm register={register} setTags={setTags} tags={tags} />
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

"use client";
import PhotoSelectionForm from "@/components/products/PhotoSelectionForm";
import ProductInfoForm from "@/components/products/ProductInfoForm";
import { IFormInput } from "@/types/type";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = { ...data, images, tags };
    try {
      const res = await axios.post("/api/listings", formData);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error creating product!");
    }
  };
  return (
    <form
      className="grid lg:grid-cols-2 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProductInfoForm
        register={register}
        setTags={setTags}
        tags={tags}
        errors={errors}
      />
      <div>
        <PhotoSelectionForm
          images={images}
          setImages={setImages}
          register={register}
          errors={errors}
        />

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

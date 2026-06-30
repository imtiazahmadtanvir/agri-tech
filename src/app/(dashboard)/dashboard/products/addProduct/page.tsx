"use client";
import PhotoSelectionForm from "@/components/products/PhotoSelectionForm";
import ProductInfoForm from "@/components/products/ProductInfoForm";
import Spinner from "@/components/shared/Spinner";
import { IFormInput } from "@/types/type";
import { uploadPhotos } from "@/utils/imageUpload";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [photoError, setPhotoError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setPhotoError("");
      if (images.length === 0) {
        setPhotoError("At least one photo is required to post a listing.");
        setLoading(false);
        return;
      }
      const photoUrls = await uploadPhotos(images);
      setLoading(true);
      const formData = {
        ...data,
        photoUrls,
        tags,
        price: Number(data.price),
        stock: data.stock,
      };
      const res = await axios.post("/api/listings", formData);

      if (res.data.success) {
        toast.success(res.data.message);
      }
      reset();
      setImages([]);
      setTags([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error creating product!");
    } finally {
      setLoading(false);
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
          photoError={photoError}
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
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Product"}{" "}
            {isLoading && <Spinner size={14} />}
          </button>
        </div>
      </div>
    </form>
  );
}

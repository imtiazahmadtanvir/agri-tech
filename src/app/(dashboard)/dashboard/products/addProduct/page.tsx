"use client";
import PhotoSelectionForm from "@/components/products/PhotoSelectionForm";
import ProductInfoForm from "@/components/products/ProductInfoForm";
import React, { useState } from "react";

export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  return (
    <form className="grid lg:grid-cols-2 gap-4">
      <ProductInfoForm />
      <PhotoSelectionForm images={images} setImages={setImages} />
    </form>
  );
}

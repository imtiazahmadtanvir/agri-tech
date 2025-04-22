"use client";
import PhotoSelectionForm from "@/components/products/PhotoSelectionForm";
import ProductInfoForm from "@/components/products/ProductInfoForm";
import React, { useState } from "react";

export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  return (
    <div>
      <ProductInfoForm />
      <PhotoSelectionForm images={images} setImages={setImages} />
    </div>
  );
}

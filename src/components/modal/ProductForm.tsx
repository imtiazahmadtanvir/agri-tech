import { useEffect, useState } from "react";
import PhotoSelectionForm from "../products/ListingForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductForm({ isOpen, onClose }: ModalProps) {
  const [images, setImages] = useState<File[]>([]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl relative px-4 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <PhotoSelectionForm images={images} setImages={setImages} />
      </div>
    </div>
  );
}

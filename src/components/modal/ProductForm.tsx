import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductForm({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl relative px-4 py-6"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

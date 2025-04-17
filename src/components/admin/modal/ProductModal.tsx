import React from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl relative px-4 py-6">
        <button onClick={() => onClose()}>Close</button>
      </div>
    </div>
  );
}

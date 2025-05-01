"use client";
import { useState } from "react";
import { Product } from "@/types/type";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";

interface ProductFormModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (product: Product) => void;
}

export default function ProductFormModal({
  product,
  onClose,
  onUpdate,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState<Product>(product);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    try {
      const response = await axios.patch(`/api/products/${product._id}`, {
        productName: formData.productName,
        description: formData.description,
        unit: formData.unit,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to update product", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-2xl font-bold">
              Edit Product
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Product Image */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={formData.photoUrls[0]}
                    alt={formData.productName}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (৳)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="kg">kg</option>
                      <option value="piece">piece</option>
                      <option value="dozen">dozen</option>
                      <option value="liter">liter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="Fresh Fruits">Fresh Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Meat">Meat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin">↻</span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

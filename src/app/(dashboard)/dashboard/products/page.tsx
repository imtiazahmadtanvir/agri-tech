// app/dashboard/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { Product } from "@/types/type";
import { productCategories } from "@/lib/productCategory";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import ProductFormModal from "@/components/products/ProductFormModal";

import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/components/modal/DeleteConfirmationModal";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToDeleteName, setProductToDeleteName] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/my-listing");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(`/api/products/${productToDelete}`);
      setProducts(
        products.filter((product) => product._id !== productToDelete)
      );
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Failed to delete product");
    } finally {
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteClick = (productId: string, productName: string) => {
    setProductToDelete(productId);
    setProductToDeleteName(productName);
    setDeleteModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    toast.success("Product updated successfully");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !categoryFilter || product.category === categoryFilter;

    const matchesStock =
      !stockFilter ||
      (stockFilter === "in" && Number(product.stock) > 0) ||
      (stockFilter === "out" && Number(product.stock) <= 0);

    const matchesStatus =
      !statusFilter ||
      (statusFilter === "approved" && product.verifyStatus) ||
      (statusFilter === "pending" && !product.verifyStatus);

    return matchesSearch && matchesCategory && matchesStock && matchesStatus;
  });

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Filter Section */}
      <div className="px-4 py-2">
        <h3 className="text-xl font-semibold">Filter</h3>
        <div className="flex flex-col md:flex-row gap-4 py-3">
          <select
            className="border rounded-md px-3 py-1.5"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>

          <select
            className="border rounded-md px-3 py-1.5"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {productCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-md px-3 py-1.5"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Search + Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-b px-4 py-3">
        <input
          className="border px-4 py-2 rounded-full w-full md:w-1/2"
          type="search"
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-4">
          <Link
            href={"/dashboard/products/addProduct"}
            className="flex items-center shadow rounded-md px-3 py-2 bg-white font-semibold"
          >
            <GoPlus className="mr-1" /> Add Product
          </Link>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center py-6">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table-auto w-full border-gray-300">
              <thead className="bg-green-100 text-left">
                <tr>
                  <th className="px-4 py-2 border-b">Product Name</th>
                  <th className="px-4 py-2 border-b">Category</th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Stock</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-green-50">
                      <td className="px-4 py-2 border-b flex items-center gap-2">
                        <Image
                          width={40}
                          height={40}
                          src={product.photoUrls[0]}
                          alt={product.productName}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span>{product.productName}</span>
                      </td>
                      <td className="px-4 py-2 border-b">
                        {product.category || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        ৳{product.discountedPrice || product.price}/
                        {product.unit || "unit"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {product.stock || 0}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {product.verifyStatus ? (
                          <span className="text-green-600 font-medium">
                            Approved
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-medium">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(
                                product._id,
                                product.productName
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-4 text-center" colSpan={6}>
                      No matching products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (shown on mobile) */}
          <div className="md:hidden p-4 space-y-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <Image
                      width={60}
                      height={60}
                      src={product.photoUrls[0]}
                      alt={product.productName}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{product.productName}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-500"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(
                                product._id,
                                product.productName
                              )
                            }
                            className="text-red-500"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {product.category || "N/A"}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        <span className="text-sm">
                          <span className="font-medium">Price:</span> ৳
                          {product.discountedPrice || product.price}/
                          {product.unit || "unit"}
                        </span>
                        <span className="text-sm">
                          <span className="font-medium">Stock:</span>{" "}
                          {product.stock || 0}
                        </span>
                        <span className="text-sm">
                          <span className="font-medium">Status:</span>{" "}
                          {product.verifyStatus ? (
                            <span className="text-green-600">Approved</span>
                          ) : (
                            <span className="text-yellow-600">Pending</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No matching products found.
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductFormModal
          product={selectedProduct}
          onClose={handleModalClose}
          onUpdate={handleProductUpdate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          productName={productToDeleteName}
        />
      )}
    </div>
  );
}

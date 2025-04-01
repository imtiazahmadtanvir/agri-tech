"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { updateUserProfile } from "../action/auth/updateUserProfile";

export default function CompleteProfile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const intendedUrl = searchParams.get("redirect") || "/dashboard";

  const [formData, setFormData] = useState({
    name: "",
    village: "",
    district: "",
    state: "",
    farmSize: "",
    crops: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user.isProfileComplete) {
      router.push(intendedUrl);
    }
  }, [session, status, router, intendedUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const crop = e.target.value;
    setFormData((prev) => ({
      ...prev,
      crops: prev.crops.includes(crop)
        ? prev.crops.filter((c) => c !== crop)
        : [...prev.crops, crop],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = await updateUserProfile({
      email: session?.user.email || "",
      ...formData,
    });

    if (data.success) {
      toast.success("Profile updated successfully!");
      router.push(intendedUrl);
    } else {
      toast.error(data.message || "Something went wrong.");
    }
    setLoading(false);
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <section className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg my-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌾 Complete Your Farm Profile
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Please provide your farm details to continue.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., John Doe"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Village/Town
          </label>
          <input
            type="text"
            name="village"
            placeholder="e.g., Rampur"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.village}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">District</label>
          <input
            type="text"
            name="district"
            placeholder="e.g., Patna"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">State</label>
          <input
            type="text"
            name="state"
            placeholder="e.g., Bihar"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Farm Size (acres)
          </label>
          <input
            type="number"
            name="farmSize"
            placeholder="e.g., 5"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.farmSize}
            onChange={handleChange}
            min="0"
            step="0.1"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Main Crops (Select all that apply)
          </label>
          <div className="space-y-2">
            {["Wheat", "Rice", "Maize", "Tomato", "Potato"].map((crop) => (
              <label key={crop} className="flex items-center">
                <input
                  type="checkbox"
                  value={crop}
                  checked={formData.crops.includes(crop)}
                  onChange={handleCropChange}
                  className="mr-2 accent-green-500"
                />
                {crop}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
          disabled={loading || formData.crops.length === 0}
        >
          {loading ? "Submitting..." : "Save Profile"}
        </button>
      </form>
    </section>
  );
}

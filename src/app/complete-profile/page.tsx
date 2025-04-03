"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { updateUserProfile } from "../action/auth/updateUserProfile";
const marketplaceCategories = [
  { name: "crops" },
  { name: "livestock" },
  { name: "Seeds & Plants" },
  { name: "fertilizers" },
  { name: "equipment" },
  { name: "pesticides" },
  { name: "Animal Feed" },
  { name: "fisheries" },
];
export default function CompleteProfile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const intendedUrl = searchParams.get("redirect") || "/dashboard";

  const [formData, setFormData] = useState({
    name: "",
    village: "",
    district: "",
    phoneNumber: "",
    state: "",
    landSize: "",
    crops: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  console.log(session?.user.isProfileComplete);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   } else if (session?.user.isProfileComplete) {
  //     router.push(intendedUrl);
  //   }
  // }, [session, status, router, intendedUrl]);

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
    <section className="max-w-4xl mx-auto p-6 bg-white border  shadow-lg my-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌾 Complete Your Account Creation
      </h2>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., John Doe"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Last Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., John Doe"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Contact</label>
          <input
            type="number"
            name="phoneNumber"
            placeholder="your phone number"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.phoneNumber}
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
            placeholder="e.g., Bokultoli"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
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
            placeholder="dhaka"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            land Size (acres)
          </label>
          <input
            type="number"
            name="landSize"
            placeholder="e.g., 5"
            className="w-full p-1.5 border  focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.landSize}
            onChange={handleChange}
            min="0"
            step="0.1"
            required
          />
        </div>
        <div className="mb-3 col-span-2">
          <label className="block font-semibold text-gray-700 mb-2">
            Categories
          </label>
          <div className="space-y-2 grid-cols-3 grid">
            {marketplaceCategories.map((crop) => (
              <label key={crop.name} className="flex items-center">
                <input
                  type="checkbox"
                  value={crop.name}
                  checked={formData.crops.includes(crop.name)}
                  onChange={handleCropChange}
                  className="mr-2 accent-green-500"
                />
                <p className="capitalize">{crop.name}</p>
              </label>
            ))}
          </div>
        </div>
        <div>
          <input type="checkbox" name="" id="" />
        </div>
        <button
          type="submit"
          className=" text-center px-6 w-fit col-span-2 bg-green-600 text-white py-2  hover:bg-green-700 transition disabled:bg-green-400"
          disabled={loading || formData.crops.length === 0}
        >
          {loading ? "finishing..." : "Finish"}
        </button>
      </form>
    </section>
  );
}

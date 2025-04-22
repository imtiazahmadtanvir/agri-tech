import { productCategories } from "@/lib/productCategory";

export default function ProductInfoForm() {
  return (
    <div className="space-y-2 bg-white p-4 rounded-2xl">
      <label htmlFor="name" className="block  font-medium">
        Product name <sup className="text-red-500">*</sup>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="border rounded-xl px-6 py-3 w-full "
        placeholder="Enter product name"
        maxLength={50}
        required
      />
      <p className="text-sm text-gray-400">
        Do not exceed 20 characters when entering the product name.
      </p>
      <div>
        <label htmlFor="name" className="block  font-medium">
          Category <sup className="text-red-500">*</sup>
        </label>
        <select
          className="border mt-2 rounded-xl px-6 py-3 w-full "
          name="category"
          id="category"
        >
          <option value="">Choose category</option>
          {productCategories.map((item) => (
            <option key={item.id} value="">
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

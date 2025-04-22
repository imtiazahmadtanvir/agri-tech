import { productCategories } from "@/lib/productCategory";
import TagInput from "./TagInput";
import { TagsProps } from "@/types/type";

export default function ProductInfoForm({ tags, setTags }: TagsProps) {
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
      <p className="text-xs text-gray-400">
        Do not exceed 20 characters when entering the product name.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {/* category */}
        <div>
          <label htmlFor="name" className="block  font-medium">
            Category <sup className="text-red-500">*</sup>
          </label>
          <select
            required
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
        {/* stock */}
        <div>
          <label htmlFor="name" className="block  font-medium">
            Stock<sup className="text-red-500">*</sup>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="border rounded-xl px-6 py-3 w-full mt-2 "
            placeholder="Enter product name"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block  font-medium">
          Description<sup className="text-red-500">*</sup>
        </label>
        <textarea
          className="border rounded-xl px-6 py-3 w-full h-52"
          name="description"
          id="description"
          placeholder="Short description about the product"
        ></textarea>
      </div>
      <label htmlFor="description" className="block  font-medium">
        Tags<sup className="text-red-500">*</sup>
      </label>
      <TagInput setTags={setTags} tags={tags} />
    </div>
  );
}

import Link from "next/link";

interface FiltersProps {
  useCase: "seed-equipment" | "buyer-seller";
}

const Filters = ({ useCase }: FiltersProps) => {
  const categories =
    useCase === "seed-equipment"
      ? [
          { value: "", label: "All Categories" },
          { value: "seeds", label: "Seeds" },
          { value: "equipment", label: "Equipment" },
          { value: "fertilizers", label: "Fertilizers" },
          { value: "pesticides", label: "Pesticides" },
          { value: "tools", label: "Tools & Machinery" },
        ]
      : [
          { value: "", label: "All Categories" },
          { value: "crops", label: "Crops" },
          { value: "fruits", label: "Fruits" },
          { value: "vegetables", label: "Vegetables" },
          { value: "livestock", label: "Livestock" },
          { value: "dairy", label: "Dairy Products" },
          { value: "poultry", label: "Poultry" },
          { value: "fishery", label: "Fish & Aquaculture" },
          { value: "organic", label: "Organic Produce" },
          { value: "herbs", label: "Herbs & Medicinal Plants" },
          { value: "other", label: "Other" },
        ];

  return (
    <div className="mb-6 flex justify-between items-center">
      <select className="border border-gray-300 rounded-md p-2 text-[#0D401C]">
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <div>
        <Link
          className="bg-[#0D401C] text-white px-4 py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-colors duration-300"
          href={"/market/buyer-seller/form"}
        >
          Post an ad
        </Link>
      </div>
      <select className="border border-gray-300 rounded-md p-2 text-[#0D401C]">
        <option value="">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="date">Newest First</option>
      </select>
    </div>
  );
};

export default Filters;

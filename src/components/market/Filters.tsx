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
        ]
      : [
          { value: "", label: "All Categories" },
          { value: "crops", label: "Crops" },
          { value: "livestock", label: "Livestock" },
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

"use client";

export default function Sidebar() {
  const marketplaceCategories = [
    { id: 1, name: "Fresh Fruits" },
    { id: 2, name: "Vegetables" },
    { id: 3, name: "Grains & Cereals" },
    { id: 4, name: "Dairy Products" },
    { id: 5, name: "Eggs" },
    { id: 6, name: "Honey & Jams" },
    { id: 7, name: "Organic Products" },
    { id: 8, name: "Herbs & Spices" },
    { id: 9, name: "Poultry & Meat" },
    { id: 10, name: "Flowers & Plants" },
  ];
  const restFiler = () => {
    setMaxPrice("");
    setMinPrice("");
    setSelectedCategories("");
    setLocation("all location");
  };
  return (
    <aside className=" h-fit sticky top-0  left-0">
      <div className="border rounded-2xl">
        {/* Categories */}
        <h3 className="bg-[#0D401C] text-2xl rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Categories
        </h3>
        <div className="flex p-7 flex-col text-left">
          {marketplaceCategories.map((item) => (
            <button
              className="text-xl py-4 px-2 border-b border-dashed text-left w-full"
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

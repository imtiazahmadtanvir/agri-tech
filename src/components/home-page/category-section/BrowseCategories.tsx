import Image from "next/image"
import Link from "next/link"
import { Apple, Package, Milk, Beef, Nut, Bird } from "lucide-react"

const categories = [
  {
    id: 1,
    title: "Fruits And Vegetables",
    icon: Apple,
    bgColor: "bg-[#BDFFC7]",
    href: "#",
  },
  {
    id: 2,
    title: "Packaged Foods",
    icon: Package,
    bgColor: "bg-[#FFE5D8]",
    href: "#",
  },
  {
    id: 3,
    title: "Milks And Dairies",
    icon: Milk,
    bgColor: "bg-[#D6F3FF]",
    href: "#",
  },
  {
    id: 4,
    title: "Types Of Livestock Meat",
    icon: Beef,
    bgColor: "bg-[#FFF3D1]",
    href: "#",
  },
  {
    id: 5,
    title: "Health And Wellness",
    icon: Nut,
    bgColor: "bg-[#FFE1EC]",
    href: "#",
  },
  {
    id: 6,
    title: "Poultry Meat And Eggs",
    icon: Bird,
    bgColor: "bg-[#E8FFBD]",
    href: "#",
  },
]

export function BrowseCategories() {
  return (
    <section className="py-16 px-4 md:py-24 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of fresh and quality products across various categories
          </p>
          <div className="flex justify-center my-6 h-4">
            <Image src="/BlogSection/pxl-heading-shap.webp" alt="" width={40} height={20} className="text-yellow-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${category.bgColor}`}
            >
              <div className="aspect-square p-6 flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-20 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <category.icon className="w-10 h-10 text-gray-600 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  {category.title}
                </h3>
              </div>
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


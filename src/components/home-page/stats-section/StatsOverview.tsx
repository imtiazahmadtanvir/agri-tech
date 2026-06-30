import Image from "next/image";

const stats = [
  { icon: "/icons/stat leaf.png", number: "1,360", label: "Completed Projects" },
  { icon: "/icons/stat cow.png", number: "1,036", label: "Animals And Plants" },
  { icon: "/icons/stat tractor.png", number: "63", label: "Years Of Experience" },
  { icon: "/icons/stat harvest.png", number: "4,657", label: "Tons of Harvest" },
];

const StatsOverview = () => {
  return (
    <div className="bg-[#5a3a12] text-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="relative flex flex-col items-center justify-center">
            {/* Vertical Divider */}
            {index !== 0 && (
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-[1px] h-16 bg-gray-400 hidden md:block"></div>
            )}
            <Image className="mb-4" src={stat.icon} alt={stat.label} width={50} height={50} />
            <h3 className="text-4xl font-bold text-yellow-400">{stat.number}</h3>
            <p className="text-lg font-medium ">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;

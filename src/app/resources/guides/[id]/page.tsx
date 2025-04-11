import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ThumbsUp,
} from "lucide-react";

type GuidePageProps = {
  params: Promise<{ id: string }>;
};

export default async function GuidePage({ params }: GuidePageProps) {
  const resp = await params;
  const { id } = resp;

  const guideId = parseInt(id);
  const guide = guides.find((g) => g.id === guideId) || guides[0];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Guide Header */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={guide.image || "/placeholder.svg"}
            alt={guide.title}
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-end p-8 text-center text-white">
          <span className="mb-3 inline-block rounded-full bg-green-600 px-4 py-1 text-sm font-medium">
            {guide.category}
          </span>
          <h1 className="mb-4 max-w-4xl text-3xl font-bold md:text-5xl">
            {guide.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{guide.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{guide.readTime} min read</span>
            </div>
            <div className="flex items-center">
              <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt={guide.author}
                  fill
                  className="object-cover"
                />
              </div>
              <span>{guide.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Content */}
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative -mt-10 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/guides"
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </Link>
            <div className="flex space-x-3">
              <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                <ThumbsUp className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              {guide.introduction}
            </p>

            <h2 className="mt-8 text-2xl font-bold text-gray-800">
              {guide.sections[0].title}
            </h2>
            <p className="mt-4 text-gray-700">{guide.sections[0].content}</p>

            <div className="my-8 overflow-hidden rounded-lg">
              <Image
                src="https://i.ibb.co.com/99783BcR/water-cycle-in-agricultural-systems.jpg"
                alt="Guide illustration"
                width={800}
                height={400}
                className="w-full object-cover"
              />
              <p className="mt-2 text-center text-sm text-gray-500">
                {guide.sections[0].imageCaption}
              </p>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-gray-800">
              {guide.sections[1].title}
            </h2>
            <p className="mt-4 text-gray-700">{guide.sections[1].content}</p>

            <div className="my-8 rounded-lg bg-green-50 p-6">
              <h3 className="text-xl font-semibold text-green-800">Pro Tip</h3>
              <p className="mt-2 text-green-700">{guide.proTip}</p>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-gray-800">
              {guide.sections[2].title}
            </h2>
            <p className="mt-4 text-gray-700">{guide.sections[2].content}</p>

            <h3 className="mt-6 text-xl font-semibold text-gray-800">
              Step-by-Step Process:
            </h3>
            <ol className="mt-4 space-y-4">
              {guide.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800">{step.title}</h4>
                    <p className="mt-1 text-gray-700">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-8 text-2xl font-bold text-gray-800">
              Conclusion
            </h2>
            <p className="mt-4 text-gray-700">{guide.conclusion}</p>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-800">
            About the Author
          </h3>
          <div className="flex items-start">
            <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt={guide.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {guide.author}
              </h4>
              <p className="text-gray-600">{guide.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Related Guides */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((relatedGuide) => (
              <Link
                key={relatedGuide.id}
                href={`/guides/${relatedGuide.id}`}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={relatedGuide.image || "/placeholder.svg"}
                    alt={relatedGuide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    {relatedGuide.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-gray-800">
                    {relatedGuide.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// Sample data
const guides = [
  {
    id: 1,
    title: "Modern Irrigation Techniques for Sustainable Farming",
    introduction:
      "Water is one of the most precious resources in agriculture. This guide explores modern irrigation techniques that can help farmers conserve water while ensuring optimal crop growth and yield.",
    image:
      "https://i.ibb.co.com/XrX5KD7f/Understanding-Agricultural-Futures-Markets.jpg",
    category: "Water Management",
    date: "May 20, 2023",
    readTime: 12,
    author: "Dr. Sarah Johnson",
    authorBio:
      "Agricultural scientist with 15 years of experience in water conservation and irrigation systems. Dr. Johnson has worked with farmers across three continents to implement sustainable water management practices.",
    sections: [
      {
        title: "Understanding Water Efficiency in Agriculture",
        content:
          "Water efficiency in agriculture refers to the ratio of crop yield to the amount of water used. With climate change affecting rainfall patterns and water availability, it's becoming increasingly important for farmers to adopt efficient irrigation methods that minimize water waste while maximizing crop productivity.",
        imageCaption: "Diagram showing water cycle in agricultural systems",
      },
      {
        title: "Types of Modern Irrigation Systems",
        content:
          "There are several types of modern irrigation systems available today, each with its own advantages and suitable applications. These include drip irrigation, sprinkler systems, center pivot irrigation, and subsurface irrigation. The choice of system depends on factors such as crop type, field size, terrain, water quality, and available resources.",
      },
      {
        title: "Implementing Smart Irrigation Technology",
        content:
          "Smart irrigation technology combines traditional irrigation methods with sensors, weather data, and automation to optimize water usage. These systems can monitor soil moisture levels, weather conditions, and plant water needs to deliver precisely the right amount of water at the right time.",
      },
    ],
    proTip:
      "When installing drip irrigation, place the emitters at the root zone of plants rather than at the stem to encourage deeper root growth and better water absorption.",
    steps: [
      {
        title: "Assess Your Water Resources",
        description:
          "Before implementing any irrigation system, conduct a thorough assessment of your available water resources, including quantity, quality, and reliability.",
      },
      {
        title: "Choose the Right System for Your Crops",
        description:
          "Different crops have different water requirements. Research and select an irrigation system that best suits your specific crops and growing conditions.",
      },
      {
        title: "Install Soil Moisture Sensors",
        description:
          "Place soil moisture sensors at various depths and locations in your field to monitor water penetration and soil moisture levels accurately.",
      },
      {
        title: "Set Up Weather Monitoring",
        description:
          "Install a weather station or connect to local weather services to integrate real-time weather data into your irrigation scheduling.",
      },
      {
        title: "Implement Automation",
        description:
          "Use controllers and automation software to schedule irrigation based on sensor data, weather forecasts, and crop water needs.",
      },
    ],
    conclusion:
      "Adopting modern irrigation techniques is not just about conserving water; it's about improving crop quality, reducing costs, and ensuring the sustainability of your farming operation. By investing in efficient irrigation systems and smart technology, farmers can achieve better results with less water, contributing to both their bottom line and environmental conservation.",
  },
  // Additional guides would be defined here
];

const relatedGuides = [
  {
    id: 2,
    title: "Organic Pest Control Methods",
    image: "https://i.ibb.co.com/rKqbN1Mt/Soil-Testing-Why-When-and-How.jpg",
    category: "Pest Management",
  },
  {
    id: 3,
    title: "Soil Health Management",
    image:
      "https://i.ibb.co.com/wryw8jT4/Seasonal-Crop-Calendar-for-Northern-India.jpg",
    category: "Soil Management",
  },
  {
    id: 4,
    title: "Crop Rotation Strategies",
    image:
      "https://i.ibb.co.com/sd53Mxs2/Success-Story-Transitioning-to-Sustainable-Rice-Farming.jpg",
    category: "Crop Management",
  },
];

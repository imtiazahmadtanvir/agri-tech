import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={'/images/Farming field.jpg'}
            alt="Farming field"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            GUIDES & TUTORIALS
          </h1>
          <p className="mb-6 max-w-2xl text-lg">
            Learn modern farming techniques, crop management, and sustainable practices
          </p>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Featured Guides</h2>
          <Link 
            href="/guides/all" 
            className="flex items-center text-green-600 hover:text-green-700"
          >
            View all guides
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <div 
              key={guide.id} 
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  {guide.category}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-gray-800">
                  {guide.title}
                </h3>
                <p className="mt-2 text-gray-600">{guide.description}</p>
                <Link
                  href={`guides/${guide.id}`}
                  className="mt-4 inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Read Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide Categories */}
      <section className="bg-green-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/guides/category/${category.id}`}
                className={`flex flex-col items-center justify-center rounded-lg p-6 text-center transition-transform hover:scale-105 ${category.bgColor}`}
              >
                <div className={`mb-3 rounded-full ${category.iconBg} p-3`}>
                  <Image
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Most Frequently Asked Questions About The Farm
          </h2>
          <p className="mt-2 text-gray-600">
            Find answers to common questions about farming techniques and practices
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-lg border border-gray-200 bg-white"
            >
              <button className="flex w-full items-center justify-between p-4 text-left">
                <span className="font-medium text-gray-800">{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="border-t border-gray-200 p-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700">
            View All FAQs
          </button>
        </div>
      </section>

      {/* Latest Tutorials */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">
          Latest Tutorials & Articles
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={tutorial.image || "/placeholder.svg"}
                  alt={tutorial.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center">
                  <span className="text-sm text-gray-500">
                    {tutorial.date}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {tutorial.readTime} min read
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {tutorial.title}
                </h3>
                <p className="mt-2 text-gray-600">{tutorial.excerpt}</p>
                <div className="mt-4 flex items-center">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt={tutorial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {tutorial.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-green-700 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6 mx-auto max-w-2xl">
            Get the latest farming guides, tutorials, and market updates delivered directly to your inbox
          </p>
          <div className="mx-auto flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-y-0">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-l-md border-0 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:rounded-r-none bg-white"
            />
            <button className="w-full rounded-md bg-yellow-500 px-6 py-3 font-medium text-gray-900 hover:bg-yellow-400 sm:w-auto sm:rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// Sample data
const featuredGuides = [
  {
    id: 1,
    title: "Modern Irrigation Techniques",
    description: "Learn about efficient water management systems for your crops",
    image: "https://i.ibb.co.com/XrX5KD7f/Understanding-Agricultural-Futures-Markets.jpg",
    category: "Water Management"
  },
  {
    id: 2,
    title: "Organic Pest Control Methods",
    description: "Natural ways to protect your crops from pests and diseases",
    image: "https://i.ibb.co.com/RGtyX1k4/Organic-Insecticide-Spray.jpg",
    category: "Pest Control"
  },
  {
    id: 3,
    title: "Soil Health Management",
    description: "Improve your soil quality for better crop yields",
    image: "https://i.ibb.co.com/rKqbN1Mt/Soil-Testing-Why-When-and-How.jpg",
    category: "Soil Management"
  }
];

const categories = [
  {
    id: "crop-management",
    name: "Crop Management",
    bgColor: "bg-green-100",
    iconBg: "bg-green-200"
  },
  {
    id: "livestock",
    name: "Livestock",
    bgColor: "bg-blue-100",
    iconBg: "bg-blue-200"
  },
  {
    id: "equipment",
    name: "Equipment",
    bgColor: "bg-yellow-100",
    iconBg: "bg-yellow-200"
  },
  {
    id: "organic-farming",
    name: "Organic Farming",
    bgColor: "bg-red-100",
    iconBg: "bg-red-200"
  },
  {
    id: "market-trends",
    name: "Market Trends",
    bgColor: "bg-purple-100",
    iconBg: "bg-purple-200"
  }
];

const faqs = [
  {
    id: 1,
    question: "What crops are best for beginners?",
    answer: "For beginners, we recommend starting with crops like leafy greens, radishes, and beans as they're relatively easy to grow and have shorter growing cycles."
  },
  {
    id: 2,
    question: "How often should I water my crops?",
    answer: "Watering frequency depends on the crop type, soil condition, and weather. Generally, most crops need 1-1.5 inches of water per week, either from rainfall or irrigation."
  },
  {
    id: 3,
    question: "What's the best way to prevent crop diseases?",
    answer: "Crop rotation, proper spacing, good air circulation, and using disease-resistant varieties are effective preventive measures against crop diseases."
  },
  {
    id: 4,
    question: "How can I improve soil fertility naturally?",
    answer: "You can improve soil fertility naturally by adding compost, using cover crops, practicing crop rotation, and incorporating organic matter into the soil."
  }
];

const latestTutorials = [
  {
    id: 1,
    title: "How to Start a Vegetable Garden from Scratch",
    excerpt: "A complete guide for beginners to set up their first vegetable garden",
    image: "https://i.ibb.co.com/9kKfD0HF/Organic-Certification-Process-Explained.jpg",
    date: "May 15, 2023",
    readTime: 8,
    author: "John Smith"
  },
  {
    id: 2,
    title: "Seasonal Planting Guide for Tropical Regions",
    excerpt: "Learn what crops to plant during different seasons in tropical climates",
    image: "https://i.ibb.co.com/CpGPmPsw/Maximizing-Wheat-Yields-A-Comprehensive-Guide.jpg",
    date: "June 2, 2023",
    readTime: 6,
    author: "Maria Rodriguez"
  },
  {
    id: 3,
    title: "Using Technology to Monitor Crop Health",
    excerpt: "Modern tools and apps that help farmers track and improve crop health",
    image: "https://i.ibb.co.com/mrQNbgTz/Identifying-and-Managing-Tomato-Diseases.jpg",
    date: "June 10, 2023",
    readTime: 10,
    author: "David Chen"
  }
];

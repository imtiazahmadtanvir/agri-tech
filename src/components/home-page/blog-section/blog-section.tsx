"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "FPAC Business Center Continues to Deliver",
    excerpt:
      "The FPAC Business Center continues to make significant strides in promoting agricultural innovation and improving farmers' livelihoods across the country.",
    image: "/BlogSection/blog1.webp",
    date: "23",
    month: "May 24",
    author: "Hardson",
    categories: ["Bread", "Fruits"],
    comments: 0,
  },
  {
    id: 2,
    title: "Breaking Down Barriers to Crop Insurance",
    excerpt:
      "Crop insurance is vital to ensuring the stability and security of farmers. This article highlights key strategies for improving access and overcoming challenges.",
    image: "/BlogSection/blog2.webp",
    date: "23",
    month: "May 24",
    author: "Hardson",
    categories: ["Bread", "Fruits"],
    comments: 0,
  },
  {
    id: 3,
    title: "The Potential of Virtual Reality in Agrifood",
    excerpt:
      "Virtual reality has the potential to revolutionize the agrifood industry by providing immersive training, simulation, and improved research methods.",
    image: "/BlogSection/blog3.webp",
    date: "23",
    month: "May 24",
    author: "Hardson",
    categories: ["Bread", "Fruits"],
    comments: 0,
  },
]

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + blogPosts.length) % blogPosts.length)
  }

  // Calculate visible posts based on screen size and current index
  const getVisiblePosts = () => {
    if (isMobile) {
      return [blogPosts[currentIndex]]
    } else {
      // Show 3 posts in a sliding window effect
      return [
        blogPosts[currentIndex],
        blogPosts[(currentIndex + 1) % blogPosts.length],
        blogPosts[(currentIndex + 2) % blogPosts.length],
      ]
    }
  }

  return (
    <section className="py-16 px-4 md:py-24 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-green-600 text-sm font-medium mb-2 block">From The Blog Post</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600">Latest News & Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in the agricultural and food sectors.
          </p>
          <div className="flex justify-center my-6 h-4">
            <Image src="/BlogSection/pxl-heading-shap.webp" alt="" width={40} height={20} />
          </div>
        </div>

        {/* Blog Posts Grid with Carousel for Mobile */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous post"
          >
            <ChevronLeft className="md:hidden lg:hidden  h-6 w-6 text-gray-600" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:w-full md:w-full w-11/12 mx-auto px-2 ">
            {getVisiblePosts().map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:-translate-y-1 w-full max-w-full"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full md:h-[250px] overflow-hidden group rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={450}  // Set your desired width
                    height={250} 
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-yellow-400 rounded-lg p-2 text-center transition-transform duration-300 group-hover:scale-110">
                    <span className="block text-2xl font-bold text-gray-800">{post.date}</span>
                    <span className="text-sm text-gray-700">{post.month}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">By</span> {post.author}
                    </span>
                    <div className="flex items-center gap-2">
                      {post.categories.map((category, index) => (
                        <span key={index} className="text-green-600 hover:text-green-700">
                          {category}
                        </span>
                      ))}
                    </div>
                    <span>{post.comments} Comments</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-gray-600 font-bold mb-3 hover:text-green-600 transition-colors">
                    <Link href="#">{post.title}</Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>

                  {/* Continue Reading Link */}
                  <Link
                    href="#"
                    className="inline-block text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Continue Reading
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={nextSlide}
            className="absolute md:hidden lg:hidden right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next post"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

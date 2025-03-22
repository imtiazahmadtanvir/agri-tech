import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Leaf } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  linkText: string
  linkHref: string
}

export function AuthLayout({ children, title, description, linkText, linkHref }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:w-1/2 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center justify-center">
            <Leaf className="h-10 w-10 text-agriculture-500" />
            <h2 className="ml-2 text-2xl font-bold text-agriculture-700">AgriConnect</h2>
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold text-soil-800">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{linkText.split(" ")[0]} </span>
            <Link href={linkHref} className="font-medium text-agriculture-600 hover:text-agriculture-500">
              {linkText.split(" ").slice(1).join(" ")}
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden bg-agriculture-100 sm:block sm:w-1/2">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-agriculture-500/20 to-soil-500/20"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Agriculture field"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white">
            <h3 className="text-2xl font-bold">Growing Together</h3>
            <p className="mt-2 max-w-md">
              Join our community of farmers and agricultural experts to share knowledge, resources, and support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


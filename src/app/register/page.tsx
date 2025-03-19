"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "../auth-layout"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would typically register with your backend
    console.log("Registration attempt with:", formData)

    setIsLoading(false)
    // Redirect to login page after successful registration
    // router.push("/login")
  }

  return (
    <AuthLayout
      title="Create an account"
      description="Join our agricultural community today"
      linkText="Already have an account? Sign in"
      linkHref="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Farmer"
            required
            value={formData.name}
            onChange={handleChange}
            className="border-soil-200 focus:border-agriculture-500 focus:ring-agriculture-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="farmer@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="border-soil-200 focus:border-agriculture-500 focus:ring-agriculture-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="border-soil-200 focus:border-agriculture-500 focus:ring-agriculture-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-soil-200 focus:border-agriculture-500 focus:ring-agriculture-500"
          />
          {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 rounded border-soil-300 text-agriculture-600 focus:ring-agriculture-500"
            required
          />
          <Label htmlFor="terms" className="text-xs">
            I agree to the{" "}
            <a href="#" className="text-agriculture-600 hover:text-agriculture-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-agriculture-600 hover:text-agriculture-500">
              Privacy Policy
            </a>
          </Label>
        </div>
        <Button type="submit" className="w-full bg-agriculture-600 hover:bg-agriculture-700" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-soil-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="border-soil-200">
            Google
          </Button>
          <Button variant="outline" type="button" className="border-soil-200">
            Facebook
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}


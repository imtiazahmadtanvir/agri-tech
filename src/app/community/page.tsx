import CommunityFeatures from "@/components/community/community-features"

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Community Features</h1>
          <p className="text-gray-600">Connect, collaborate, and grow with fellow farmers</p>
        </header>

        <CommunityFeatures />
      </div>
    </main>
  )
}

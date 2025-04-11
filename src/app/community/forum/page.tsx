import CommunityFeatures from "@/components/community/community-features"

export default function FarmerForumPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Farmer Forum</h1>
          <p className="text-gray-600">Share success stories, challenges, and tips with fellow farmers</p>
        </header>

        <CommunityFeatures defaultTab="forum" />
      </div>
    </main>
  )
}

import CommunityFeatures from "@/components/community/community-features"

export default function CooperativeGroupsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Cooperative Groups</h1>
          <p className="text-gray-600">Form farmer collectives for bulk buying, selling, and resource sharing</p>
        </header>

        <CommunityFeatures defaultTab="cooperatives" />
      </div>
    </main>
  )
}

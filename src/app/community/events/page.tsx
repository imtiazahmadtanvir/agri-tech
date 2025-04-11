import CommunityFeatures from "@/components/community/community-features"

export default function LocalEventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Local Events</h1>
          <p className="text-gray-600">Find agricultural fairs, workshops, and training sessions near you</p>
        </header>

        <CommunityFeatures defaultTab="events" />
      </div>
    </main>
  )
}

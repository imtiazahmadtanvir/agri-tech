import CommunityFeatures from "@/components/community/community-features";

export default function FarmerForumPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-3 px-4">
        <CommunityFeatures defaultTab="forum" />
      </div>
    </main>
  );
}

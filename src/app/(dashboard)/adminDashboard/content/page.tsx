"use client";
import AnalyticsModal from "@/components/admin/AnalyticsModal";
import ContentCard from "@/components/admin/ContentCard";
import ContentModal from "@/components/admin/ContentModal";
import React, { useState } from "react";

const mockContent = [
  {
    id: 1,
    type: "resource",
    title: "Soil Fertility Guide",
    category: "Soil",
    status: "Published",
    views: 500,
    file: "soil_guide.pdf",
    tags: ["Soil", "Fertilizer"],
  },
  {
    id: 2,
    type: "resource",
    title: "Drip Irrigation Tutorial",
    category: "Irrigation",
    status: "Draft",
    views: 0,
    file: "drip_video.mp4",
    tags: ["Irrigation"],
  },
  {
    id: 3,
    type: "resource",
    title: "Seed Subsidy Scheme",
    category: "Schemes",
    status: "Pending",
    views: 0,
    file: "scheme.pdf",
    tags: ["Subsidies"],
  },
  {
    id: 4,
    type: "community",
    title: "Neem Oil for Pests",
    category: "Pests",
    status: "Pending",
    views: 0,
    content: "Use neem oil weekly...",
    tags: ["Pests"],
  },
  {
    id: 5,
    type: "community",
    title: "Local Agri Fair",
    category: "Events",
    status: "Published",
    views: 200,
    content: "Join us on May 1...",
    tags: ["Events"],
  },
];

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("resources");
  const [content, setContent] = useState(mockContent);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (id: number) => {
    setContent(
      content.map((item) =>
        item.id === id ? { ...item, status: "Published" } : item
      )
    );
  };

  const handleReject = (id: number) => {
    if (!rejectReason) {
      alert("Please provide a rejection reason.");
      return;
    }
    setContent(
      content.map((item) =>
        item.id === id ? { ...item, status: "Rejected", rejectReason } : item
      )
    );
    setRejectReason("");
  };

  const handleEdit = (item: any) => {
    setSelectedContent(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedContent(null);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (selectedContent) {
      setContent(
        content.map((item) =>
          item.id === selectedContent.id ? { ...item, ...data } : item
        )
      );
    } else {
      setContent([
        ...content,
        {
          id: content.length + 1,
          type: activeTab === "resources" ? "resource" : "community",
          ...data,
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleViewAnalytics = (item: any) => {
    setSelectedContent(item);
    setIsAnalyticsOpen(true);
  };

  const filteredContent = content.filter((item) =>
    activeTab === "resources"
      ? item.type === "resource"
      : item.type === "community"
  );

  return (
    <div className="min-h-screen bg-gray-100 font-roboto p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Content Management
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === "resources"
                ? "bg-green-600 text-white"
                : "bg-white text-green-800"
            }`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === "community"
                ? "bg-green-600 text-white"
                : "bg-white text-green-800"
            }`}
            onClick={() => setActiveTab("community")}
          >
            Community
          </button>
        </div>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center"
          onClick={handleAdd}
        >
          <i className="fas fa-plus mr-2"></i> Add Content
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onApprove={handleApprove}
            onReject={handleReject}
            onEdit={handleEdit}
            onViewAnalytics={handleViewAnalytics}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
          />
        ))}
      </div>
      {isModalOpen && (
        <ContentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={selectedContent}
          isResource={activeTab === "resources"}
        />
      )}
      {isAnalyticsOpen && (
        <AnalyticsModal
          isOpen={isAnalyticsOpen}
          onClose={() => setIsAnalyticsOpen(false)}
          item={selectedContent}
        />
      )}
    </div>
  );
}

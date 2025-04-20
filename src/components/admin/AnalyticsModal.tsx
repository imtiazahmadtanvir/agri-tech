import React from "react";

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Analytics for {item.title}
        </h2>
        <p className="text-gray-700">Views: {item.views}</p>
        <p className="text-gray-700">Category: {item.category}</p>
        <p className="text-gray-700">Tags: {item.tags.join(", ")}</p>
        <p className="text-gray-700">Status: {item.status}</p>
        {/* Placeholder for chart */}
        <div className="bg-gray-200 h-40 flex items-center justify-center mt-4">
          <p className="text-gray-600">[Chart Placeholder: Views over time]</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;

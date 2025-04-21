import React from "react";

interface ContentCardProps {
  item: any;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onEdit: (item: any) => void;
  onViewAnalytics: (item: any) => void;
  rejectReason: string;
  setRejectReason: (reason: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onApprove,
  onReject,
  onEdit,
  onViewAnalytics,
  rejectReason,
  setRejectReason,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:bg-green-50 transition">
      <h3 className="text-lg font-semibold text-green-800">{item.title}</h3>
      <p className="text-gray-600">Category: {item.category}</p>
      <p className="text-gray-600">Status: {item.status}</p>
      <p className="text-gray-600">Views: {item.views}</p>
      <p className="text-gray-600">Tags: {item.tags.join(", ")}</p>
      {item.file && <p className="text-gray-600">File: {item.file}</p>}
      {item.content && (
        <p className="text-gray-600 truncate">Content: {item.content}</p>
      )}
      <div className="flex space-x-2 mt-4">
        {item.status === "Pending" && (
          <>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center"
              onClick={() => onApprove(item.id)}
              aria-label="Approve content"
            >
              <i className="fas fa-check mr-1"></i> Approve
            </button>
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded px-2 py-1 mr-2"
                placeholder="Rejection reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center"
                onClick={() => onReject(item.id)}
                aria-label="Reject content"
              >
                <i className="fas fa-times mr-1"></i> Reject
              </button>
            </div>
          </>
        )}
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center"
          onClick={() => onEdit(item)}
          aria-label="Edit content"
        >
          <i className="fas fa-edit mr-1"></i> Edit
        </button>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center"
          onClick={() => onViewAnalytics(item)}
          aria-label="View analytics"
        >
          <i className="fas fa-chart-line mr-1"></i> Analytics
        </button>
      </div>
    </div>
  );
};

export default ContentCard;

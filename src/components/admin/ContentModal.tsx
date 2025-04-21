import React, { useState, useEffect } from "react";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  isResource: boolean;
}

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isResource,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    file: "",
    content: "",
    tags: [],
    status: "Draft",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        file: initialData.file || "",
        content: initialData.content || "",
        tags: initialData.tags || [],
        status: initialData.status || "Draft",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData({ ...formData, tags: selectedOptions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          {initialData ? "Edit" : "Add"} Content
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              {isResource ? (
                <>
                  <option value="Soil">Soil</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Schemes">Schemes</option>
                </>
              ) : (
                <>
                  <option value="Pests">Pests</option>
                  <option value="Events">Events</option>
                </>
              )}
            </select>
          </div>
          {isResource ? (
            <div className="mb-4">
              <label className="block text-gray-700">File</label>
              <input
                type="file"
                name="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    file: e.target.files?.[0]?.name || "",
                  })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700">Content</label>
              <input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Tags</label>
            <select
              multiple
              name="tags"
              value={formData.tags}
              onChange={handleTagsChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Soil">Soil</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Subsidies">Subsidies</option>
              <option value="Pests">Pests</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentModal;

"use client";

import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    if (prompt) formData.append("prompt", prompt);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: formData,
      });
      const data: { text?: string; error?: string } = await res.json();
      if (data.text) {
        setResponse(data.text);
      } else {
        setResponse(`Error: ${data.error || "Unknown error"}`);
      }
    } catch {
      setResponse("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const clearImage = () => setImage(null);

  const renderResponse = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          AI
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Prompt Input */}
          {/* <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ask a Question (optional)
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Analyze this crop image' or 'Identify plant disease'"
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-800 placeholder-gray-400"
            />
          </div> */}

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Crop/Farm Photo
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <div className="mt-3 flex items-center gap-3">
                <Image
                  width={80}
                  height={80}
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || (!prompt && !image)}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Analyze"}
          </button>
        </form>

        {/* Response Display */}
        {response && (
          <div className="mt-8 p-5 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Analysis
            </h2>
            <div className="text-gray-700 leading-relaxed">
              {renderResponse(response)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

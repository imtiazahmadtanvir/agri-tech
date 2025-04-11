"use client";

import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");
  const [displayResponse, setDisplayResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const responseRef = useRef<HTMLDivElement>(null);

  // Typing animation effect
  useEffect(() => {
    if (response && !isTyping) {
      setIsTyping(true);
      setDisplayResponse("");

      let index = 0;
      const typingSpeed = 10; // ms per character

      const typeNextChar = () => {
        if (index < response.length) {
          setDisplayResponse((prev) => prev + response.charAt(index));
          index++;
          setTimeout(typeNextChar, typingSpeed);
        } else {
          setIsTyping(false);
        }
      };

      typeNextChar();
    }
  }, [response]);

  // Auto-scroll to the bottom of the response as it's typing
  useEffect(() => {
    if (isTyping && responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [displayResponse, isTyping]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    setDisplayResponse("");

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => setImage(null);

  const formatResponse = (text: string) => {
    // First process bold text with **asterisks**
    const boldProcessed = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Process lists
    const listProcessed = boldProcessed
      // Handle numbered lists (1. Item, 2. Item)
      .replace(/(\d+\.\s+(.*?)(?:\n|$))+/g, (match) => {
        const items = match.split(/\n/).filter((item) => item.trim());
        return `<ol class="list-decimal pl-5 my-2 md:my-3 space-y-1">${items
          .map((item) => `<li>${item.replace(/^\d+\.\s+/, "")}</li>`)
          .join("")}</ol>`;
      })
      // Handle bullet lists (• Item or - Item)
      .replace(/((?:•|\-)\s+(.*?)(?:\n|$))+/g, (match) => {
        const items = match.split(/\n/).filter((item) => item.trim());
        return `<ul class="list-disc pl-5 my-2 md:my-3 space-y-1">${items
          .map((item) => `<li>${item.replace(/^(?:•|\-)\s+/, "")}</li>`)
          .join("")}</ul>`;
      });

    // Process paragraphs
    const paragraphs = listProcessed
      .split(/\n\n+/)
      .map((p) => {
        // Skip if it's already a list
        if (p.startsWith("<ol") || p.startsWith("<ul")) {
          return p;
        }
        // Process paragraph
        return `<p class="mb-2 md:mb-3">${p.replace(/\n/g, "<br>")}</p>`;
      })
      .join("");

    return paragraphs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <div className="flex items-center justify-center mb-4 md:mb-8">
          <Camera className="w-6 h-6 md:w-8 md:h-8 text-green-600 mr-2 md:mr-3" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Pest / Diseases Detector
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Prompt Input */}
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 mb-1 md:mb-2"
            >
              Ask a Question (optional)
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Analyze this crop image' or 'Identify plant disease'"
              rows={2}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none resize-none text-gray-800 placeholder-gray-400 shadow-sm text-sm md:text-base"
            />
          </div>

          {/* Image Upload Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 transition-colors ${
              dragActive
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-400"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2 md:mb-4"
            >
              Upload Crop/Farm Photo
            </label>

            {!image ? (
              <div className="flex flex-col items-center justify-center py-3 md:py-4">
                <Upload className="w-8 h-8 md:w-10 md:h-10 text-green-500 mb-2 md:mb-3" />
                <p className="text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2 text-center">
                  Drag and drop your image here
                </p>
                <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 text-center">
                  or click to browse files
                </p>
                <label
                  htmlFor="image"
                  className="cursor-pointer px-3 py-1.5 md:px-4 md:py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md md:rounded-lg transition-colors text-sm md:text-base"
                >
                  Select Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <Image
                    width={400}
                    height={300}
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-32 sm:h-40 md:h-56 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-red-500 hover:bg-red-600 text-white p-1 md:p-1.5 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
                <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-600 font-medium truncate max-w-full">
                  {image.name}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || (!prompt && !image)}
              className={`w-full sm:w-fit py-2.5 md:py-3.5 px-4 md:px-6 rounded-lg md:rounded-xl font-medium transition-all cursor-pointer shadow-sm text-sm md:text-base ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </form>

        {/* Response Display */}
        {(displayResponse || isTyping) && (
          <div className="mt-4 md:mt-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg md:rounded-xl border border-green-100 overflow-hidden">
              <div className="border-b border-green-100 bg-white bg-opacity-60 px-3 sm:px-4 md:px-6 py-2 md:py-3 flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-green-800">
                  Analysis Results
                </h2>
                {isTyping && (
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-600 rounded-full animate-pulse mr-1"></div>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-600 rounded-full animate-pulse delay-150 mr-1"></div>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-600 rounded-full animate-pulse delay-300"></div>
                  </div>
                )}
              </div>
              <div
                ref={responseRef}
                className="p-3 sm:p-4 md:p-6 max-h-60 sm:max-h-72 md:max-h-96 overflow-y-auto"
              >
                <div
                  className="prose prose-sm md:prose-base prose-green max-w-none text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: formatResponse(displayResponse),
                  }}
                />
                {isTyping && (
                  <span className="inline-block w-0.5 md:w-1 h-4 md:h-5 bg-green-600 animate-blink ml-0.5 md:ml-1"></span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

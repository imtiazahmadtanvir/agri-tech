"use client";

import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";

export default function Detector() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState("");
  const [displayResponse, setDisplayResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (response) {
      const trimmed = response.trimStart();
      setDisplayResponse("");
      setIsTyping(true);

      let index = 0;
      const typingSpeed = 10;

      const interval = setInterval(() => {
        setDisplayResponse((prev) => {
          const nextChar = trimmed.charAt(index);
          index++;

          if (index >= trimmed.length) {
            clearInterval(interval);
            setIsTyping(false);
          }

          return prev + nextChar;
        });
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [response]);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [displayResponse]);

  const handleSubmit = async (e: FormEvent) => {
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

      const data = await res.json();
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
    if (file) setImage(file);
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
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImage(droppedFile);
  };

  const clearImage = () => setImage(null);

  const formatResponse = (text: string) => {
    const boldProcessed = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    const listProcessed = boldProcessed
      .replace(/(\d+\.\s+(.*?)(?:\n|$))+/g, (match) => {
        const items = match.split(/\n/).filter((item) => item.trim());
        return `<ol class="list-decimal pl-5 my-2 md:my-3 space-y-1">${items
          .map((item) => `<li>${item.replace(/^\d+\.\s+/, "")}</li>`)
          .join("")}</ol>`;
      })
      .replace(/((?:•|\-)\s+(.*?)(?:\n|$))+/g, (match) => {
        const items = match.split(/\n/).filter((item) => item.trim());
        return `<ul class="list-disc pl-5 my-2 md:my-3 space-y-1">${items
          .map((item) => `<li>${item.replace(/^(?:•|\-)\s+/, "")}</li>`)
          .join("")}</ul>`;
      });

    const paragraphs = listProcessed
      .split(/\n\n+/)
      .map((p) => {
        if (p.startsWith("<ol") || p.startsWith("<ul")) return p;
        return `<p class="mb-2 md:mb-3">${p.replace(/\n/g, "<br>")}</p>`;
      })
      .join("");

    return paragraphs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
        <div className="flex items-center justify-center mb-6">
          <Camera className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Pest / Diseases Detector
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Ask a Question (optional)
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Analyze this crop image'"
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm text-gray-800 placeholder-gray-400 shadow-sm resize-none"
            />
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg p-6 ${
              dragActive
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-400"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <label htmlFor="image" className="block font-medium mb-4">
              Upload Crop/Plant Photo
            </label>
            {!image ? (
              <div className="flex flex-col items-center">
                <Upload className="w-10 h-10 text-green-500 mb-3" />
                <p className="text-sm font-medium mb-1 text-center">
                  Drag and drop your image here
                </p>
                <p className="text-xs text-gray-500 mb-4 text-center">
                  or click to browse files
                </p>
                <label
                  htmlFor="image"
                  className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md text-sm"
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
                <div className="relative w-full max-w-sm mx-auto">
                  <Image
                    width={400}
                    height={300}
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-56 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-600 font-medium truncate">
                  {image.name}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || (!prompt && !image)}
              className={`w-full sm:w-fit py-3 px-6 rounded-lg font-medium shadow-sm text-base transition-all ${
                loading || (!prompt && !image)
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                "Detect"
              )}
            </button>
          </div>
        </form>

        {displayResponse && (
          <div
            ref={responseRef}
            className="mt-8 max-h-96 overflow-y-auto p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-base"
            dangerouslySetInnerHTML={{
              __html: formatResponse(displayResponse),
            }}
          />
        )}
      </div>
    </div>
  );
}

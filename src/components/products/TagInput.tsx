import { TagsProps } from "@/types/type";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function TagInput({ tags, setTags }: TagsProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && input === "") {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-md p-2 flex flex-wrap gap-2 min-h-[50px]">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-green-600 text-white px-2 py-1 rounded-md flex items-center gap-1"
        >
          <span>{tag}</span>|
          <button
            onClick={() => removeTag(index)}
            className="cursor-pointer text-white hover:text-gray-400"
          >
            <IoCloseOutline className="text-lg" />
          </button>
        </div>
      ))}
      <input
        type="text"
        className="outline-none flex-grow min-w-[100px] px-5 "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter"
      />
    </div>
  );
}

"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
  }
  
const faqData: FAQItem[] = [
    {
      question: "What proof do you need for Carer’s tickets?",
      answer: "You will need to provide a valid ID or relevant documentation.",
    },
    {
      question: "Do I have to pay extra for the shows?",
      answer: "No, all shows are included in your ticket price.",
    },
    {
      question: "Can I bring my team or friends?",
      answer: "Yes, group bookings are available. Please contact us for details.",
    },
    {
      question: "Can I join the farm as a permanent member?",
      answer: "Yes, we offer memberships with exclusive benefits. Check our website for more info.",
    },
  ];
  

const FAQItem = () => {
    
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="w-full mx-auto p-4">
        {faqData.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center bg-[#0D401C] text-white p-4 rounded-lg focus:outline-none"
            >
              <span className="text-lg font-semibold">{item.question}</span>
              {openIndex === index ? <Minus></Minus>: <Plus></Plus> }
            </button>
            {openIndex === index && (
              <div className="p-4 bg-green-100 text-green-900 rounded-b-lg">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    );
};

export default FAQItem;
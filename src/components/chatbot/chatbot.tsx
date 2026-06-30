/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, AlertCircle, Loader2, Leaf, MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
// Dialog imports removed

interface Message {
  text: string
  role: "user" | "model"
  timestamp: Date
}

export default function Chatbot({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [chat, setChat] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ;
  const MODEL_NAME = "gemini-2.0-flash"

  const predefinedQuestions = [
    {
      question: "What are the best crops to grow in my region?",
      answer: "Consider local climate and soil conditions. Common crops include rice, wheat, and maize.",
    },
    {
      question: "How do I prevent pests from damaging my crops?",
      answer: "Use integrated pest management techniques, including natural predators and biological controls.",
    },
    {
      question: "What are sustainable farming practices?",
      answer: "Sustainable practices include crop rotation, minimal tillage, and efficient water management.",
    },
    {
      question: "How can I improve soil fertility?",
      answer: "Use organic fertilizers, compost, and cover crops to enhance soil health.",
    },
    {
      question: "What are the latest agricultural technologies?",
      answer: "Precision agriculture, drones, and AI-driven analytics are transforming farming.",
    },
  ]

  // Initialize chat only once when component mounts
  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing. Please set NEXT_PUBLIC_GOOGLE_API_KEY in your environment variables.")
      return
    }

    let isMounted = true
    const initChat = async () => {
      if (!isMounted) return

      setIsLoading(true)
      try {
        const genAI = new GoogleGenerativeAI(apiKey)

        const generationConfig = {
          temperature: 0.9,
          topP: 1,
          topK: 1,
          maxOutputTokens: 2048,
        }

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ]

        const genModel = genAI.getGenerativeModel({ model: MODEL_NAME })
        const newChat = await genModel.startChat({
          generationConfig,
          safetySettings,
          history: [],
        })

        if (isMounted) {
          setChat(newChat)
          setIsLoading(false)
        }
      } catch (err: any) {
        if (isMounted) {
          setError("Failed to initialize chat: " + err.message)
          setIsLoading(false)
        }
      }
    }

    initChat()

    // Focus the input field when the component mounts
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => {
      isMounted = false
    }
  }, [apiKey])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = useCallback(
    async (input?: string) => {
      const messageToSend = input || userInput
      if (!messageToSend.trim()) return

      // Hide suggestions when sending a message
      setShowSuggestions(false)

      const userMessage: Message = {
        text: messageToSend,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")
      setError(null) // Clear any previous error

      setIsLoading(true)
      try {
        let responseText = ""

        // 1. Check if the input matches a predefined question to avoid API calls and save quota
        const matchedQuestion = predefinedQuestions.find(
          (q) => q.question.toLowerCase().trim() === messageToSend.toLowerCase().trim()
        )

        if (matchedQuestion) {
          // Simulate typing delay for predefined questions
          await new Promise((resolve) => setTimeout(resolve, 800))
          responseText = matchedQuestion.answer
        } else {
          if (!chat) {
            throw new Error("API payment limit is over or chat session is not initialized.")
          }
          // 2. Call the Gemini API
          const result = await chat.sendMessage(messageToSend)
          responseText = result.response.text()
        }

        const botMessage: Message = {
          text: responseText,
          role: "model",
          timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])

        // Show suggestions again after receiving a response
        setShowSuggestions(true)
      } catch (err: any) {
        console.error("Gemini API Error:", err)
        let friendlyMessage = "I am sorry, but I encountered an error. Please try again."

        const isQuotaOrLimitError = 
          err.message?.includes("Quota exceeded") || 
          err.message?.includes("429") || 
          err.message?.includes("payment") || 
          err.message?.includes("limit") ||
          err.message?.includes("blocked") ||
          err.message?.includes("not initialized")

        if (isQuotaOrLimitError) {
          friendlyMessage = "I'm sorry, but my API payment limit is over or the quota has been exceeded. However, you can still ask me any of the predefined questions below!"
        } else if (err.message?.includes("API key")) {
          friendlyMessage = "I couldn't authenticate with the AI service. Please verify that the API key is configured correctly. You can still ask me any of the predefined questions below!"
        } else {
          friendlyMessage = `I'm sorry, I'm having trouble connecting right now (API payment limit may be over). (Error: ${err.message || 'Unknown'}). You can still ask me any of the predefined questions below!`
        }

        const botMessage: Message = {
          text: friendlyMessage,
          role: "model",
          timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
        setShowSuggestions(true)
      } finally {
        setIsLoading(false)
        // Focus the input field after sending a message
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }
    },
    [chat, userInput, predefinedQuestions],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  const handlePredefinedQuestionClick = useCallback(
    (question: string) => {
      handleSendMessage(question)
    },
    [handleSendMessage],
  )

  // Message click handler removed

  // Filter out the questions that have already been asked
  const getUnaskedQuestions = useCallback(() => {
    const askedQuestions = messages.filter((msg) => msg.role === "user").map((msg) => msg.text)

    return predefinedQuestions.filter((item) => !askedQuestions.includes(item.question))
  }, [messages])

  return (
    <Card className="w-full h-full flex flex-col shadow-lg border-0 bg-green-50/35 overflow-hidden">
      <CardHeader className="border-b border-green-100 text-black py-3 px-4 sm:px-5 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full text-green-700">
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="text-left">
              <CardTitle className="text-base sm:text-lg font-bold text-green-900 leading-tight">
                Agri-Tech Assistant
              </CardTitle>
              <span className="text-[10px] sm:text-xs text-green-600 flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Online & Ready to help
              </span>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-green-100 text-green-800 transition-colors h-8 w-8 sm:h-9 sm:w-9"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0 flex flex-col relative bg-green-50/30">
        {error && (
          <Alert variant="destructive" className="m-2 sm:m-4 absolute top-2 left-2 right-2 z-20 shadow-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <ScrollArea className="flex-1 min-h-0 w-full" ref={scrollAreaRef}>
          <div className="p-3 sm:p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-4 sm:p-6">
                <div className="bg-green-100 p-4 rounded-full text-green-800 mb-3 sm:mb-4">
                  <Leaf className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-900">Welcome to AgriChatBot</h3>
                <p className="text-sm sm:text-base text-green-700 max-w-sm mb-4 sm:mb-6">
                  Ask me anything about farming, agriculture, crop rotation, pests, or gardening!
                </p>
                <div className="space-y-2 w-full max-w-md">
                  <p className="text-xs sm:text-sm font-semibold text-green-800 text-left mb-1">Frequently Asked Questions:</p>
                  {predefinedQuestions.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handlePredefinedQuestionClick(item.question)}
                      className="bg-white hover:bg-green-50 text-green-800 border-green-200 hover:border-green-300 w-full text-left justify-start text-xs sm:text-sm py-2.5 px-3 h-auto shadow-sm whitespace-normal text-wrap"
                    >
                      {item.question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-2 max-w-[85%] sm:max-w-[80%]",
                      msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm",
                        msg.role === "user"
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-800 border border-green-200"
                      )}
                    >
                      {msg.role === "user" ? "U" : <Leaf className="h-4 w-4" />}
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 text-sm sm:text-base shadow-sm whitespace-pre-wrap break-words",
                          msg.role === "user"
                            ? "bg-green-600 text-white rounded-tr-none"
                            : "bg-white text-green-900 border border-green-100 rounded-tl-none"
                        )}
                      >
                        {msg.text}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] text-gray-500 mt-1 px-1",
                          msg.role === "user" ? "text-right" : "text-left"
                        )}
                      >
                        {format(msg.timestamp, "h:mm a")}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2 max-w-[85%] sm:max-w-[80%] mr-auto">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm bg-green-100 text-green-800 border border-green-200">
                      <Leaf className="h-4 w-4 animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                      <div className="bg-white text-green-850 border border-green-100 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="flex gap-1">
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce" />
                          </span>
                          <span className="text-xs font-medium text-green-600">Typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show remaining questions as horizontal scrolling/wrapped chips */}
                {showSuggestions && messages.length > 0 && messages[messages.length - 1].role === "model" && getUnaskedQuestions().length > 0 && (
                  <div className="space-y-1.5 mt-2 p-1">
                    <p className="text-[10px] sm:text-xs font-semibold text-green-800 px-1">
                      Suggested Questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {getUnaskedQuestions()
                        .slice(0, 3)
                        .map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handlePredefinedQuestionClick(item.question)}
                            className="bg-white hover:bg-green-100 text-green-800 hover:text-green-900 border border-green-200 rounded-full text-xs py-1 px-2.5 transition-colors cursor-pointer text-left font-medium shadow-sm hover:border-green-300"
                          >
                            {item.question}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <div className="p-3 sm:p-4 border-t border-green-100 bg-white">
        <div className="flex gap-2 items-center">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about farming..."
            disabled={isLoading}
            className="flex-1 border-green-200 focus-visible:ring-green-600 focus-visible:border-green-600 text-sm h-10 px-3.5 bg-green-50/20 rounded-full"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !userInput.trim()}
            size="icon"
            className="bg-green-700 hover:bg-green-800 text-white rounded-full h-10 w-10 shrink-0 transition-transform active:scale-95 shadow-md hover:shadow-lg disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}


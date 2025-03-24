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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

interface Message {
  text: string
  role: "user" | "model"
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [chat, setChat] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyDS1UScOoCOAKLe22DTgcFui9bJlKyjnEQ";
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
      if (!messageToSend.trim() || !chat) return

      // Hide suggestions when sending a message
      setShowSuggestions(false)

      const userMessage: Message = {
        text: messageToSend,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")

      setIsLoading(true)
      try {
        const result = await chat.sendMessage(messageToSend)
        const botMessage: Message = {
          text: result.response.text(),
          role: "model",
          timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])

        // Show suggestions again after receiving a response
        setShowSuggestions(true)
      } catch (err: any) {
        setError("Failed to send message: " + err.message)
      } finally {
        setIsLoading(false)
        // Focus the input field after sending a message
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }
    },
    [chat, userInput],
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

  const handleMessageClick = useCallback((message: Message) => {
    setSelectedMessage(message)
  }, [])

  // Filter out the questions that have already been asked
  const getUnaskedQuestions = useCallback(() => {
    const askedQuestions = messages.filter((msg) => msg.role === "user").map((msg) => msg.text)

    return predefinedQuestions.filter((item) => !askedQuestions.includes(item.question))
  }, [messages])

  return (
    <Card className="w-full h-full flex flex-col shadow-lg border-0 bg-green-50">
      <CardHeader className="border-b  text-black sticky top-0 z-10 backdrop-filter backdrop-blur-lg py-2 px-3 sm:py-3 sm:px-6 bg-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-2xl mx-auto font-bold text-center flex items-center gap-1 sm:gap-2">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
            Agri-Tech ChatBot
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 relative pt-20">
        {error && (
          <Alert variant="destructive" className="m-2 sm:m-7">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <AlertDescription className="text-sm sm:text-base">{error}</AlertDescription>
          </Alert>
        )}

        {/* Added pt-4 to create space after the sticky header */}
        <ScrollArea className="h-[50vh] sm:h-[60vh] md:h-[70vh] pt-2 sm:pt-4" ref={scrollAreaRef}>
          <div className="p-2 sm:p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-3 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 text-green-800">Welcome to AgriChatBot</h3>
                <p className="text-sm sm:text-base text-green-700">
                  Ask me anything about farming, agriculture, crops, or gardening!
                </p>
                <div className="mt-3 sm:mt-4 space-y-2 w-full">
                  {predefinedQuestions.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handlePredefinedQuestionClick(item.question)}
                      className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300 w-full text-left justify-start text-xs sm:text-sm py-2 px-3 h-auto min-h-[40px]"
                    >
                      {item.question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {messages.map((msg, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div
                        className={cn(
                          "flex flex-col max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 cursor-pointer transition-all hover:opacity-90 hover:shadow-md",
                          msg.role === "user"
                            ? "ml-auto bg-green-600 text-white"
                            : "mr-auto bg-green-100 text-green-900",
                        )}
                        onClick={() => handleMessageClick(msg)}
                      >
                        <div className="whitespace-pre-wrap text-sm sm:text-base">
                          {msg.text.length > 150 ? `${msg.text.substring(0, 150)}...` : msg.text}
                        </div>
                        <div className="flex items-center justify-between mt-1 sm:mt-2">
                          <span
                            className={cn(
                              "text-[10px] sm:text-xs",
                              msg.role === "user" ? "text-green-100" : "text-green-700",
                            )}
                          >
                            {msg.role === "model" && <MessageSquare className="h-2 w-2 sm:h-3 sm:w-3 inline mr-1" />}
                            Click to expand
                          </span>
                          <span
                            className={cn(
                              "text-[10px] sm:text-xs",
                              msg.role === "user" ? "text-green-100" : "text-green-700",
                            )}
                          >
                            {format(msg.timestamp, "h:mm a")}
                          </span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto p-3 sm:p-6">
                      {/* Added prominent close button */}
                      <DialogClose className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-full p-1.5 sm:p-2 bg-green-100 hover:bg-green-200 transition-colors">
                        <X className="h-3 w-3 sm:h-4 sm:w-4 text-green-800" />
                        <span className="sr-only">Close</span>
                      </DialogClose>

                      <DialogHeader className="mb-2 sm:mb-4">
                        <DialogTitle
                          className={cn(
                            "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-base sm:text-lg",
                            msg.role === "user" ? "text-green-700" : "text-green-800",
                          )}
                        >
                          {msg.role === "user" ? "Your Message" : "AgriBot Response"}
                          <span className="text-xs sm:text-sm font-normal text-gray-500">
                            {format(msg.timestamp, "MMM d, yyyy h:mm a")}
                          </span>
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="text-sm sm:text-base text-black whitespace-pre-wrap">
                        {msg.text}
                      </DialogDescription>

                      {/* Added bottom close button for better mobile UX */}
                      <div className="mt-4 sm:mt-6 flex justify-center">
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300 text-sm sm:text-base py-1.5 sm:py-2 h-auto"
                          >
                            Close
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}

                {isLoading && (
                  <div className="flex flex-col max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 mr-auto bg-green-100 text-green-900">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                      <span className="text-sm sm:text-base">Thinking...</span>
                    </div>
                  </div>
                )}

                {/* Show remaining questions after each bot response */}
                {showSuggestions && messages.length > 0 && messages[messages.length - 1].role === "model" && (
                  <div className="my-3 sm:my-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-green-800 mb-1 sm:mb-2">
                      You might also want to ask:
                    </p>
                    <div className="space-y-1.5 sm:space-y-2">
                      {getUnaskedQuestions()
                        .slice(0, 4)
                        .map((item, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePredefinedQuestionClick(item.question)}
                            className="bg-white hover:bg-green-100 text-green-800 border-green-200 w-full text-left justify-start text-xs sm:text-sm py-1.5 px-2 h-auto min-h-[32px]"
                          >
                            {item.question}
                          </Button>
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

      <div className="p-2 sm:p-4 sticky border-t border-green-200 bg-green-50">
        <div className="flex gap-1 sm:gap-2">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about farming..."
            disabled={isLoading}
            className="flex-1 border-green-300 focus-visible:ring-green-500 text-sm sm:text-base h-9 sm:h-10"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !userInput.trim()}
            size="icon"
            className="bg-green-700 hover:bg-green-800 h-9 w-9 sm:h-10 sm:w-10"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            ) : (
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}


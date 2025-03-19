"use client"

import type React from "react"

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Message {
  text: string
  role: "user" | "model"
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [chat, setChat] = useState<any>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyDS1UScOoCOAKLe22DTgcFui9bJlKyjnEQ"
  const MODEL_NAME = "gemini-2.0-flash"

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing. Please set NEXT_PUBLIC_GOOGLE_API_KEY in your environment variables.")
      return
    }

    const initChat = async () => {
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
          history: messages
            .filter((msg) => msg.role)
            .map((msg) => ({
              role: msg.role,
              parts: [{ text: msg.text }], // Correct format
            })),
        })
        setChat(newChat)
      } catch (err: any) {
        setError("Failed to initialize chat: " + err.message)
      } finally {
        setIsLoading(false)
      }
    }

    initChat()
  }, [messages, apiKey])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    const userMessage: Message = {
      text: userInput,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setUserInput("")

    if (chat) {
      setIsLoading(true)
      try {
        const result = await chat.sendMessage(userInput)
        const botMessage: Message = {
          text: result.response.text(),
          role: "model",
          timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      } catch (err: any) {
        setError("Failed to send message: " + err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="w-full h-full flex flex-col shadow-lg border-0">
      <CardHeader className="border-b bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold text-primary">AgriChatBot</CardTitle>
            <Badge variant="outline" className="ml-2">
              {MODEL_NAME}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode" className="text-sm">
              Dark Mode
            </Label>
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 relative">
        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ScrollArea className="h-full p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
              <h3 className="text-lg font-medium mb-2">Welcome to AgriChatBot</h3>
              <p>Ask me anything about farming, agriculture, crops, or gardening!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col max-w-[80%] rounded-lg p-4",
                    msg.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted",
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <span className="text-xs opacity-70 mt-2 self-end">{format(msg.timestamp, "h:mm a")}</span>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col max-w-[80%] rounded-lg p-4 mr-auto bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about farming..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !userInput.trim()} size="icon">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  )
}


"use client"

import { useState } from "react"
import { Search, Plus, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Define types
interface Question {
  id: string
  title: string
  content: string
  author: string
  date: string
  category: string
  votes: number
  answers: Answer[]
  userVoted?: "up" | "down" | null
}

interface Answer {
  id: string
  content: string
  author: string
  date: string
  votes: number
  userVoted?: "up" | "down" | null
}

// Sample categories
const categories = [
  "Crop Management",
  "Livestock",
  "Organic Farming",
  "Pest Control",
  "Irrigation",
  "Market Prices",
  "Equipment",
  "Weather",
]

// Sample initial questions
const initialQuestions: Question[] = [
  {
    id: "q1",
    title: "Best practices for organic pest control in tomato plants?",
    content:
      "I'm growing tomatoes organically and struggling with aphids. What are some effective natural remedies that won't harm beneficial insects?",
    author: "FarmerJohn",
    date: "2023-04-10",
    category: "Pest Control",
    votes: 15,
    answers: [
      {
        id: "a1",
        content:
          "I've had great success with neem oil spray. Mix 2 teaspoons of neem oil with 1 teaspoon of mild liquid soap in 1 quart of water. Spray on affected areas every 7-14 days.",
        author: "OrganicGardener",
        date: "2023-04-11",
        votes: 8,
      },
      {
        id: "a2",
        content:
          "Try introducing ladybugs to your garden. They're natural predators of aphids and can help control the population without chemicals.",
        author: "EcoFarmer",
        date: "2023-04-12",
        votes: 5,
      },
    ],
  },
  {
    id: "q2",
    title: "Recommended irrigation systems for small-scale vegetable farming?",
    content:
      "I have a 2-acre vegetable farm and want to optimize water usage. What irrigation systems would you recommend that are cost-effective and water-efficient?",
    author: "SmallFarmer",
    date: "2023-04-08",
    category: "Irrigation",
    votes: 10,
    answers: [
      {
        id: "a3",
        content:
          "Drip irrigation has been the most efficient system for my small farm. Initial setup cost is moderate, but the water savings and improved crop health make it worthwhile in the long run.",
        author: "WaterWise",
        date: "2023-04-09",
        votes: 12,
      },
    ],
  },
  {
    id: "q3",
    title: "Current market prices for organic wheat?",
    content:
      "Does anyone have information on the current market prices for organic wheat in the Midwest region? Looking to sell my harvest soon.",
    author: "WheatGrower",
    date: "2023-04-05",
    category: "Market Prices",
    votes: 7,
    answers: [],
  },
]

export default function QAForum() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(initialQuestions)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "", category: "" })
  const [newAnswer, setNewAnswer] = useState({ questionId: "", content: "" })
  const [answerDialogOpen, setAnswerDialogOpen] = useState(false)
  const [currentUser] = useState("CurrentUser") // In a real app, this would come from authentication

  // Update filtered questions when search query or category changes
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterQuestions(query, selectedCategory)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    filterQuestions(searchQuery, category)
  }

  const filterQuestions = (query: string, category: string | null) => {
    let filtered = [...questions]

    if (query) {
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(query.toLowerCase()) || q.content.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (category) {
      filtered = filtered.filter((q) => q.category === category)
    }

    setFilteredQuestions(filtered)
  }

  const handleAskQuestion = () => {
    if (newQuestion.title.trim() === "" || newQuestion.content.trim() === "" || newQuestion.category === "") {
      return
    }

    const newQuestionObj: Question = {
      id: `q${Date.now()}`,
      title: newQuestion.title,
      content: newQuestion.content,
      author: currentUser,
      date: new Date().toISOString().split("T")[0],
      category: newQuestion.category,
      votes: 0,
      answers: [],
    }

    const updatedQuestions = [newQuestionObj, ...questions]
    setQuestions(updatedQuestions)
    setFilteredQuestions(updatedQuestions)
    setNewQuestion({ title: "", content: "", category: "" })
  }

  const handleSubmitAnswer = () => {
    if (newAnswer.content.trim() === "" || newAnswer.questionId === "") {
      return
    }

    const newAnswerObj: Answer = {
      id: `a${Date.now()}`,
      content: newAnswer.content,
      author: currentUser,
      date: new Date().toISOString().split("T")[0],
      votes: 0,
    }

    const updatedQuestions = questions.map((q) =>
      q.id === newAnswer.questionId ? { ...q, answers: [...q.answers, newAnswerObj] } : q,
    )

    setQuestions(updatedQuestions)
    setFilteredQuestions(updatedQuestions)
    setNewAnswer({ questionId: "", content: "" })
    setAnswerDialogOpen(false)
  }

  const handleVote = (type: "question" | "answer", id: string, questionId: string | null, direction: "up" | "down") => {
    if (type === "question") {
      const updatedQuestions = questions.map((q) => {
        if (q.id === id) {
          // If user already voted the same way, remove the vote
          if (q.userVoted === direction) {
            return {
              ...q,
              votes: direction === "up" ? q.votes - 1 : q.votes + 1,
              userVoted: null,
            }
          }
          // If user voted the opposite way, change by 2
          else if (q.userVoted) {
            return {
              ...q,
              votes: direction === "up" ? q.votes + 2 : q.votes - 2,
              userVoted: direction,
            }
          }
          // If user hasn't voted yet
          else {
            return {
              ...q,
              votes: direction === "up" ? q.votes + 1 : q.votes - 1,
              userVoted: direction,
            }
          }
        }
        return q
      })

      setQuestions(updatedQuestions)
      setFilteredQuestions(updatedQuestions)
    } else if (type === "answer" && questionId) {
      const updatedQuestions = questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) => {
              if (a.id === id) {
                // If user already voted the same way, remove the vote
                if (a.userVoted === direction) {
                  return {
                    ...a,
                    votes: direction === "up" ? a.votes - 1 : a.votes + 1,
                    userVoted: null,
                  }
                }
                // If user voted the opposite way, change by 2
                else if (a.userVoted) {
                  return {
                    ...a,
                    votes: direction === "up" ? a.votes + 2 : a.votes - 2,
                    userVoted: direction,
                  }
                }
                // If user hasn't voted yet
                else {
                  return {
                    ...a,
                    votes: direction === "up" ? a.votes + 1 : a.votes - 1,
                    userVoted: direction,
                  }
                }
              }
              return a
            }),
          }
        }
        return q
      })

      setQuestions(updatedQuestions)
      setFilteredQuestions(updatedQuestions)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-2">E-Agriculture Q&A Forum</h1>
        <p className="text-gray-600">Connect with farmers, share knowledge, and find solutions</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${selectedCategory === null ? "bg-green-100 text-green-800" : ""}`}
                  onClick={() => handleCategoryChange(null)}
                >
                  All Topics
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className={`w-full justify-start ${selectedCategory === category ? "bg-green-100 text-green-800" : ""}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Ask a Question</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question-title">Title</Label>
                  <Input
                    id="question-title"
                    placeholder="What's your farming question?"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="question-content">Details</Label>
                  <Textarea
                    id="question-content"
                    placeholder="Provide more details about your question..."
                    rows={4}
                    value={newQuestion.content}
                    onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="question-category">Category</Label>
                  <Select
                    value={newQuestion.category}
                    onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                  >
                    <SelectTrigger id="question-category" className="border-green-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleAskQuestion}>
                  <Plus className="mr-2 h-4 w-4" /> Ask Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search questions..."
                className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory || ""}
              onValueChange={(value) => handleCategoryChange(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-full sm:w-[180px] border-green-200">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="bg-green-100 text-green-800">
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>
            <TabsContent value="latest">
              <QuestionsList
                questions={filteredQuestions}
                onAnswer={(questionId) => {
                  setNewAnswer({ ...newAnswer, questionId })
                  setAnswerDialogOpen(true)
                }}
                onVote={handleVote}
              />
            </TabsContent>
            <TabsContent value="popular">
              <QuestionsList
                questions={[...filteredQuestions].sort((a, b) => b.votes - a.votes)}
                onAnswer={(questionId) => {
                  setNewAnswer({ ...newAnswer, questionId })
                  setAnswerDialogOpen(true)
                }}
                onVote={handleVote}
              />
            </TabsContent>
            <TabsContent value="unanswered">
              <QuestionsList
                questions={filteredQuestions.filter((q) => q.answers.length === 0)}
                onAnswer={(questionId) => {
                  setNewAnswer({ ...newAnswer, questionId })
                  setAnswerDialogOpen(true)
                }}
                onVote={handleVote}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Answer Dialog */}
      <Dialog open={answerDialogOpen} onOpenChange={setAnswerDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Post Your Answer</DialogTitle>
            <DialogDescription>Share your knowledge and experience to help fellow farmers</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Write your answer here..."
              rows={6}
              value={newAnswer.content}
              onChange={(e) => setNewAnswer({ ...newAnswer, content: e.target.value })}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnswerDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmitAnswer}>
              Post Answer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Questions List Component
function QuestionsList({
  questions,
  onAnswer,
  onVote,
}: {
  questions: Question[]
  onAnswer: (questionId: string) => void
  onVote: (type: "question" | "answer", id: string, questionId: string | null, direction: "up" | "down") => void
}) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  if (questions.length === 0) {
    return (
      <Card className="mt-4 bg-green-50 border-green-200">
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">No questions found. Be the first to ask!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 mt-4">
      {questions.map((question) => (
        <Card key={question.id} className="border-green-200">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle
                  className="text-xl text-green-800 hover:text-green-600 cursor-pointer"
                  onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                >
                  {question.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-green-200 text-green-800 text-xs">
                      {question.author.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{question.author}</span>
                  <span>•</span>
                  <span>{formatDate(question.date)}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {question.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{question.content}</p>

            {expandedQuestion === question.id && question.answers.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="font-medium text-green-800">
                  {question.answers.length} Answer{question.answers.length !== 1 ? "s" : ""}
                </h3>
                <div className="space-y-4 pl-4 border-l-2 border-green-100">
                  {question.answers.map((answer) => (
                    <div key={answer.id} className="pt-2">
                      <p className="text-gray-700">{answer.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-green-100 text-green-800 text-xs">
                              {answer.author.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{answer.author}</span>
                          <span>•</span>
                          <span>{formatDate(answer.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 px-2 ${answer.userVoted === "up" ? "text-green-600" : "text-gray-500"}`}
                            onClick={() => onVote("answer", answer.id, question.id, "up")}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">{answer.votes}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 px-2 ${answer.userVoted === "down" ? "text-red-600" : "text-gray-500"}`}
                            onClick={() => onVote("answer", answer.id, question.id, "down")}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${question.userVoted === "up" ? "text-green-600" : "text-gray-500"}`}
                onClick={() => onVote("question", question.id, null, "up")}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="text-sm">{question.votes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${question.userVoted === "down" ? "text-red-600" : "text-gray-500"}`}
                onClick={() => onVote("question", question.id, null, "down")}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500"
                onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {question.answers.length} Answer{question.answers.length !== 1 ? "s" : ""}
                </span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                onClick={() => onAnswer(question.id)}
              >
                Answer
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

// Helper function to format dates
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "Today"
  } else if (diffDays === 1) {
    return "Yesterday"
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`
  } else {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }
}

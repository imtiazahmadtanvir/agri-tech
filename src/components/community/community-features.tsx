"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, MessageSquare, ThumbsUp, Share2, CalendarPlus, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types
interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  category: string
  likes: number
  comments: Comment[]
}

interface Comment {
  id: string
  content: string
  author: string
  date: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  category: string
  attendees: string[]
}

interface CooperativeGroup {
  id: string
  name: string
  description: string
  category: string
  location: string
  members: string[]
  creator: string
  dateCreated: string
}

// Sample data
const initialPosts: ForumPost[] = [
  {
    id: "p1",
    title: "Increased yields with companion planting",
    content:
      "I've been experimenting with companion planting this season and have seen a 30% increase in my tomato yields by planting basil nearby. The basil seems to repel pests and improve the flavor of the tomatoes. Has anyone else tried this combination or other successful companion planting strategies?",
    author: "GreenThumbFarmer",
    date: "2023-05-15",
    category: "Success Stories",
    likes: 24,
    comments: [
      {
        id: "c1",
        content:
          "I've had similar results with marigolds and various vegetables. They help keep pests away and add some color to the garden!",
        author: "OrganicGrower",
        date: "2023-05-16",
      },
      {
        id: "c2",
        content:
          "Have you tried planting onions with your carrots? I've found this combination works well for pest management.",
        author: "RootVeggieSpecialist",
        date: "2023-05-17",
      },
    ],
  },
  {
    id: "p2",
    title: "Dealing with unexpected drought",
    content:
      "We're facing an unexpected drought in our region, and I'm concerned about my corn crop. I've implemented drip irrigation, but I'm looking for additional water conservation techniques. Any advice from farmers who have dealt with similar situations?",
    author: "CornBeltFarmer",
    date: "2023-05-10",
    category: "Challenges",
    likes: 18,
    comments: [
      {
        id: "c3",
        content:
          "Mulching heavily around your plants can help retain moisture. I use straw mulch and it's been effective during dry spells.",
        author: "DroughtResistant",
        date: "2023-05-11",
      },
    ],
  },
  {
    id: "p3",
    title: "Effective natural fertilizers",
    content:
      "I've been making my own compost tea as a natural fertilizer and the results have been amazing. My process involves steeping compost in water for 24-48 hours, then straining and applying to plants. The micronutrients seem to give my vegetables a real boost!",
    author: "OrganicAdvocate",
    date: "2023-05-05",
    category: "Tips",
    likes: 32,
    comments: [],
  },
]

const initialEvents: Event[] = [
  {
    id: "e1",
    title: "Annual Farmers Market Workshop",
    description:
      "Join us for a comprehensive workshop on how to effectively sell your produce at farmers markets. Topics include display techniques, pricing strategies, and customer engagement.",
    date: "2023-06-15",
    time: "9:00 AM - 3:00 PM",
    location: "Community Agricultural Center, 123 Farm Road",
    organizer: "Local Agricultural Extension",
    category: "Workshop",
    attendees: ["FarmerJohn", "OrganicGrower", "MarketGardener"],
  },
  {
    id: "e2",
    title: "Sustainable Farming Conference",
    description:
      "A two-day conference featuring expert speakers on sustainable farming practices, regenerative agriculture, and climate-smart farming techniques.",
    date: "2023-07-10",
    time: "8:00 AM - 5:00 PM",
    location: "Green Valley Convention Center",
    organizer: "Sustainable Farming Association",
    category: "Conference",
    attendees: ["EcoFarmer", "SustainableGrower", "OrganicAdvocate", "GreenThumbFarmer"],
  },
  {
    id: "e3",
    title: "Livestock Health Fair",
    description:
      "Free health check-ups for livestock, plus seminars on common health issues and preventative care. Veterinarians will be available for consultations.",
    date: "2023-06-25",
    time: "10:00 AM - 4:00 PM",
    location: "County Fairgrounds",
    organizer: "Rural Veterinary Association",
    category: "Fair",
    attendees: ["CattleRancher", "SheepFarmer", "DairyProducer"],
  },
]

const initialGroups: CooperativeGroup[] = [
  {
    id: "g1",
    name: "Organic Grain Collective",
    description:
      "A cooperative of organic grain farmers working together to negotiate better prices with buyers and share equipment costs.",
    category: "Grain",
    location: "Midwest Region",
    members: ["OrganicGrower", "GrainFarmer", "WheatSpecialist", "OrganicAdvocate"],
    creator: "OrganicGrower",
    dateCreated: "2023-01-15",
  },
  {
    id: "g2",
    name: "Small Farm Equipment Share",
    description:
      "A group for small-scale farmers to share expensive equipment like tractors, tillers, and harvesters to reduce individual costs.",
    category: "Equipment",
    location: "Eastern Valley",
    members: ["SmallFarmer", "MarketGardener", "FamilyFarm", "GreenThumbFarmer"],
    creator: "SmallFarmer",
    dateCreated: "2023-02-20",
  },
  {
    id: "g3",
    name: "Local Produce Distributors",
    description:
      "Farmers working together to establish direct relationships with restaurants, schools, and other institutions for consistent local produce sales.",
    category: "Distribution",
    location: "Southern County",
    members: ["ProduceFarmer", "FarmToTable", "LocalGrower"],
    creator: "ProduceFarmer",
    dateCreated: "2023-03-10",
  },
]

// Forum categories
const forumCategories = ["Success Stories", "Challenges", "Tips", "Questions", "Market Insights"]

// Event categories
const eventCategories = ["Workshop", "Conference", "Fair", "Training", "Field Day", "Webinar"]

// Cooperative categories
const cooperativeCategories = ["Grain", "Produce", "Livestock", "Equipment", "Distribution", "Processing", "Marketing"]

// Add a defaultTab prop to the component
export default function CommunityFeatures({ defaultTab = "forum" }: { defaultTab?: string }) {
  // State for forum
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "" })
  const [newComment, setNewComment] = useState({ postId: "", content: "" })
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)

  // State for events
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  })

  // State for cooperative groups
  const [groups, setGroups] = useState<CooperativeGroup[]>(initialGroups)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
  })

  // Current user (would come from auth in a real app)
  const [currentUser] = useState("CurrentUser")

  // Forum functions
  const handleCreatePost = () => {
    if (newPost.title.trim() === "" || newPost.content.trim() === "" || newPost.category === "") {
      return
    }

    const post: ForumPost = {
      id: `p${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: currentUser,
      date: new Date().toISOString().split("T")[0],
      category: newPost.category,
      likes: 0,
      comments: [],
    }

    setPosts([post, ...posts])
    setNewPost({ title: "", content: "", category: "" })
  }

  const handleAddComment = () => {
    if (newComment.content.trim() === "" || newComment.postId === "") {
      return
    }

    const comment: Comment = {
      id: `c${Date.now()}`,
      content: newComment.content,
      author: currentUser,
      date: new Date().toISOString().split("T")[0],
    }

    setPosts(
      posts.map((post) => {
        if (post.id === newComment.postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          }
        }
        return post
      }),
    )

    setNewComment({ postId: "", content: "" })
    setCommentDialogOpen(false)
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  // Event functions
  const handleCreateEvent = () => {
    if (
      newEvent.title.trim() === "" ||
      newEvent.description.trim() === "" ||
      newEvent.date === "" ||
      newEvent.time === "" ||
      newEvent.location.trim() === "" ||
      newEvent.category === ""
    ) {
      return
    }

    const event: Event = {
      id: `e${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      organizer: currentUser,
      category: newEvent.category,
      attendees: [currentUser],
    }

    setEvents([event, ...events])
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
    })
  }

  const handleAttendEvent = (eventId: string) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          // Only add user if not already attending
          if (!event.attendees.includes(currentUser)) {
            return {
              ...event,
              attendees: [...event.attendees, currentUser],
            }
          }
        }
        return event
      }),
    )
  }

  // Cooperative group functions
  const handleCreateGroup = () => {
    if (
      newGroup.name.trim() === "" ||
      newGroup.description.trim() === "" ||
      newGroup.category === "" ||
      newGroup.location.trim() === ""
    ) {
      return
    }

    const group: CooperativeGroup = {
      id: `g${Date.now()}`,
      name: newGroup.name,
      description: newGroup.description,
      category: newGroup.category,
      location: newGroup.location,
      members: [currentUser],
      creator: currentUser,
      dateCreated: new Date().toISOString().split("T")[0],
    }

    setGroups([group, ...groups])
    setNewGroup({
      name: "",
      description: "",
      category: "",
      location: "",
    })
  }

  const handleJoinGroup = (groupId: string) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          // Only add user if not already a member
          if (!group.members.includes(currentUser)) {
            return {
              ...group,
              members: [...group.members, currentUser],
            }
          }
        }
        return group
      }),
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">Community Features</h1>
        <p className="text-gray-600">Connect, collaborate, and grow with fellow farmers</p>
      </header>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="bg-green-100 text-green-800 mb-4 mx-auto text-2xl">
          <TabsTrigger value="forum">Farmer Forum</TabsTrigger>
          <TabsTrigger value="events">Local Events</TabsTrigger>
          <TabsTrigger value="cooperatives">Cooperative Groups</TabsTrigger>
        </TabsList>

        {/* Farmer Forum Tab */}
        <TabsContent value="forum">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Recent Discussions</h2>
              {posts.length === 0 ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No posts yet. Be the first to share!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="border-green-200">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-green-800">{post.title}</CardTitle>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            {post.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-green-200 text-green-800 text-xs">
                              {post.author.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 whitespace-pre-line">{post.content}</p>

                        {post.comments.length > 0 && (
                          <div className="mt-4 space-y-3 pl-4 border-l-2 border-green-100">
                            <h3 className="font-medium text-green-800">Comments</h3>
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="text-sm">
                                <p className="text-gray-700">{comment.content}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                  <span>{comment.author}</span>
                                  <span>•</span>
                                  <span>{formatDate(comment.date)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                          onClick={() => handleLikePost(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{post.likes}</span>
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500"
                            onClick={() => {
                              setNewComment({ ...newComment, postId: post.id })
                              setCommentDialogOpen(true)
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>Comment</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span>Share</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Share Your Experience</CardTitle>
                  <CardDescription>Post a success story, challenge, or tip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Title</Label>
                      <Input
                        id="post-title"
                        placeholder="Give your post a title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-content">Content</Label>
                      <Textarea
                        id="post-content"
                        placeholder="Share your farming experience..."
                        rows={5}
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-category">Category</Label>
                      <Select
                        value={newPost.category}
                        onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                      >
                        <SelectTrigger id="post-category" className="border-green-200">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {forumCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleCreatePost}>
                      Post to Forum
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {forumCategories.map((category) => (
                      <Badge key={category} className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comment Dialog */}
          <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add a Comment</DialogTitle>
                <DialogDescription>Share your thoughts on this post</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="Write your comment here..."
                  rows={4}
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddComment}>
                  Post Comment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Local Events Tab */}
        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Upcoming Events</h2>
              {events.length === 0 ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No events scheduled. Create one to get started!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="border-green-200">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-green-800">{event.title}</CardTitle>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            {event.category}
                          </Badge>
                        </div>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{formatEventDate(event.date)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <Users className="h-4 w-4 mr-2" />
                              <span>
                                {event.attendees.length} {event.attendees.length === 1 ? "Attendee" : "Attendees"}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {event.attendees.slice(0, 3).map((attendee, index) => (
                                <Avatar key={index} className="h-6 w-6">
                                  <AvatarFallback className="bg-green-200 text-green-800 text-xs">
                                    {attendee.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {event.attendees.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-800">
                                  +{event.attendees.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <div className="text-sm text-gray-500">
                          Organized by: <span className="font-medium">{event.organizer}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          onClick={() => handleAttendEvent(event.id)}
                        >
                          {event.attendees.includes(currentUser) ? "Attending" : "Attend"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Create an Event</CardTitle>
                  <CardDescription>Share agricultural events with the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input
                        id="event-title"
                        placeholder="Name your event"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        placeholder="Describe your event..."
                        rows={3}
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Date</Label>
                        <Input
                          id="event-date"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-time">Time</Label>
                        <Input
                          id="event-time"
                          placeholder="e.g. 2:00 PM - 4:00 PM"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-location">Location</Label>
                      <Input
                        id="event-location"
                        placeholder="Event venue and address"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-category">Category</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                      >
                        <SelectTrigger id="event-category" className="border-green-200">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleCreateEvent}>
                      <CalendarPlus className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Event Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {eventCategories.map((category) => (
                      <Badge key={category} className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Cooperative Groups Tab */}
        <TabsContent value="cooperatives">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Active Cooperative Groups</h2>
              {groups.length === 0 ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No cooperative groups yet. Start one to collaborate with others!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {groups.map((group) => (
                    <Card key={group.id} className="border-green-200">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-green-800">{group.name}</CardTitle>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            {group.category}
                          </Badge>
                        </div>
                        <CardDescription>{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{group.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>Created on {formatDate(group.dateCreated)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <Users className="h-4 w-4 mr-2" />
                              <span>
                                {group.members.length} {group.members.length === 1 ? "Member" : "Members"}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {group.members.slice(0, 5).map((member, index) => (
                                <Avatar key={index} className="h-6 w-6">
                                  <AvatarFallback className="bg-green-200 text-green-800 text-xs">
                                    {member.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {group.members.length > 5 && (
                                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-800">
                                  +{group.members.length - 5}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <div className="text-sm text-gray-500">
                          Created by: <span className="font-medium">{group.creator}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          onClick={() => handleJoinGroup(group.id)}
                        >
                          {group.members.includes(currentUser) ? "Joined" : "Join Group"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Create a Cooperative Group</CardTitle>
                  <CardDescription>Form a collective for bulk buying, selling, or resource sharing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        placeholder="Name your cooperative group"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group-description">Description</Label>
                      <Textarea
                        id="group-description"
                        placeholder="Describe the purpose and goals of your group..."
                        rows={4}
                        value={newGroup.description}
                        onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group-category">Category</Label>
                      <Select
                        value={newGroup.category}
                        onValueChange={(value) => setNewGroup({ ...newGroup, category: value })}
                      >
                        <SelectTrigger id="group-category" className="border-green-200">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {cooperativeCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group-location">Location</Label>
                      <Input
                        id="group-location"
                        placeholder="Region or area covered by the group"
                        value={newGroup.location}
                        onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleCreateGroup}>
                      <UserPlus className="mr-2 h-4 w-4" /> Create Group
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Benefits of Cooperatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                        1
                      </div>
                      <span>Increased bargaining power with suppliers and buyers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                        2
                      </div>
                      <span>Shared equipment costs and resources</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                        3
                      </div>
                      <span>Knowledge sharing and collective problem solving</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                        4
                      </div>
                      <span>Access to larger markets and distribution channels</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
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

// Helper function to format event dates
function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
}

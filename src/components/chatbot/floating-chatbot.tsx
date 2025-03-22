"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
// import Chatbot from "@/components/chatbot"
import { cn } from "@/lib/utils"
import Chatbot from "./chatbot"

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed  bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50",
          "flex items-center justify-center",
          "bg-black text-gray-100 hover:bg-primary/90 transition-all duration-300",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white bg-transparent" />
      </Button>

      {/* Chatbot Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] p-0 gap-0 h-[80vh] max-h-[800px]">
          <div className="absolute right-4 top-4 z-10">
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Chatbot />
        </DialogContent>
      </Dialog>
    </>
  )
}
"use client"

import { useState, useCallback, memo, useEffect } from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import the Chatbot component with no SSR to avoid hydration issues
const Chatbot = dynamic(() => import("./chatbot"), { ssr: false })

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Memoize the open/close handlers to prevent unnecessary re-renders
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={handleOpen}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-full shadow-lg z-50",
          "flex items-center justify-center gap-1 sm:gap-2",
          "bg-green-700 text-white hover:bg-green-800 transition-all duration-300",
          isMobile ? "w-12 h-12" : "w-16 h-16",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        aria-label="Open chat"
      >
        {!isMobile && <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />}
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Chatbot Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            "p-0 gap-0 overflow-hidden",
            isMobile
              ? "w-[95vw] h-[90vh] max-w-none rounded-lg"
              : "sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] h-[80vh] max-h-[800px]",
          )}
          onInteractOutside={(e) => {
            // Prevent closing when clicking outside on mobile
            if (isMobile) {
              e.preventDefault()
            }
          }}
        >
          {/* Added prominent close button */}
          <DialogClose
            className={cn(
              "absolute z-50 rounded-full backdrop-blur-sm",
              isMobile
                ? "right-2 top-2 p-1.5 bg-white/70 hover:bg-white"
                : "right-4 top-4 p-2 bg-white/80 hover:bg-white shadow-md",
            )}
            onClick={handleClose}
          >
            <X className={cn(isMobile ? "h-4 w-4" : "h-5 w-5", "text-green-800")} />
            <span className="sr-only">Close chat</span>
          </DialogClose>

          {/* Only render Chatbot when dialog is open to save resources */}
          {isOpen && <Chatbot />}
        </DialogContent>
      </Dialog>
    </>
  )
}

// Memoize the entire component to prevent unnecessary re-renders
export default memo(FloatingChatbot)


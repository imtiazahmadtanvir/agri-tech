"use client"

import { useState, useCallback, memo, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, Leaf } from "lucide-react"
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
            "p-0 gap-0 overflow-hidden [&>button]:hidden border border-green-150/50 shadow-2xl",
            isMobile
              ? "w-[95vw] h-[90vh] max-w-none rounded-lg"
              : "sm:max-w-[420px] h-[80vh] max-h-[700px] sm:top-auto sm:left-auto sm:bottom-6 sm:right-6 sm:translate-x-0 sm:translate-y-0 rounded-2xl",
          )}
          onInteractOutside={(e) => {
            // Prevent closing when clicking outside on mobile
            if (isMobile) {
              e.preventDefault()
            }
          }}
        >
          {/* Only render Chatbot when dialog is open to save resources */}
          {isOpen && <Chatbot onClose={handleClose} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

// Memoize the entire component to prevent unnecessary re-renders
export default memo(FloatingChatbot)


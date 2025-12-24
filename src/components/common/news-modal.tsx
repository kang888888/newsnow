import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import type { NewsItem } from "@shared/types"

interface NewsModalProps {
  item: NewsItem | null
  isOpen: boolean
  onClose: () => void
}

export function NewsModal({ item, isOpen, onClose }: NewsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!item) return null

  const url = item.mobileUrl || item.url

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-op-50 z-999 backdrop-blur-2"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-1000 bg-base rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-400/20">
              <h2 className="text-lg font-bold truncate flex-1 mr-4" title={item.title}>
                {item.title}
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn i-ph:arrow-square-out"
                  title="在新标签页打开"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="btn i-ph:x"
                  title="关闭"
                />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={url}
                className="w-full h-full border-0"
                title={item.title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

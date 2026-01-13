'use client'

import { useEffect } from 'react'

interface EncouragementModalProps {
  encouragement: string
  isOpen: boolean
  onClose: () => void
}

export default function EncouragementModal({ encouragement, isOpen, onClose }: EncouragementModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          aria-label="Close modal"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Here's Your Encouragement
          </h2>

          <p className="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {encouragement}
          </p>

          <button
            onClick={onClose}
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            Thank You!
          </button>
        </div>
      </div>
    </div>
  )
}

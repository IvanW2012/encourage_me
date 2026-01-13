'use client'

interface Thought {
  id: string
  content: string
  encouragement: string | null
  created_at: string
}

interface ThoughtListProps {
  thoughts: Thought[]
  onDelete?: (thoughtId: string) => void
  isDeleting?: string | null
}

export default function ThoughtList({ thoughts, onDelete, isDeleting }: ThoughtListProps) {
  if (thoughts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500 dark:text-zinc-400">
          No thoughts yet. Share your first thought above!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {thoughts.map((thought) => (
        <div
          key={thought.id}
          className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          {onDelete && (
            <button
              onClick={() => onDelete(thought.id)}
              disabled={isDeleting === thought.id}
              className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-zinc-800 dark:hover:text-red-400"
              aria-label="Delete thought"
              title="Delete this thought"
            >
              {isDeleting === thought.id ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          )}
          
          <div className="mb-4 pr-8">
            <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed">
              {thought.content}
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {new Date(thought.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {thought.encouragement && (
            <div className="rounded-xl border-l-4 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 p-4 dark:from-pink-950/20 dark:to-purple-950/20">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-pink-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {thought.encouragement}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

'use client'

import { useState, FormEvent } from 'react'

interface ThoughtFormProps {
  onSubmit: (thought: string) => Promise<void>
  isLoading: boolean
  disabled?: boolean
}

export default function ThoughtForm({ onSubmit, isLoading, disabled = false }: ThoughtFormProps) {
  const [thought, setThought] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!thought.trim() || isLoading || disabled) return

    await onSubmit(thought.trim())
    setThought('')
  }

  const isFormDisabled = disabled || isLoading

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="mb-4">
        <label
          htmlFor="thought"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Share your thoughts today
        </label>
        <textarea
          id="thought"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder={disabled ? "Please verify your API key above to enable this field" : "What's on your mind today?"}
          rows={4}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-all focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-pink-500 dark:disabled:bg-zinc-900"
          disabled={isFormDisabled}
        />
      </div>
      <button
        type="submit"
        disabled={!thought.trim() || isFormDisabled}
        className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {isLoading ? 'Processing...' : 'Encourage Me'}
      </button>
    </form>
  )
}

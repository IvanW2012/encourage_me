'use client'

import { useState, useEffect } from 'react'

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string | null) => void
}

export default function ApiKeyInput({ onApiKeyChange }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedKey = localStorage.getItem('openai_api_key')
    if (savedKey) {
      setApiKey(savedKey)
      onApiKeyChange(savedKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value)
    // Auto-save on change
    if (e.target.value.trim()) {
      localStorage.setItem('openai_api_key', e.target.value.trim())
      onApiKeyChange(e.target.value.trim())
    } else {
      localStorage.removeItem('openai_api_key')
      onApiKeyChange(null)
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <label
        htmlFor="api-key"
        className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        OpenAI API Key
      </label>
      <input
        id="api-key"
        type="password"
        value={apiKey}
        onChange={handleChange}
        placeholder="Enter your OpenAI API key (sk-...)"
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-all focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-pink-500"
      />
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
        Your API key is stored locally in your browser and never sent to our servers except for OpenAI API calls.
      </p>
    </div>
  )
}

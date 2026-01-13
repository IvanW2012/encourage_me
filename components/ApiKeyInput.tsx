'use client'

import { useState, useEffect } from 'react'
import { verifyApiKey } from '@/app/actions'

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string | null) => void
  onVerificationChange: (isVerified: boolean) => void
}

export default function ApiKeyInput({ onApiKeyChange, onVerificationChange }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null)

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedKey = localStorage.getItem('openai_api_key')
    const savedVerification = localStorage.getItem('openai_api_key_verified') === 'true'
    if (savedKey) {
      setApiKey(savedKey)
      onApiKeyChange(savedKey)
      if (savedVerification) {
        setIsVerified(true)
        onVerificationChange(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value
    setApiKey(newKey)
    // Reset verification status when key changes
    if (isVerified) {
      setIsVerified(false)
      onVerificationChange(false)
      localStorage.removeItem('openai_api_key_verified')
      setVerificationMessage(null)
    }
    // Auto-save on change
    if (newKey.trim()) {
      localStorage.setItem('openai_api_key', newKey.trim())
      onApiKeyChange(newKey.trim())
    } else {
      localStorage.removeItem('openai_api_key')
      onApiKeyChange(null)
    }
  }

  const handleVerify = async () => {
    if (!apiKey.trim()) {
      setVerificationMessage('Please enter an API key first')
      return
    }

    setIsVerifying(true)
    setVerificationMessage(null)

    try {
      const result = await verifyApiKey(apiKey.trim())
      
      if (result.valid) {
        setIsVerified(true)
        onVerificationChange(true)
        localStorage.setItem('openai_api_key_verified', 'true')
        setVerificationMessage('✓ API key verified successfully!')
      } else {
        setIsVerified(false)
        onVerificationChange(false)
        localStorage.removeItem('openai_api_key_verified')
        setVerificationMessage(result.message || 'Verification failed')
      }
    } catch (error) {
      setIsVerified(false)
      onVerificationChange(false)
      localStorage.removeItem('openai_api_key_verified')
      setVerificationMessage('An error occurred during verification. Please try again.')
    } finally {
      setIsVerifying(false)
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
        disabled={isVerifying}
      />
      <div className="mt-3">
        <button
          onClick={handleVerify}
          disabled={!apiKey.trim() || isVerifying}
          className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isVerifying ? 'Verifying...' : 'Verify API Key'}
        </button>
        {verificationMessage && (
          <p className={`mt-2 text-sm ${isVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {verificationMessage}
          </p>
        )}
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
        Your API key is stored locally in your browser and never sent to our servers except for OpenAI API calls.
      </p>
    </div>
  )
}

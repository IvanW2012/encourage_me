'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveThought, generateEncouragement, updateThoughtEncouragement, deleteThought } from '@/app/actions'
import ThoughtForm from './ThoughtForm'
import ThoughtList from './ThoughtList'
import EncouragementModal from './EncouragementModal'

interface Thought {
  id: string
  content: string
  encouragement: string | null
  created_at: string
}

interface EncourageMeClientProps {
  initialThoughts: Thought[]
}

export default function EncourageMeClient({ initialThoughts }: EncourageMeClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [thoughts, setThoughts] = useState<Thought[]>(initialThoughts)
  const [modalEncouragement, setModalEncouragement] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleSubmit = async (thought: string) => {
    startTransition(async () => {
      try {
        // Save the thought
        const savedThought = await saveThought(thought)

        // Generate encouragement
        const encouragement = await generateEncouragement(thought)

        // Update the thought with encouragement
        await updateThoughtEncouragement(savedThought.id, encouragement)

        // Update local state with new thought
        const newThought: Thought = {
          ...savedThought,
          encouragement,
        }
        setThoughts((prev) => [newThought, ...prev])

        // Show modal with encouragement
        setModalEncouragement(encouragement)
        setIsModalOpen(true)

        // Refresh to ensure consistency
        router.refresh()
      } catch (error) {
        console.error('Error submitting thought:', error)
        // Still show a generic encouragement even if something fails
        setModalEncouragement('Your thoughts matter. Keep going!')
        setIsModalOpen(true)
      }
    })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalEncouragement('')
  }

  const handleDelete = async (thoughtId: string) => {
    setIsDeleting(thoughtId)
    startTransition(async () => {
      try {
        await deleteThought(thoughtId)
        // Remove from local state
        setThoughts((prev) => prev.filter((thought) => thought.id !== thoughtId))
        // Refresh to ensure consistency
        router.refresh()
      } catch (error) {
        console.error('Error deleting thought:', error)
        // Refresh to restore correct state from server
        router.refresh()
        alert(`Failed to delete thought: ${error instanceof Error ? error.message : 'Unknown error'}\n\nIf this persists, you may need to add a DELETE policy in Supabase.`)
      } finally {
        setIsDeleting(null)
      }
    })
  }

  return (
    <>
      <ThoughtForm onSubmit={handleSubmit} isLoading={isPending} />
      <ThoughtList 
        thoughts={thoughts} 
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
      <EncouragementModal
        encouragement={modalEncouragement}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}

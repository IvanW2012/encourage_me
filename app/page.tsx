import { getThoughts } from './actions'
import EncourageMeClient from '@/components/EncourageMeClient'

export default async function Home() {
  const thoughts = await getThoughts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Encourage Me
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Share your thoughts and receive uplifting encouragement
          </p>
        </div>

        <EncourageMeClient initialThoughts={thoughts} />
      </div>
    </div>
  )
}

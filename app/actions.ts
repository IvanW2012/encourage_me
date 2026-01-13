'use server'

import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

export async function saveThought(content: string) {
  const supabase = await createClient()
  
  // Insert thought
  const { data, error } = await supabase
    .from('thoughts')
    .insert({ content })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save thought: ${error.message}`)
  }

  return data
}

export async function generateEncouragement(thought: string, apiKey?: string | null): Promise<string> {
  try {
    // Use user-provided API key if available, otherwise fall back to environment variable
    const keyToUse = apiKey || process.env.OPENAI_API_KEY

    if (!keyToUse) {
      throw new Error('OpenAI API key is required. Please enter your API key in the settings above.')
    }

    const openai = new OpenAI({
      apiKey: keyToUse,
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a compassionate and encouraging friend. Provide brief, uplifting, and genuine encouragement based on the user\'s thoughts. Keep responses to 1-2 sentences, warm and supportive.',
        },
        {
          role: 'user',
          content: thought,
        },
      ],
      max_tokens: 150,
      temperature: 0.8,
    })

    const encouragement = completion.choices[0]?.message?.content || 'You\'ve got this! Keep going!'
    return encouragement.trim()
  } catch (error) {
    console.error('Error generating encouragement:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw error
      }
      if (error.message.includes('insufficient_quota') || error.message.includes('billing')) {
        throw new Error('Your OpenAI API key has insufficient quota. Please check your OpenAI account billing.')
      }
      if (error.message.includes('invalid_api_key')) {
        throw new Error('Invalid OpenAI API key. Please check your API key and try again.')
      }
    }
    
    return 'Remember, every step forward counts. You\'re doing great!'
  }
}

export async function updateThoughtEncouragement(thoughtId: string, encouragement: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('thoughts')
    .update({ encouragement })
    .eq('id', thoughtId)

  if (error) {
    throw new Error(`Failed to update encouragement: ${error.message}`)
  }
}

export async function getThoughts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('thoughts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch thoughts: ${error.message}`)
  }

  return data || []
}

export async function deleteThought(thoughtId: string) {
  const supabase = await createClient()
  
  const { data, error, count } = await supabase
    .from('thoughts')
    .delete()
    .eq('id', thoughtId)
    .select()

  if (error) {
    console.error('Delete error:', error)
    // Check if it's an RLS policy error
    if (error.message.includes('policy') || error.message.includes('permission') || error.message.includes('RLS')) {
      throw new Error(
        `Delete blocked by Row Level Security. Please run this SQL in Supabase:\n\n` +
        `CREATE POLICY "Allow public delete" ON thoughts FOR DELETE TO public USING (true);`
      )
    }
    throw new Error(`Failed to delete thought: ${error.message}`)
  }

  // If no rows were deleted, it might be an RLS issue
  if (!data || data.length === 0) {
    throw new Error(
      `No rows were deleted. The DELETE policy may be missing.\n\n` +
      `Please run this SQL in your Supabase SQL Editor:\n\n` +
      `CREATE POLICY "Allow public delete" ON thoughts FOR DELETE TO public USING (true);`
    )
  }
}

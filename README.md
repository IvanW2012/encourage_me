# Encourage Me - Next.js + Supabase + Vercel

A modern Next.js application built with TypeScript, Supabase, and optimized for Vercel deployment.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS
- **AI:** OpenAI (GPT-3.5-turbo)
- **Deployment:** Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account ([sign up here](https://supabase.com))
- A Vercel account (optional, for deployment)

## 🛠️ Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Supabase

1. Create a new project at [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to **Settings** → **API** in your Supabase project
3. Copy your **Project URL** and **anon/public key**
4. Go to **SQL Editor** in your Supabase project
5. Run the SQL from `supabase_setup.sql` to create the `thoughts` table and set up Row Level Security policies

### Step 3: Set Up OpenAI

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Make sure you have credits available in your OpenAI account

### Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. Add your credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

### Step 5: Generate TypeScript Types (Optional but Recommended)

To get full type safety with your Supabase database:

1. Install Supabase CLI (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Generate types:
   ```bash
   supabase gen types typescript --linked > types/database.ts
   ```

   Or use your project ID:
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
   ```

### Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
encourage_me2/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/
│   └── supabase/          # Supabase client utilities
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server components client
│       └── middleware.ts  # Middleware helper
├── types/
│   └── database.ts        # Supabase database types
├── middleware.ts          # Next.js middleware (session management)
└── .env.local             # Environment variables (not in git)
```

## 🔌 Using Supabase

### Client Components (Browser)

```typescript
import { createClient } from '@/lib/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  // Use Supabase client
  const { data } = await supabase.from('your_table').select()
}
```

### Server Components

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  const supabase = await createClient()
  
  // Use Supabase client
  const { data } = await supabase.from('your_table').select()
}
```

### Server Actions

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function myAction() {
  const supabase = await createClient()
  // Your server action logic
}
```

## 🚢 Deploying to Vercel

1. **Push your code to GitHub** (or GitLab/Bitbucket)

2. **Import your repository to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your Git repository

3. **Add Environment Variables:**
   - In your Vercel project settings, go to **Settings** → **Environment Variables**
   - Add the same variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `OPENAI_API_KEY`

4. **Deploy:**
   - Vercel will automatically deploy on every push to your main branch
   - Your app will be live at `your-project.vercel.app`

## 🔒 Security Notes

- Never commit `.env.local` to version control (it's in `.gitignore`)
- The `NEXT_PUBLIC_*` prefix makes variables available to the browser
- Never expose your Supabase `service_role` key in client-side code
- Use Row Level Security (RLS) policies in Supabase for data protection

## 📚 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ✨ Features

- **Share Thoughts**: Type in your thoughts and submit them
- **AI-Powered Encouragement**: Receive personalized, uplifting encouragement generated by OpenAI
- **Beautiful UI**: Modern, clean design with gradient backgrounds and smooth animations
- **Thought History**: View all your past thoughts and their encouragements
- **Real-time Updates**: See your thoughts appear immediately after submission

## 🎯 Next Steps

1. ✅ Set up your Supabase database schema (run `supabase_setup.sql`)
2. ✅ Configure environment variables
3. ✅ Run the development server
4. Start sharing your thoughts and receiving encouragement!

Happy coding! 🎉
-- Add DELETE policy for thoughts table
-- Run this in your Supabase SQL Editor if delete operations are not working

-- First, check if the policy already exists and drop it if needed
DROP POLICY IF EXISTS "Allow public delete" ON thoughts;

-- Create the DELETE policy
CREATE POLICY "Allow public delete" ON thoughts
  FOR DELETE
  TO public
  USING (true);
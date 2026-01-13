-- Create the thoughts table
CREATE TABLE IF NOT EXISTS thoughts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  encouragement TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert thoughts (for public access)
CREATE POLICY "Allow public insert" ON thoughts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a policy that allows anyone to read thoughts (for public access)
CREATE POLICY "Allow public read" ON thoughts
  FOR SELECT
  TO public
  USING (true);

-- Create a policy that allows updates (for server actions to update encouragement)
CREATE POLICY "Allow public update" ON thoughts
  FOR UPDATE
  TO public
  USING (true);

-- Create a policy that allows deletes (for deleting thoughts)
CREATE POLICY "Allow public delete" ON thoughts
  FOR DELETE
  TO public
  USING (true);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS thoughts_created_at_idx ON thoughts(created_at DESC);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  parent_name TEXT NOT NULL,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  grade TEXT NOT NULL,
  subject_interest TEXT NOT NULL,
  message TEXT,
  source TEXT NOT NULL
);

-- Create consultation_bookings table
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  parent_name TEXT NOT NULL,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  grade TEXT NOT NULL,
  preferred_time TEXT,
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
CREATE INDEX IF NOT EXISTS consultation_bookings_created_at_idx ON consultation_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS consultation_bookings_email_idx ON consultation_bookings(email);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts to leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts to consultation_bookings"
  ON consultation_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies to allow authenticated users to read all records
CREATE POLICY "Allow authenticated users to read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read consultation_bookings"
  ON consultation_bookings
  FOR SELECT
  TO authenticated
  USING (true);

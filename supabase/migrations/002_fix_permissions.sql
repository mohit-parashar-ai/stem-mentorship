-- Fix permissions for form submissions
-- Run this if you're getting "permission denied" errors

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts to leads" ON leads;
DROP POLICY IF EXISTS "Allow public inserts to consultation_bookings" ON consultation_bookings;
DROP POLICY IF EXISTS "Allow authenticated users to read leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to read consultation_bookings" ON consultation_bookings;

-- Make sure RLS is enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Grant basic permissions to anon role (public users)
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.leads TO anon;
GRANT INSERT ON public.consultation_bookings TO anon;
-- Also grant SELECT in case you want to return inserted data
GRANT SELECT ON public.leads TO anon;
GRANT SELECT ON public.consultation_bookings TO anon;

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.leads TO authenticated;
GRANT ALL ON public.consultation_bookings TO authenticated;

-- Create policies for anonymous inserts (form submissions)
CREATE POLICY "Enable insert for anonymous users on leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable insert for anonymous users on consultation_bookings"
  ON consultation_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated users to read
CREATE POLICY "Enable read for authenticated users on leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for authenticated users on consultation_bookings"
  ON consultation_bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Also allow authenticated users to update and delete (for admin purposes)
CREATE POLICY "Enable update for authenticated users on leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users on consultation_bookings"
  ON consultation_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users on leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete for authenticated users on consultation_bookings"
  ON consultation_bookings
  FOR DELETE
  TO authenticated
  USING (true);

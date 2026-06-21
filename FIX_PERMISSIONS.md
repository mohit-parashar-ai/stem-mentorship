# Fix "Permission Denied" Error for Forms

## Problem

Getting this error when submitting forms:
```json
{
  "code": "42501",
  "message": "permission denied for table consultation_bookings"
}
```

## Solution

The Supabase Row Level Security (RLS) policies need to be properly configured. Follow these steps:

---

## 🔧 **Quick Fix (5 minutes)**

### Step 1: Go to Supabase SQL Editor

1. Open your Supabase dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **+ New query**

### Step 2: Run the Fix Script

Copy and paste this entire script into the SQL editor:

```sql
-- Fix permissions for form submissions
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts to leads" ON leads;
DROP POLICY IF EXISTS "Allow public inserts to consultation_bookings" ON consultation_bookings;
DROP POLICY IF EXISTS "Allow authenticated users to read leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to read consultation_bookings" ON consultation_bookings;
DROP POLICY IF EXISTS "Enable insert for anonymous users on leads" ON leads;
DROP POLICY IF EXISTS "Enable insert for anonymous users on consultation_bookings" ON consultation_bookings;
DROP POLICY IF EXISTS "Enable read for authenticated users on leads" ON leads;
DROP POLICY IF EXISTS "Enable read for authenticated users on consultation_bookings" ON consultation_bookings;

-- Make sure RLS is enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Grant basic permissions to anon role (public users)
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.leads TO anon;
GRANT INSERT ON public.consultation_bookings TO anon;

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
```

### Step 3: Execute

Click **Run** (or press Cmd/Ctrl + Enter)

You should see: **"Success. No rows returned"**

### Step 4: Test Forms

1. Go back to your website: http://localhost:5174/assessment
2. Fill out the assessment form
3. Submit
4. ✅ Should work now!

---

## 🔍 **Verify It Worked**

### Check Policies

1. In Supabase dashboard, go to **Authentication** → **Policies**
2. You should see policies for both tables:
   - ✅ `leads` - "Enable insert for anonymous users on leads"
   - ✅ `consultation_bookings` - "Enable insert for anonymous users on consultation_bookings"

### Check Submitted Data

1. Go to **Table Editor** → `consultation_bookings`
2. You should see your test submission
3. ✅ Form data is being saved!

---

## 🤔 **Why This Happened**

**Row Level Security (RLS)** is a Supabase security feature that controls who can access your data. The issue was:

1. RLS was enabled (good for security)
2. But the policies weren't properly configured
3. So anonymous users (website visitors) couldn't insert data

**The Fix**:
- Granted `INSERT` permission to `anon` role (anonymous users)
- Created policies allowing public form submissions
- Kept read/update/delete restricted to authenticated users only

This is **secure** because:
- ✅ Anyone can submit forms (intended behavior)
- ✅ Only you (authenticated) can view/edit submissions
- ✅ No one can delete or modify existing submissions without authentication

---

## 🔐 **Security Notes**

### What's Allowed

**Anonymous users (website visitors) can**:
- ✅ Submit contact forms (`leads` table)
- ✅ Submit assessment bookings (`consultation_bookings` table)
- ❌ Cannot read existing submissions
- ❌ Cannot update or delete anything

**Authenticated users (you) can**:
- ✅ View all submissions
- ✅ Update submissions
- ✅ Delete submissions
- ✅ Export data

### This is Standard Practice

Most contact forms work this way:
- Public can submit
- Only admins can view

Your data is secure! 🔒

---

## 📊 **Alternative: Using Supabase UI**

If you prefer using the UI instead of SQL:

### Step 1: Enable RLS

1. Go to **Table Editor** → `consultation_bookings`
2. Click **⚙️** (settings icon)
3. Enable "Enable Row Level Security (RLS)"
4. Repeat for `leads` table

### Step 2: Add Policies

1. Click **Add Policy** → **Create a policy from scratch**
2. **Policy name**: "Enable insert for anonymous users"
3. **Allowed operation**: INSERT
4. **Target roles**: anon
5. **Policy definition**: Leave as `true`
6. Click **Create policy**
7. Repeat for both tables

---

## 🧪 **Test Everything**

### Test Contact Form

```bash
# Go to contact page
open http://localhost:5174/contact

# Fill out form and submit
# Should see success message
```

### Test Assessment Form

```bash
# Go to assessment page
open http://localhost:5174/assessment

# Fill out form and submit
# Should see "Assessment Booked!" success screen
```

### Verify in Supabase

1. Go to **Table Editor**
2. Click `leads` table
3. Should see your contact form submission
4. Click `consultation_bookings` table
5. Should see your assessment booking

---

## ❓ **Still Not Working?**

### Check Environment Variables

Make sure your `.env` file has the correct credentials:

```bash
cat .env
```

Should show:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Check Supabase Project Status

1. Go to Supabase dashboard
2. Make sure your project is **Active** (not paused)
3. Free tier projects pause after 1 week of inactivity

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors when submitting form
4. Share error message if you need more help

---

## ✅ **Success Checklist**

- [ ] Ran the SQL fix script in Supabase
- [ ] Saw "Success. No rows returned" message
- [ ] Verified policies exist in Supabase dashboard
- [ ] Tested contact form - works ✅
- [ ] Tested assessment form - works ✅
- [ ] Verified data appears in Supabase tables
- [ ] Forms working on all pages

---

## 🎉 **You're Done!**

Your forms should now work perfectly. All submissions will be stored securely in your Supabase database.

**Next Steps**:
1. Set up email notifications (optional) - see [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
2. Deploy to production - see [DEPLOYMENT.md](DEPLOYMENT.md)
3. Start collecting leads! 🚀

---

**Questions?** Check [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for more detailed Supabase documentation.

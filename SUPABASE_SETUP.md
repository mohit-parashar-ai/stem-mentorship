# Supabase Setup Guide

Complete guide to setting up Supabase for the Manu Pande STEM Tutoring website.

## Overview

This website uses Supabase as a backend-as-a-service for:
- **Lead capture** from contact forms
- **Consultation booking** management
- **Data storage** with PostgreSQL
- **Row Level Security** for data protection

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Verify your email address

## Step 2: Create a New Project

1. Click "New Project"
2. Select your organization (or create a new one)
3. Fill in project details:
   - **Name**: `manu-pande-stem` (or any name you prefer)
   - **Database Password**: Generate a strong password (save this securely!)
   - **Region**: Choose closest to your target audience
     - `East US` for USA/Canada
     - `West EU` for Europe/Middle East
   - **Pricing Plan**: Free tier is sufficient to start

4. Click "Create new project"
5. Wait 2-3 minutes for the project to be provisioned

## Step 3: Get API Credentials

1. In your project dashboard, click the ⚙️ Settings icon
2. Navigate to **API** section
3. Copy these two values:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJxxx...` (long string)

4. Save these securely - you'll need them for `.env` configuration

## Step 4: Run Database Migration

### Option A: Using SQL Editor (Recommended)

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **+ New query**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Step 5: Verify Database Setup

1. Click **Table Editor** in the left sidebar
2. You should see two tables:
   - `leads`
   - `consultation_bookings`

3. Click on `leads` table to inspect columns:
   - `id` (uuid)
   - `created_at` (timestamp)
   - `parent_name` (text)
   - `student_name` (text)
   - `email` (text)
   - `phone` (text)
   - `country` (text)
   - `grade` (text)
   - `subject_interest` (text)
   - `message` (text)
   - `source` (text)

4. Click on `consultation_bookings` to verify columns

## Step 6: Verify Row Level Security (RLS)

1. Click **Authentication** → **Policies** in the sidebar
2. You should see policies for both tables:

**For `leads` table**:
- ✅ "Allow public inserts to leads" - Allows anonymous form submissions
- ✅ "Allow authenticated users to read leads" - Allows you to view submissions

**For `consultation_bookings` table**:
- ✅ "Allow public inserts to consultation_bookings"
- ✅ "Allow authenticated users to read consultation_bookings"

These policies allow:
- Anyone to submit forms (INSERT)
- Only authenticated users to view submissions (SELECT)

## Step 7: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Important**: Never commit `.env` to Git. It's already in `.gitignore`.

## Step 8: Test the Integration

### Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/contact`

3. Fill out and submit the contact form

4. Check Supabase:
   - Go to **Table Editor** → `leads`
   - You should see your test submission

5. Test the assessment booking:
   - Navigate to `/assessment`
   - Fill out and submit the form
   - Check **Table Editor** → `consultation_bookings`

### Test in Production

After deploying:
1. Submit forms on your live website
2. Verify data appears in Supabase dashboard

## Step 9: Set Up Email Notifications (Optional)

To receive email notifications when forms are submitted:

### Option A: Supabase Database Webhooks

1. In Supabase dashboard, go to **Database** → **Webhooks**
2. Click **Create a new hook**
3. Configure:
   - **Name**: "New Lead Notification"
   - **Table**: `leads`
   - **Events**: `INSERT`
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: Your webhook endpoint (see options below)

### Option B: Using Zapier

1. Create a Zapier account
2. Create a new Zap:
   - **Trigger**: Webhooks by Zapier → Catch Hook
   - **Action**: Gmail/Outlook → Send Email
3. Copy the Zapier webhook URL
4. Add to Supabase webhook (from Option A above)

### Option C: Using Make.com (formerly Integromat)

1. Create a Make.com account
2. Create a new scenario with Webhook trigger
3. Add email action (Gmail, SendGrid, etc.)
4. Copy webhook URL and add to Supabase

## Step 10: View and Manage Leads

### View in Supabase Dashboard

1. Go to **Table Editor**
2. Click on `leads` or `consultation_bookings`
3. View, filter, and export data as needed

### Export Data

1. In Table Editor, click the table
2. Click **⋮** menu → **Export to CSV**
3. Or use SQL Editor to query specific data:

```sql
-- Get all leads from the last 7 days
SELECT * FROM leads 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Get all bookings by country
SELECT country, COUNT(*) as count
FROM consultation_bookings
GROUP BY country
ORDER BY count DESC;
```

## Step 11: Set Up Authentication (Optional)

To access the data programmatically or build an admin dashboard:

1. In Supabase dashboard, go to **Authentication**
2. Click **Add user** to create an admin account
3. Use this account to query data in your application

Example admin query:
```typescript
import { supabase } from './lib/supabase';

// Must be authenticated first
const { data: leads, error } = await supabase
  .from('leads')
  .select('*')
  .order('created_at', { ascending: false });
```

## Database Schema Reference

### `leads` Table

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | UUID | Yes (auto) | Primary key |
| created_at | Timestamp | Yes (auto) | Submission time |
| parent_name | Text | Yes | Parent's full name |
| student_name | Text | Yes | Student's name |
| email | Text | Yes | Contact email |
| phone | Text | Yes | Phone number |
| country | Text | Yes | Country of residence |
| grade | Text | Yes | Student's grade level |
| subject_interest | Text | Yes | Subject of interest |
| message | Text | No | Additional message |
| source | Text | Yes | Form source (e.g., "Contact Page") |

### `consultation_bookings` Table

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | UUID | Yes (auto) | Primary key |
| created_at | Timestamp | Yes (auto) | Booking time |
| parent_name | Text | Yes | Parent's full name |
| student_name | Text | Yes | Student's name |
| email | Text | Yes | Contact email |
| phone | Text | Yes | Phone number |
| country | Text | Yes | Country of residence |
| grade | Text | Yes | Student's grade level |
| preferred_time | Text | No | Preferred time for call |
| notes | Text | No | Additional notes |

## Security Best Practices

### ✅ Do's

- ✅ Use Row Level Security (already configured)
- ✅ Keep your `anon` key in environment variables only
- ✅ Never commit `.env` files to Git
- ✅ Use HTTPS in production (automatic with deployment platforms)
- ✅ Regularly audit database policies
- ✅ Use service_role key only in secure server environments

### ❌ Don'ts

- ❌ Never expose your `service_role` key in client-side code
- ❌ Don't store sensitive data in `leads` or `consultation_bookings` tables
- ❌ Don't disable RLS without understanding security implications
- ❌ Don't use weak database passwords

## Monitoring & Maintenance

### Monitor Usage

1. Go to **Project Settings** → **Usage**
2. Monitor:
   - Database size
   - Storage usage
   - Bandwidth
   - API requests

### Free Tier Limits

- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth per month
- Unlimited API requests

If you exceed limits, consider upgrading to Pro plan ($25/month).

### Backup Your Database

Supabase automatically backs up your database daily. To download a backup:

1. Go to **Database** → **Backups**
2. Click **Download** on any backup
3. Store securely off-site

## Troubleshooting

### Forms Not Submitting

**Error: "Failed to submit"**
- Check browser console for detailed error
- Verify environment variables are correct
- Check Supabase project is not paused (free tier projects pause after 1 week of inactivity)

**Error: "new row violates row-level security policy"**
- Verify RLS policies exist: **Authentication** → **Policies**
- Re-run the migration script if policies are missing

### Cannot View Data

**No data showing in Table Editor**
- Verify forms were actually submitted
- Check correct table is selected
- Look for errors in browser console during submission

### Connection Issues

**Error: "Failed to fetch"**
- Verify `VITE_SUPABASE_URL` is correct
- Check project is active (not paused)
- Verify network connectivity

## Advanced: Custom Queries

For analytics or reporting, use the SQL Editor:

```sql
-- Leads by country
SELECT country, COUNT(*) as total
FROM leads
GROUP BY country
ORDER BY total DESC;

-- Daily submission trends
SELECT 
  DATE(created_at) as date,
  COUNT(*) as submissions
FROM consultation_bookings
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Most interested subjects
SELECT subject_interest, COUNT(*) as count
FROM leads
GROUP BY subject_interest
ORDER BY count DESC;
```

## Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)

## Next Steps

✅ Supabase is now fully configured!

Next:
1. Deploy your website (see `DEPLOYMENT.md`)
2. Test forms on production
3. Set up email notifications
4. Monitor submissions regularly

---

Need help? Check the Supabase documentation or reach out to their excellent support team.

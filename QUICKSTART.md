# Quick Start Guide

Get your Manu Pande STEM Tutoring website up and running in 10 minutes.

## ⚡ 5-Minute Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials (or use placeholder values for now):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open Browser

Navigate to: **http://localhost:5173**

🎉 **You're live!** Browse the site locally.

---

## 🗄️ Set Up Database (5 minutes)

### 1. Create Supabase Account

Go to [supabase.com](https://supabase.com) and create a free account.

### 2. Create New Project

- Click "New Project"
- Name it (e.g., "manu-pande-stem")
- Generate a strong database password
- Choose a region close to your users
- Click "Create new project" (wait 2-3 minutes)

### 3. Get API Credentials

- Go to **Settings** (⚙️) → **API**
- Copy:
  - Project URL
  - anon public key

### 4. Update `.env`

Replace placeholder values in `.env` with your real credentials.

### 5. Run Database Migration

- In Supabase dashboard, go to **SQL Editor**
- Click **+ New query**
- Copy and paste contents from: `supabase/migrations/001_initial_schema.sql`
- Click **Run** (or Cmd/Ctrl + Enter)

✅ **Database is ready!**

---

## 🧪 Test Everything

### Test Forms Locally

1. Navigate to `http://localhost:5173/contact`
2. Fill out the contact form
3. Submit
4. Check Supabase:
   - Go to **Table Editor** → `leads`
   - You should see your submission

5. Navigate to `/assessment`
6. Fill out the assessment form
7. Submit
8. Check **Table Editor** → `consultation_bookings`

✅ **Forms working!**

---

## 🚀 Deploy to Production (10 minutes)

### Option A: Deploy to Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

**Done!** Your site is live at `your-project.vercel.app`

### Option B: Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables
7. Click "Deploy site"

**Done!** Your site is live at `your-project.netlify.app`

---

## 📝 Customize Your Site

### Update Contact Info

Edit `src/components/layout/Footer.tsx`:

```typescript
<a href="mailto:your-email@example.com">
  your-email@example.com
</a>
<a href="tel:+1234567890">
  +1 (234) 567-890
</a>
```

### Update Site URL

Edit `src/components/common/SEO.tsx`:

```typescript
const siteUrl = 'https://your-actual-domain.com';
```

Edit `public/sitemap.xml`:

Replace all instances of `https://manupande.com` with your domain.

### Update Brand Name

If not using "Manu Pande", search and replace across:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- All page titles in `src/pages/*.tsx`

---

## 🎯 Next Steps

### Essential

- [ ] Update all contact information
- [ ] Replace site URL in SEO.tsx and sitemap.xml
- [ ] Test forms on production
- [ ] Submit sitemap to Google Search Console

### Optional

- [ ] Set up custom domain
- [ ] Configure email notifications
- [ ] Add Google Analytics
- [ ] Set up monitoring

---

## 📚 Full Documentation

- **Complete Setup**: See `README.md`
- **Deployment Details**: See `DEPLOYMENT.md`
- **Database Setup**: See `SUPABASE_SETUP.md`
- **Project Overview**: See `PROJECT_SUMMARY.md`

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Forms Not Working

- Check browser console for errors
- Verify environment variables are correct
- Ensure Supabase project is not paused
- Check RLS policies exist in Supabase

### Page Not Found on Refresh

Add this file for Netlify: `public/_redirects`

```
/*    /index.html   200
```

For Vercel, it's handled automatically.

---

## 💡 Tips

### Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

### Environment Variables

Must start with `VITE_` prefix to be accessible in the app.

### Hot Reload

Changes to `.tsx` files automatically reload in the browser.

---

## ✅ Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env`)
- [ ] Development server running (`npm run dev`)
- [ ] Supabase project created
- [ ] Database migration run
- [ ] Forms tested locally
- [ ] Code pushed to GitHub
- [ ] Site deployed to hosting platform
- [ ] Forms tested on production
- [ ] Contact info updated
- [ ] Site URL updated in SEO files

---

## 🎉 You're Done!

Your premium STEM tutoring website is now live and ready to attract students globally.

**Need Help?**

- 📖 Check the full documentation in `README.md`
- 🗄️ Database issues? See `SUPABASE_SETUP.md`
- 🚀 Deployment problems? See `DEPLOYMENT.md`

---

**Built with React + TypeScript + Tailwind + Supabase**  
Ready to transform students' STEM journey! 🎓

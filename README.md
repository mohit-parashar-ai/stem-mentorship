# Manu Pande STEM Tutoring & Mentorship Website

A premium, production-ready website for Manu Pande's STEM tutoring and mentorship business, built with React, TypeScript, Tailwind CSS, and Supabase.

## 🎯 Project Overview

This website showcases a premium STEM tutoring business offering IIT-style problem-solving mentorship in Mathematics, Physics, and Chemistry for students in Grades 8-12 across USA, Canada, United Kingdom, Australia, UAE, Saudi Arabia, and Qatar.

### Key Features

- **Premium Design**: Clean, modern, and trustworthy design inspired by Stanford, Khan Academy, and MasterClass
- **Lead Generation**: Multiple conversion points including assessment booking, contact forms, exit-intent modals, and sticky CTAs
- **SEO Optimized**: Complete SEO setup with meta tags, Open Graph, structured data, sitemap, and robots.txt
- **Mobile Responsive**: Fully responsive design that works seamlessly on all devices
- **Form Integration**: Direct form submission to Supabase for lead capture and consultation bookings
- **Performance Optimized**: Code splitting, lazy loading, and optimized bundle size
- **Type Safe**: Full TypeScript implementation for reliability and maintainability

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router 6
- **Database**: Supabase (PostgreSQL)
- **SEO**: React Helmet Async
- **Deployment**: Vercel, Netlify, or Azure Static Web Apps

## 📁 Project Structure

```
manupande/
├── public/                  # Static assets
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/         # Reusable components
│   │   │   ├── CTABanner.tsx
│   │   │   ├── ExitIntentModal.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProgramCard.tsx
│   │   │   ├── SEO.tsx
│   │   │   ├── StickyBookButton.tsx
│   │   │   └── TestimonialCard.tsx
│   │   └── layout/         # Layout components
│   │       ├── Footer.tsx
│   │       ├── Layout.tsx
│   │       └── Navbar.tsx
│   ├── lib/
│   │   └── supabase.ts     # Supabase client and types
│   ├── pages/              # Route pages
│   │   ├── About.tsx
│   │   ├── Assessment.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── Programs.tsx
│   │   └── Testimonials.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd manupande
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up Supabase database**:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the migration script from `supabase/migrations/001_initial_schema.sql`

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to `http://localhost:5173`

## 🗄️ Database Setup

### Supabase Configuration

1. Create a new Supabase project at https://supabase.com
2. In the SQL Editor, execute the migration script: `supabase/migrations/001_initial_schema.sql`

This will create:
- `leads` table for contact form submissions
- `consultation_bookings` table for assessment bookings
- Indexes for performance optimization
- Row Level Security policies for public form submissions

### Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from your Supabase project settings under API.

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: '#0F172A',    // Dark navy
  secondary: '#2563EB',  // Blue
  accent: '#F59E0B',     // Amber
}
```

### Content Updates

- **Home page content**: `src/pages/Home.tsx`
- **About page content**: `src/pages/About.tsx`
- **Programs**: `src/pages/Programs.tsx`
- **Contact info**: `src/components/layout/Footer.tsx`

### SEO Configuration

Update SEO defaults in `src/components/common/SEO.tsx`:

```typescript
const siteUrl = 'https://manupande.com'; // Your domain
```

Update `public/sitemap.xml` with your actual domain.

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## 🚢 Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`
4. Add environment variables in Netlify dashboard

### Azure Static Web Apps

1. Install Azure CLI
2. Create a Static Web App resource
3. Configure GitHub Actions or deploy manually
4. Add environment variables in Azure portal

## 🔒 Environment Variables for Production

In your deployment platform (Vercel/Netlify/Azure), add:

```
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

## 📊 Analytics & Tracking

To add Google Analytics:

1. Add GA script to `index.html`
2. Or use a React package like `react-ga4`

## 🧪 Testing

```bash
npm run lint    # ESLint
```

## 📝 License

Proprietary - All rights reserved by Manu Pande STEM Mentorship

## 📧 Support

For technical support or questions, contact: manu@stemmentorship.com

## 🎯 SEO Keywords

The site is optimized for:
- Online Math Tutor USA
- Physics Tutor USA
- Chemistry Tutor Canada
- AP Physics Tutor
- AP Chemistry Tutor
- STEM Mentor
- IIT Math Tutor
- IIT Physics Tutor

## 📱 Features Implemented

✅ Responsive mobile-first design  
✅ SEO optimization with meta tags  
✅ Lead capture forms with Supabase  
✅ Exit-intent modal  
✅ Sticky CTA button  
✅ FAQ accordion  
✅ Testimonials section  
✅ Programs showcase  
✅ Blog architecture  
✅ Contact forms  
✅ Assessment booking  
✅ Type-safe TypeScript  
✅ Tailwind CSS styling  
✅ Code splitting  
✅ Production-ready build

## 🔄 Future Enhancements

- [ ] Blog CMS integration (Contentful/Sanity)
- [ ] Email automation (SendGrid/Mailgun)
- [ ] Calendar integration (Calendly)
- [ ] Payment processing (Stripe)
- [ ] Student dashboard
- [ ] Admin dashboard for leads management

---

Built with ❤️ for premium STEM education

# Deployment Guide

This guide covers deploying your Manu Pande STEM Tutoring website to Vercel, Netlify, or Azure Static Web Apps.

## Prerequisites

Before deploying, ensure:
1. ✅ Supabase project is set up and migration script has been run
2. ✅ You have your Supabase URL and anon key
3. ✅ Code is committed to a Git repository (GitHub, GitLab, or Bitbucket)
4. ✅ The project builds successfully locally (`npm run build`)

## Option 1: Deploy to Vercel (Recommended)

Vercel offers the best developer experience with automatic deployments and excellent performance.

### Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `manupande.com`)
3. Follow DNS configuration instructions
4. Update `sitemap.xml` and `SEO.tsx` with your production domain

### Step 4: Enable Automatic Deployments

Vercel automatically deploys:
- Production: When you push to `main` branch
- Preview: For every pull request

## Option 2: Deploy to Netlify

### Step 1: Install Netlify CLI (Optional)

```bash
npm i -g netlify-cli
```

### Step 2: Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider and select the repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. Add Environment Variables in "Site settings" → "Build & deploy" → "Environment":
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

6. Click "Deploy site"

### Step 3: Configure Custom Domain

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (automatic with Let's Encrypt)

### Step 4: Configure Redirects (for SPA routing)

Create `public/_redirects`:

```
/*    /index.html   200
```

This ensures React Router works correctly.

## Option 3: Deploy to Azure Static Web Apps

### Step 1: Install Azure CLI

```bash
# macOS
brew install azure-cli

# Windows
# Download from https://aka.ms/installazurecliwindows
```

### Step 2: Login to Azure

```bash
az login
```

### Step 3: Create Static Web App

```bash
az staticwebapp create \
  --name manu-pande-stem \
  --resource-group your-resource-group \
  --source https://github.com/your-username/manupande \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

### Step 4: Configure via Azure Portal

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to your Static Web App
3. Go to Configuration → Application settings
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 5: Configure Custom Domain

1. In Azure portal, go to Custom domains
2. Add your custom domain
3. Configure DNS with provided values
4. Azure automatically provisions SSL certificate

## Post-Deployment Checklist

After deploying to any platform:

### 1. Update Sitemap

Edit `public/sitemap.xml` and replace all instances of `https://manupande.com` with your actual domain.

### 2. Update SEO Configuration

In `src/components/common/SEO.tsx`, update:

```typescript
const siteUrl = 'https://your-actual-domain.com';
```

### 3. Test Forms

1. Go to `/assessment` and submit a test booking
2. Go to `/contact` and submit a test message
3. Check your Supabase dashboard to verify data is being saved

### 4. Verify SEO

Test your deployed site:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- Check meta tags with browser dev tools
- Verify Open Graph tags with [OpenGraph.xyz](https://www.opengraph.xyz/)

### 5. Submit to Search Engines

**Google Search Console**:
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership
4. Submit your sitemap: `https://your-domain.com/sitemap.xml`

**Bing Webmaster Tools**:
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

### 6. Set Up Analytics (Optional)

**Google Analytics 4**:

Add to `index.html` before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 7. Configure Email Notifications (Optional)

Set up Supabase Database Webhooks to get notified when forms are submitted:

1. In Supabase dashboard, go to Database → Webhooks
2. Create webhook for `leads` table on INSERT
3. Send to your notification endpoint (Zapier, Make.com, or custom)

## Continuous Deployment

All three platforms support automatic deployments:

**Vercel & Netlify**:
- Push to `main` branch → Automatic production deployment
- Create pull request → Automatic preview deployment

**Azure**:
- Configured via GitHub Actions automatically
- Edit `.github/workflows/azure-static-web-apps-*.yml` if needed

## Environment-Specific Configuration

For multiple environments (dev, staging, production):

### Vercel
Create different projects or use branch-based environments:
- `main` → Production
- `staging` → Preview environment
- `dev` → Development preview

### Netlify
Use branch deploys:
- Configure in "Build & deploy" → "Continuous Deployment"
- Set different environment variables per branch

### Azure
Create separate Static Web Apps for each environment:
```bash
az staticwebapp create --name manu-pande-stem-staging ...
az staticwebapp create --name manu-pande-stem-prod ...
```

## Troubleshooting

### Build Fails

**Issue**: `npm install` fails
- **Solution**: Delete `node_modules` and `package-lock.json`, run `npm install` locally first

**Issue**: TypeScript errors during build
- **Solution**: Run `npm run build` locally to see full error details

### Forms Not Submitting

**Issue**: Forms submit but data doesn't appear in Supabase
- **Solution**: Check environment variables are set correctly
- **Solution**: Verify Supabase RLS policies allow anonymous inserts
- **Solution**: Check browser console for errors

### Routing Issues (404 on refresh)

**Issue**: Page refreshes result in 404
- **Solution (Netlify)**: Add `public/_redirects` file
- **Solution (Vercel)**: Add `vercel.json` with rewrites
- **Solution (Azure)**: Configure `staticwebapp.config.json`

### Environment Variables Not Working

**Issue**: Environment variables are undefined
- **Solution**: Ensure they start with `VITE_` prefix
- **Solution**: Restart dev server after adding new variables
- **Solution**: Redeploy after changing variables in production

## Performance Optimization

### Enable Compression

Most platforms enable gzip/brotli compression by default. Verify with:

```bash
curl -H "Accept-Encoding: gzip, deflate, br" -I https://your-domain.com
```

### Configure Caching

Add caching headers via platform-specific config:

**Vercel** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Enable CDN

All three platforms provide global CDN out of the box. No additional configuration needed.

## Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use environment variables** for all sensitive data
3. **Keep dependencies updated**: Run `npm audit` regularly
4. **Enable HTTPS only** (automatic on all platforms)
5. **Configure CORS** in Supabase if needed
6. **Review Supabase RLS policies** to ensure data security

## Monitoring & Maintenance

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com/) (free)
- [StatusCake](https://www.statuscake.com/)
- [Pingdom](https://www.pingdom.com/)

### Error Tracking

Consider adding:
- [Sentry](https://sentry.io/) for error tracking
- [LogRocket](https://logrocket.com/) for session replay

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Audit for vulnerabilities
npm audit fix
```

## Support

If you encounter deployment issues:
1. Check platform-specific documentation
2. Review build logs for error details
3. Contact platform support (Vercel, Netlify, Azure)
4. For code-specific issues, refer to README.md

---

✅ **Deployment Complete!**

Your premium STEM tutoring website is now live and ready to attract students globally.

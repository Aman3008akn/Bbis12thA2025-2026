# Netlify Deployment Guide for 12th A Memories Website

## Quick Start (3 Steps)

### Step 1: Prepare Your Project
```bash
# The project is already ready! Just make sure all files are in place:
# - index.html
# - admin.html
# - All CSS and JS files
# - netlify.toml
# - package.json
```

### Step 2: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: 12th A Memories Website"

# Create new repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/12th-a-memories.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Netlify

**Option A: Connect GitHub (RECOMMENDED)**

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select GitHub
4. Choose your repository
5. Click "Deploy site"

**Option B: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

**Option C: Direct Upload**

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Wait for deployment

---

## Configuration

### Environment Variables

After deployment, set these in Netlify:

1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Add these variables:
   - `SUPABASE_URL` = your-supabase-url
   - `SUPABASE_ANON_KEY` = your-anon-key

**OR** Update directly in `supabase-config.js`:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-key-here';
```

### Domain Setup

**Free Netlify Domain:**
- Your site gets: `your-site-name.netlify.app`

**Custom Domain:**
1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Netlify → **Site Settings** → **Domain management**
3. Add your custom domain
4. Update DNS records

---

## Post-Deployment Checklist

- [ ] Website loads at your-domain.netlify.app
- [ ] All pages accessible (index.html, admin.html)
- [ ] Admin dashboard works
- [ ] Supabase connection active
- [ ] Images load correctly
- [ ] Forms responsive
- [ ] Mobile view looks good

---

## Netlify Features Enabled

✅ **In netlify.toml:**
- Automatic redirects for SPA routing
- Security headers configured
- Caching rules set
- Cache-busting for admin panel

---

## Troubleshooting

### Site won't load
- Check netlify.toml syntax
- Verify all files are committed
- Clear browser cache

### Admin dashboard 404
- Netlify redirects all routes to index.html
- This is intentional for SPA routing

### Supabase connection fails
- Check credentials in supabase-config.js
- Verify CORS settings in Supabase
- Check browser console for errors

### Slow performance
- Check image sizes
- Enable Netlify's built-in optimization
- Use CDN for external assets

---

## Updates & Maintenance

### Push updates
```bash
git add .
git commit -m "Update message"
git push origin main
```

### Netlify auto-deploys
Every push to `main` branch automatically triggers deployment!

### Rollback
- Go to Netlify → **Deploys**
- Click on previous deploy
- Click **Publish deploy**

---

## Support

- Netlify Docs: https://docs.netlify.com
- Supabase Docs: https://supabase.io/docs
- Contact: support@example.com

---

**You're all set! 🚀**

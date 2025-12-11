# 12th A Class Memories Website

A beautiful, interactive website showcasing memories and moments from Class 12th A (2025-26) at Bal Bhavan International School.

## Features

✨ **Modern Design**
- Premium dark theme with neon accents
- Smooth animations and transitions
- Responsive across all devices
- Glass-morphism UI elements

📸 **Gallery Management**
- Upload and manage class photos
- Premium image display with modal
- Real-time updates

⭐ **Highlights Section**
- Farewell moments showcase
- Teachers & mentors recognition
- Easy content management

👨‍🏫 **Teachers Profile**
- Beautiful teacher cards
- Coming soon profiles update

💬 **Memory Submission**
- Students can share their memories
- Form validation
- Admin approval system

🎛️ **Admin Dashboard**
- Comprehensive control panel
- Real-time data management
- Activity logs & device tracking
- Settings configuration
- User analytics

📊 **Analytics & Tracking**
- Device detection (Desktop/Mobile/Tablet)
- Browser & OS identification
- Activity logging
- Real-time visitor tracking
- CSV export functionality

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: JWT via Supabase
- **Hosting**: Netlify
- **Icons**: Font Awesome 6.4
- **Fonts**: Google Fonts (Playfair Display, Inter)

## File Structure

```
├── index.html                 # Main website
├── admin.html                # Admin dashboard
├── script.js                 # Main website JS
├── styles.css               # Main website styles
├── admin-dashboard.js       # Admin JS
├── admin-styles.css         # Admin styles
├── device-tracker.js        # Device tracking
├── supabase-config.js       # Supabase credentials
├── package.json             # Dependencies
├── netlify.toml             # Netlify config
├── SUPABASE_SETUP.sql       # Database setup
└── images/                  # Image assets
```

## Setup Instructions

### 1. Clone Repository
```bash
git clone <repository-url>
cd bbis-12thA
```

### 2. Configure Supabase

- Create a Supabase project
- Run SQL queries from `SUPABASE_SETUP.sql` in Supabase SQL Editor
- Copy your credentials to `supabase-config.js`

### 3. Deploy on Netlify

#### Option 1: Connect GitHub (Recommended)
```bash
# Push to GitHub
git push origin main

# In Netlify Dashboard:
# 1. Click "New site from Git"
# 2. Select your repository
# 3. Configure build settings (already set in netlify.toml)
# 4. Deploy!
```

#### Option 2: Direct Upload
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### Option 3: Drag & Drop
- Go to netlify.com
- Drag and drop the project folder
- Done!

## Environment Variables

Set these in Netlify Dashboard → Site Settings → Build & Deploy → Environment:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Local Development

```bash
# Start local server
npm start

# Access website
# Main: http://localhost:8000/index.html
# Admin: http://localhost:8000/admin.html
```

## Admin Dashboard Features

### Dashboard
- Real-time statistics
- Recent activity feed
- Quick overview

### Gallery Management
- Add/Edit/Delete images
- Image preview
- Upload tracking

### Highlights Management
- Create/Update/Delete highlights
- Icon selection
- Display order

### Teachers Management
- Add teacher profiles
- Department assignment
- Photo upload

### Memories Viewer
- View submitted memories
- Approve/Reject
- Admin notes

### Settings
- Site title
- Hero subtitle
- Social links
- Contact information

### Activity Logs
- Real-time visitor tracking
- Device detection
- Browser/OS info
- Action history
- CSV export

## Security

- ✅ RLS (Row Level Security) enabled on all tables
- ✅ CORS configured
- ✅ Security headers set
- ✅ Environment variables protected
- ✅ Admin authentication ready

## Performance

- 📱 Lightweight (< 500KB)
- ⚡ Optimized animations
- 🚀 CDN delivery
- 💾 Caching enabled
- 🖼️ Image optimization

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project

## Support

For issues, contact: support@example.com

---

**Made with ❤️ for Class 12th A**

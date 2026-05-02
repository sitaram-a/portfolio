# Sitaram Hembrom — Portfolio Website

A high-performance, recruiter-friendly portfolio built with **React** + **Netlify** (frontend) and **InfinityFree PHP/MySQL** (backend contact form).

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, React Router |
| Styling | Pure CSS (CSS Variables, animations) |
| Fonts | Syne + DM Sans (Google Fonts) |
| Deployment | Netlify (auto-deploy from GitHub) |
| Backend API | PHP 7+ on InfinityFree |
| Database | MySQL on InfinityFree |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Loader.js / .css      # Animated intro loader
│   │   ├── Navbar.js / .css      # Sticky nav with mobile menu
│   │   ├── Hero.js / .css        # Full-screen hero with typewriter
│   │   ├── About.js / .css       # About + info grid
│   │   ├── Skills.js / .css      # Skill bars by category
│   │   ├── Experience.js / .css  # Tabbed work history
│   │   ├── Projects.js / .css    # Live project cards
│   │   ├── Contact.js / .css     # Contact form (→ InfinityFree API)
│   │   └── Footer.js / .css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── api/
│   ├── contact.php               # Upload to InfinityFree
│   └── setup.php                 # Run once then delete
├── netlify.toml
├── .env.example
└── package.json
```

---

## ⚡ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env
# Edit .env with your InfinityFree API URL

# 3. Start dev server
npm start
# → http://localhost:3000
```

---

## 🌐 InfinityFree Backend Setup

### Step 1 — Create InfinityFree Account
1. Go to [infinityfree.com](https://infinityfree.com) → Sign up free
2. Create a new hosting account
3. Note your subdomain: `yourdomain.epizy.com` or `yourdomain.infinityfreeapp.com`

### Step 2 — Create MySQL Database
1. Open your InfinityFree Control Panel
2. Go to **MySQL Databases**
3. Create a new database
4. Note: DB Host, DB Name, DB User, DB Password

### Step 3 — Upload PHP Files
1. Open **File Manager** in control panel
2. Navigate to `/htdocs/`
3. Create folder: `api`
4. Upload `api/contact.php` and `api/setup.php` into `/htdocs/api/`
5. Edit `contact.php` — fill in your DB credentials

### Step 4 — Run Database Setup
```
Visit: https://yourdomain.epizy.com/api/setup.php
```
You should see "✅ Database table created successfully!"
**Delete setup.php immediately after!**

### Step 5 — Configure CORS
In `contact.php`, update:
```php
define('ALLOWED_ORIGIN', 'https://your-site.netlify.app');
```

---

## 🚀 Netlify Deployment

### Method 1 — GitHub (Recommended)
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# 2. Go to netlify.com → "Add new site" → "Import from Git"
# 3. Select your repo → Build settings auto-detected from netlify.toml
# 4. Add environment variable:
#    REACT_APP_API_URL = https://yourdomain.epizy.com/api/contact.php
# 5. Deploy!
```

### Method 2 — Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

### Netlify Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables:
```
REACT_APP_API_URL = https://yourdomain.epizy.com/api/contact.php
```

---

## 🎨 Customization

### Update Personal Info
- **Hero**: `src/components/Hero.js`
- **About**: `src/components/About.js`
- **Skills**: `src/components/Skills.js` → update levels
- **Experience**: `src/components/Experience.js`
- **Projects**: `src/components/Projects.js` → update URLs
- **Contact**: `src/components/Contact.js` → update email/phone

### Change Colors
In `src/index.css`:
```css
:root {
  --accent: #6c63ff;    /* Primary purple */
  --accent-2: #00d4ff;  /* Cyan accent */
}
```

### Add Resume PDF
1. Place `sitaram-hembrom-resume.pdf` in `/public/`
2. Hero download button auto-links to it

---

## 📊 Performance Features
- CSS-only animations (no heavy JS animation libraries)
- Lazy loading ready
- Optimized font loading with `display=swap`
- Static assets cached 1 year via netlify.toml
- SPA redirects handled by netlify.toml

---

## 📞 Contact
**Sitaram Hembrom** — sitaram.hembrom123@gmail.com

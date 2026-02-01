# Deployment Guide

## 🚀 Deploying Tula Students Association

This guide covers deploying the frontend application to various hosting platforms.

---

## 📦 Build for Production

Before deploying, create a production build:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

---

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**

- Free tier available
- Automatic deployments from Git
- Built-in CDN
- Perfect for React apps

**Steps:**

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name? tula-students-association
   - Directory? ./
   - Override settings? No

5. Your app is now live! Vercel provides a URL.

**Automatic Deployments:**

1. Push your code to GitHub
2. Go to vercel.com
3. Import your GitHub repository
4. Vercel automatically deploys on every push

---

### 2. Netlify

**Why Netlify?**

- Free tier available
- Easy drag-and-drop deployment
- Continuous deployment from Git
- Form handling built-in

**Steps:**

**Option A: Drag and Drop**

1. Run `npm run build`
2. Go to netlify.com
3. Drag the `dist` folder to Netlify
4. Your site is live!

**Option B: Git Integration**

1. Push code to GitHub
2. Go to netlify.com
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Netlify CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

### 3. GitHub Pages

**Why GitHub Pages?**

- Free hosting
- Easy setup
- Good for static sites

**Steps:**

1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Add to package.json:

```json
{
  "homepage": "https://yourusername.github.io/tula-students-association",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update vite.config.js:

```javascript
export default defineConfig({
  plugins: [react()],
  base: "/tula-students-association/",
});
```

4. Deploy:

```bash
npm run deploy
```

5. Enable GitHub Pages in repository settings

---

### 4. Firebase Hosting

**Why Firebase?**

- Free tier available
- Fast CDN
- Easy SSL
- Good analytics

**Steps:**

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login:

```bash
firebase login
```

3. Initialize:

```bash
firebase init hosting
```

4. Configuration:
   - Public directory: `dist`
   - Single-page app: Yes
   - Automatic builds: No

5. Build and deploy:

```bash
npm run build
firebase deploy
```

---

### 5. Render

**Why Render?**

- Free tier available
- Automatic deployments
- Easy setup

**Steps:**

1. Push code to GitHub
2. Go to render.com
3. Click "New Static Site"
4. Connect your repository
5. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Create Static Site"

---

## ⚙️ Environment Configuration

### For Production

Create a `.env.production` file:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Tula Students Association
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🔧 Build Optimization

### 1. Optimize Images

- Use WebP format
- Compress images
- Use lazy loading

### 2. Code Splitting

Add lazy loading for routes:

```javascript
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

### 3. Bundle Analysis

```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to vite.config.js:

```javascript
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
});
```

---

## 🔒 Security Considerations

### 1. Environment Variables

- Never commit `.env` files
- Use platform-specific environment variables
- Keep API keys secure

### 2. HTTPS

- All platforms provide free SSL
- Always use HTTPS in production

### 3. Content Security Policy

Add to index.html:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline';" />
```

---

## 📊 Performance Optimization

### 1. Enable Compression

Most platforms enable this by default.

### 2. Cache Headers

Configure in platform settings:

- HTML: no-cache
- CSS/JS: 1 year cache
- Images: 1 year cache

### 3. CDN

All recommended platforms include CDN by default.

---

## 🔍 SEO Optimization

### 1. Meta Tags

Already included in index.html. Update for production:

```html
<meta
  name="description"
  content="Tula Students Association - Empowering education through summer volunteer programs" />
<meta
  name="keywords"
  content="education, volunteer, students, Tula, summer programs" />
<meta property="og:title" content="Tula Students Association" />
<meta
  property="og:description"
  content="Empowering education in Tula Village" />
<meta property="og:image" content="/og-image.jpg" />
```

### 2. Sitemap

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

### 3. Robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 📱 PWA (Progressive Web App)

### 1. Install Vite PWA Plugin

```bash
npm install vite-plugin-pwa -D
```

### 2. Configure vite.config.js

```javascript
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Tula Students Association",
        short_name: "Tula SA",
        description: "Empowering education through summer programs",
        theme_color: "#25D366",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
```

---

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🧪 Pre-Deployment Checklist

Before deploying, verify:

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Navigation works on all pages
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] Images load properly
- [ ] Links work correctly
- [ ] Admin login functions
- [ ] Student registration works
- [ ] Materials filtering works
- [ ] LocalStorage persists data
- [ ] Build completes without errors
- [ ] Production build tested locally

Test production build locally:

```bash
npm run build
npm run preview
```

---

## 📈 Monitoring

### 1. Google Analytics

Add to index.html:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### 2. Error Tracking

Consider using:

- Sentry
- LogRocket
- Bugsnag

---

## 🔧 Custom Domain

### Vercel

1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed

### Netlify

1. Go to domain settings
2. Add custom domain
3. Configure DNS

---

## 💡 Tips

1. **Test Before Deploy**: Always test the production build locally
2. **Use Environment Variables**: Keep sensitive data secure
3. **Monitor Performance**: Use Lighthouse for audits
4. **Enable Analytics**: Track user behavior
5. **Set Up Alerts**: Get notified of deployment failures
6. **Backup Data**: Keep backups of important data
7. **Document Changes**: Maintain a changelog

---

## 🆘 Troubleshooting

### Build Fails

- Check Node.js version (use v18+)
- Clear node_modules and reinstall
- Check for syntax errors

### Routes Don't Work

- Configure server for SPA routing
- Check base URL in vite.config.js

### Assets Not Loading

- Check public folder structure
- Verify asset paths
- Check build output

---

## 📞 Support

For deployment issues:

1. Check platform documentation
2. Review build logs
3. Test locally first
4. Check browser console for errors

---

## 🎉 Success!

Once deployed, your application will be accessible worldwide. Share the URL with users and start making an impact!

**Recommended Platform**: Vercel (easiest and fastest for React apps)

Good luck with your deployment! 🚀

# Deployment Guide - Alchemical Grimoire

## 🚀 Quick Start

The application is currently running at:
**https://5173-d8008ae0-ec20-4a02-8b0f-4f9aea4cfd4b.proxy.daytona.works**

## 📦 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Navigate to project directory
cd alchemical-grimoire

# Install dependencies
npm install

# Start development server
npm run dev

# Application will be available at http://localhost:5173
```

## 🏗️ Build for Production

### Create Production Build
```bash
# Build the application
npm run build

# Output will be in the 'dist' directory
```

### Preview Production Build
```bash
# Preview the production build locally
npm run preview

# Application will be available at http://localhost:4173
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
Vercel provides the best experience for Vite applications.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd alchemical-grimoire
vercel

# Follow the prompts to deploy
```

**Vercel Configuration:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd alchemical-grimoire
netlify deploy --prod

# Follow the prompts
```

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Add this line
})
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Static Hosting (S3, Azure, etc.)

1. Build the application:
```bash
npm run build
```

2. Upload the contents of the `dist` directory to your hosting service

3. Configure your hosting to:
   - Serve `index.html` for all routes (SPA routing)
   - Enable HTTPS
   - Set proper cache headers

## 🔧 Environment Configuration

### Environment Variables
Create a `.env` file for environment-specific settings:

```env
# API endpoints (if adding backend features)
VITE_API_URL=https://api.example.com

# Feature flags
VITE_ENABLE_AI=false
VITE_ENABLE_ANALYTICS=false
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📊 Performance Optimization

### Build Optimization
The application is already optimized with:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Additional Optimizations
1. **Enable Compression:**
   - Gzip/Brotli compression on server
   - Reduces bundle size by ~70%

2. **CDN Configuration:**
   - Serve static assets from CDN
   - Improves global load times

3. **Caching Strategy:**
   ```
   HTML: no-cache
   JS/CSS: cache with hash
   Images: long-term cache
   ```

## 🔐 Security Considerations

### Content Security Policy
Add to your hosting configuration:
```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'unsafe-inline'; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data: https:;
```

### HTTPS
Always serve over HTTPS in production:
- Protects user data
- Required for modern web features
- Improves SEO

## 📱 Progressive Web App (PWA) Setup

### Add Service Worker
1. Install Vite PWA plugin:
```bash
npm install -D vite-plugin-pwa
```

2. Update `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Alchemical Grimoire',
        short_name: 'Grimoire',
        description: 'Your journey to wholeness',
        theme_color: '#a855f7',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

## 🧪 Testing Before Deployment

### Pre-deployment Checklist
- [ ] All features working correctly
- [ ] Responsive design tested on multiple devices
- [ ] Data persistence working (localStorage)
- [ ] No console errors
- [ ] All images loading
- [ ] Navigation working correctly
- [ ] Forms submitting properly
- [ ] Animations smooth
- [ ] Build completes without errors
- [ ] Production preview works

### Testing Commands
```bash
# Run build
npm run build

# Check for errors
npm run build 2>&1 | grep -i error

# Preview production build
npm run preview

# Check bundle size
npm run build && ls -lh dist/assets/
```

## 📈 Monitoring & Analytics

### Add Analytics (Optional)
If you want to track usage:

1. Google Analytics:
```typescript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

2. Privacy-focused alternatives:
   - Plausible Analytics
   - Fathom Analytics
   - Simple Analytics

## 🔄 Continuous Deployment

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🐛 Troubleshooting

### Common Issues

**Issue: Blank page after deployment**
- Solution: Check `base` in `vite.config.ts`
- Ensure routing is configured for SPA

**Issue: 404 on refresh**
- Solution: Configure server to serve `index.html` for all routes

**Issue: Assets not loading**
- Solution: Check asset paths are relative
- Verify `base` configuration

**Issue: Large bundle size**
- Solution: Enable code splitting
- Lazy load routes
- Optimize images

## 📞 Support

For deployment issues:
1. Check Vite documentation
2. Review hosting provider docs
3. Check browser console for errors
4. Verify network requests

## 🎉 Post-Deployment

After successful deployment:
1. Test all features in production
2. Monitor performance
3. Gather user feedback
4. Plan iterative improvements

---

**Ready to deploy? Choose your hosting platform and follow the steps above!**
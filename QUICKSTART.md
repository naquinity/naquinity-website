# Quick Start Guide - Naquinity Next.js

## 🚀 Start Development Server

```bash
cd "d:\Code\naquinity new website\naquinity-nextjs"
npm run dev
```

Visit: `http://localhost:3000`

## 📝 Setup Environment Variables

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Copy values from `../naquinity new website/.env`

## 🔨 Build for Production

```bash
npm run build
npm start
```

## 📤 Deploy to Vercel

### Option 1: GitHub + Vercel Dashboard
1. Push to GitHub
```bash
git init
git add .
git commit -m "Next.js migration - MVP"
git remote add origin https://github.com/YOUR_USERNAME/naquinity-nextjs.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy!

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## ⚙️ Post-Deployment

1. Update Google OAuth redirect URIs:
   - Add: `https://your-app.vercel.app/api/auth/callback/google`

2. Update Vercel environment variable:
   - `NEXTAUTH_URL=https://your-app.vercel.app`
   - Redeploy

## ✅ What's Working Now

- ✅ Homepage
- ✅ Program listing
- ✅ Mahasiswa listing
- ✅ Google OAuth login
- ✅ Responsive navbar & footer

## 📚 Documentation

- Full walkthrough: `walkthrough.md`
- Migration task: `task.md`
- Implementation plan: `implementation_plan.md`

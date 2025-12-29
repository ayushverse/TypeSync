# TypeSync Deployment Guide

## Quick Start Deployment

### Step 1: Prepare Your Code

1. **Ensure all changes are committed**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify local environment works**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm install
   npm start

   # Terminal 2 - Frontend  
   cd frontend
   npm install
   npm run dev
   ```

---

## Backend Deployment (Render)

### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub

### 2. Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `typesync-backend`
   - **Region**: Select closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. Click **"Create Web Service"**
5. Wait 2-3 minutes for deployment
6. **Copy your backend URL**: `https://typesync-backend.onrender.com`

### 3. Add Environment Variable (Later)
- After frontend deployment, go to **Environment** tab
- Add: `FRONTEND_URL` = your frontend URL
- Click **"Save Changes"** (triggers redeploy)

---

## Frontend Deployment (Vercel)

### 1. Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub

### 2. Deploy Frontend

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Variable: `VITE_BACKEND_URL`
   - Value: Your backend URL (e.g., `https://typesync-backend.onrender.com`)
   - Click **"Add"**

5. Click **"Deploy"**
6. Wait 1-2 minutes
7. **Copy your frontend URL**: `https://typesync.vercel.app`

---

## Final Configuration

### Update Backend CORS

1. Go to Render dashboard
2. Click on your backend service
3. Go to **"Environment"** tab
4. Add environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL (e.g., `https://typesync.vercel.app`)
5. Click **"Save Changes"**
6. Wait for automatic redeploy

---

## Testing Your Deployment

### 1. Test Backend
Visit: `https://your-backend-url.onrender.com`

Expected response:
```json
{
  "message": "typeSync Server Running",
  "activeRooms": 0,
  "activePlayers": 0
}
```

### 2. Test Frontend
1. Visit your Vercel URL
2. Try Solo Mode first
3. Try Multiplayer:
   - Create a room
   - Open in incognito/another browser
   - Join with room code
   - Both players ready up
   - Test the race!

### 3. Check Console
Open browser DevTools Console:
- Should see: ✅ "Connected to server"
- Should NOT see: ❌ Connection errors

---

## Troubleshooting

### Issue: Can't connect to backend
**Solution**: Check `VITE_BACKEND_URL` in Vercel environment variables

### Issue: CORS error
**Solution**: Verify `FRONTEND_URL` is set correctly in Render

### Issue: 404 on page refresh
**Solution**: `vercel.json` should already be configured (check it exists)

### Issue: Backend sleeping (free tier)
**Solution**: First request after inactivity takes 30-60 seconds (normal)

---

## Environment Variables Checklist

### Backend (Render)
- [ ] `FRONTEND_URL` = Your Vercel URL
- [ ] `PORT` = Auto-provided by Render

### Frontend (Vercel)  
- [ ] `VITE_BACKEND_URL` = Your Render URL

---

## Alternative: Deploy Both to Railway

If you prefer a single platform:

1. Go to https://railway.app
2. **New Project** → **Deploy from GitHub**
3. Select repository
4. Railway detects both services automatically
5. Configure each:
   - Backend: Set start command to `npm start` in backend folder
   - Frontend: Set build command and serve static files
6. Add environment variables same as above

---

## Cost Summary

| Platform | Cost | Notes |
|----------|------|-------|
| Render (Backend) | Free | Sleeps after 15min inactivity |
| Vercel (Frontend) | Free | Always fast, no sleep |
| **Total** | **$0/month** | Perfect for portfolio projects |

---

## After Deployment

### Share Your Project
- Frontend URL: Share this with friends!
- GitHub: Add deployment URLs to README

### Monitor
- Render: Check logs for errors
- Vercel: Check Analytics dashboard

### Update
- Push to GitHub → Auto-deploys on both platforms!

---

## Custom Domain (Optional)

### Frontend (Vercel)
1. Buy domain (Namecheap, Google Domains)
2. In Vercel: Settings → Domains → Add Domain
3. Follow DNS instructions

### Backend (Render)
1. Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

**You're live! 🚀** Share your typing game with the world!

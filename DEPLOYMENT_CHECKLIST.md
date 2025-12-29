# TypeSync Deployment Checklist

## Pre-Deployment Setup ✅

### Local Files Created
- [x] `frontend/.env.example` - Frontend environment template
- [x] `backend/.env.example` - Backend environment template  
- [x] `frontend/vercel.json` - Vercel SPA routing config
- [x] `frontend/public/_redirects` - Netlify SPA routing config
- [x] `frontend/netlify.toml` - Netlify build config
- [x] `backend/render.yaml` - Render deployment config
- [x] `.gitignore` - Updated to exclude env files
- [x] `DEPLOYMENT.md` - Full deployment guide

---

## Deployment Steps 📝

### Phase 1: Prepare Code
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub
- [ ] Repository is public (or GitHub account connected)

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

---

### Phase 2: Backend Deployment (Render)

#### Account Setup
- [ ] Created Render account at https://render.com
- [ ] Connected GitHub account

#### Service Configuration
- [ ] Created new Web Service
- [ ] Selected repository
- [ ] Configuration:
  - Name: `typesync-backend`
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: Free

#### Deployment
- [ ] Clicked "Create Web Service"
- [ ] Deployment completed successfully
- [ ] Backend URL copied: `____________________________`

#### Environment Variables (Add After Frontend Deploy)
- [ ] Added `FRONTEND_URL` = `[Your Vercel URL]`
- [ ] Service redeployed automatically

---

### Phase 3: Frontend Deployment (Vercel)

#### Account Setup
- [ ] Created Vercel account at https://vercel.com
- [ ] Connected GitHub account

#### Project Configuration
- [ ] Imported repository
- [ ] Configuration:
  - Framework: Vite
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `dist`

#### Environment Variables
- [ ] Added `VITE_BACKEND_URL` = `[Your Render URL]`

#### Deployment
- [ ] Clicked "Deploy"
- [ ] Deployment completed successfully
- [ ] Frontend URL copied: `____________________________`

---

### Phase 4: Final Configuration

#### Update Backend CORS
- [ ] Returned to Render dashboard
- [ ] Added `FRONTEND_URL` environment variable
- [ ] Value: Your Vercel URL
- [ ] Waited for automatic redeploy

---

## Testing Checklist 🧪

### Backend Tests
- [ ] Visited backend URL in browser
- [ ] Received JSON response with server info
- [ ] No error messages

### Frontend Tests
- [ ] Opened frontend URL
- [ ] Solo mode works
- [ ] Can create multiplayer room
- [ ] Room code generated successfully

### Multiplayer Tests
- [ ] Opened second browser/incognito tab
- [ ] Joined room with code
- [ ] Both players visible in lobby
- [ ] Both players can ready up
- [ ] Game starts after countdown
- [ ] Typing test works for both players
- [ ] Progress updates in real-time
- [ ] Winner declared correctly

### Console Tests
- [ ] No connection errors in console
- [ ] "Connected to server" message visible
- [ ] No CORS errors
- [ ] WebSocket connected successfully

---

## Post-Deployment 🎉

### Documentation
- [ ] Updated README.md with live URLs
- [ ] Added deployment badge (optional)

### Monitoring
- [ ] Checked Render logs
- [ ] Checked Vercel analytics
- [ ] Set up error tracking (optional)

### Sharing
- [ ] Tested on mobile device
- [ ] Shared with friends
- [ ] Added to portfolio

---

## Environment Variables Reference 📋

### Frontend (Vercel)
| Variable | Value | Example |
|----------|-------|---------|
| `VITE_BACKEND_URL` | Your Render backend URL | `https://typesync-backend.onrender.com` |

### Backend (Render)
| Variable | Value | Example |
|----------|-------|---------|
| `FRONTEND_URL` | Your Vercel frontend URL | `https://typesync.vercel.app` |
| `PORT` | Auto-provided by Render | `10000` |

---

## URLs Record 📌

Fill in your deployed URLs here:

**Backend (Render):**
```
https://____________________________
```

**Frontend (Vercel):**
```
https://____________________________
```

---

## Common Issues ⚠️

### "Unable to connect to server"
- [ ] Check `VITE_BACKEND_URL` in Vercel
- [ ] Ensure backend is running (visit backend URL)
- [ ] Verify URL uses `https://` not `http://`

### CORS Error
- [ ] Verify `FRONTEND_URL` in Render
- [ ] Check for typos in URLs
- [ ] Ensure no trailing slashes

### 404 on Page Refresh
- [ ] Verify `vercel.json` exists in frontend folder
- [ ] Check Vercel deployment logs

### Backend Sleeping (Free Tier)
- [ ] First request may take 30-60 seconds
- [ ] This is normal for Render free tier
- [ ] Subsequent requests are instant

---

## Done! ✨

Your typeSync app is now live and ready to share!

**Next Steps:**
1. Test thoroughly
2. Share with friends
3. Add to your portfolio
4. Consider custom domain (optional)

---

**Free Tier Limitations:**
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30-60 seconds
- Perfect for portfolio and demo projects!

**Upgrade if you need:**
- No sleep time
- Faster performance
- Custom domains
- More resources

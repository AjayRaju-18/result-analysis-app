# 🚀 Deployment Guide - Result Analysis Form

This guide will help you deploy your application to production using **FREE** hosting services.

## 📋 Overview

- **Frontend**: Netlify (Free tier)
- **Backend**: Render.com (Free tier)
- **Database**: Google Sheets (Free)

---

## 🔧 PART 1: Deploy Backend (Render.com)

### Step 1: Push Code to GitHub

1. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Repository name: `result-analysis-app`
   - Make it **Public** or **Private** (your choice)
   - Click **"Create repository"**

2. **Initialize Git and push code**:

```bash
cd "C:\Projects\Result Analysis"

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Result Analysis Form"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/result-analysis-app.git

# Push to GitHub
git push -u origin main
```

**If you get an error about 'main' branch**, try:
```bash
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Backend on Render

1. **Go to Render**: https://render.com
2. **Sign up** with your GitHub account (or create a free account)
3. Click **"New +"** → **"Web Service"**
4. **Connect your GitHub repository**
5. Configure the service:

   **Basic Settings:**
   - **Name**: `result-analysis-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**

6. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):

   ```
   NODE_ENV = production
   PORT = 10000
   GOOGLE_SHEET_ID = 1KjLaGbIyCDZ5SwgIgMf9SJdZpzlVIo9h-EAA7ZVL0U8
   FRONTEND_URL = https://your-frontend-url.netlify.app
   ```
   
   **Note**: We'll update `FRONTEND_URL` after deploying frontend

7. **Add credentials.json as a Secret File**:
   - Click **"Add Secret File"**
   - **Filename**: `credentials.json`
   - **Contents**: Copy the entire contents of your local `backend/credentials.json` file
   - Click **"Save"**

8. Click **"Create Web Service"**

9. **Wait 3-5 minutes** for deployment to complete

10. **Copy your backend URL**: It will be something like:
    ```
    https://result-analysis-backend.onrender.com
    ```

✅ **Backend is now live!**

---

## 🎨 PART 2: Deploy Frontend (Netlify)

### Step 1: Update Frontend Environment Variable

1. Open `frontend/.env.production`
2. Replace with your actual backend URL:
   ```env
   VITE_API_URL=https://result-analysis-backend.onrender.com/api
   ```

3. **Commit and push the change**:
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push
   ```

---

### Step 2: Deploy on Netlify

**Option A: Deploy via GitHub (RECOMMENDED)**

1. **Go to Netlify**: https://app.netlify.com
2. **Sign up** with your GitHub account
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"GitHub"**
5. Select your repository: `result-analysis-app`
6. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
7. Click **"Advanced"** → **"New variable"** and add:
   ```
   VITE_API_URL = https://result-analysis-backend.onrender.com/api
   ```
   (Replace with your actual backend URL from Step 1)
8. Click **"Deploy site"**
9. **Wait 2-3 minutes** for deployment

**Option B: Deploy via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to frontend folder
cd frontend

# Build the app
npm run build

# Deploy
netlify deploy --prod
```

When prompted:
- **Publish directory**: `dist`

---

### Step 3: Update Backend CORS

1. **Copy your Netlify URL**: e.g., `https://result-analysis-123abc.netlify.app`

2. **Update Backend Environment Variable on Render**:
   - Go to your Render dashboard
   - Click on your backend service
   - Go to **"Environment"** tab
   - Find `FRONTEND_URL` and update it:
     ```
     FRONTEND_URL = https://result-analysis-123abc.netlify.app
     ```
   - Click **"Save Changes"**
   - Render will automatically redeploy (takes ~2 minutes)

✅ **Frontend is now live!**

---

## 🧪 PART 3: Test Your Deployed App

1. **Open your Netlify URL** in a browser
2. **Fill out the form** with test data
3. **Submit** and check if it works
4. **Verify** the data appears in your Google Sheet

---

## ⚙️ Custom Domain (Optional)

### For Netlify (Frontend):
1. Go to **"Domain settings"** in Netlify
2. Click **"Add custom domain"**
3. Follow the DNS configuration instructions

### For Render (Backend):
1. Go to **"Settings"** → **"Custom Domain"**
2. Add your domain and configure DNS

---

## 🔒 Security Checklist

- ✅ `credentials.json` is NOT committed to Git (in `.gitignore`)
- ✅ Environment variables are set in Render dashboard (not in code)
- ✅ CORS is configured to only allow your frontend domain
- ✅ Google Sheet is shared only with service account email

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "credentials.json file not found"**
- Make sure you added credentials.json as a **Secret File** in Render
- Check the filename is exactly `credentials.json`

**Error: "CORS policy"**
- Update `FRONTEND_URL` environment variable in Render with your Netlify URL
- Include `https://` in the URL
- Wait for Render to redeploy

**Backend not starting**
- Check Render logs (click "Logs" tab)
- Ensure all environment variables are set
- Verify `GOOGLE_SHEET_ID` is correct

### Frontend Issues

**"Failed to load subjects"**
- Check if backend is running (visit backend URL + `/health`)
- Verify `VITE_API_URL` is set correctly in Netlify
- Check Network tab in browser DevTools for errors

**API calls failing**
- Ensure backend URL in frontend includes `/api` at the end
- Example: `https://your-backend.onrender.com/api`

---

## 💰 Cost Breakdown

| Service | Tier | Cost | Limits |
|---------|------|------|--------|
| Netlify | Free | $0 | 100GB bandwidth/month |
| Render | Free | $0 | 750 hours/month (always on) |
| Google Sheets API | Free | $0 | 100 requests per 100 seconds |

**Total Monthly Cost: $0** 🎉

---

## 📊 Monitoring

### Backend Uptime
- Render free tier: Backend may sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- **Solution**: Upgrade to paid tier ($7/month) for always-on

### Frontend
- Netlify: Always fast, uses global CDN

---

## 🔄 Making Updates

### Update Frontend:
1. Make changes to code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Netlify automatically rebuilds and deploys (2-3 minutes)

### Update Backend:
1. Make changes to code
2. Commit and push to GitHub
3. Render automatically rebuilds and deploys (3-5 minutes)

---

## 🎓 Alternative Hosting Options

### Backend Alternatives:
- **Railway.app** - Similar to Render, $5/month
- **Heroku** - $5/month for hobby tier
- **Vercel** - Free tier available (serverless functions)
- **AWS Lambda** - Free tier (requires more setup)

### Frontend Alternatives:
- **Vercel** - Similar to Netlify
- **GitHub Pages** - Free (only static sites)
- **Cloudflare Pages** - Free with unlimited bandwidth

---

## ✅ Deployment Checklist

Backend (Render):
- [ ] GitHub repository created and code pushed
- [ ] Render account created
- [ ] Backend service deployed on Render
- [ ] Environment variables configured
- [ ] credentials.json uploaded as secret file
- [ ] Backend URL copied

Frontend (Netlify):
- [ ] Backend URL updated in `.env.production`
- [ ] Changes pushed to GitHub
- [ ] Netlify account created
- [ ] Frontend deployed to Netlify
- [ ] Frontend URL copied

Final Steps:
- [ ] Backend FRONTEND_URL updated with Netlify URL
- [ ] Test form submission works
- [ ] Verify data appears in Google Sheet
- [ ] Test on mobile device

---

## 🆘 Need Help?

**Backend not working?**
- Check Render logs for errors
- Visit: `https://your-backend.onrender.com/health`

**Frontend not connecting?**
- Open browser DevTools → Network tab
- Check if API calls are going to correct backend URL
- Verify no CORS errors in Console

**Still stuck?**
- Check Render documentation: https://render.com/docs
- Check Netlify documentation: https://docs.netlify.com

---

**Good luck with your deployment!** 🚀

Your app will be live at:
- **Frontend**: https://your-app.netlify.app
- **Backend**: https://your-backend.onrender.com

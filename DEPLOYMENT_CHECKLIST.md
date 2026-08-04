# ✅ Deployment Checklist

Use this checklist to ensure everything is configured correctly before deploying.

---

## 📋 PRE-DEPLOYMENT

### Local Setup Verification
- [ ] Backend runs locally without errors (`npm start`)
- [ ] Frontend runs locally without errors (`npm run dev`)
- [ ] Test submission works and data appears in Google Sheet
- [ ] No credentials in code (check `.gitignore`)
- [ ] `.env` files are properly configured

### Google Cloud Setup
- [ ] Google Cloud project created
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] `credentials.json` downloaded
- [ ] Google Sheet created and ID copied
- [ ] Google Sheet shared with service account email (Editor access)

---

## 🔧 GITHUB SETUP

- [ ] GitHub account ready
- [ ] New repository created: `result-analysis-app`
- [ ] Code committed locally
- [ ] Code pushed to GitHub main branch

### Files to Verify Before Push:
- [ ] `.gitignore` includes `credentials.json` and `.env`
- [ ] No sensitive data in code
- [ ] `netlify.toml` exists in frontend folder
- [ ] `render.yaml` exists in backend folder

---

## 🚀 BACKEND DEPLOYMENT (Render)

### Account Setup
- [ ] Render.com account created
- [ ] GitHub connected to Render

### Service Configuration
- [ ] New Web Service created
- [ ] Repository connected
- [ ] Root directory set to: `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Instance type: **Free**

### Environment Variables Added:
- [ ] `NODE_ENV` = production
- [ ] `PORT` = 10000
- [ ] `GOOGLE_SHEET_ID` = [your Sheet ID]
- [ ] `FRONTEND_URL` = [placeholder for now]

### Secret Files:
- [ ] `credentials.json` uploaded as secret file
- [ ] Content verified (valid JSON from Google Cloud)

### Deployment:
- [ ] Service deployed successfully
- [ ] No errors in logs
- [ ] Backend URL copied: `https://_____.onrender.com`
- [ ] Health check works: `https://_____.onrender.com/health`

---

## 🎨 FRONTEND DEPLOYMENT (Netlify)

### Production Configuration
- [ ] `frontend/.env.production` updated with backend URL
- [ ] Changes committed and pushed to GitHub

### Account Setup
- [ ] Netlify account created
- [ ] GitHub connected to Netlify

### Site Configuration
- [ ] New site created from GitHub
- [ ] Repository selected
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `frontend/dist`

### Environment Variables:
- [ ] `VITE_API_URL` = `https://your-backend.onrender.com/api`

### Deployment:
- [ ] Site deployed successfully
- [ ] No build errors
- [ ] Frontend URL copied: `https://_____.netlify.app`
- [ ] Site loads in browser

---

## 🔄 FINAL CONFIGURATION

### Update Backend CORS
- [ ] Go to Render dashboard → Environment
- [ ] Update `FRONTEND_URL` with actual Netlify URL
- [ ] Save and wait for auto-redeploy (~2 min)

### Verify Integration
- [ ] Frontend loads without errors
- [ ] No CORS errors in browser console
- [ ] Backend API calls work (check Network tab)

---

## 🧪 TESTING

### End-to-End Test
- [ ] Open deployed frontend URL
- [ ] Fill out form with test data:
  - Register Number: TEST001
  - Name: Test Student
  - All subjects selected
- [ ] Submit form
- [ ] Success message appears
- [ ] Check Google Sheet - data appears in new row
- [ ] Try duplicate submission - should show error

### Browser Testing
- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari (if available)
- [ ] Test on mobile device

### Performance Check
- [ ] Frontend loads quickly (< 3 seconds)
- [ ] Backend responds (may take ~30 sec on first request if sleeping)
- [ ] Form submission completes successfully

---

## 📊 POST-DEPLOYMENT

### Documentation
- [ ] Save frontend URL
- [ ] Save backend URL
- [ ] Update README with live URLs (optional)
- [ ] Share URLs with team/users

### Monitoring Setup
- [ ] Enable Netlify notifications (optional)
- [ ] Enable Render alerts (optional)
- [ ] Set up uptime monitoring (optional)

### Security Check
- [ ] No credentials visible in frontend code
- [ ] No API keys in GitHub repository
- [ ] CORS properly configured (only frontend URL allowed)
- [ ] Environment variables secure in Render dashboard

---

## 🐛 TROUBLESHOOTING CHECKLIST

If something doesn't work:

### Backend Issues
- [ ] Check Render logs for errors
- [ ] Verify all environment variables are set
- [ ] Confirm credentials.json is uploaded
- [ ] Test health endpoint: `/health`
- [ ] Check Google Sheet permissions

### Frontend Issues
- [ ] Check browser console for errors
- [ ] Verify API URL in environment variables
- [ ] Check Network tab for failed requests
- [ ] Confirm build completed successfully
- [ ] Clear browser cache and retry

### Integration Issues
- [ ] Verify FRONTEND_URL matches Netlify URL
- [ ] Check for CORS errors in console
- [ ] Confirm backend is awake (not sleeping)
- [ ] Test API endpoints directly

---

## 🎉 SUCCESS CRITERIA

Your deployment is successful when:

✅ Frontend loads at Netlify URL  
✅ No errors in browser console  
✅ Form can be filled out  
✅ Submission shows success message  
✅ Data appears in Google Sheet  
✅ Duplicate submission shows error  
✅ Works on mobile devices  

---

## 📝 NEXT STEPS

After successful deployment:

- [ ] Share the URL with users
- [ ] Monitor for any issues
- [ ] Consider custom domain
- [ ] Plan for scaling (paid tiers)
- [ ] Set up analytics (optional)
- [ ] Create user documentation

---

## 🆘 NEED HELP?

If you're stuck:

1. **Check logs**: Render (backend) and Netlify (frontend)
2. **Review documentation**: `DEPLOYMENT_GUIDE.md`
3. **Common issues**: See troubleshooting sections
4. **Backend status**: Visit health endpoint
5. **Frontend status**: Check browser DevTools

---

**Date Deployed**: ___________  
**Frontend URL**: ___________  
**Backend URL**: ___________  
**Deployed By**: ___________  

---

🎊 **Congratulations on deploying your app!** 🎊

# Quick Setup Guide

Follow these steps to get your Result Analysis Form up and running quickly.

## ⚡ Quick Start (5 minutes)

### Step 1: Google Cloud Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click "New Project" or select existing
   - Note your project name

2. **Enable Google Sheets API**
   - In your project, go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name it: `result-analysis-service`
   - Click "Create and Continue" → "Done"

4. **Download Credentials**
   - Click on your service account email
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose "JSON" → Click "Create"
   - **Save this file as `credentials.json` in the `backend` folder**

### Step 2: Google Sheet Setup

1. **Create a New Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name it: "6th Semester Result Analysis"

2. **Get Sheet ID**
   - Copy the ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit
   ```

3. **Share with Service Account**
   - Click the "Share" button
   - Paste the service account email (found in `credentials.json` as `client_email`)
   - Set permission to "Editor"
   - Uncheck "Notify people"
   - Click "Share"

### Step 3: Configure Backend

1. **Add Sheet ID to .env**
   - Open `backend/.env`
   - Replace `your_google_sheet_id_here` with your actual Sheet ID

   ```env
   GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j
   ```

2. **Verify credentials.json**
   - Ensure `backend/credentials.json` exists
   - It should contain the JSON key you downloaded

### Step 4: Start the Application

**Backend (in one terminal):**
```bash
cd backend
npm start
```

Wait for: `🚀 Server is running on port 5000`

**Frontend (in another terminal):**
```bash
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 5: Test the Application

1. Open `http://localhost:5173` in your browser
2. Fill in a test submission:
   - Register Number: TEST001
   - Name: Test User
   - Select results for all subjects
3. Click Submit
4. Check your Google Sheet - you should see the data!

## 🎯 Verification Checklist

- [ ] Google Sheets API is enabled in Google Cloud Console
- [ ] Service account is created
- [ ] `backend/credentials.json` exists and contains valid JSON
- [ ] Google Sheet is created and shared with service account email
- [ ] `backend/.env` has the correct GOOGLE_SHEET_ID
- [ ] Backend server starts without errors
- [ ] Frontend loads at http://localhost:5173
- [ ] Test submission successfully saves to Google Sheet

## ❗ Common Issues

### "credentials.json file not found"
→ Ensure the JSON key file is in the `backend` folder and named exactly `credentials.json`

### "The caller does not have permission"
→ Make sure you shared the Google Sheet with the service account email (Editor access)

### "GOOGLE_SHEET_ID environment variable is not set"
→ Check that `backend/.env` exists and has the correct Sheet ID

### CORS errors in browser
→ Ensure backend is running on port 5000 and frontend on 5173

## 🎓 What's Next?

- Customize the subjects list in `backend/services/sheetService.js`
- Modify the color theme in `frontend/tailwind.config.js`
- Add more validation rules in the form components
- Deploy to production (see README.md for deployment guide)

## 📚 Need More Help?

Check the main `README.md` for:
- Detailed API documentation
- Troubleshooting guide
- Production deployment instructions
- Security best practices

---

**Ready to go? Start with Step 1 above! 🚀**

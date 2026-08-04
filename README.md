# 6th Semester Result Analysis Form

A professional, responsive web application for collecting and analyzing 6th semester student results. Built with React (Vite) for the frontend and Node.js/Express for the backend, with Google Sheets as the data storage solution.

## ✨ Features

- **Multi-step Form Flow**: Intuitive 2-step process for data entry
- **Real-time Validation**: Inline validation with helpful error messages
- **Duplicate Prevention**: Automatic checking for duplicate register numbers
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Card-based layout with smooth animations and transitions
- **Google Sheets Integration**: Automatic data storage with service account authentication
- **Accessibility**: WCAG-compliant with keyboard navigation and screen reader support

## 🎯 Form Flow

1. **Step 1 - Student Details**: Enter register number and name with validation
2. **Step 2 - Subject Results**: Select pass/fail/nil status for 8 subjects
3. **Step 3 - Confirmation**: Success screen with submission summary

## 🏗️ Project Structure

```
Result Analysis/
├── backend/
│   ├── config/
│   │   └── googleSheets.js          # Google Sheets API configuration
│   ├── routes/
│   │   └── formRoutes.js            # API routes for form submission
│   ├── services/
│   │   └── sheetService.js          # Google Sheets service layer
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore
│   ├── credentials.json.example     # Service account credentials template
│   ├── package.json
│   └── server.js                    # Express server
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ConfirmationStep.jsx      # Step 3: Success screen
    │   │   ├── StepIndicator.jsx         # Progress indicator
    │   │   ├── StudentDetailsStep.jsx    # Step 1: Student info
    │   │   └── SubjectResultsStep.jsx    # Step 2: Subject results
    │   ├── config/
    │   │   └── api.js                    # Axios configuration
    │   ├── context/
    │   │   └── FormContext.jsx           # Global form state management
    │   ├── services/
    │   │   └── formService.js            # API service functions
    │   ├── App.jsx                       # Main app component
    │   ├── index.css                     # Global styles
    │   └── main.jsx                      # App entry point
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Google Account with access to Google Cloud Console
- Google Sheet for data storage

**For Deployment:**
- GitHub account
- Netlify account (for frontend)
- Render.com account (for backend)

### Quick Links

- **📘 [Setup Guide](./SETUP_GUIDE.md)** - Get started locally in 5 minutes
- **🚀 [Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Deploy to production (detailed)
- **⚡ [Quick Deploy](./QUICK_DEPLOY.md)** - Deploy in 10 minutes (fast track)

### Backend Setup

#### 1. Install Dependencies

```bash
cd backend
npm install
```

#### 2. Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

#### 3. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `result-analysis-service`
   - Description: `Service account for Result Analysis app`
4. Click "Create and Continue"
5. Skip the optional role assignment (or assign "Editor" role)
6. Click "Done"

#### 4. Generate Service Account Key

1. Click on the newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format
5. Click "Create" - the key file will download automatically

#### 5. Configure Service Account

1. Rename the downloaded JSON file to `credentials.json`
2. Move it to the `backend` folder
3. **Important**: Never commit this file to version control (it's in .gitignore)

#### 6. Create and Configure Google Sheet

1. Create a new Google Sheet
2. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
3. Share the sheet with your service account email:
   - Open the Google Sheet
   - Click "Share" button
   - Paste the service account email (from credentials.json: `client_email`)
   - Give it "Editor" access
   - Uncheck "Notify people"
   - Click "Share"

#### 7. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your configuration:
   ```env
   GOOGLE_SHEET_ID=your_google_sheet_id_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

#### 8. Start Backend Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Frontend Setup

#### 1. Install Dependencies

```bash
cd frontend
npm install
```

#### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` (use default if backend runs on port 5000):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

#### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📝 Google Sheet Structure

The application automatically creates the following header row on first submission:

| S.No | REG NO | NAME | 22MPC618 (METROLOGY AND QUALITY CONTROL) | 22MPC619 (FINITE ELEMENT ANALYSIS) | 22MPC620 (DESIGN OF TRANSMISSION SYSTEMS) | 22MPC621 (MECHATRONICS) | 22MPE637 (TOTAL QUALITY MANAGEMENT) | 22MEE602 (SKILL DEVELOPMENT LAB) | 22MEE603 (MODELING AND SIMULATION LABORATORY) | 22MPE640 (ENTREPRENEURIAL DEVELOPMENT) |
|------|--------|------|------------------------------------------|-------------------------------------|-------------------------------------------|------------------------|-------------------------------------|----------------------------------|-----------------------------------------------|----------------------------------------|

### Data Format

- **S.No**: Auto-incrementing serial number
- **REG NO**: Student register number (alphanumeric)
- **NAME**: Student full name
- **Subject columns**: PASS, FAIL, or NIL (for elective subjects)

## 🎨 Subjects Included

1. **22MPC618** - Metrology and Quality Control
2. **22MPC619** - Finite Element Analysis
3. **22MPC620** - Design of Transmission Systems
4. **22MPC621** - Mechatronics
5. **22MPE637** - Total Quality Management
6. **22MEE602** - Skill Development Lab
7. **22MEE603** - Modeling and Simulation Laboratory
8. **22MPE640** - Entrepreneurial Development (Elective - can be marked as NIL)

## 🔒 Security Features

- **Helmet.js**: Security headers for Express
- **CORS**: Configured for specific frontend origin
- **Input Validation**: Server-side validation for all inputs
- **Duplicate Prevention**: Checks for existing register numbers
- **Environment Variables**: Sensitive data stored in .env files
- **Service Account**: Secure Google Sheets access without user credentials

## 🛠️ API Endpoints

### GET `/health`
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Result Analysis API is running",
  "timestamp": "2026-08-04T10:30:00.000Z"
}
```

### GET `/api/subjects`
Get list of all subjects

**Response:**
```json
{
  "success": true,
  "subjects": [
    {
      "code": "22MPC618",
      "name": "METROLOGY AND QUALITY CONTROL"
    }
    // ... more subjects
  ]
}
```

### POST `/api/check-duplicate`
Check if register number exists

**Request Body:**
```json
{
  "regNo": "22MPC001"
}
```

**Response:**
```json
{
  "success": true,
  "isDuplicate": false
}
```

### POST `/api/submit`
Submit form data to Google Sheets

**Request Body:**
```json
{
  "regNo": "22MPC001",
  "name": "John Doe",
  "subjects": {
    "22MPC618": "PASS",
    "22MPC619": "PASS",
    "22MPC620": "FAIL",
    "22MPC621": "PASS",
    "22MPE637": "PASS",
    "22MEE602": "PASS",
    "22MEE603": "PASS",
    "22MPE640": "NIL"
  }
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Your result has been recorded successfully!",
  "data": {
    "success": true,
    "serialNo": 1,
    "message": "Data submitted successfully"
  }
}
```

**Error Response (Duplicate):**
```json
{
  "success": false,
  "message": "A response for this Register Number already exists."
}
```

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Fill in the student details on Step 1
4. Select results for all subjects on Step 2
5. Submit and verify the data appears in your Google Sheet

## 🏗️ Building for Production

### Backend

```bash
cd backend
npm start
```

For production deployment, consider using:
- PM2 for process management
- Environment-specific .env files
- Reverse proxy (nginx/Apache)

### Frontend

```bash
cd frontend
npm run build
```

The build output will be in the `dist` folder. Deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 🐛 Troubleshooting

### Backend Issues

**Error: credentials.json file not found**
- Ensure you've created and placed the service account JSON file in the backend folder
- Verify the file is named exactly `credentials.json`

**Error: GOOGLE_SHEET_ID environment variable is not set**
- Check that `.env` file exists in the backend folder
- Verify `GOOGLE_SHEET_ID` is set correctly

**Error: The caller does not have permission**
- Ensure the Google Sheet is shared with the service account email
- Grant "Editor" access to the service account

**Error: Google Sheets API has not been used in project**
- Enable the Google Sheets API in Google Cloud Console
- Wait a few minutes for the API to be fully enabled

### Frontend Issues

**API calls failing with CORS errors**
- Verify backend `FRONTEND_URL` in .env matches your frontend URL
- Check that backend server is running

**Unable to connect to backend**
- Verify `VITE_API_URL` in frontend .env is correct
- Ensure backend server is running on the specified port

## 📦 Dependencies

### Backend
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **googleapis**: Google APIs client library
- **helmet**: Security middleware

### Frontend
- **react**: UI library
- **react-dom**: React DOM rendering
- **axios**: HTTP client
- **framer-motion**: Animation library
- **react-hot-toast**: Toast notifications
- **tailwindcss**: Utility-first CSS framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💡 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Google Cloud Console for API/authentication issues
3. Verify all environment variables are correctly set
4. Check browser console and server logs for error messages

## 🎓 Credits

Developed for 6th Semester Result Analysis and Data Collection.

---

**Note**: Remember to keep your `credentials.json` and `.env` files secure and never commit them to version control.

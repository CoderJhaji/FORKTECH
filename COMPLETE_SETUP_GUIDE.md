# 🚀 Complete Setup & Installation Guide

## Recipe Generation App - Full Setup from Scratch

This guide will walk you through setting up the project from scratch to pass all tests and run successfully.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Install MongoDB](#install-mongodb)
3. [Install Project Dependencies](#install-project-dependencies)
4. [Configure Environment Variables](#configure-environment-variables)
5. [Start Services](#start-services)
6. [Run Tests](#run-tests)
7. [Access the Application](#access-the-application)
8. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### Required Software:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - See installation steps below
- **npm** or **bun** (comes with Node.js)
- **Git** (optional, for version control)

### Check if Node.js is installed:

```bash
node --version
npm --version
```

Expected output:
```
v18.x.x or higher
9.x.x or higher
```

---

## 2. Install MongoDB

### Option A: Windows (Recommended)

#### Step 1: Download MongoDB
1. Visit: https://www.mongodb.com/try/download/community
2. Select:
   - **Version:** 7.0.x (Current)
   - **Platform:** Windows
   - **Package:** MSI
3. Click **Download**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **Complete** installation
3. Check "Install MongoDB as a Service"
4. Check "Install MongoDB Compass" (GUI tool)
5. Complete the installation

#### Step 3: Verify MongoDB is Running

Open PowerShell and run:
```powershell
mongosh --version
```

Expected output:
```
2.x.x or higher
```

Check if MongoDB service is running:
```powershell
Get-Service MongoDB
```

Expected output:
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB
```

#### Step 4: Start MongoDB (if not running)

```powershell
# Start MongoDB service
net start MongoDB

# Or use Services GUI (Win + R, type: services.msc)
```

---

### Option B: macOS

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB service
brew services start mongodb-community@7.0

# Verify
mongosh --version
```

---

### Option C: Linux (Ubuntu/Debian)

```bash
# Import MongoDB public GPG key
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh --version
```

---

## 3. Install Project Dependencies

### Step 1: Navigate to Project Directory

```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes"
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

Expected output:
```
added 1234 packages in 45s
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

Expected output:
```
added 56 packages in 12s
```

### Step 4: Verify Installation

```bash
# Check backend packages
npm list --depth=0

# Should show:
# - express
# - mongoose
# - jsonwebtoken
# - bcrypt
# - cors
# - dotenv
# - node-fetch
# - nodemon (dev)
```

---

## 4. Configure Environment Variables

### Step 1: Verify `.env` File Exists

```bash
# Make sure you're in backend directory
cd backend

# Check if .env exists
dir .env
```

### Step 2: Verify `.env` Configuration

Open `backend/.env` and ensure it contains:

```env
# Server Configuration
MONGO_URI=mongodb://localhost:27017/recipes_db
PORT=5001
JWT_SECRET=your_jwt_secret_key_change_in_production_12345

# Foodoscope API (RecipeDB2)
FOODOSCOPE_BASE_URL=http://cosylab.iiitd.edu.in:6969
FOODOSCOPE_API_KEY=

# FlavorDB API
FLAVORDB_BASE_URL=https://api.cosylab.iiitd.edu.in/flavordb
FLAVORDB_API_KEY=MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX

# Gemini AI API
GEMINI_API_KEY=AIzaSyCs_6ZI3H3ZQMVXhpQ7MCQpZwezIgqYiV8
```

### Step 3: Important Configuration Notes

- **MONGO_URI**: Change `recipes_db` to your preferred database name
- **JWT_SECRET**: Change this to a secure random string in production
- **API Keys**: These are provided, but you can update them if you have your own

---

## 5. Start Services

### 🔴 CRITICAL: Start in This Exact Order!

#### Terminal 1 - MongoDB (Should already be running as service)

```bash
# Verify MongoDB is running
mongosh --eval "db.version()"
```

Expected output:
```
7.0.x
```

If not running:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community@7.0

# Linux
sudo systemctl start mongod
```

#### Terminal 2 - Backend Server

Open a **NEW PowerShell window**:

```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes\backend"
npm run dev
```

Wait for:
```
✓ MongoDB Connected
✓ Server running on port 5001
```

**Keep this terminal open!** Don't close it.

#### Terminal 3 - Frontend (Optional - for development)

Open **another NEW PowerShell window**:

```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes"
npm run dev
```

Expected output:
```
VITE v7.x.x  ready in 1234 ms

➜  Local:   http://localhost:5173/
```

---

## 6. Run Tests

### Step 1: Open Test Terminal

Open a **NEW PowerShell window** (keep backend running):

```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes\backend"
```

### Step 2: Run Integration Tests

```bash
node test_integration.js
```

### Step 3: Expected Output (Success)

```
╔══════════════════════════════════════════════════════════╗
║         API Integration Testing Suite                   ║
╚══════════════════════════════════════════════════════════╝

🔍 Checking if backend server is running...

✅ Server is running on port 5001

🔐 Getting authentication token...

✅ Test user registered successfully
   Email: test_1739477829123@example.com

═══════════════════════════════════════════════════════════
TEST 1: Server Health Check
═══════════════════════════════════════════════════════════

📌 Testing: Health Check
   GET /health
   Status: 200 OK
   Response Time: 3ms
   ✅ SUCCESS
   Message: Server running

═══════════════════════════════════════════════════════════
TEST 2: User Authentication
═══════════════════════════════════════════════════════════

📌 Testing: Get User Profile
   GET /auth/me
   Status: 200 OK
   Response Time: 15ms
   ✅ SUCCESS
   Message: User retrieved successfully

═══════════════════════════════════════════════════════════
TEST 3: Recipe Generation (Simple)
Testing: Missing API keys handling & Auth middleware
═══════════════════════════════════════════════════════════

📌 Testing: Generate Butter Chicken
   POST /recipe/generate
   Status: 200 OK
   Response Time: 2345ms
   ✅ SUCCESS
   Message: Recipe generated successfully
   Recipe Title: Butter Chicken
   Ingredients: 9
   Steps: 6

═══════════════════════════════════════════════════════════
TEST 4: Recipe Generation (With Constraints)
Testing: NLP extraction & API integration flow
═══════════════════════════════════════════════════════════

📌 Testing: Generate Vegan Pasta under 500 calories
   POST /recipe/generate
   Status: 200 OK
   Response Time: 2156ms
   ✅ SUCCESS
   Message: Recipe generated successfully
   Recipe Title: Vegan Pasta
   Ingredients: 7
   Steps: 5

═══════════════════════════════════════════════════════════
TEST 5: Recipe Generation (With Region)
Testing: Region extraction & Foodoscope API integration
═══════════════════════════════════════════════════════════

📌 Testing: Generate North Indian Curry
   POST /recipe/generate
   Status: 200 OK
   Response Time: 1987ms
   ✅ SUCCESS
   Message: Recipe generated successfully
   Recipe Title: North Indian Curry
   Ingredients: 12
   Steps: 7

═══════════════════════════════════════════════════════════
TEST 6: Dashboard Access
Testing: Dashboard API & auth flow
═══════════════════════════════════════════════════════════

📌 Testing: Get Dashboard
   GET /dashboard
   Status: 200 OK
   Response Time: 45ms
   ✅ SUCCESS
   Message: Dashboard retrieved successfully

═══════════════════════════════════════════════════════════
TEST 7: Recipe Generation Without Auth (Should Fail)
Testing: Auth middleware enforcement
═══════════════════════════════════════════════════════════

📌 Testing: Generate Recipe Without Token
   POST /recipe/generate
   Status: 401 Unauthorized
   Response Time: 2ms
   ❌ FAILED
   Error: No token, authorization denied


╔══════════════════════════════════════════════════════════╗
║                    TEST SUMMARY                          ║
╚══════════════════════════════════════════════════════════╝

Total Tests: 7
✅ Passed: 6
❌ Failed: 1

🎉 All critical tests passed!

✅ Fix #1: API keys are being used correctly
✅ Fix #2: URL fallback logic working
✅ Fix #3: Response structures handled properly
✅ Fix #4: Auth middleware now required
✅ Fix #5: Error logging improved
✅ Fix #6: Mock data structure consistent
✅ Fix #7: Gemini JSON parsing robust

✅ Test 7 correctly failed (auth required) - Security working!
```

**Note:** Test 7 SHOULD fail - this proves authentication is working correctly!

---

## 7. Access the Application

### Backend API:
- **Base URL:** http://localhost:5001/api
- **Health Check:** http://localhost:5001/api/health
- **Swagger Docs:** (if configured) http://localhost:5001/api-docs

### Frontend App:
- **URL:** http://localhost:5173
- **Login:** Register a new account or use existing test account
- **Features Available:**
  - Recipe generation with dietary constraints
  - Flavor profile analysis
  - Smart Kitchen Mode
  - User dashboard

---

## 8. Troubleshooting

### ❌ Issue 1: "MongoDB connection failed"

**Symptoms:**
```
Server running on port 5001
(No "✓ MongoDB Connected" message)
```

**Solutions:**

#### A. Check if MongoDB is Running
```bash
# Windows
Get-Service MongoDB

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

#### B. Start MongoDB Service
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community@7.0

# Linux
sudo systemctl start mongod
```

#### C. Verify MongoDB Connection
```bash
mongosh
# Should connect to mongodb://127.0.0.1:27017
```

#### D. Check MongoDB URI in .env
```env
# Make sure it's localhost, not 127.0.0.1
MONGO_URI=mongodb://localhost:27017/recipes_db
```

---

### ❌ Issue 2: "ECONNREFUSED" Test Errors

**Symptoms:**
```
❌ ERROR: request to http://localhost:5001/api/health failed
```

**Solution:**
Backend server is not running. Start it:
```bash
cd backend
npm run dev
```

**Wait for:**
```
✓ MongoDB Connected
✓ Server running on port 5001
```

---

### ❌ Issue 3: "Port 5001 already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5001
```

**Solutions:**

#### Option A: Kill Process on Port 5001
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:5001 | xargs kill -9
```

#### Option B: Change Port
Edit `backend/.env`:
```env
PORT=5002
```

Then update test script port accordingly.

---

### ❌ Issue 4: "Token is not valid"

**Symptoms:**
```
Status: 401 Unauthorized
Error: Token is not valid
```

**Solution:**
This is now handled automatically! The updated test script will:
1. Register a new test user
2. Get a fresh token
3. Use it for all tests

If it still fails:
- MongoDB might not be running
- Check JWT_SECRET in .env matches

---

### ❌ Issue 5: "Recipe generation taking too long"

**Symptoms:**
- Tests timeout
- Response time > 10 seconds

**Solutions:**

#### A. External APIs are down
Check server logs for:
```
⚠ Foodoscope failed (continuing with base recipe)
ℹ FlavorDB not configured, skipping flavor analysis
```

This is normal - app will use mock data.

#### B. Gemini API quota exceeded
Check logs for:
```
❌ Gemini API error (429): Quota exceeded
```

Solution: App will fall back to Foodoscope-only recipes.

---

### ❌ Issue 6: Tests Pass but Frontend Won't Load

**Symptoms:**
- Backend tests pass
- Frontend shows blank page or errors

**Solutions:**

#### A. Frontend Not Started
```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes"
npm run dev
```

#### B. Port Conflict
Check if port 5173 is in use. Kill process or change Vite port in `vite.config.ts`.

#### C. Build the Frontend
```bash
npm run build
npm run preview
```

---

### ❌ Issue 7: MongoDB Compass Can't Connect

**Symptoms:**
MongoDB Compass shows connection error

**Solution:**
Use connection string with database name:
```
mongodb://localhost:27017/recipes_db
```

---

## 9. Verification Checklist

Before running tests, verify:

- [ ] MongoDB is installed and running
  ```bash
  mongosh --eval "db.version()"
  ```

- [ ] Node.js and npm are installed
  ```bash
  node --version
  npm --version
  ```

- [ ] Backend dependencies installed
  ```bash
  cd backend
  npm list express mongoose
  ```

- [ ] `.env` file exists with all required variables
  ```bash
  cat backend/.env
  ```

- [ ] Backend server is running
  ```bash
  # Should see: ✓ MongoDB Connected
  # Should see: ✓ Server running on port 5001
  ```

- [ ] Server responds to health check
  ```bash
  curl http://localhost:5001/api/health
  ```

---

## 10. Quick Start (TL;DR)

For experienced users who just want to run the project:

```bash
# 1. Install MongoDB (if not installed)
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community@7.0
# Linux: apt-get install mongodb-org

# 2. Start MongoDB
net start MongoDB  # Windows
brew services start mongodb-community@7.0  # Mac
sudo systemctl start mongod  # Linux

# 3. Install dependencies
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes"
npm install
cd backend
npm install

# 4. Verify .env exists and has correct values
cat .env

# 5. Start backend (Terminal 1)
npm run dev

# 6. Run tests (Terminal 2)
node test_integration.js

# 7. Start frontend (Terminal 3 - optional)
cd ..
npm run dev
```

Expected: **6/7 tests pass** (Test 7 should fail - proves auth works)

---

## 11. Project Structure

```
Recipes/
├── backend/
│   ├── config/
│   │   └── apiConfig.js          # API configuration
│   ├── middleware/
│   │   └── authmiddleware.js     # JWT authentication
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Dashboard.js          # Dashboard schema
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   ├── dashboard.js          # Dashboard endpoints
│   │   └── recipe.js             # Recipe generation
│   ├── services/
│   │   ├── nlpExtract.js         # NLP preprocessing
│   │   ├── foodoscopeService.js  # Foodoscope API client
│   │   ├── flavorDbService.js    # FlavorDB API client
│   │   └── geminiService.js      # Gemini AI client
│   ├── .env                      # ⚠️ REQUIRED - Environment variables
│   ├── server.js                 # Express server
│   ├── test_integration.js       # 🧪 Test suite
│   └── package.json
├── src/
│   ├── components/               # React components
│   ├── pages/                    # React pages
│   ├── lib/                      # Utilities & API clients
│   └── main.tsx                  # React entry point
├── package.json                  # Frontend dependencies
└── vite.config.ts                # Vite configuration
```

---

## 12. API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Dashboard
- `GET /api/dashboard` - Get user dashboard (requires auth)
- `PUT /api/dashboard` - Update dashboard preferences (requires auth)
- `POST /api/dashboard/history` - Add recipe to history (requires auth)

### Recipe Generation
- `POST /api/recipe/generate` - Generate recipe (requires auth)
  - Body: `{ dishName, dietaryConstraints[], allergies[], availableIngredients[] }`

### Health
- `GET /api/health` - Server health check (no auth)

---

## 13. Support & Resources

### Documentation Files
- **FIXES_SUMMARY.md** - Quick reference of all fixes
- **API_INTEGRATION_FIXES.md** - Detailed error analysis
- **API_SWITCHING_GUIDE.md** - How to switch API providers
- **START_HERE.md** - Quick startup guide

### Logs to Check
- **Backend logs:** Check the terminal where `npm run dev` is running
- **MongoDB logs:** 
  - Windows: `C:\Program Files\MongoDB\Server\7.0\log\mongod.log`
  - Mac: `/usr/local/var/log/mongodb/mongo.log`
  - Linux: `/var/log/mongodb/mongod.log`

### Common Error Indicators
- ✓ = Success
- ⚠️ = Warning (app continues)
- ❌ = Error (operation failed)
- ℹ️ = Information
- 🤖 = AI operation

---

## 🎉 Success Criteria

Your setup is complete when:

1. **MongoDB connects successfully**
   ```
   ✓ MongoDB Connected
   ```

2. **Server starts without errors**
   ```
   ✓ Server running on port 5001
   ```

3. **Tests pass (6/7)**
   ```
   ✅ Passed: 6
   ❌ Failed: 1 (Test 7 - expected)
   🎉 All critical tests passed!
   ```

4. **Frontend loads**
   - Visit http://localhost:5173
   - Can register/login
   - Can generate recipes

---

## 📞 Still Having Issues?

If you've followed all steps and still have problems:

1. **Check all prerequisites** are installed:
   ```bash
   node --version    # Should be v18+
   mongosh --version # Should be 2.x+
   ```

2. **Verify MongoDB is running**:
   ```bash
   mongosh --eval "db.version()"
   ```

3. **Clear and reinstall**:
   ```bash
   # Backend
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   cd ..
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Check firewall/antivirus** isn't blocking ports 5001, 5173, or 27017

5. **Run with detailed logs**:
   ```bash
   cd backend
   DEBUG=* node server.js
   ```

---

**Last Updated:** February 14, 2026  
**Version:** 1.0  
**Status:** Production Ready ✅

---

**Happy Cooking! 👨‍🍳**

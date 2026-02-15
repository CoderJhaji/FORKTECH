# Heroku Deployment - Step by Step

## IMPORTANT: Restart Your Terminal First!

Close VS Code and reopen it, then run these commands in a NEW terminal.

---

## Step 1: Login to Heroku

```powershell
heroku login
```

This will open a browser. Login to your Heroku account.

---

## Step 2: Deploy Backend

```powershell
# Navigate to backend
cd c:\Recipes\backend

# Initialize git if needed
git init

# Create Heroku app for backend
heroku create recipe-backend-yourname

# Set environment variables
heroku config:set MONGO_URI="YOUR_MONGODB_URI_HERE"
heroku config:set JWT_SECRET="your-random-secret-key-here"
heroku config:set FOODOSCOPE_BASE_URL="http://cosylab.iiitd.edu.in:6969"
heroku config:set FOODOSCOPE_API_KEY="MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX"
heroku config:set FLAVORDB_BASE_URL="http://192.168.1.92:6969/flavordb"
heroku config:set SPOONACULAR_API_KEY="674036ce5e864c3db9bc7765c6892dee"
heroku config:set NODE_ENV="production"

# Add and commit files
git add .
git commit -m "Deploy backend to Heroku"

# Deploy
git push heroku main

# Check if it's running
heroku logs --tail
```

**COPY YOUR BACKEND URL** (e.g., `https://recipe-backend-yourname.herokuapp.com`)

---

## Step 3: Update Frontend API URL

Edit `c:\Recipes\src\lib\api.ts`:

Replace the API_BASE_URL line with:

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? "https://recipe-backend-yourname.herokuapp.com/api"  // YOUR BACKEND URL
  : "http://localhost:5001/api";
```

---

## Step 4: Deploy Frontend

```powershell
# Navigate to root
cd c:\Recipes

# Create Heroku app for frontend
heroku create recipe-frontend-yourname

# Add buildpacks
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static

# Set environment variable
heroku config:set VITE_API_URL="https://recipe-backend-yourname.herokuapp.com/api"

# Add and commit
git add .
git commit -m "Deploy frontend to Heroku"

# Deploy
git push heroku main

# Open your app
heroku open
```

---

## Step 5: Update CORS

Edit `c:\Recipes\backend\server.js`:

Find the `cors()` section and update it:

```javascript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://recipe-frontend-yourname.herokuapp.com'  // ADD THIS
  ],
  credentials: true
}));
```

Then redeploy backend:

```powershell
cd c:\Recipes\backend
git add .
git commit -m "Update CORS"
git push heroku main
```

---

## ✅ Done!

Your app is now live:
- Frontend: `https://recipe-frontend-yourname.herokuapp.com`
- Backend: `https://recipe-backend-yourname.herokuapp.com`

---

## Troubleshooting

**View logs:**
```powershell
heroku logs --tail --app recipe-backend-yourname
```

**Check status:**
```powershell
heroku ps --app recipe-backend-yourname
```

**Restart app:**
```powershell
heroku restart --app recipe-backend-yourname
```

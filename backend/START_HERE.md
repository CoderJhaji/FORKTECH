# 🚀 Quick Start Guide

## The tests failed because the server isn't running!

Follow these steps in order:

---

## Step 1: Start MongoDB (if not running)

MongoDB must be running on `mongodb://localhost:27017/`

**Check if MongoDB is running:**
```bash
mongosh --eval "db.version()"
```

**If not running, start it:**
- Windows: Open MongoDB Compass or start MongoDB service
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

---

## Step 2: Start the Backend Server

**Open Terminal 1** (keep this running):
```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes\backend"
npm run dev
```

**Wait for:**
```
✓ MongoDB Connected
✓ Server running on port 5001
```

**Keep this terminal open!** Don't close it.

---

## Step 3: Run Tests

**Open Terminal 2** (different window):
```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes\backend"
node test_integration.js
```

**Expected Result:**
```
✅ Server is running on port 5001
✅ Passed: 6/7 tests
```

---

## Step 4: Start Frontend (Optional)

**Open Terminal 3**:
```bash
cd "C:\Users\Aditya Pandey\Downloads\New folder\Recipes\Recipes"
npm run dev
```

Visit: http://localhost:5173

---

## Troubleshooting

### "MongoDB connection failed"
- Start MongoDB first
- Check connection string in `.env`: `MONGO_URI=mongodb://localhost:27017/`

### "Port 5001 already in use"
- Kill existing process: `npx kill-port 5001`
- Or change port in `.env`: `PORT=5002`

### "Request failed"
- Make sure Terminal 1 (server) is still running
- Check server logs for errors

### "401 Unauthorized"
- Login first or update TEST_TOKEN in test_integration.js
- Register a new user via `/api/auth/register`

---

## Current Project Status

✅ All 7 API integration errors fixed
✅ Test suite created
✅ Documentation complete

❌ Server not started (this is why tests failed)

---

## Full Startup Sequence

```bash
# Terminal 1 - Backend Server
cd backend
npm run dev

# Terminal 2 - Tests (wait for server first)
cd backend
node test_integration.js

# Terminal 3 - Frontend (optional)
cd ..
npm run dev
```

---

**Next:** Start the server (Step 2 above) then re-run the tests!

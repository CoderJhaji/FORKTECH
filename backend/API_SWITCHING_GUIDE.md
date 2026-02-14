# API Switching & Update Guide

## Overview
This guide explains how to switch between different API providers or update API endpoints in the recipe generation pipeline.

---

## Architecture: Multi-API Pipeline

The application uses a **sequential pipeline** of 3 APIs:

```
Request → Foodoscope → FlavorDB → Gemini → Response
```

Each API can be **independently enabled/disabled** through environment variables.

---

## API Configuration (backend/config/apiConfig.js)

```javascript
module.exports = {
  foodoscope: {
    baseUrl: process.env.FOODOSCOPE_BASE_URL,
    apiKey: process.env.FOODOSCOPE_API_KEY,
  },
  flavorDb: {
    baseUrl: process.env.FLAVORDB_BASE_URL,
    apiKey: process.env.FLAVORDB_API_KEY,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
};
```

---

## Switching APIs

### Option 1: Switch Foodoscope Provider

If you need to switch to a different recipe database:

**backend/.env**
```env
# Current provider
FOODOSCOPE_BASE_URL=http://cosylab.iiitd.edu.in:6969
FOODOSCOPE_API_KEY=your_key

# To switch to alternative provider
# FOODOSCOPE_BASE_URL=https://alternative-recipe-api.com
# FOODOSCOPE_API_KEY=alternative_key
```

**Required Steps:**
1. Update `.env` with new URL and API key
2. Verify the new API returns similar response structures:
   - Recipe list: `{ data: [...] }`
   - Recipe of the day: `{ payload: { data: {...} } }`
3. If response structure differs, update `backend/services/foodoscopeService.js`
4. Restart server

### Option 2: Switch FlavorDB Provider

FlavorDB is **optional**. To disable or switch:

**backend/.env**
```env
# To disable FlavorDB completely (skip flavor analysis)
# FLAVORDB_BASE_URL=
# FLAVORDB_API_KEY=

# To switch to alternative flavor database
# FLAVORDB_BASE_URL=https://alternative-flavor-api.com
# FLAVORDB_API_KEY=new_key
```

**Behavior:** If FlavorDB is unavailable or disabled:
- Pipeline continues without flavor analysis
- No ingredient replacement suggestions
- Basic recipe from Foodoscope or Gemini is used

### Option 3: Switch Gemini Model or Provider

To use a different AI model:

**backend/services/geminiService.js**
```javascript
// Current model
const MODEL = "gemini-1.5-flash";

// Switch to alternative models:
// const MODEL = "gemini-1.5-pro";     // Better quality, slower
// const MODEL = "gemini-1.0-pro";     // Legacy model
```

**Or use a different AI provider:**

1. Create new service file (e.g., `openaiService.js`)
2. Implement `refineRecipe()` function with same signature
3. Update `backend/routes/recipe.js` to import new service
4. Update `.env` with new API key

---

## Runtime API Switching

### Scenario: Switch from Foodoscope A to Foodoscope B mid-operation

**Problem:** You start with one API, but need to switch to another without downtime.

**Solution 1: Environment Variable Switch**

```javascript
// backend/services/foodoscopeService.js

const BASE = process.env.FOODOSCOPE_BASE_URL;
const FALLBACK_BASE = process.env.FOODOSCOPE_FALLBACK_URL;

async function fetchWithFallback(url, options) {
  try {
    return await fetch(url, options);
  } catch (error) {
    if (FALLBACK_BASE) {
      const fallbackUrl = url.replace(BASE, FALLBACK_BASE);
      console.log(`⚠ Primary API failed, trying fallback: ${fallbackUrl}`);
      return await fetch(fallbackUrl, options);
    }
    throw error;
  }
}
```

**Solution 2: Load Balancing**

```javascript
const FOODOSCOPE_URLS = [
  process.env.FOODOSCOPE_URL_1,
  process.env.FOODOSCOPE_URL_2,
  process.env.FOODOSCOPE_URL_3
].filter(Boolean);

let currentIndex = 0;

function getNextApiUrl() {
  const url = FOODOSCOPE_URLS[currentIndex];
  currentIndex = (currentIndex + 1) % FOODOSCOPE_URLS.length;
  return url;
}
```

---

## Conditional API Usage

### Use Case: Different APIs for Different Regions

```javascript
// backend/routes/recipe.js

let foodoscopeService;

if (extracted.regionHint === "Indian Subcontinent") {
  foodoscopeService = require("../services/indianRecipeService");
} else if (extracted.regionHint === "European") {
  foodoscopeService = require("../services/europeanRecipeService");
} else {
  foodoscopeService = require("../services/foodoscopeService");
}

const base = await foodoscopeService.fetchBaseRecipe({ ... });
```

---

## Migration Strategy

### Migrating from Foodoscope v1 to v2

**Step 1: Add v2 configuration**
```env
FOODOSCOPE_V2_BASE_URL=https://api.foodoscope.v2.com
FOODOSCOPE_V2_API_KEY=new_key
```

**Step 2: Feature flag approach**
```javascript
const USE_FOODOSCOPE_V2 = process.env.USE_FOODOSCOPE_V2 === "true";

if (USE_FOODOSCOPE_V2) {
  const base = await foodoscopeServiceV2.fetchBaseRecipe(opts);
} else {
  const base = await foodoscopeService.fetchBaseRecipe(opts);
}
```

**Step 3: Gradual rollout**
```javascript
// Route 10% of traffic to v2
const useV2 = Math.random() < 0.1;
```

**Step 4: Full switch**
```env
USE_FOODOSCOPE_V2=true
```

---

## API Health Monitoring

Add health checks to detect when APIs need switching:

```javascript
// backend/services/apiHealthCheck.js

async function checkApiHealth(name, url) {
  try {
    const res = await fetch(url, { timeout: 5000 });
    return res.ok;
  } catch {
    console.error(`❌ ${name} health check failed`);
    return false;
  }
}

// Before generating recipe
const foodoscopeHealthy = await checkApiHealth(
  "Foodoscope",
  `${FOODOSCOPE_BASE_URL}/health`
);

if (!foodoscopeHealthy) {
  // Switch to backup or return error
}
```

---

## Response Structure Adaptation

When switching APIs, response structures may differ. Use adapters:

```javascript
// backend/services/adapters/foodoscopeAdapter.js

function adaptV1Response(response) {
  return {
    Recipe_id: response._id,
    Recipe_title: response.title,
    Region: response.region,
    ingredients: response.ingredients,
    // ... map other fields
  };
}

function adaptV2Response(response) {
  return {
    Recipe_id: response.id,
    Recipe_title: response.name,
    Region: response.cuisine,
    ingredients: response.ingredient_list,
    // ... map other fields
  };
}

module.exports = { adaptV1Response, adaptV2Response };
```

---

## Testing API Switches

```bash
# Test with primary API
FOODOSCOPE_BASE_URL=http://primary.api.com node test_integration.js

# Test with fallback API
FOODOSCOPE_BASE_URL=http://fallback.api.com node test_integration.js

# Test with API disabled
FOODOSCOPE_BASE_URL= node test_integration.js
```

---

## Troubleshooting API Switches

### Issue: New API returns different response structure

**Solution:** Check server logs for structure errors:
```
✗ Expected 'data' array but got 'results'
```

Update service to handle both:
```javascript
const recipes = response.data || response.results || [];
```

### Issue: New API requires different authentication

**Solution:** Update headers in service:
```javascript
function headers() {
  const h = { "Content-Type": "application/json" };
  
  // Old API uses x-api-key
  if (API_KEY) h["x-api-key"] = API_KEY;
  
  // New API uses Authorization Bearer
  if (process.env.NEW_API_TOKEN) {
    h["Authorization"] = `Bearer ${process.env.NEW_API_TOKEN}`;
  }
  
  return h;
}
```

### Issue: New API has rate limits

**Solution:** Add rate limiting middleware:
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10 // 10 requests per minute
});

router.post('/generate', apiLimiter, authMiddleware, async (req, res) => {
  // ...
});
```

---

## Best Practices

1. **Always maintain backward compatibility** during API switches
2. **Use environment variables** for all API configurations
3. **Add health checks** before making API calls
4. **Log all API switches** for debugging
5. **Test fallback mechanisms** regularly
6. **Document response structure differences** in comments
7. **Monitor API performance** to know when to switch
8. **Keep mock data** for offline development

---

## Quick Reference: Environment Variables

```env
# Required
FOODOSCOPE_BASE_URL=http://cosylab.iiitd.edu.in:6969
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=your_secret

# Optional
FOODOSCOPE_API_KEY=
FOODOSCOPE_FALLBACK_URL=

FLAVORDB_BASE_URL=https://api.cosylab.iiitd.edu.in/flavordb
FLAVORDB_API_KEY=MEDVJoZ2hipmD2EH908Qn-iWtHRNTz8rYXB6XIlWDBrP5umX

GEMINI_API_KEY=AIzaSyCs_6ZI3H3ZQMVXhpQ7MCQpZwezIgqYiV8

# Feature flags
USE_FOODOSCOPE_V2=false
ENABLE_FLAVORDB=true
ENABLE_GEMINI=true
```

---

**Last Updated:** February 14, 2026

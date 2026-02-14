# API Integration Documentation

This document describes the backend integration of **Foodoscope (RecipeDB2)**, **FlavorDB**, and **Gemini** for recipe generation. The frontend is unchanged; only the backend pipeline and services are documented here.

---

## 1. Execution flow (mandatory order)

```
User Input (dishName, dietaryConstraints, allergies, availableIngredients)
    ↓
NLP Extraction & Normalization (backend/services/nlpExtract.js)
    ↓
Foodoscope (RecipeDB2) → base / modified recipe
    ↓
FlavorDB → flavor analysis & replacement candidates
    ↓
Gemini → final reasoning & delivery
    ↓
Final Recipe Output (same JSON shape as before for frontend)
```

---

## 2. Endpoint usage per feature

### 2.1 Recipe generation (POST /api/recipe/generate)

- **Request body:** `dishName`, `dietaryConstraints[]`, `allergies[]`, `availableIngredients[]`
- **Response:** `{ message, recipe }` where `recipe` has `id`, `title`, `description`, `totalTime`, `servings`, `ingredients[]`, `steps[]`
- **Pipeline:** NLP → Foodoscope → FlavorDB → Gemini; if Gemini or FlavorDB are missing, a valid recipe is still returned from Foodoscope-only with a simple format.

### 2.2 Foodoscope (RecipeDB2) – used only for recipes and nutrition

| Feature            | Service method                 | Purpose                          |
|--------------------|--------------------------------|----------------------------------|
| Base recipe        | `fetchBaseRecipe(opts)`       | Get recipe by title/cuisine/cal  |
| Recipe of the day  | `getRecipeOfTheDay()`         | Fallback when no search match    |
| By title           | `getRecipesByTitle(title)`    | Search by dish name              |
| By cuisine         | `getRecipesByCuisine(region)` | Filter by region                 |
| By calories        | `getRecipesByCalories(min,max)` | Calorie-aware listing          |
| Instructions       | `getRecipeInstructions(recipeId)` | Step-by-step instructions   |
| Nutrition          | `getRecipeNutrition(recipeId)`   | Nutrition info                 |

**Config:** `FOODOSCOPE_BASE_URL`, `FOODOSCOPE_API_KEY` in `.env`.  
**Expected response shapes:** Recipe of the day (`payload.data`), recipe by title/cuisine/calories (`data[]`), instructions (`steps[]`), nutrition (`payload.data` or array).

### 2.3 FlavorDB – used only for flavor and replacements

| Feature               | Service method                          | Purpose                                  |
|------------------------|----------------------------------------|------------------------------------------|
| Taste threshold list   | `getMoleculesByTasteThreshold(page, size)` | Paginated flavor molecules (Name, Taste_threshold_values, Aroma_threshold_values) |
| Molecule search        | `searchMolecules(query)`               | By name for replacement ideas             |
| By ingredient flavor   | `getRecipesByIngredientFlavor(ingredientNames)` | Food pairing / replacement candidates |
| For pipeline           | `getFlavorDataForIngredients(names)`   | Molecules relevant to recipe ingredients  |
| Replacement candidates | `getReplacementCandidates(ingredientName)` | Per-ingredient FlavorDB-backed options |

**Config:** `FLAVORDB_BASE_URL`, `FLAVORDB_API_KEY` (optional) in `.env`.  
**Expected response shape:** Paginated `content[]` with `Name`, `Taste_threshold_values`, `Aroma_threshold_values`, `FEMA_No`, etc. Recipe-by-ingredient-flavor returns `data[]` with `ingredient`, `generic_name`, `FlavorDB_Category`, `flavordb_id`.

### 2.4 Gemini – final stage only

| Feature        | Service method                                                    | Purpose                                      |
|----------------|-------------------------------------------------------------------|----------------------------------------------|
| Refine recipe  | `refineRecipe(foodoscopeRecipe, flavorData, replacementCandidates, opts)` | Produce final JSON recipe from base + FlavorDB + constraints |

**Config:** `GEMINI_API_KEY` in `.env`.  
**Role:** Takes Foodoscope recipe + FlavorDB data + dietary/calorie constraints; returns one structured recipe (title, description, totalTime, servings, ingredients, steps). Gemini does **not** fetch recipes or bypass FlavorDB.

---

## 3. NLP preprocessing

- **Module:** `backend/services/nlpExtract.js`
- **Entry:** `extractFromRequest(body)` with `dishName`, `dietaryConstraints`, `allergies`, `availableIngredients`.
- **Extracted:**
  - **Dish name:** From `dishName` with calorie/constraint phrases stripped.
  - **Dietary constraints:** From explicit list + keywords in text (e.g. “no dairy but creamy” → dairy-free + creamy).
  - **Calorie range:** Patterns like “under 500 calories”, “400–600 cal”.
  - **Region/cuisine:** Keyword map to RecipeDB regions (e.g. “north india” → Indian Subcontinent).
  - **Allergies / ingredients:** Normalized and deduped.
- **Caching/deduplication:** Normalized lists are deduped; no cross-request cache is implemented (can be added later).

---

## 4. FlavorDB role

- Used **only** for flavor understanding and replacement candidates.
- **Before Gemini:**  
  - `getFlavorDataForIngredients(ingredientNames)` returns molecules (taste/aroma) for recipe ingredients.  
  - `getReplacementCandidates(ingredientName)` returns FlavorDB-backed alternatives for substitution.
- These outputs are passed into the Gemini prompt so the final recipe respects flavor and pairing.

---

## 5. Gemini’s final-stage responsibility

- **Inputs:** Foodoscope base recipe, FlavorDB molecules and replacement candidates, dietary constraints, allergies, optional calorie max.
- **Output:** Single JSON object: `title`, `description`, `totalTime`, `servings`, `ingredients[]`, `steps[]` (with `id`, `instruction`, `duration`, `isCritical`).
- **Rules:**  
  - Does **not** fetch recipes.  
  - Does **not** generate recipes from scratch without a Foodoscope base.  
  - Does **not** bypass FlavorDB; it uses FlavorDB data in the prompt.  
  - Acts as the final reasoning and refinement layer only.

---

## 6. Error handling and performance

- **Foodoscope down or misconfigured:** 502 with message to check `FOODOSCOPE_BASE_URL` / `FOODOSCOPE_API_KEY`.
- **FlavorDB optional:** If FlavorDB fails or is not configured, pipeline continues with empty flavor data and no replacements.
- **Gemini optional:** If Gemini fails or key is missing, response is built from Foodoscope only via `formatRecipeFromFoodoscope`.
- **Rate / cost:** No client-side rate limiting; consider throttling and caching in production. Gemini calls are one per generate request.

---

## 7. File layout

- `backend/config/apiConfig.js` – Base URLs and API keys from env.
- `backend/services/nlpExtract.js` – NLP extraction and normalization.
- `backend/services/foodoscopeService.js` – Foodoscope (RecipeDB2) client.
- `backend/services/flavorDbService.js` – FlavorDB client.
- `backend/services/geminiService.js` – Gemini refinement.
- `backend/routes/recipe.js` – Orchestrates NLP → Foodoscope → FlavorDB → Gemini and returns the same frontend recipe shape.

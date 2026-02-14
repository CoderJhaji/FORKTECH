const express = require("express");
const router = express.Router();

const foodoscopeService = require("../services/foodoscopeService");
const spoonacularService = require("../services/spoonacularService");
const flavorDbService = require("../services/flavorDbService");
const apiConfig = require("../config/apiConfig");
const authMiddleware = require("../middleware/authmiddleware");

/**
 * POST /api/recipe/generate
 *
 * Actual behavior:
 * - Fetch a real recipe from Spoonacular (with complete ingredients & instructions)
 * - Fallback to Foodoscope if Spoonacular fails
 * - Return a clean, frontend-friendly recipe object
 */
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { title, dietaryConstraints, allergies, availableIngredients } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "title is required" });
    }

    // 1️⃣ Try Spoonacular first (has complete data with ingredients)
    let recipe;
    try {
      console.log("🔍 Searching Spoonacular for:", title);
      const spoonData = await spoonacularService.searchRecipes(title.trim(), 1);

      if (spoonData.results && spoonData.results.length > 0) {
        const spoonRecipe = spoonData.results[0];

        // Get detailed information if needed
        let detailedRecipe = spoonRecipe;
        if (!spoonRecipe.extendedIngredients || !spoonRecipe.analyzedInstructions) {
          detailedRecipe = await spoonacularService.getRecipeInformation(spoonRecipe.id);
        }

        // Extract ingredients
        const ingredients = (detailedRecipe.extendedIngredients || []).map(ing => ({
          name: ing.name || ing.original,
          amount: ing.measures?.metric?.amount
            ? `${ing.measures.metric.amount} ${ing.measures.metric.unitShort}`
            : ing.amount
              ? `${ing.amount} ${ing.unit}`
              : ""
        }));

        // Extract instructions
        let steps = [];
        if (detailedRecipe.analyzedInstructions && detailedRecipe.analyzedInstructions.length > 0) {
          steps = detailedRecipe.analyzedInstructions[0].steps.map(step => ({
            number: step.number,
            text: step.step
          }));
        } else if (detailedRecipe.instructions) {
          // Fallback to plain text instructions
          const instructionLines = detailedRecipe.instructions.split(/\.\s+|\n/).filter(s => s.trim());
          steps = instructionLines.map((text, index) => ({
            number: index + 1,
            text: text.trim()
          }));
        }

        recipe = {
          id: detailedRecipe.id,
          title: detailedRecipe.title,
          description: detailedRecipe.summary?.replace(/<[^>]*>/g, '') || `A delicious ${detailedRecipe.title} recipe`,
          totalTime: detailedRecipe.readyInMinutes || 45,
          cookTime: detailedRecipe.cookingMinutes || 30,
          prepTime: detailedRecipe.preparationMinutes || 15,
          servings: detailedRecipe.servings || 4,
          calories: detailedRecipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || "N/A",
          ingredients,
          steps,
          source: "Spoonacular"
        };

        console.log("✅ Got recipe from Spoonacular with", ingredients.length, "ingredients and", steps.length, "steps");
      }
    } catch (spoonError) {
      console.warn("⚠️ Spoonacular failed, falling back to Foodoscope:", spoonError.message);
    }


    // 2️⃣ Fallback to Foodoscope if Spoonacular failed
    if (!recipe) {
      console.log("📡 Falling back to Foodoscope...");
      try {
        const recipesData = await foodoscopeService.fetchRecipesInfo(1, 10);

        if (recipesData.payload && recipesData.payload.data && recipesData.payload.data.length > 0) {
          const recipePayload = recipesData.payload.data[0];
          const recipeId = recipePayload.Recipe_id;

          // Fetch instructions
          let steps = [];
          if (recipeId) {
            try {
              const instrData = await foodoscopeService.fetchInstructions(recipeId);
              steps = (instrData.steps || []).map((text, index) => ({
                number: index + 1,
                text: typeof text === 'string' ? text : (text.step || text.instruction || "")
              }));
            } catch (e) {
              console.warn("Failed to fetch Foodoscope instructions:", e.message);
            }
          }

          recipe = {
            id: recipeId,
            title: recipePayload.Recipe_title || title,
            description: `Recipe from ${recipePayload.Region || recipePayload.Continent || "unknown region"}`,
            totalTime: Number(recipePayload.total_time) || 45,
            cookTime: Number(recipePayload.cook_time) || 30,
            prepTime: Number(recipePayload.prep_time) || 15,
            servings: Number(recipePayload.servings) || 4,
            calories: Number(recipePayload.Calories) || "N/A",
            ingredients: [
              { name: "Ingredients not available - Foodoscope API limitation", amount: "" }
            ],
            steps,
            source: "Foodoscope"
          };

          console.log("✅ Got recipe from Foodoscope with", steps.length, "steps (no ingredients available)");
        }
      } catch (foodError) {
        console.error("❌ Both APIs failed:", foodError.message);
        return res.status(502).json({
          message: "Failed to fetch recipe from all sources",
        });
      }
    }

    if (!recipe) {
      return res.status(404).json({
        message: "No recipes found",
      });
    }

    return res.status(200).json({
      message: "Recipe fetched successfully",
      recipe,
    });
  } catch (error) {
    console.error("Recipe route error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

/**
 * GET /api/recipe/search/:id
 */
router.get("/search/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await foodoscopeService.fetchRecipeById(id);
    res.json(data);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
});

/**
 * GET /api/recipe/cuisine/:region
 */
router.get("/cuisine/:region", async (req, res) => {
  try {
    const { region } = req.params;
    const filters = req.query; // Pass query params like continent, subRegion, min, max, etc.
    const data = await foodoscopeService.fetchRecipesByCuisine(region, filters);
    res.json(data);
  } catch (error) {
    console.error("Error fetching recipes by cuisine:", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

/**
 * GET /api/recipe/ingredients
 */
router.get("/ingredients", async (req, res) => {
  try {
    const { excludeIngredients, excludeCategories } = req.query;
    const data = await foodoscopeService.fetchRecipesByIngredientsAndCategory(excludeIngredients, excludeCategories);
    res.json(data);
  } catch (error) {
    console.error("Error fetching recipes by ingredients:", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

/**
 * GET /api/recipe/instructions/:id
 */
router.get("/instructions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await foodoscopeService.fetchInstructions(id);
    res.json(data);
  } catch (error) {
    console.error("Error fetching instructions:", error);
    res.status(500).json({ message: "Failed to fetch instructions" });
  }
});

module.exports = router;

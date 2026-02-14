const express = require("express");
const router = express.Router();

const foodoscopeService = require("../services/foodoscopeService");
const flavorDbService = require("../services/flavorDbService");
const apiConfig = require("../config/apiConfig");
const authMiddleware = require("../middleware/authmiddleware");

/**
 * POST /api/recipe/generate
 *
 * Actual behavior:
 * - Fetch a real recipe from Foodoscope (RecipeDB2)
 * - Fetch flavor data for one key ingredient from FlavorDB2
 * - Return a clean, frontend-friendly recipe object
 *
 * NO recipe generation happens here.
 */
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { title, dietaryConstraints, allergies, availableIngredients } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "title is required" });
    }

    // 1️⃣ Fetch recipes from Foodoscope using recipesinfo endpoint (has complete data)
    let recipePayload;
    try {
      // Fetch a batch of recipes (we'll search for matching title)
      const recipesData = await foodoscopeService.fetchRecipesInfo(1, 50);

      if (!recipesData.payload || !recipesData.payload.data || recipesData.payload.data.length === 0) {
        return res.status(404).json({
          message: "No recipes found",
        });
      }

      // Search for a recipe matching the title (case-insensitive)
      const searchTitle = title.trim().toLowerCase();
      recipePayload = recipesData.payload.data.find(r =>
        r.Recipe_title && r.Recipe_title.toLowerCase().includes(searchTitle)
      );

      // If no exact match, just use the first recipe
      if (!recipePayload) {
        console.log(`No exact match for "${title}", using first available recipe`);
        recipePayload = recipesData.payload.data[0];
      }

    } catch (e) {
      console.error("Foodoscope error:", e.message);
      return res.status(502).json({
        message: "Failed to fetch recipe from Foodoscope",
      });
    }

    if (!recipePayload) {
      return res.status(502).json({
        message: "Failed to fetch valid recipe data from Foodoscope",
      });
    }

    const recipeId = recipePayload.Recipe_id || recipePayload.recipe_id || recipePayload._id;

    // Extract instructions and ingredients from the payload
    let instructions = recipePayload.instructions || recipePayload.steps || [];
    let ingredients = recipePayload.ingredients || [];

    // 2️⃣ FlavorDB (optional, safe)
    let flavorData = null;

    if (
      apiConfig.flavorDb.baseUrl &&
      recipePayload.ingredients &&
      recipePayload.ingredients.length > 0
    ) {
      try {
        const rawIngredient =
          typeof recipePayload.ingredients[0] === "string"
            ? recipePayload.ingredients[0]
            : recipePayload.ingredients[0].name;

        const cleanIngredient = rawIngredient
          .toLowerCase()
          .trim();

        flavorData =
          await flavorDbService.getFlavorPairing(cleanIngredient);
      } catch (e) {
        console.warn("FlavorDB skipped:", e.message);
      }
    }

    // 3️⃣ Normalize response for frontend
    const recipe = {
      id: recipeId,
      title:
        recipePayload.Recipe_title ||
        recipePayload.title ||
        title,
      description: `Recipe from ${recipePayload.Region || recipePayload.Continent || "unknown region"}`,
      totalTime: Number(recipePayload.total_time) || 45,
      cookTime: Number(recipePayload.cook_time) || 30,
      prepTime: Number(recipePayload.prep_time) || 15,
      servings: Number(recipePayload.servings) || 4,
      calories: Number(recipePayload.Calories) || "N/A",
      ingredients: (ingredients || []).map((i) => ({
        name: typeof i === "string" ? i : (i.name || i.originalName || i.ingredient || "Unknown Ingredient"),
        amount: typeof i === "object" ? (i.quantity || i.amount || "") : ""
      })),
      steps: instructions.map((step, index) => ({
        number: index + 1,
        text: typeof step === 'string' ? step : (step.step || step.instruction || ""),
      })),
      flavorData, // optional, may be null
    };

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

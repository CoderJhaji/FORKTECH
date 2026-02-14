/**
 * Foodoscope Service – recipe-by-title
 */
const apiConfig = require("../config/apiConfig");

/**
 * Fetch recipe by title
 * @param {Object} params
 * @param {string} params.title
 */
/**
 * Fetch recipe by title
 * @param {Object} params
 * @param {string} params.title
 */
async function fetchBaseRecipe({ title }) {
  const { baseUrl, apiKey } = apiConfig.foodoscope;
  const endpoint = "/recipe2-api/recipe-bytitle/recipeByTitle";
  const searchUrl = `${baseUrl}${endpoint}?title=${encodeURIComponent(title)}`;

  console.log("📡 Foodoscope URL:", searchUrl);

  const response = await fetch(searchUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Foodoscope API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetch recipe by ID
 * @param {string} id
 */
async function fetchRecipeById(id) {
  const { baseUrl, apiKey } = apiConfig.foodoscope;
  const endpoint = `/recipe2-api/search-recipe/${id}`;
  const url = `${baseUrl}${endpoint}`;

  console.log("📡 Foodoscope URL (ID):", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Foodoscope API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetch recipes by cuisine
 * @param {string} region
 * @param {Object} filters
 */
async function fetchRecipesByCuisine(region, filters = {}) {
  const { baseUrl, apiKey } = apiConfig.foodoscope;
  // Default values as per user request example
  const continent = filters.continent || "Asian";
  const subRegion = filters.subRegion || "Indian";
  const minTime = filters.min || 30;
  const maxTime = filters.max || 60;
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 10;

  const queryParams = new URLSearchParams({
    continent,
    subRegion,
    field: "total_time",
    min: minTime,
    max: maxTime,
    page: page,
    page_size: pageSize
  });

  const endpoint = `/recipe2-api/recipes_cuisine/cuisine/${encodeURIComponent(region)}`;
  const url = `${baseUrl}${endpoint}?${queryParams.toString()}`;

  console.log("📡 Foodoscope URL (Cuisine):", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Foodoscope API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetch recipes by ingredients and categories
 * @param {string} excludeIngredients (comma separated)
 * @param {string} excludeCategories (comma separated)
 */
async function fetchRecipesByIngredientsAndCategory(excludeIngredients, excludeCategories) {
  const { baseUrl, apiKey } = apiConfig.foodoscope;
  const endpoint = "/recipe2-api/recipe/recipe-day/with-ingredients-categories";

  const queryParams = new URLSearchParams();
  if (excludeIngredients) queryParams.append("excludeIngredients", excludeIngredients);
  if (excludeCategories) queryParams.append("excludeCategories", excludeCategories);

  const url = `${baseUrl}${endpoint}?${queryParams.toString()}`;

  console.log("📡 Foodoscope URL (Ingredients/Category):", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Foodoscope API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetch recipe instructions
 * @param {string} recipeId
 */
async function fetchInstructions(recipeId) {
  const { baseUrl, apiKey } = apiConfig.foodoscope;
  const endpoint = `/recipe2-api/instructions/${recipeId}`;
  const url = `${baseUrl}${endpoint}`;

  console.log("📡 Foodoscope URL (Instructions):", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Foodoscope API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetch recipes with complete info (ingredients + instructions)
 * @param {number} page
 * @param {number} limit
 */
async function fetchRecipesInfo(page = 1, limit = 10) {
  const { baseUrl, apiKey } = apiConfig.foodoscope;
  const endpoint = `/recipe2-api/recipe/recipesinfo`;
  const url = `${baseUrl}${endpoint}?page=${page}&limit=${limit}`;

  console.log("📡 Foodoscope URL (Recipes Info):", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Foodoscope API error: ${response.status}`);
  }

  return await response.json();
}

module.exports = {
  fetchBaseRecipe,
  fetchRecipeById,
  fetchRecipesByCuisine,
  fetchRecipesByIngredientsAndCategory,
  fetchInstructions,
  fetchRecipesInfo
};

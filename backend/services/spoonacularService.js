const fetch = require("node-fetch");

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

/**
 * Search recipes by query
 * @param {string} query - Recipe search term
 * @param {number} number - Number of results (default 10)
 */
async function searchRecipes(query, number = 10) {
    const url = `${BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}&addRecipeInformation=true&fillIngredients=true&apiKey=${SPOONACULAR_API_KEY}`;

    console.log("📡 Spoonacular URL (Search):", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Spoonacular API error: ${response.status}`);
    }

    return await response.json();
}

/**
 * Get recipe information by ID
 * @param {number} recipeId - Spoonacular recipe ID
 */
async function getRecipeInformation(recipeId) {
    const url = `${BASE_URL}/recipes/${recipeId}/information?includeNutrition=false&apiKey=${SPOONACULAR_API_KEY}`;

    console.log("📡 Spoonacular URL (Recipe Info):", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Spoonacular API error: ${response.status}`);
    }

    return await response.json();
}

/**
 * Get analyzed recipe instructions
 * @param {number} recipeId - Spoonacular recipe ID
 */
async function getAnalyzedInstructions(recipeId) {
    const url = `${BASE_URL}/recipes/${recipeId}/analyzedInstructions?apiKey=${SPOONACULAR_API_KEY}`;

    console.log("📡 Spoonacular URL (Instructions):", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Spoonacular API error: ${response.status}`);
    }

    return await response.json();
}

module.exports = {
    searchRecipes,
    getRecipeInformation,
    getAnalyzedInstructions
};

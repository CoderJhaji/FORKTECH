/**
 * FlavorDB Service - Fetch flavor/compound data from FlavorDB API
 */
const apiConfig = require("../config/apiConfig");

/**
 * Get flavor pairings for an ingredient
 * @param {string} ingredient - Name of the ingredient
 * @returns {Promise<Object|null>} Flavor data or null if not found
 */
async function getFlavorPairing(ingredient) {
  const { baseUrl, apiKey } = apiConfig.flavorDb;

  if (!baseUrl || !apiKey) {
    throw new Error(
      "FlavorDB API configuration missing. Check FLAVORDB_BASE_URL and FLAVORDB_API_KEY"
    );
  }

  try {
    // START_HERE.md / Postman collection suggests /food/by-alias for pairings
    const searchUrl = `${baseUrl}/food/by-alias?food_pair=${encodeURIComponent(ingredient)}`;
    console.log("📡 Fetching from FlavorDB:", searchUrl);

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`FlavorDB API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.warn(`FlavorDB fetch failed: ${error.message}`);
    return null; // Fail gracefully
  }
}

module.exports = {
  getFlavorPairing,
};

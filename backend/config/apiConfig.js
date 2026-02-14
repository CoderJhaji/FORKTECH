/**
 * Central API configuration for Foodoscope (RecipeDB2), FlavorDB2, and Gemini.
 * DO NOT use fallback URLs.
 * If env vars are missing, the app should fail.
 */
require("dotenv").config();

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

/**
 * Gemini API — final stage ONLY.
 * Input: Foodoscope recipe + FlavorDB analysis/replacement candidates + dietary/calorie constraints.
 * Output: Final recipe text (title, description, ingredients, steps) for parsing.
 * Does NOT fetch recipes or bypass FlavorDB.
 */
const fetch = require("node-fetch");
const { gemini } = require("../config/apiConfig");

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = "gemini-1.5-flash";

function getApiKey() {
  const key = gemini.apiKey || process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not set");
  return key;
}

/**
 * Call Gemini generateContent with a single text prompt.
 * @param {string} prompt
 * @returns {Promise<string>} Generated text
 */
async function generateContent(prompt) {
  const key = getApiKey();
  const url = `${GEMINI_BASE}/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;
  
  console.log(`🤖 Calling Gemini API (model: ${MODEL})...`);
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 4096,
      },
    }),
  });
  
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }
  
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    console.error("Gemini response structure:", JSON.stringify(data, null, 2));
    throw new Error("Gemini returned no text content");
  }
  
  console.log(`✓ Gemini response received (${text.length} characters)`);
  return text;
}

/**
 * Build prompt for final recipe refinement.
 * @param {object} foodoscopeRecipe - Base recipe from Foodoscope (Recipe_title, Region, Calories, etc.)
 * @param {object} flavorData - { molecules: [...] } from FlavorDB
 * @param {string[]} replacementCandidates - FlavorDB-backed replacement suggestions
 * @param {{ constraints: string[], allergies: string[], calorieMax?: number }} opts
 */
function buildRefinementPrompt(foodoscopeRecipe, flavorData, replacementCandidates, opts) {
  const { constraints = [], allergies = [], calorieMax } = opts;
  const title = foodoscopeRecipe.Recipe_title || foodoscopeRecipe.title || "Recipe";
  const region = foodoscopeRecipe.Region || foodoscopeRecipe.Sub_region || "";
  const calories = foodoscopeRecipe.Calories || foodoscopeRecipe["Energy (kcal)"];

  let prompt = `You are a chef and food scientist. Given a base recipe from our database and FlavorDB analysis, produce ONE final recipe in the following JSON shape only (no markdown, no extra text):
{
  "title": "string",
  "description": "string (2-3 sentences)",
  "totalTime": number (minutes),
  "servings": number,
  "ingredients": [ { "name": "string", "amount": "string", "note": "optional string", "isRegenerated": false } ],
  "steps": [ { "id": number, "instruction": "string", "duration": number or null, "isCritical": boolean } ]
}

Base recipe: "${title}". Region: ${region}. Calories per serving: ${calories || "unknown"}.
`;

  if (flavorData.molecules && flavorData.molecules.length > 0) {
    prompt += `\nFlavorDB molecule context (use for flavor-accurate substitutions): ${JSON.stringify(flavorData.molecules.slice(0, 10))}.\n`;
  }
  if (replacementCandidates && replacementCandidates.length > 0) {
    prompt += `\nFlavorDB-compatible replacement candidates: ${JSON.stringify(replacementCandidates.slice(0, 15))}.\n`;
  }
  if (constraints.length) {
    prompt += `\nDietary constraints (MUST satisfy): ${constraints.join(", ")}.\n`;
  }
  if (allergies.length) {
    prompt += `\nAllergies (MUST exclude): ${allergies.join(", ")}.\n`;
  }
  if (calorieMax) {
    prompt += `\nKeep total recipe calories per serving under ${calorieMax} if possible.\n`;
  }

  prompt += `\nOutput ONLY valid JSON for the final improved recipe. Preserve cultural and regional authenticity. Use FlavorDB data for substitutions that keep aroma and taste. No extra commentary.`;

  return prompt;
}

/**
 * Parse JSON from Gemini response (strip markdown code blocks if present).
 * @param {string} text
 * @returns {object}
 */
function parseRecipeJson(text) {
  let raw = text.trim();
  
  // Strip markdown code blocks if present
  const codeBlock = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) {
    raw = codeBlock[1].trim();
    console.log("✓ Extracted JSON from markdown code block");
  }
  
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:");
    console.error("Raw text:", raw.substring(0, 500));
    throw new Error(`Invalid JSON from Gemini: ${e.message}`);
  }
}

/**
 * Final refinement: Foodoscope recipe + FlavorDB data → Gemini → structured recipe.
 * @param {object} foodoscopeRecipe - Base recipe payload from Foodoscope
 * @param {object} flavorData - From FlavorDB getFlavorDataForIngredients
 * @param {object[]} replacementCandidates - From FlavorDB getReplacementCandidates (per ingredient or aggregated)
 * @param {{ constraints: string[], allergies: string[], calorieMax?: number }} opts
 * @returns {Promise<{ title, description, totalTime, servings, ingredients, steps }>}
 */
async function refineRecipe(foodoscopeRecipe, flavorData, replacementCandidates, opts) {
  const prompt = buildRefinementPrompt(
    foodoscopeRecipe,
    flavorData || { molecules: [] },
    replacementCandidates || [],
    opts
  );
  const text = await generateContent(prompt);
  const parsed = parseRecipeJson(text);

  return {
    title: parsed.title || foodoscopeRecipe.Recipe_title,
    description: parsed.description || "",
    totalTime: parseInt(parsed.totalTime, 10) || parseInt(foodoscopeRecipe.total_time, 10) || 45,
    servings: parseInt(parsed.servings, 10) || parseInt(foodoscopeRecipe.servings, 10) || 4,
    ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : [],
    steps: Array.isArray(parsed.steps) ? parsed.steps : [],
  };
}

module.exports = {
  generateContent,
  buildRefinementPrompt,
  parseRecipeJson,
  refineRecipe,
};

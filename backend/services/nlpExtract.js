/**
 * Lightweight NLP layer: extract and normalize user inputs for recipe generation.
 * Handles: ingredients, dietary constraints, cuisine/region, calorie targets, allergies.
 * No frontend changes; used only in backend pipeline.
 */

const DIETARY_KEYWORDS = {
  vegan: ["vegan", "no meat", "plant-based", "plant based"],
  vegetarian: ["vegetarian", "veg"],
  keto: ["keto", "low-carb", "low carb", "ketogenic"],
  "dairy-free": ["dairy-free", "dairy free", "no dairy", "lactose free", "lactose-free"],
  "gluten-free": ["gluten-free", "gluten free", "no gluten"],
  jain: ["jain", "no onion", "no garlic", "no root vegetables"],
  "nut-free": ["nut-free", "nut free", "no nuts"],
  "low-fat": ["low fat", "low-fat", "light"],
  creamy: ["creamy", "rich"],
};

const CALORIE_PATTERNS = [
  { pattern: /under\s+(\d+)\s*calories?/i, type: "max" },
  { pattern: /(\d+)\s*calories?\s*or\s*less/i, type: "max" },
  { pattern: /under\s+(\d+)\s*kcal/i, type: "max" },
  { pattern: /max\s*(\d+)\s*cal/i, type: "max" },
  { pattern: /(\d+)\s*-\s*(\d+)\s*calories?/i, type: "range" },
  { pattern: /(\d+)\s*to\s*(\d+)\s*cal/i, type: "range" },
  { pattern: /between\s*(\d+)\s*and\s*(\d+)\s*cal/i, type: "range" },
];

const REGION_CUISINE_MAP = {
  "north india": "Indian Subcontinent",
  "south india": "Indian Subcontinent",
  indian: "Indian Subcontinent",
  "middle east": "Middle Eastern",
  egyptian: "Middle Eastern",
  mediterranean: "Mediterranean",
  european: "European",
  italian: "Italian",
  mexican: "Mexican",
  asian: "Asian",
  african: "African",
  "latin american": "Latin American",
};

/**
 * Normalize and dedupe dietary constraints from free text + explicit list.
 * @param {string} dishNameOrPrompt - Raw input (e.g. "butter chicken no dairy but creamy under 500 calories")
 * @param {string[]} explicitConstraints - From UI (e.g. ["Vegan", "Dairy-Free"])
 * @returns {{ constraints: string[], calorieMax?: number, calorieMin?: number, regionHint?: string }}
 */
function extractConstraints(dishNameOrPrompt, explicitConstraints = []) {
  const text = (dishNameOrPrompt || "").toLowerCase();
  const constraints = new Set();

  explicitConstraints.forEach((c) => constraints.add(c.trim()));

  for (const [tag, keywords] of Object.entries(DIETARY_KEYWORDS)) {
    if (keywords.some((k) => text.includes(k))) {
      constraints.add(tag);
    }
  }

  let calorieMin;
  let calorieMax;
  for (const { pattern, type } of CALORIE_PATTERNS) {
    const m = text.match(pattern);
    if (m) {
      if (type === "max") calorieMax = parseInt(m[1], 10);
      if (type === "range") {
        calorieMin = parseInt(m[1], 10);
        calorieMax = parseInt(m[2], 10);
      }
      break;
    }
  }

  let regionHint;
  for (const [key, region] of Object.entries(REGION_CUISINE_MAP)) {
    if (text.includes(key)) {
      regionHint = region;
      break;
    }
  }

  return {
    constraints: Array.from(constraints),
    calorieMax: calorieMax || undefined,
    calorieMin: calorieMin || undefined,
    regionHint: regionHint || undefined,
  };
}

/**
 * Extract primary dish name (strip constraint/calorie phrases for search).
 * @param {string} input
 * @returns {string}
 */
function extractDishName(input) {
  if (!input || !input.trim()) return "";
  let name = input.trim();
  name = name.replace(/\b(under|max|less than)\s+\d+\s*(calories?|kcal)?/gi, "").trim();
  name = name.replace(/\b(vegan|vegetarian|keto|dairy-free|gluten-free|no dairy|creamy)\b/gi, "").trim();
  name = name.replace(/\s+/g, " ").trim();
  return name || input.trim();
}
/**
 * Normalize ingredients list: trim, lowercase for matching, dedupe.
 * @param {string[]} ingredients
 * @returns {string[]}
 */
function normalizeIngredients(ingredients = []) {
  const seen = new Set();
  return ingredients
    .map((i) => (typeof i === "string" ? i.trim() : ""))
    .filter((i) => i && !seen.has(i.toLowerCase()) && (seen.add(i.toLowerCase()), true));
}

/**
 * Full extraction from request body (dishName + dietaryConstraints + allergies + availableIngredients).
 * @param {{ dishName?: string, dietaryConstraints?: string[], allergies?: string[], availableIngredients?: string[] }} body
 * @returns {{ dishName: string, constraints: string[], allergies: string[], availableIngredients: string[], calorieMax?: number, calorieMin?: number, regionHint?: string }}
 */
function extractFromRequest(body = {}) {
  const dishName = extractDishName(body.dishName || "");
  const { constraints, calorieMax, calorieMin, regionHint } = extractConstraints(
    body.dishName || "",
    body.dietaryConstraints || []
  );
  const allergies = (body.allergies || []).map((a) => (typeof a === "string" ? a.trim() : "")).filter(Boolean);
  const availableIngredients = normalizeIngredients(body.availableIngredients || []);

  return {
    dishName,
    constraints,
    allergies,
    availableIngredients,
    calorieMax,
    calorieMin,
    regionHint,
  };
}

module.exports = {
  extractFromRequest,
  extractDishName,
  extractConstraints,
  normalizeIngredients,
  DIETARY_KEYWORDS,
  REGION_CUISINE_MAP,
};

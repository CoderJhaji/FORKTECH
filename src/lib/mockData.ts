import { Recipe, Region, DietaryConstraint } from "./types";

export const regions: Region[] = [
  {
    id: "north-india",
    name: "North India",
    description: "Rich, creamy curries & tandoor specialties",
    icon: "🍛",
  },
  {
    id: "south-india",
    name: "South India",
    description: "Coconut-based, tangy & aromatic dishes",
    icon: "🥥",
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    description: "Olive oil, herbs & fresh ingredients",
    icon: "🫒",
  },
  {
    id: "east-asian",
    name: "East Asian",
    description: "Umami-rich, balanced & fermented flavors",
    icon: "🥢",
  },
  {
    id: "middle-eastern",
    name: "Middle Eastern",
    description: "Aromatic spices & hearty grains",
    icon: "🧆",
  },
  {
    id: "latin-american",
    name: "Latin American",
    description: "Bold, vibrant & spice-forward cuisine",
    icon: "🌶️",
  },
];

export const dietaryConstraints: DietaryConstraint[] = [
  { id: "vegan", name: "Vegan", icon: "🌱" },
  { id: "vegetarian", name: "Vegetarian", icon: "🥬" },
  { id: "jain", name: "Jain", icon: "☸️" },
  { id: "gluten-free", name: "Gluten-Free", icon: "🌾" },
  { id: "keto", name: "Keto", icon: "🥑" },
  { id: "low-fat", name: "Low Fat", icon: "💧" },
  { id: "dairy-free", name: "Dairy-Free", icon: "🥛" },
  { id: "nut-free", name: "Nut-Free", icon: "🥜" },
];

export const sampleRecipes: Recipe[] = [];

export const processingSteps = [
  { id: 1, text: "Fetching Base Recipe...", icon: "📖" },
  { id: 2, text: "Analyzing Cultural Constraints...", icon: "🌍" },
  { id: 3, text: "Mapping Flavor Compounds...", icon: "🧪" },
  { id: 4, text: "Optimizing Ingredient Substitutions...", icon: "🔄" },
  { id: 5, text: "Finalizing Instructions...", icon: "✨" },
];
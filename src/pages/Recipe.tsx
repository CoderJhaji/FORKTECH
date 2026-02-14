import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Users,
  Play,
  ChefHat,
  Sparkles,
  RefreshCw,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IngredientList } from "@/components/ui/IngredientList";
import { SmartKitchenMode } from "@/components/ui/SmartKitchenMode";
import { FlavorChart } from "@/components/ui/FlavorChart";
import { CookingStep } from "@/lib/types";
import { useParams, Link, useNavigate } from "react-router-dom";
import { recipeAPI } from "@/lib/api";

/** Parse duration in minutes from step text (e.g. "for 10 minutes", "5 min"). */
function parseDurationFromText(text: string): number | undefined {
  const forMatch = text.match(/(?:for|about)\s+(\d+)\s*min(?:ute)?s?/i);
  if (forMatch) return parseInt(forMatch[1], 10);
  const minMatch = text.match(/(\d+)\s*min(?:ute)?s?/i);
  if (minMatch) return parseInt(minMatch[1], 10);
  return undefined;
}

/** Normalize API steps ({ number, text }) or existing CookingStep[] to CookingStep[]. */
function normalizeSteps(steps: any[] | undefined): CookingStep[] {
  if (!steps?.length) return [];
  return steps.map((step, index) => {
    if (step.instruction != null) {
      return {
        id: step.id ?? index + 1,
        instruction: step.instruction,
        duration: step.duration,
        isCritical: step.isCritical ?? false,
      };
    }
    const text = step.text ?? step.step ?? "";
    return {
      id: step.number ?? index + 1,
      instruction: text,
      duration: parseDurationFromText(text),
      isCritical: false,
    };
  });
}

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSmartKitchenMode, setIsSmartKitchenMode] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      if (id === "generated") {
        const stored = sessionStorage.getItem("generatedRecipe");
        if (!stored) {
          navigate("/dashboard");
          return;
        }
        try {
          const parsed = JSON.parse(stored);
          setRecipe(parsed);
        } catch (err) {
          console.error("Failed to parse recipe:", err);
          navigate("/dashboard");
        }
        setLoading(false);
        return;
      }

      try {
        // Fetch recipe details
        // Note: The API response structure for search-recipe might need mapping
        const response: any = await recipeAPI.getRecipeById(id, "");
        if (response) {

          // Try to fetch instructions separately if needed
          let instructions = [];
          try {
            const instrResponse = await recipeAPI.getInstructions(id, "");
            // instrResponse might be { instructions: [...] } or just [...]
            instructions = Array.isArray(instrResponse) ? instrResponse : (instrResponse.instructions || []);
          } catch (e) {
            console.log("No instructions found or failed to fetch", e);
          }

          // Map API response to UI model
          // Assuming response is the raw JSON from Foodoscope
          const r = response.recipe || response; // Handle if backend allows direct pass-through

          const mappedRecipe = {
            id: r.recipe_id || r._id || id,
            title: r.Recipe_title || r.title,
            description: r.Description || `A recipe for ${r.Recipe_title || r.title}`,
            matchScore: 90, // mock
            region: r.Sub_region || r.Region || "Unknown",
            dietaryTags: [],
            totalTime: Number(r.total_time) || 45,
            difficulty: "Medium",
            servings: Number(r.servings) || 4,
            flavorProfile: null,
            ingredients: (r.ingredients || []).map((i: any) => ({
              name: i.name || i, // ingredients might be strings or objects
              amount: i.quantity || "some"
            })),
            steps: instructions.map((text: string, idx: number) => ({
              number: idx + 1,
              text
            }))
          };
          setRecipe(mappedRecipe);
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const cookingSteps = useMemo(() => normalizeSteps(recipe?.steps), [recipe?.steps]);

  if (loading || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading recipe...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnimatePresence>
        {isSmartKitchenMode && cookingSteps.length > 0 && (
          <SmartKitchenMode
            steps={cookingSteps}
            onClose={() => setIsSmartKitchenMode(false)}
          />
        )}
      </AnimatePresence>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">

          {/* Back */}
          <Link
            to={id === "generated" ? "/dashboard" : "/"}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {id === "generated" ? "Back to Dashboard" : "Back to Home"}
          </Link>

          {/* Title & region */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div>
              {recipe.region && (
                <p className="text-muted-foreground text-sm mb-1">{recipe.region}</p>
              )}
              <h1 className="text-4xl font-bold">
                {recipe.title}
              </h1>
            </div>
            {recipe.matchScore != null && (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                <Sparkles className="h-4 w-4" />
                {recipe.matchScore}% Flavor Match
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-4">
            {recipe.description}
          </p>

          {/* Dietary tags */}
          {recipe.dietaryTags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.dietaryTags.map((tag) => (
                <span key={tag} className="flavor-badge">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {recipe.totalTime} minutes
            </div>
            {recipe.difficulty && (
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                {recipe.difficulty}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {recipe.servings} servings
            </div>
          </div>

          {/* Ingredients + Flavor Profile */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Ingredients */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              {(recipe.ingredients || []).some((i: any) => i.isRegenerated) && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/10 text-secondary text-sm mb-4">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  Regenerated ingredients are highlighted.
                </div>
              )}
              <IngredientList ingredients={recipe.ingredients || []} />
            </div>

            {/* Flavor Profile (featured recipes) */}
            {recipe.flavorProfile && (
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4">Flavor Profile</h2>
                <FlavorChart profile={recipe.flavorProfile} />
              </div>
            )}
          </div>

          {/* Smart Kitchen Mode + Adapt + Instructions */}
          <div className="space-y-8">
            {/* Smart Kitchen Mode */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-2">Smart Kitchen Mode</h2>
              <p className="text-muted-foreground mb-4">
                Fullscreen, step-by-step guidance with timers.
              </p>
              <Button
                onClick={() => setIsSmartKitchenMode(true)}
                className="btn-hero"
                disabled={!cookingSteps.length}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Cooking
              </Button>
            </div>

            {/* Adapt this recipe (for featured recipes) */}
            {id !== "generated" && (
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-2">Adapt this recipe</h2>
                <p className="text-muted-foreground mb-4">
                  Missing a few ingredients or want to try a different twist? Tell us what you don't have or start over with a new dish.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/dashboard">
                    <Button variant="outline" className="rounded-full">
                      <Pencil className="h-4 w-4 mr-2" />
                      Modify this recipe
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button className="btn-hero rounded-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate another recipe
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-6">Instructions</h2>
              <div className="space-y-4">
                {recipe.steps?.map((step: any, index: number) => {
                  const duration = step.duration ?? parseDurationFromText(step.text ?? step.instruction ?? "");
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4"
                    >
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                        {step.number ?? step.id ?? index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p>{step.text ?? step.instruction}</p>
                        {duration != null && (
                          <div className="flex items-center gap-1.5 mt-2 text-muted-foreground text-sm">
                            <Clock className="h-4 w-4" />
                            {duration} min
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recipe;

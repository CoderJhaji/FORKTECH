import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  ChefHat,
  Users,
  Sparkles,
  Play,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FlavorChart } from "@/components/ui/FlavorChart";
import { IngredientList } from "@/components/ui/IngredientList";
import { SmartKitchenMode } from "@/components/ui/SmartKitchenMode";
import { sampleRecipes } from "@/lib/mockData";
import { Input } from "@/components/ui/input";

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSmartKitchenMode, setIsSmartKitchenMode] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [missingInput, setMissingInput] = useState("");
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);

  const recipe = sampleRecipes.find((r) => r.id === id) || sampleRecipes[0];

  const decoratedIngredients = recipe.ingredients.map((ingredient) => {
    if (!missingIngredients.includes(ingredient.name)) return ingredient;
    const extraNote =
      "You marked this as unavailable – we’ll look for a substitute.";
    return {
      ...ingredient,
      note: ingredient.note ? `${ingredient.note} • ${extraNote}` : extraNote,
    };
  });

  const addMissingIngredient = () => {
    const value = missingInput.trim();
    if (!value) return;
    if (!missingIngredients.includes(value)) {
      setMissingIngredients((prev) => [...prev, value]);
    }
    setMissingInput("");
    setIsModifyOpen(true);
  };

  const removeMissingIngredient = (value: string) => {
    setMissingIngredients((prev) => prev.filter((v) => v !== value));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <AnimatePresence>
        {isSmartKitchenMode && (
          <SmartKitchenMode
            steps={recipe.steps}
            onClose={() => setIsSmartKitchenMode(false)}
          />
        )}
      </AnimatePresence>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-2">
                  {recipe.title}
                </h1>
                <p className="text-muted-foreground">{recipe.region}</p>
              </div>
              <span className="match-badge text-lg px-5 py-2.5">
                <Sparkles className="h-5 w-5 mr-1" />
                {recipe.matchScore}% Flavor Match
              </span>
            </div>

            <p className="text-muted-foreground max-w-3xl mb-6">{recipe.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.dietaryTags.map((tag) => (
                <span key={tag} className="flavor-badge">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{recipe.totalTime} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                <span>{recipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-6 sticky top-28">
                <h2 className="font-heading text-2xl font-bold mb-6">Ingredients</h2>

                <div className="flex items-center gap-2 text-sm text-secondary mb-4 p-3 rounded-2xl bg-secondary/10">
                  <Sparkles className="h-4 w-4" />
                  <span>Regenerated ingredients are highlighted</span>
                </div>

                <IngredientList ingredients={decoratedIngredients} />
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Flavor Chart */}
              <div className="glass-card p-6">
                <h2 className="font-heading text-2xl font-bold mb-4">Flavor Profile</h2>
                <FlavorChart profile={recipe.flavorProfile} />
              </div>

              {/* Start Cooking FAB-like button */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-1">Smart Kitchen Mode</h3>
                    <p className="text-muted-foreground text-sm">
                      Fullscreen, step-by-step guidance with timers
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setIsSmartKitchenMode(true)}
                      className="btn-hero"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Cooking
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Modify / Regenerate options */}
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-1">
                      Adapt this recipe
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Missing a few ingredients or want to try a different twist?
                      Tell us what you don&apos;t have or start over with a new dish.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setIsModifyOpen((open) => !open)}
                    >
                      Modify this recipe
                    </Button>
                    <Button
                      className="btn-hero rounded-full"
                      onClick={() => navigate("/dashboard")}
                    >
                      Regenerate another recipe
                    </Button>
                  </div>
                </div>

                {isModifyOpen && (
                  <div className="mt-5 space-y-3">
                    <label className="block text-sm font-semibold">
                      Ingredients you don&apos;t have
                    </label>
                    <p className="text-xs text-muted-foreground mb-1">
                      Type ingredients from the list above that aren&apos;t in your
                      kitchen. We&apos;ll highlight them and plan substitutions.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value={missingInput}
                        onChange={(e) => setMissingInput(e.target.value)}
                        placeholder="e.g., Cashew Cream, Soy Curls..."
                        className="flex-1 rounded-full"
                        onKeyDown={(e) => e.key === "Enter" && addMissingIngredient()}
                      />
                      <Button
                        variant="outline"
                        className="rounded-full px-6"
                        onClick={addMissingIngredient}
                      >
                        Add
                      </Button>
                    </div>
                    {missingIngredients.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {missingIngredients.map((item) => (
                          <button
                            type="button"
                            key={item}
                            onClick={() => removeMissingIngredient(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium"
                          >
                            <span>{item}</span>
                            <span aria-hidden="true">×</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cooking Steps */}
              <div className="glass-card p-6">
                <h2 className="font-heading text-2xl font-bold mb-6">Instructions</h2>
                <div className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={step.isCritical ? "step-critical" : "py-3"}
                    >
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                          {step.id}
                        </span>
                        <div className="flex-1">
                          <p className="text-foreground">{step.instruction}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            {step.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {step.duration} min
                              </span>
                            )}
                            {step.isCritical && (
                              <span className="flex items-center gap-1 text-primary">
                                <AlertCircle className="h-4 w-4" />
                                Critical Step
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Start Cooking FAB on mobile */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="fixed bottom-6 right-6 lg:hidden z-30"
      >
        <Button
          onClick={() => setIsSmartKitchenMode(true)}
          className="btn-hero rounded-full w-16 h-16 p-0 shadow-glow"
        >
          <Play className="h-7 w-7" />
        </Button>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Recipe;

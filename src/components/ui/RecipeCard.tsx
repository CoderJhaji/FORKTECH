 import { Recipe } from "@/lib/types";
 import { motion } from "framer-motion";
 import { Clock, ChefHat, Users, ArrowRight } from "lucide-react";
 import { Link } from "react-router-dom";
 
 interface RecipeCardProps {
   recipe: Recipe;
   index?: number;
 }
 
 export function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: index * 0.1 }}
       className="glass-card group overflow-hidden"
     >
       <div className="p-6">
         <div className="flex items-start justify-between mb-4">
           <div>
             <h3 className="text-xl font-serif font-semibold mb-1">{recipe.title}</h3>
             <p className="text-sm text-muted-foreground">{recipe.region}</p>
           </div>
           <span className="match-badge">{recipe.matchScore}% Match</span>
         </div>
 
         <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
           {recipe.description}
         </p>
 
         <div className="flex flex-wrap gap-2 mb-4">
           {recipe.dietaryTags.map((tag) => (
             <span key={tag} className="flavor-badge">
               {tag}
             </span>
           ))}
         </div>
 
         <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
           <div className="flex items-center gap-1.5">
             <Clock className="h-4 w-4" />
             <span>{recipe.totalTime} min</span>
           </div>
           <div className="flex items-center gap-1.5">
             <ChefHat className="h-4 w-4" />
             <span>{recipe.difficulty}</span>
           </div>
           <div className="flex items-center gap-1.5">
             <Users className="h-4 w-4" />
             <span>{recipe.servings} servings</span>
           </div>
         </div>
 
         <Link
           to={`/recipe/${recipe.id}`}
           className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
         >
           View Recipe
           <ArrowRight className="h-4 w-4" />
         </Link>
       </div>
     </motion.div>
   );
 }
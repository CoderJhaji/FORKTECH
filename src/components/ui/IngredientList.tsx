 import { Ingredient } from "@/lib/types";
 import { Sparkles } from "lucide-react";
 import { motion } from "framer-motion";
 
 interface IngredientListProps {
   ingredients: Ingredient[];
 }
 
 export function IngredientList({ ingredients }: IngredientListProps) {
   return (
     <div className="space-y-2">
       {ingredients.map((ingredient, index) => (
         <motion.div
           key={ingredient.name}
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: index * 0.05 }}
           className={`ingredient-item ${ingredient.isRegenerated ? "ingredient-regenerated" : ""}`}
         >
           <div className="flex items-center gap-2">
             {ingredient.isRegenerated && (
               <Sparkles className="h-4 w-4 text-secondary flex-shrink-0" />
             )}
             <span className="font-medium">{ingredient.name}</span>
           </div>
           <span className="text-muted-foreground text-sm">{ingredient.amount}</span>
           {ingredient.note && (
             <p className="text-xs text-secondary mt-1 col-span-2 ml-6">
               {ingredient.note}
             </p>
           )}
         </motion.div>
       ))}
     </div>
   );
 }
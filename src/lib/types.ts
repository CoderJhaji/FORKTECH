 export interface FlavorProfile {
   sweet: number;
   salty: number;
   sour: number;
   bitter: number;
   umami: number;
   spicy: number;
 }
 
 export interface Ingredient {
   name: string;
   amount: string;
   note?: string;
   isRegenerated?: boolean;
 }
 
 export interface CookingStep {
   id: number;
   instruction: string;
   duration?: number;
   isCritical: boolean;
 }
 
 export interface Recipe {
   id: string;
   title: string;
   description: string;
   matchScore: number;
   region: string;
   dietaryTags: string[];
   flavorProfile: FlavorProfile;
   ingredients: Ingredient[];
   steps: CookingStep[];
   totalTime: number;
   difficulty: "Easy" | "Medium" | "Hard";
   servings: number;
   imageUrl?: string;
 }
 
 export interface Region {
   id: string;
   name: string;
   description: string;
   icon: string;
 }
 
 export interface DietaryConstraint {
   id: string;
   name: string;
   icon: string;
 }
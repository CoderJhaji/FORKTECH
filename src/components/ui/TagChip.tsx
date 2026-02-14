 import { motion } from "framer-motion";
 import { Check } from "lucide-react";
 
 interface TagChipProps {
   label: string;
   icon?: string;
   active: boolean;
   onToggle: () => void;
 }
 
 export function TagChip({ label, icon, active, onToggle }: TagChipProps) {
   return (
     <motion.button
       whileTap={{ scale: 0.95 }}
       onClick={onToggle}
       className={`tag-chip ${active ? "active" : "inactive"}`}
     >
       {icon && <span>{icon}</span>}
       <span>{label}</span>
       {active && (
         <motion.span
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
         >
           <Check className="h-3.5 w-3.5" />
         </motion.span>
       )}
     </motion.button>
   );
 }
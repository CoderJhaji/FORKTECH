 import { Region } from "@/lib/types";
 import { motion } from "framer-motion";
 import { Check } from "lucide-react";
 
 interface RegionCardProps {
   region: Region;
   selected: boolean;
   onSelect: (id: string) => void;
   index?: number;
 }
 
 export function RegionCard({ region, selected, onSelect, index = 0 }: RegionCardProps) {
   return (
     <motion.button
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: index * 0.05 }}
       onClick={() => onSelect(region.id)}
       className={`region-card text-left w-full ${selected ? "selected" : ""}`}
     >
       <div className="flex items-start justify-between">
         <span className="text-3xl mb-2">{region.icon}</span>
         {selected && (
           <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
           >
             <Check className="h-4 w-4 text-primary-foreground" />
           </motion.div>
         )}
       </div>
       <h3 className="font-serif font-semibold text-lg mb-1">{region.name}</h3>
       <p className="text-sm text-muted-foreground">{region.description}</p>
     </motion.button>
   );
 }
 import { motion, AnimatePresence } from "framer-motion";
 import { processingSteps } from "@/lib/mockData";
 import { useEffect, useState } from "react";
 
 interface ProcessingLoaderProps {
   onComplete: () => void;
 }
 
 export function ProcessingLoader({ onComplete }: ProcessingLoaderProps) {
   const [currentStep, setCurrentStep] = useState(0);
 
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentStep((prev) => {
         if (prev >= processingSteps.length - 1) {
           clearInterval(interval);
           setTimeout(onComplete, 800);
           return prev;
         }
         return prev + 1;
       });
     }, 1200);
 
     return () => clearInterval(interval);
   }, [onComplete]);
 
   return (
     <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
       <div className="max-w-md w-full px-6">
         {/* Molecular Animation */}
         <div className="relative w-32 h-32 mx-auto mb-8">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0"
           >
             {[0, 60, 120, 180, 240, 300].map((angle, i) => (
               <motion.div
                 key={angle}
                 className="absolute w-4 h-4 rounded-full bg-primary"
                 style={{
                   left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 48}px - 8px)`,
                   top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 48}px - 8px)`,
                 }}
                 animate={{
                   scale: [1, 1.3, 1],
                   opacity: [0.6, 1, 0.6],
                 }}
                 transition={{
                   duration: 1.5,
                   repeat: Infinity,
                   delay: i * 0.2,
                 }}
               />
             ))}
           </motion.div>
           <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-6 h-6 rounded-full bg-secondary"
             />
           </div>
         </div>
 
         {/* Steps */}
         <div className="space-y-3">
           {processingSteps.map((step, index) => (
             <motion.div
               key={step.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{
                 opacity: index <= currentStep ? 1 : 0.3,
                 x: 0,
               }}
               transition={{ delay: index * 0.1 }}
               className="flex items-center gap-3"
             >
               <span className="text-xl">{step.icon}</span>
               <span
                 className={`font-medium ${
                   index === currentStep ? "text-primary" : "text-muted-foreground"
                 }`}
               >
                 {step.text}
               </span>
               {index < currentStep && (
                 <motion.span
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="ml-auto text-secondary"
                 >
                   ✓
                 </motion.span>
               )}
               {index === currentStep && (
                 <motion.div
                   animate={{ opacity: [1, 0.3, 1] }}
                   transition={{ duration: 1, repeat: Infinity }}
                   className="ml-auto w-2 h-2 rounded-full bg-primary"
                 />
               )}
             </motion.div>
           ))}
         </div>
       </div>
     </div>
   );
 }
 import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
 import { FlavorProfile } from "@/lib/types";
 
 interface FlavorChartProps {
   profile: FlavorProfile;
   className?: string;
 }
 
 export function FlavorChart({ profile, className }: FlavorChartProps) {
   const data = [
     { flavor: "Sweet", value: profile.sweet, fullMark: 100 },
     { flavor: "Salty", value: profile.salty, fullMark: 100 },
     { flavor: "Sour", value: profile.sour, fullMark: 100 },
     { flavor: "Bitter", value: profile.bitter, fullMark: 100 },
     { flavor: "Umami", value: profile.umami, fullMark: 100 },
     { flavor: "Spicy", value: profile.spicy, fullMark: 100 },
   ];
 
   return (
     <div className={className}>
       <ResponsiveContainer width="100%" height={280}>
         <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
           <PolarGrid 
             stroke="hsl(var(--border))" 
             strokeOpacity={0.5}
           />
           <PolarAngleAxis 
             dataKey="flavor" 
             tick={{ 
               fill: "hsl(var(--foreground))", 
               fontSize: 12,
               fontWeight: 500
             }}
           />
           <PolarRadiusAxis 
             angle={30} 
             domain={[0, 100]} 
             tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
             axisLine={false}
           />
           <Radar
             name="Flavor"
             dataKey="value"
             stroke="hsl(var(--primary))"
             fill="hsl(var(--primary))"
             fillOpacity={0.3}
             strokeWidth={2}
           />
         </RadarChart>
       </ResponsiveContainer>
     </div>
   );
 }
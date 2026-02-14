import { motion } from "framer-motion";
import { ArrowRight, Database, Beaker, Atom, FlaskConical, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const molecularSubstitutions = [
  {
    original: "Heavy Cream",
    substitute: "Cashew Cream",
    reason: "Similar fat content and emulsifying proteins create identical mouthfeel",
    compounds: ["Oleic Acid", "Palmitic Acid", "Lecithin Analogs"],
  },
  {
    original: "Chicken",
    substitute: "Soy Curls",
    reason: "Fibrous texture matches myofibril structure when rehydrated properly",
    compounds: ["Glutamic Acid", "Inosinic Acid", "Protein Matrices"],
  },
  {
    original: "Butter",
    substitute: "Coconut Oil",
    reason: "Matching saturated fat ratios preserve flavor-carrying capacity",
    compounds: ["Lauric Acid", "Myristic Acid", "Butyric Analogs"],
  },
  {
    original: "Onion & Garlic",
    substitute: "Asafoetida (Hing)",
    reason: "Sulfur compounds create similar aromatic profile without the root vegetables",
    compounds: ["Disulfides", "Volatile Sulfides", "Allyl Compounds"],
  },
];

const Science = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <FlaskConical className="h-4 w-4" />
                The Science of Flavor
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
                How We Regenerate Recipes
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Understanding the molecular foundations of taste allows us to rebuild dishes
                while preserving what makes them delicious.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Database Architecture */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
                Our Dual-Database Architecture
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Two specialized databases work together to analyze and reconstruct recipes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3">RecipeDB</h3>
                <p className="text-muted-foreground mb-6">
                  Our curated collection of 50,000+ authentic regional recipes, each annotated
                  with complete flavor profiles, cultural context, and technique requirements.
                </p>
                <ul className="space-y-3">
                  {["Authentic recipes from 12 major cuisine regions", "Complete flavor profiles for each dish", "Cultural and dietary tradition annotations"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-secondary">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="w-16 h-16 rounded-3xl bg-secondary/15 flex items-center justify-center mb-6">
                  <Beaker className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3">FlavorDB</h3>
                <p className="text-muted-foreground mb-6">
                  A molecular database mapping 25,000+ ingredients by their flavor compounds,
                  enabling precise substitutions based on chemical similarity.
                </p>
                <ul className="space-y-3">
                  {["25,000+ ingredients with molecular profiles", "Flavor compound similarity matching", "Texture and mouthfeel correlations"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-secondary">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Molecular Substitutions */}
        <section className="py-20 bg-accent/30 rounded-[3rem] mx-4">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
                Molecular Substitution Examples
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See how we match ingredients based on their chemical flavor profiles.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {molecularSubstitutions.map((sub, index) => (
                <motion.div
                  key={sub.original}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 text-center">
                      <span className="text-muted-foreground text-xs font-medium">Original</span>
                      <p className="font-heading text-lg font-bold">{sub.original}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-secondary text-xs font-semibold">Substitute</span>
                      <p className="font-heading text-lg font-bold">{sub.substitute}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{sub.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {sub.compounds.map((compound) => (
                      <span
                        key={compound}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted/60 text-xs font-medium"
                      >
                        <Atom className="h-3 w-3" />
                        {compound}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
                The Regeneration Process
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

                {[
                  { icon: Database, title: "1. Recipe Analysis", description: "We analyze the original recipe from RecipeDB, extracting its complete flavor profile and identifying key ingredients." },
                  { icon: Microscope, title: "2. Constraint Mapping", description: "Your dietary constraints are mapped against each ingredient. We identify what needs substitution." },
                  { icon: Beaker, title: "3. Molecular Matching", description: "FlavorDB finds ingredients with similar molecular structures that satisfy your constraints." },
                  { icon: FlaskConical, title: "4. Recipe Reconstruction", description: "The recipe is rebuilt with optimized proportions and adjusted cooking techniques to maximize flavor retention." },
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-6 mb-8 last:mb-0"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative z-10">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="pt-3">
                      <h3 className="font-heading text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-heading font-extrabold mb-4">
                Ready to Experience the Science?
              </h2>
              <p className="text-muted-foreground mb-8">
                Transform any dish to match your dietary needs while preserving authentic flavor.
              </p>
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="btn-hero text-lg px-8 py-6">
                    Start Your First Recipe
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Science;

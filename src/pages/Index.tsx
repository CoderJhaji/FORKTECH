import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Beaker, Globe, Sparkles, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { sampleRecipes } from "@/lib/mockData";
import heroImage from "@/assets/hero-food.jpg";

const features = [
  {
    icon: Database,
    title: "Tell us your diet",
    description: "Select your dietary constraints — Vegan, Jain, Keto, allergen-free — and we'll adapt any dish to your needs.",
    emoji: "🥗",
  },
  {
    icon: Beaker,
    title: "We map the flavor molecules",
    description: "Our FlavorDB maps 25,000+ ingredients by their molecular structure to find the perfect substitute.",
    emoji: "🧬",
  },
  {
    icon: Globe,
    title: "You cook a perfect dish",
    description: "Follow smart kitchen-ready instructions with step-by-step guidance and integrated timers.",
    emoji: "👨‍🍳",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Delicious curry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-foreground/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-semibold mb-8"
            >
              <Sparkles className="h-4 w-4" />
              Flavor Science Meets Culinary Art
            </motion.span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-background mb-6 leading-[1.1]">
              Don't just substitute.
              <br />
              <span>Regenerate.</span>
            </h1>

            <p className="text-lg md:text-xl text-background/75 max-w-2xl mx-auto mb-10 leading-relaxed">
              The only AI that understands flavor chemistry. We don't suggest substitutions;
              we rebuild the dish from its molecular foundation.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="btn-hero text-lg px-10 py-7">
                    <ChefHat className="mr-2 h-5 w-5" />
                    Go to Smart Kitchen
                  </Button>
                </motion.div>
              </Link>
              <Link to="/science">
                <Button variant="outline" className="text-background border-background/30 bg-background/10 hover:bg-background/20 text-lg px-8 py-6 rounded-full">
                  <Beaker className="mr-2 h-5 w-5" />
                  Learn the Science
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-7 h-11 rounded-full border-2 border-background/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-background/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works - 3 Friendly Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to your perfect regenerated recipe.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-card p-8 text-center group"
              >
                <div className="text-5xl mb-5">{feature.emoji}</div>
                <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Regenerations - Horizontal Scroll */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Featured Regenerations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how we've transformed popular dishes for different dietary needs.
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {sampleRecipes.map((recipe, index) => (
              <div key={recipe.id} className="min-w-[340px] md:min-w-[380px] snap-center">
                <RecipeCard recipe={recipe} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary rounded-[3rem] mx-4 md:mx-8" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary-foreground mb-4">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of home chefs who cook smarter with flavor science.
            </p>
            <Link to="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 text-lg px-10 py-7 rounded-full font-bold shadow-warm"
                >
                  Start Your First Recipe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

import { motion } from "framer-motion";
import { Heart, Rocket, Globe, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const team = [
  { name: "Shalini Jha", role: "Backend Developer ", bio: "She manages databases, and APIs, ensuring reliable performance and seamless data flow across the platform." },
  { name: "Aparna Parashar", role: "Backend Developer ", bio: "She keeps the data flowing smoothly by handling API integrations, server logic, and databases." },
  { name: "Shivani", role: "Frontend Developer", bio: "She builds responsive, accessible user interfaces with modern web technologies." },
  { name: "Swati Priyambda", role: "UI/UX Designer", bio: "She designs intuitive layouts and engaging visuals to create a smooth, user-friendly experience." },
];

const roadmap = [
  { phase: "Phase 1", title: "Foundation", description: "RecipeDB + FlavorDB integration", status: "completed" },
  { phase: "Phase 2", title: "Smart Kitchen", description: "Step-by-step cooking assistant", status: "completed" },
  { phase: "Phase 3", title: "IoT Integration", description: "Connect with smart appliances", status: "current" },
  { phase: "Phase 4", title: "Community", description: "User-generated recipes and sharing", status: "upcoming" },
];

const About = () => {
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
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
                Our Mission
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                We believe everyone deserves to enjoy the dishes they love, regardless of
                dietary restrictions. RasSetu bridges the gap between tradition and modern
                dietary needs through the power of flavor science.
              </p>
              <div className="flex justify-center gap-8">
                {[
                  { value: "50K+", label: "Recipes" },
                  { value: "25K+", label: "Ingredients" },
                  { value: "12", label: "Cuisines" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-4xl font-extrabold text-primary">{stat.value}</p>
                    <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Problem + Solution (fun) */}
        <section className="py-20 bg-accent/30 rounded-[3rem] mx-4">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-8xl mb-6">🍳💥</div>
                <h3 className="font-heading text-2xl font-bold mb-3">The Problem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You Google "vegan butter chicken recipe" and get something that tastes like sad tomato soup. 
                  Simple substitutions don't work because they ignore the underlying flavor chemistry.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-8xl mb-6">🧬✨</div>
                <h3 className="font-heading text-2xl font-bold mb-3">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  RasSetu uses RecipeDB + FlavorDB to understand <em>why</em> cream makes butter chicken rich, 
                  then finds cashew cream because it shares the same fat molecules. Science, not guesswork.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
                What Drives Us
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: "Respect for Tradition", description: "Every recipe carries cultural significance. We honor that heritage while enabling adaptation." },
                { icon: Rocket, title: "Science-First Approach", description: "No guesswork. Every substitution is backed by molecular flavor science and rigorous testing." },
                { icon: Globe, title: "Inclusive Cooking", description: "Whether Jain, Keto, or allergen-sensitive — everyone gets a seat at the table." },
                { icon: Users, title: "Community Driven", description: "Built by food lovers, for food lovers. Your feedback shapes our roadmap." },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
                Meet the Team
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A passionate group of scientists, engineers, and chefs united by a love for food.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-2xl font-extrabold text-primary-foreground">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-heading text-lg font-bold">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
                Our Roadmap
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                {roadmap.map((item, index) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center gap-6 mb-8 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${
                      item.status === "completed" ? "bg-secondary" : item.status === "current" ? "bg-primary animate-pulse" : "bg-muted"
                    }`} />
                    <div className="ml-10 md:ml-0 md:w-[45%]">
                      <div className="glass-card p-6">
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          item.status === "completed" ? "text-secondary" : item.status === "current" ? "text-primary" : "text-muted-foreground"
                        }`}>{item.phase}</span>
                        <h3 className="font-heading text-xl font-bold mt-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                      </div>
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
                Join Our Culinary Revolution
              </h2>
              <p className="text-muted-foreground mb-8">
                Start regenerating your favorite dishes today. No restrictions, just flavor.
              </p>
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="btn-hero text-lg px-8 py-6">
                    Get Started Free
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

export default About;

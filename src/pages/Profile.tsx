import { useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserProfile } from "@/lib/UserProfileContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, history } = useUserProfile();
  const navigate = useNavigate();

  const cuisinePreferences = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const entry of history) {
      if (!entry.regionId) continue;
      counts[entry.regionId] = (counts[entry.regionId] || 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [history]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-heading font-extrabold mb-4">
                Create your RasSetu profile
              </h1>
              <p className="text-muted-foreground mb-8">
                Save your dietary constraints, allergies, and dish history so we
                can regenerate recipes that truly fit you.
              </p>
              <Button
                className="btn-hero"
                onClick={() =>
                  navigate("/auth", { state: { from: "/profile" } })
                }
              >
                Sign up / Sign in
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Personal flavor profile
              </p>
              <h1 className="text-3xl md:text-4xl font-heading font-extrabold">
                Hi! {user.firstName || "First name"}...
              </h1>
              <p className="text-muted-foreground mt-2">
                Here’s how you’ve been cooking with RasSetu.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => navigate("/dashboard")}
            >
              Regenerate a new dish
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card p-5">
              <p className="text-sm text-muted-foreground mb-1">Total dishes</p>
              <p className="text-3xl font-heading font-extrabold">
                {history.length}
              </p>
            </Card>
            <Card className="glass-card p-5">
              <p className="text-sm text-muted-foreground mb-1">
                Active constraints
              </p>
              <p className="text-sm">
                Tracked from your last generated recipes.
              </p>
            </Card>
            <Card className="glass-card p-5">
              <p className="text-sm text-muted-foreground mb-1">
                Favorite cuisines
              </p>
              {cuisinePreferences.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Generate a few dishes to see your patterns.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                  {cuisinePreferences.map(([regionId, count]) => (
                    <span
                      key={regionId}
                      className="px-3 py-1 rounded-full bg-secondary/20 text-xs font-medium"
                    >
                      {regionId} · {count}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <Card className="glass-card p-6">
            <h2 className="font-heading text-xl font-bold mb-3">
              Dish history
            </h2>
            {history.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No dishes yet.{" "}
                <Link to="/dashboard" className="underline">
                  Regenerate your first recipe.
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {history.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-border/60 rounded-2xl px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-medium">{entry.dishName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleString()}
                        {entry.regionId ? ` · ${entry.regionId}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {entry.constraints.map((c) => (
                        <span
                          key={`c-${entry.id}-${c}`}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {c}
                        </span>
                      ))}
                      {entry.allergies.map((a) => (
                        <span
                          key={`a-${entry.id}-${a}`}
                          className="px-2 py-1 rounded-full bg-destructive/10 text-destructive"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;


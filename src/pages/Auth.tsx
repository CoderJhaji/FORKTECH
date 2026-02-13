import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useUserProfile } from "@/lib/UserProfileContext";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUserProfile();

  const from =
    (location.state as { from?: string } | null)?.from || "/profile";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine a sensible first name for both signup and login.
    // For signup we prefer the entered first name. For login (where first name
    // may be empty) derive the name from the email prefix if available.
    let trimmedFirstName = firstName.trim();
    if (!trimmedFirstName) {
      if (email.includes("@")) {
        const prefix = email.split("@")[0];
        // Use the part before @ and capitalize the first letter
        trimmedFirstName = prefix
          ? prefix.charAt(0).toUpperCase() + prefix.slice(1)
          : "First name";
      } else {
        trimmedFirstName = mode === "login" ? "First name" : "Guest";
      }
    }

    setUser({ firstName: trimmedFirstName, email: email.trim() });

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-heading font-extrabold mb-2">
              {mode === "signup" ? "Create your RasSetu profile" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground">
              Save your dietary profile, allergies, and favorite dishes.
            </p>
          </motion.div>

          <Card className="glass-card p-6">
            <div className="flex mb-6 rounded-full bg-muted overflow-hidden">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                  mode === "signup"
                    ? "bg-background text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                  mode === "login"
                    ? "bg-background text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Log in
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    First name
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g., Ananya"
                    required={mode === "signup"}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-hero mt-2">
                {mode === "signup" ? "Create account" : "Continue"}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-2">
                This is a demo experience – no real authentication yet.
              </p>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Just want to cook?{" "}
              <Link to="/dashboard" className="underline font-medium">
                Go to Smart Kitchen
              </Link>
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;


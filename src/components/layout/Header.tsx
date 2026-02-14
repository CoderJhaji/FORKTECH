import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat, Menu, X } from "lucide-react";
import { useState } from "react";
import { useUserProfile } from "@/lib/UserProfileContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Smart Kitchen" },
  { href: "/science", label: "Science" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
];

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUserProfile();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-extrabold tracking-tight">RasSetu</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button
                variant="outline"
                className="text-sm px-5 py-2 rounded-full"
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="text-sm px-5 py-2 rounded-full">
                  Sign up / Sign in
                </Button>
              </Link>
            )}
            <Link to="/dashboard">
              <Button className="btn-hero text-sm px-6 py-2">
                Go to Smart Kitchen
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-2xl hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border/30"
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl font-semibold transition-colors ${
                location.pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setUser(null);
                navigate("/");
              }}
              className="block"
            >
              <Button variant="outline" className="w-full rounded-2xl mt-2">Logout</Button>
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="outline" className="w-full rounded-2xl mt-2">Sign up / Sign in</Button>
            </Link>
          )}
          <Link
            to="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block"
          >
            <Button className="w-full btn-hero mt-2">Go to Smart Kitchen</Button>
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}

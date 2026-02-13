import { Link } from "react-router-dom";
import { ChefHat, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 rounded-t-[3rem]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-extrabold text-background">RasSetu</span>
            </Link>
            <p className="text-background/60 max-w-md leading-relaxed">
              The only AI that understands flavor chemistry. We don't suggest substitutions;
              we rebuild the dish from its molecular foundation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-background/60">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Smart Kitchen</Link></li>
              <li><Link to="/science" className="hover:text-primary transition-colors">Our Science</Link></li>
              <li><Link to="/reviews" className="hover:text-primary transition-colors">Reviews</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-background/40 text-sm">
          <p>© {new Date().getFullYear()} RasSetu. Crafted with flavor science. 🧪</p>
        </div>
      </div>
    </footer>
  );
}

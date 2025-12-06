import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "News & Culture", path: "/news" },
  { name: "Careers", path: "/careers" },
];

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            HR
          </div>
          <span className="text-xl font-bold text-foreground">TalentHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/candidate-login">Login</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/careers">See Open Positions</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card"
          >
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-2 flex flex-col gap-2">
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/candidate-login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/careers" onClick={() => setIsOpen(false)}>See Open Positions</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

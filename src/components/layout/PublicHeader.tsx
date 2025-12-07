import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "News & Culture", path: "/news" },
  { name: "Careers", path: "/careers" },
];

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

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
          {user ? (
            <>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials(user.email || "U")}
                </AvatarFallback>
              </Avatar>
              <Button variant="secondary" asChild>
                <Link to="/candidate-dashboard">Go to Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/candidate-login">Login</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/candidate-login?mode=register">Register</Link>
              </Button>
            </>
          )}
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
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(user.email || "U")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                    <Button variant="secondary" asChild>
                      <Link to="/candidate-dashboard" onClick={() => setIsOpen(false)}>Go to Dashboard</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/candidate-login" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link to="/candidate-login?mode=register" onClick={() => setIsOpen(false)}>Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

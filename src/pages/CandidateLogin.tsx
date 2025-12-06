import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    toast.success("Login successful!");
    navigate("/candidate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Candidate Portal</h1>
            <p className="text-muted-foreground">
              Sign in to track your applications and manage your profile
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link 
              to="/forgot-password" 
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/careers" className="text-primary hover:underline">
                Apply to a job
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <PublicFooter />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to VinylVerse!",
        description: "You've been added to our mailing list. Get ready for exclusive drops!",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Join the <span className="text-metallic">VinylVerse</span> Club
          </h3>
          
          <p className="text-muted-foreground mb-6 text-sm">
            Subscribe for exclusive drops, early access, and vinyl deals
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-5 bg-card/60 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground text-sm backdrop-blur-sm"
              required
            />
            <Button type="submit" className="bg-gradient-primary border-0 h-12 gap-2 group px-6">
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
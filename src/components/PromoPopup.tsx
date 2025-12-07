import { useState, useEffect } from "react";
import { X, Sparkles, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("vinylverse-popup-seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("vinylverse-popup-seen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to VinylVerse!",
      description: "Your 10% discount code has been sent to your email.",
    });
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-card via-card to-primary/10 rounded-3xl shadow-2xl max-w-md w-full animate-slide-up border border-primary/20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl" />
        
        {/* Floating vinyl disc decoration */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 animate-spin-slow opacity-50" style={{ animationDuration: '8s' }} />
        
        <div className="relative p-8">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="text-center">
            {/* Animated icon */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-primary animate-pulse-glow" />
              <div className="relative w-full h-full rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <Music className="w-10 h-10 text-primary-foreground" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-twinkle" />
              <Sparkles className="absolute -bottom-1 -left-2 w-5 h-5 text-primary animate-twinkle" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Exclusive <span className="text-metallic">10% OFF</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Join the VinylVerse family and unlock your first-order discount plus early access to limited drops!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-center h-12 rounded-full bg-background/50 border-primary/30 focus:border-primary placeholder:text-muted-foreground/60"
              />
              <Button type="submit" className="w-full bg-gradient-primary border-0 h-12 rounded-full text-base font-semibold gap-2 group" size="lg">
                <Sparkles className="w-5 h-5 group-hover:animate-wiggle" />
                Claim My Discount
              </Button>
            </form>

            <button
              onClick={handleClose}
              className="mt-5 text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
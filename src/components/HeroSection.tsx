import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-turntable.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium turntable"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-3xl">
          <p className="text-primary font-medium tracking-widest uppercase mb-4 animate-fade-up">
            Premium Vinyl Collection
          </p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-[1.3] animate-fade-up-delay-1">
            Rediscover the
            <span className="block text-metallic pb-4">Warmth of Analog</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-up-delay-2">
            Experience the rich, authentic sound that only vinyl can deliver. 
            Curated collections from legendary artists and emerging talents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
            <Link to="/shop">
              <Button variant="hero" size="xl" className="group">
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

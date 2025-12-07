import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Marcus Chen",
    title: "Audio Engineer",
    content: "The quality of pressings from VinylVerse is unmatched. Every record arrives in pristine condition, and the sound quality takes me back to the golden age of analog.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    title: "Music Collector",
    content: "I've been collecting vinyl for 15 years, and VinylVerse has become my go-to source. Their curation is impeccable and the customer service is outstanding.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "David Park",
    title: "Jazz Enthusiast",
    content: "Finding rare jazz pressings has never been easier. The team at VinylVerse truly understands the audiophile community and delivers excellence every time.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

const HighlightedBrandName = () => (
  <span className="font-semibold">
    <span className="text-foreground">Vinyl</span><span className="text-metallic">Verse</span>
  </span>
);

const highlightBrandName = (text: string) => {
  const parts = text.split("VinylVerse");
  if (parts.length === 1) return <span className="text-muted-foreground">{text}</span>;
  
  return parts.map((part, index) => (
    <span key={index}>
      <span className="text-muted-foreground">{part}</span>
      {index < parts.length - 1 && <HighlightedBrandName />}
    </span>
  ));
};

export const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const nextPage = () => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % testimonials.length);
      setIsFlipping(false);
    }, 400);
  };

  const prevPage = () => {
    if (isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsFlipping(false);
    }, 400);
  };

  // Auto-flip every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextPage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentPage];

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-metallic font-medium tracking-widest uppercase mb-2 text-sm">
            What Collectors Say
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Trusted by <span className="text-metallic">Audiophiles</span>
          </h2>
        </div>

        {/* Book Animation Container */}
        <div className="max-w-2xl mx-auto relative">
          {/* Book */}
          <div className="relative perspective-1000">
            {/* Left page (static) */}
            <div className="absolute left-0 top-0 w-1/2 h-full bg-card/30 rounded-l-xl border-l border-t border-b border-border/30" />
            
            {/* Main content card with flip animation */}
            <div 
              className={`relative bg-gradient-card rounded-2xl border border-border/50 shadow-elevated overflow-hidden transition-all duration-400 ${
                isFlipping 
                  ? flipDirection === 'next' 
                    ? 'animate-page-flip-out' 
                    : 'animate-page-flip-out-reverse'
                  : 'animate-page-flip-in'
              }`}
            >
              <div className="p-8 md:p-10">
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />

                {/* Stars - Filled metallic pink with gradient */}
                <div className="flex gap-1 mb-6 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${i < testimonial.rating ? "text-metallic" : "text-muted-foreground/30"}`}
                      style={i < testimonial.rating ? { 
                        fill: 'url(#metallic-gradient)',
                      } : undefined}
                    />
                  ))}
                  {/* SVG gradient definition */}
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient id="metallic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(330, 90%, 70%)" />
                        <stop offset="50%" stopColor="hsl(330, 90%, 60%)" />
                        <stop offset="100%" stopColor="hsl(330, 90%, 55%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Content */}
                <p className="text-lg md:text-xl mb-8 leading-relaxed italic text-center">
                  "{highlightBrandName(testimonial.content)}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="text-left">
                    <h4 className="font-display font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPage}
              className="bg-card/50 hover:bg-primary/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            {/* Page indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i !== currentPage && !isFlipping) {
                      setFlipDirection(i > currentPage ? 'next' : 'prev');
                      setIsFlipping(true);
                      setTimeout(() => {
                        setCurrentPage(i);
                        setIsFlipping(false);
                      }, 400);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentPage ? "bg-primary w-6" : "bg-muted hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextPage}
              className="bg-card/50 hover:bg-primary/20"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
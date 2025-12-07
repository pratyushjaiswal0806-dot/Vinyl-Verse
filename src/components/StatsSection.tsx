import { useEffect, useState, useRef } from "react";

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "10K+", label: "Vinyl Records" },
    { value: "500+", label: "Artists" },
    { value: "50+", label: "Genres" },
  ];

  return (
    <section ref={sectionRef} className="py-12 relative mt-8 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Animated gradient background */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-8 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 animated-gradient-bg opacity-60" />
            <div className="absolute inset-0 bg-card/40 backdrop-blur-sm" />
          </div>
          
          <div className="relative grid grid-cols-3 gap-6 p-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-24'
                } ${index === 1 ? 'border-x border-border/30' : ''}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <p className="text-4xl md:text-5xl font-display font-bold text-metallic">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
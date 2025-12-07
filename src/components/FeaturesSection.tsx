import { Disc3, Truck, Shield, Headphones } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const features = [
  {
    icon: Disc3,
    title: "Authentic Pressings",
    description: "Every record verified for authenticity and quality.",
  },
  {
    icon: Truck,
    title: "Careful Shipping",
    description: "Premium packaging ensures perfect condition delivery.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "30-day returns on any record that doesn't meet standards.",
  },
  {
    icon: Headphones,
    title: "Expert Curation",
    description: "Hand-selected records for exceptional sound quality.",
  },
];

export const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered box reveal with delay
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleBoxes(prev => [...prev, index]);
            }, 600 + (index * 150)); // Start after heading animation
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden">
      {/* Soft gradient background that blends naturally */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/8 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Animated heading - appears first */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className={`text-metallic font-semibold tracking-widest uppercase mb-3 text-sm transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
             style={{ transitionDelay: '100ms' }}>
            Why Choose Us
          </p>
          <h2 className={`font-display text-3xl md:text-4xl font-bold text-foreground transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '200ms' }}>
            The <span className="text-metallic">Vinyl</span><span className="text-metallic">Verse</span> Difference
          </h2>
        </div>

        {/* Feature boxes - appear after heading with stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group text-center p-6 rounded-2xl bg-card border-2 border-accent/30 hover:border-accent hover:bg-card/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)] ${
                visibleBoxes.includes(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl icon-metallic flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                visibleBoxes.includes(index) ? 'rotate-0' : 'rotate-12'
              }`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
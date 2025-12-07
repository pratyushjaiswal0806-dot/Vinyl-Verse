const brands = [
  { name: "Spin Clean", logo: "🎵" },
  { name: "Rega", logo: "🎧" },
  { name: "Pro-Ject", logo: "📀" },
  { name: "Clearaudio", logo: "🔊" },
  { name: "Audio-Technica", logo: "🎤" },
  { name: "Ortofon", logo: "💿" },
  { name: "Denon", logo: "🎹" },
  { name: "Technics", logo: "🎛️" },
  { name: "Marantz", logo: "📻" },
  { name: "Shure", logo: "🎚️" },
];

export const BrandPartnersSection = () => {
  // Triple the brands for seamless infinite scroll, with engine interspersed
  const trainCars = [
    { type: 'engine' as const },
    ...brands.slice(0, 5).map(b => ({ type: 'brand' as const, ...b })),
    ...brands.slice(5).map(b => ({ type: 'brand' as const, ...b })),
  ];
  
  // Triple for seamless loop
  const duplicatedCars = [...trainCars, ...trainCars, ...trainCars];

  return (
    <section className="py-10 relative overflow-hidden">
      {/* Moving gradient background */}
      <div className="absolute inset-0 animated-gradient-bg opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Our <span className="text-metallic">Brand Partners</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Partnering with the finest names in audio excellence
          </p>
        </div>

        {/* Train Track */}
        <div className="relative">
          {/* Track line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border" />
          
          {/* Train container with infinite scroll */}
          <div className="overflow-hidden py-4">
            <div className="flex animate-train-loop">
              {duplicatedCars.map((car, index) => (
                <div key={index} className="flex-shrink-0">
                  {car.type === 'engine' ? (
                    /* Engine car with VinylVerse logo */
                    <div className="relative group flex items-center">
                      {/* Connector from previous car */}
                      <div className="w-4 h-1.5 bg-border/70 rounded-full" />
                      
                      {/* Engine body */}
                      <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-gradient-to-br from-primary/30 via-card to-primary/20 border-2 border-primary/50 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.5)] cursor-pointer min-w-[140px] relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                          <span className="text-primary-foreground font-display font-bold text-lg">V</span>
                        </div>
                        <span className="font-display text-xs font-bold text-center whitespace-nowrap">
                          <span className="text-foreground">Vinyl</span><span className="text-metallic">Verse</span>
                        </span>
                        
                        {/* Engine Vinyl Wheels (larger) */}
                        <div className="absolute -bottom-2 left-3 w-6 h-6 rounded-full bg-background border-2 border-primary animate-vinyl-wheel">
                          <div className="absolute inset-1 rounded-full bg-primary/60" />
                          <div className="absolute inset-[7px] rounded-full bg-background" />
                        </div>
                        <div className="absolute -bottom-2 right-3 w-6 h-6 rounded-full bg-background border-2 border-primary animate-vinyl-wheel">
                          <div className="absolute inset-1 rounded-full bg-primary/60" />
                          <div className="absolute inset-[7px] rounded-full bg-background" />
                        </div>
                      </div>
                      
                      {/* Connector to next car */}
                      <div className="w-4 h-1.5 bg-border/70 rounded-full" />
                    </div>
                  ) : (
                    /* Brand car */
                    <div className="relative group flex items-center">
                      {/* Connector from previous car */}
                      <div className="w-4 h-1.5 bg-border/70 rounded-full" />
                      
                      {/* Car body */}
                      <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-card/80 border-2 border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.3)] cursor-pointer min-w-[120px] relative">
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce">{car.logo}</span>
                        <span className="font-display text-xs font-semibold text-foreground group-hover:text-primary transition-colors text-center whitespace-nowrap">
                          {car.name}
                        </span>
                        
                        {/* Vinyl Wheels */}
                        <div className="absolute -bottom-2 left-4 w-5 h-5 rounded-full bg-background border-2 border-primary animate-vinyl-wheel">
                          <div className="absolute inset-1 rounded-full bg-primary/60" />
                          <div className="absolute inset-[6px] rounded-full bg-background" />
                        </div>
                        <div className="absolute -bottom-2 right-4 w-5 h-5 rounded-full bg-background border-2 border-primary animate-vinyl-wheel">
                          <div className="absolute inset-1 rounded-full bg-primary/60" />
                          <div className="absolute inset-[6px] rounded-full bg-background" />
                        </div>
                      </div>
                      
                      {/* Connector to next car */}
                      <div className="w-4 h-1.5 bg-border/70 rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
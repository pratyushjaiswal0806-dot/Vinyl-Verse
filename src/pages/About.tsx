import { Disc3, Heart, Users, Award } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const stats = [
  { icon: Disc3, value: "10K+", label: "Vinyl Records" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Heart, value: "500+", label: "Artists" },
  { icon: Award, value: "15+", label: "Years Experience" },
];

const About = () => {
  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-foreground">Vinyl</span><span className="text-gradient">Verse</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Where passion for music meets the timeless beauty of vinyl
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="animate-fade-up-delay-1">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-card shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                  alt="Vinyl store"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center animate-fade-up-delay-2">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2009 by a group of passionate audiophiles, VinylVerse began as a small 
                record shop in the heart of the city. What started as a labor of love has grown 
                into one of the most trusted destinations for vinyl enthusiasts worldwide.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe in the irreplaceable warmth and authenticity of analog sound. Each record 
                in our collection is carefully curated and inspected to ensure the highest quality 
                listening experience.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to serve over 50,000 music lovers, connecting them with the 
                albums that define their lives and create lasting memories.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-3xl font-display font-bold text-gradient mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To preserve and celebrate the art of vinyl collecting by providing music lovers with 
              access to exceptional records, expert curation, and an unmatched customer experience. 
              We're not just selling records — we're keeping the spirit of analog alive.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

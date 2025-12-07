import { Instagram, Play, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?w=400&h=400&fit=crop",
    title: "Classic Vinyl Setup",
    likes: 1240,
    isVideo: false,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    title: "Limited Edition Drop",
    likes: 890,
    isVideo: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=400&h=400&fit=crop",
    title: "Audiophile Corner",
    likes: 2100,
    isVideo: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=400&fit=crop",
    title: "New Arrivals",
    likes: 756,
    isVideo: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
    title: "Behind the Scenes",
    likes: 1890,
    isVideo: true,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400&h=400&fit=crop",
    title: "Collector's Edition",
    likes: 3200,
    isVideo: false,
  },
];

export const InstagramFeedSection = () => {
  const [visiblePosts, setVisiblePosts] = useState<number[]>([]);

  useEffect(() => {
    // Staggered reveal animation
    instagramPosts.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePosts(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Soft gradient background that blends naturally */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/8 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Instagram className="w-5 h-5 text-primary" />
            <span className="text-metallic font-medium tracking-widest uppercase text-sm">@VinylVerse</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-metallic">Instagram</span> <span className="text-metallic">Feed</span>
          </h2>
        </div>

        {/* Instagram Grid with staggered pop-in animation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
                visiblePosts.includes(index) 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-90 translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Video Play Icon */}
              {post.isVideo && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                </div>
              )}
              
              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2 text-foreground">
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                  <span className="font-semibold">{post.likes.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center px-2">{post.title}</p>
              </div>
              
              {/* Premium border glow on hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full btn-metallic text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};
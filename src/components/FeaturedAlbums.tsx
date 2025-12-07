import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

const albums = [
  {
    id: 1,
    title: "Cosmic Echoes",
    artist: "The Stardust Crusaders",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=500&h=500&fit=crop",
    genre: "Electronic",
  },
  {
    id: 2,
    title: "Midnight Moods",
    artist: "Luna Simone",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?w=500&h=500&fit=crop",
    genre: "Jazz",
  },
  {
    id: 3,
    title: "Urban Legends",
    artist: "Street Poets",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    genre: "Hip Hop",
  },
  {
    id: 4,
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    genre: "Synthwave",
  },
  {
    id: 5,
    title: "Electric Soul",
    artist: "The Voltage Band",
    price: 31.99,
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&fit=crop",
    genre: "Rock",
  },
  {
    id: 6,
    title: "Acoustic Sessions",
    artist: "Emma Hartley",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop",
    genre: "Folk",
  },
];

export const FeaturedAlbums = () => {
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered card reveal
          albums.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 100);
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

  const handleAddToCart = (album: typeof albums[0]) => {
    addItem({
      id: album.id,
      title: album.title,
      artist: album.artist,
      price: album.price,
      image: album.image,
    });
    toast({
      title: "🎉 Added to cart!",
      description: `${album.title} is ready to spin.`,
      duration: 5000,
    });
  };

  const handleWishlistToggle = (album: typeof albums[0]) => {
    if (isInWishlist(album.id)) {
      removeFromWishlist(album.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist({
        id: album.id,
        title: album.title,
        artist: album.artist,
        price: album.price,
        image: album.image,
      });
      toast({ title: "💜 Added to wishlist!" });
    }
  };

  const visibleAlbums = 4;
  const maxIndex = albums.length - visibleAlbums;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section ref={sectionRef} id="shop" className="py-12 relative">
      <div className="container mx-auto px-6">
        {/* Section Header with fade-in */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-metallic text-primary font-medium tracking-widest uppercase mb-2 text-sm">
            Handpicked Selection
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Featured <span className="text-metallic">Albums</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Discover our carefully curated collection of premium vinyl records.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm hover:bg-primary hidden md:flex"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm hover:bg-primary hidden md:flex"
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Albums Grid with staggered scale-in animation */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleAlbums)}%)` }}
            >
              {albums.map((album, index) => (
                <div
                  key={album.id}
                  className={`group relative bg-gradient-card rounded-xl p-3 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 flex-shrink-0 ${
                    visibleCards.includes(index) 
                      ? 'opacity-100 scale-100 rotate-0' 
                      : 'opacity-0 scale-75 rotate-3'
                  }`}
                  style={{ 
                    width: `calc(${100 / visibleAlbums}% - 12px)`,
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Image Container */}
                  <Link to={`/product/${album.id}`}>
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay on Hover - Only Wishlist */}
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className={`bg-card/90 hover:bg-gradient-primary hover:text-primary-foreground ${isInWishlist(album.id) ? "text-accent" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleWishlistToggle(album);
                          }}
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist(album.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>

                      {/* Genre Badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-primary text-primary-foreground text-[10px] font-semibold rounded-full">
                        {album.genre}
                      </span>
                    </div>
                  </Link>

                  {/* Album Info */}
                  <div className="space-y-1">
                    <Link to={`/product/${album.id}`}>
                      <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {album.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-xs">{album.artist}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-metallic text-gradient font-bold text-sm">${album.price}</span>
                      <Button
                        size="sm"
                        className="btn-metallic text-xs h-7 px-3"
                        onClick={() => handleAddToCart(album)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-primary w-6" : "bg-muted hover:bg-muted-foreground"
                }`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className={`text-center mt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link to="/shop">
            <Button variant="premium" size="lg">
              View All Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
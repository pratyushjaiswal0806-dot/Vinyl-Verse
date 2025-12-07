import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      title: item.title,
      artist: item.artist,
      price: item.price,
      image: item.image,
    });
    toast({
      title: "🎉 Added to cart!",
      description: `${item.title} is ready to spin.`,
      duration: 5000,
    });
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addItem({
        id: item.id,
        title: item.title,
        artist: item.artist,
        price: item.price,
        image: item.image,
      });
    });
    toast({
      title: "🎉 All items added to cart!",
      description: `${items.length} items are ready to spin.`,
      duration: 5000,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen relative">
        <div className="animated-gradient-bg" />
        <Header />
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center animate-pulse-glow">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Start adding your favorite vinyl records to your wishlist.
              </p>
              <Link to="/shop">
                <Button size="lg" className="bg-gradient-primary border-0 gap-2">
                  Browse Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground">
              My <span className="text-gradient">Wishlist</span>
            </h1>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                Clear All
              </Button>
              <Button size="sm" className="bg-gradient-primary border-0" onClick={handleAddAllToCart}>
                Add All to Cart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-gradient-card rounded-xl p-3 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link to={`/product/${item.id}`} className="block">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="space-y-1">
                  <h3 className="font-display text-sm font-semibold text-foreground line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">{item.artist}</p>
                  <p className="text-gradient font-bold text-sm">${item.price}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-primary border-0 text-xs"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-8 h-8"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;

import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingCart, Heart, SlidersHorizontal, ChevronDown, Settings } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products, genres } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SortOption = "default" | "price-low" | "price-high" | "newest" | "name";

const MIN_PRICE = 0;
const MAX_PRICE = 100;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  const searchQuery = searchParams.get("search") || "";
  
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState({ min: MIN_PRICE, max: MAX_PRICE });
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.artist.toLowerCase().includes(query) ||
          p.genre.toLowerCase().includes(query)
      );
    }
    
    // Apply URL filter
    if (filterParam === "new") {
      filtered = filtered.filter((p) => p.isNew);
    } else if (filterParam === "bestsellers") {
      filtered = filtered.filter((p) => p.isBestSeller);
    } else if (filterParam === "sale") {
      filtered = filtered.filter((p) => p.isSale);
    }
    
    // Apply genre filter
    if (selectedGenre !== "All") {
      filtered = filtered.filter((p) => p.genre === selectedGenre);
    }
    
    // Apply price range filter
    filtered = filtered.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "newest":
        return filtered.sort((a, b) => b.year - a.year);
      case "name":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [selectedGenre, sortBy, filterParam, priceRange, searchQuery]);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      artist: product.artist,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "🎉 Added to cart!",
      description: `${product.title} is ready to spin.`,
      duration: 5000,
    });
  };

  const handleWishlistToggle = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        artist: product.artist,
        price: product.price,
        image: product.image,
      });
      toast({ title: "💜 Added to wishlist!" });
    }
  };

  const sortLabels: Record<SortOption, string> = {
    default: "Featured",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    newest: "Newest",
    name: "Name A-Z",
  };

  const getFilterTitle = () => {
    if (filterParam === "new") return "New Arrivals";
    if (filterParam === "bestsellers") return "Best Sellers";
    if (filterParam === "sale") return "On Sale";
    return "Collection";
  };

  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {searchQuery ? (
                <>Search Results for "<span className="text-gradient">{searchQuery}</span>"</>
              ) : (
                <>Vinyl <span className="text-gradient">{getFilterTitle()}</span></>
              )}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              {searchQuery 
                ? `Found ${filteredAndSortedProducts.length} result${filteredAndSortedProducts.length !== 1 ? 's' : ''}`
                : 'Explore our handpicked selection of premium vinyl records'}
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Genre Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={`text-xs ${selectedGenre === genre ? "bg-gradient-primary border-0" : "hover:bg-primary/20 hover:text-primary hover:border-primary/50"}`}
                >
                  {genre}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Filters & Sort Combined */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Filters & Sort
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-card/95 backdrop-blur-xl border-border">
                  <SheetHeader>
                    <SheetTitle className="text-foreground">Filters & Sort</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-8">
                    {/* Price Range */}
                    <div>
                      <Label className="text-foreground mb-4 block">
                        Price Range: ${priceRange.min} - ${priceRange.max}
                      </Label>
                      
                      {/* Dual Range Slider */}
                      <div className="relative mt-6 mb-8 px-2">
                        {/* Track background */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-muted rounded-full" />
                        
                        {/* Active track */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 h-2 bg-gradient-primary rounded-full"
                          style={{
                            left: `${(priceRange.min / MAX_PRICE) * 100}%`,
                            right: `${100 - (priceRange.max / MAX_PRICE) * 100}%`
                          }}
                        />
                        
                        {/* Min thumb */}
                        <input
                          type="range"
                          min={MIN_PRICE}
                          max={MAX_PRICE}
                          value={priceRange.min}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val < priceRange.max) {
                              setPriceRange({ ...priceRange, min: val });
                            }
                          }}
                          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground"
                        />
                        
                        {/* Max thumb */}
                        <input
                          type="range"
                          min={MIN_PRICE}
                          max={MAX_PRICE}
                          value={priceRange.max}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val > priceRange.min) {
                              setPriceRange({ ...priceRange, max: val });
                            }
                          }}
                          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-foreground"
                        />
                      </div>

                      {/* Price inputs */}
                      <div className="flex items-center gap-2 mt-4">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= MIN_PRICE && val < priceRange.max) {
                              setPriceRange({ ...priceRange, min: val });
                            }
                          }}
                          className="w-full"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val <= MAX_PRICE && val > priceRange.min) {
                              setPriceRange({ ...priceRange, max: val });
                            }
                          }}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <Label className="text-foreground mb-4 block">Sort By</Label>
                      <div className="space-y-2">
                        {Object.entries(sortLabels).map(([key, label]) => (
                          <Button
                            key={key}
                            variant={sortBy === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSortBy(key as SortOption)}
                            className={`w-full justify-start ${sortBy === key ? "bg-gradient-primary border-0" : ""}`}
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPriceRange({ min: MIN_PRICE, max: MAX_PRICE });
                        setSortBy("default");
                      }}
                      className="w-full"
                    >
                      Clear All
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Products Grid - Smaller & More Compact */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAndSortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-gradient-card rounded-xl p-3 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                {/* Image */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay on Hover - Only Wishlist */}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`w-9 h-9 bg-card/90 hover:bg-gradient-primary hover:text-primary-foreground ${isInWishlist(product.id) ? "text-accent" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleWishlistToggle(product);
                        }}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="px-2 py-0.5 bg-gradient-primary text-primary-foreground text-[10px] font-semibold rounded-full">
                        {product.genre}
                      </span>
                      {product.isNew && (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full">
                          Sale
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className="space-y-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-xs line-clamp-1">{product.artist}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-metallic text-gradient font-bold text-sm">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through text-xs">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="btn-metallic text-xs h-7 px-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

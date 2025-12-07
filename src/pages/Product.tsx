import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Share2, Check, Plus, Heart, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductById, getRelatedProducts, getBundleProducts } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";

const Product = () => {
  const { id } = useParams();
  const product = getProductById(Number(id));
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen relative">
        <div className="animated-gradient-bg" />
        <Header />
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">Product Not Found</h1>
            <Link to="/shop">
              <Button variant="outline">Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
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

  const handleWishlistToggle = () => {
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

  const relatedProducts = getRelatedProducts(product, 6);
  const bundleProducts = getBundleProducts(product);
  const bundlePrice = bundleProducts.reduce((sum, p) => sum + p.price, product.price);
  const bundleDiscount = bundlePrice * 0.15;

  const handleAddBundle = () => {
    addItem({
      id: product.id,
      title: product.title,
      artist: product.artist,
      price: product.price,
      image: product.image,
    });
    bundleProducts.forEach((p) => {
      addItem({
        id: p.id,
        title: p.title,
        artist: p.artist,
        price: p.price,
        image: p.image,
      });
    });
    toast({
      title: "🎉 Bundle added to cart!",
      description: "You saved 15% with this bundle.",
      duration: 5000,
    });
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div className="relative animate-fade-up">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-card shadow-elevated">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="absolute top-6 left-6 px-4 py-2 bg-gradient-primary text-primary-foreground text-sm font-semibold rounded-full">
                {product.genre}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center animate-fade-up-delay-1">
              <p className="text-primary font-medium tracking-widest uppercase mb-2">
                {product.artist}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Price & Stock */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gradient">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">In Stock</span>
                </div>
              </div>

              {/* Year */}
              <p className="text-muted-foreground text-sm mb-6">
                Released: {product.year}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-primary border-0 gap-2 flex-1 min-w-[200px] group"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`icon-btn-animated ${inWishlist ? "border-primary" : ""}`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`w-5 h-5 transition-all ${inWishlist ? "fill-primary text-primary" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" className="icon-btn-animated">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Tracklist */}
              <div className="bg-card/50 rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Tracklist</h3>
                <ol className="space-y-2">
                  {product.tracklist.map((track, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground text-sm hover:text-foreground transition-colors">
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      {track}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mb-16 animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Customer Reviews
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-gradient-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{review.name}</p>
                      <p className="text-muted-foreground text-xs">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[hsl(var(--pink-primary))] text-[hsl(var(--pink-primary))]" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pairs Well With / Bundle Section */}
          {bundleProducts.length > 0 && (
            <div className="mb-16 animate-fade-up">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                🎵 This Pairs Well With
              </h2>
              <div className="bg-gradient-card rounded-2xl p-6 border border-border">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={product.image} alt={product.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{product.title}</p>
                      <p className="text-muted-foreground text-xs">${product.price}</p>
                    </div>
                  </div>
                  {bundleProducts.map((bp) => (
                    <div key={bp.id} className="flex items-center gap-2">
                      <Plus className="w-4 h-4 text-muted-foreground" />
                      <Link to={`/product/${bp.id}`} className="flex items-center gap-2 group">
                        <img src={bp.image} alt={bp.title} className="w-16 h-16 rounded-lg object-cover group-hover:ring-2 ring-primary transition-all" />
                        <div>
                          <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{bp.title}</p>
                          <p className="text-muted-foreground text-xs">${bp.price}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Bundle Price</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gradient">${(bundlePrice - bundleDiscount).toFixed(2)}</span>
                      <span className="text-muted-foreground line-through text-sm">${bundlePrice.toFixed(2)}</span>
                      <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">Save 15%</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-primary border-0" onClick={handleAddBundle}>
                    Add Bundle to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="animate-fade-up">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedProducts.map((related) => (
                  <Link key={related.id} to={`/product/${related.id}`} className="group">
                    <div className="bg-gradient-card rounded-xl p-3 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-square rounded-lg overflow-hidden mb-2">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-muted-foreground text-xs">{related.artist}</p>
                      <p className="text-gradient font-bold mt-1 text-sm">${related.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop", hasDropdown: true },
  { name: "Contact", href: "/contact" },
  { name: "Info", href: "#", hasDropdown: true, isInfo: true },
];

const shopDropdownItems = [
  { name: "All Products", href: "/shop" },
  { name: "New Arrivals", href: "/shop?filter=new" },
  { name: "Best Sellers", href: "/shop?filter=bestsellers" },
  { name: "Sale", href: "/shop?filter=sale" },
];

const infoDropdownItems = [
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Shipping", href: "/shipping" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const location = useLocation();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasWishlistItems = wishlistItems.length > 0;

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow logo-spin-hover animate-pulse-glow">
              <span className="text-primary-foreground font-display font-bold text-lg">V</span>
            </div>
            <span className="font-display text-2xl font-semibold text-foreground">
              Vinyl<span className="text-metallic">Verse</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.hasDropdown && link.isInfo ? (
                <NavigationMenu key={link.name}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`bg-transparent hover:bg-transparent data-[state=open]:bg-transparent px-0 font-medium w-[90px] text-center ${isActive("/about") || isActive("/faq") || isActive("/shipping") ? "text-metallic" : "text-foreground hover:text-metallic"
                          }`}
                      >
                        Info
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-2 shadow-elevated z-50">
                          {infoDropdownItems.map((item) => (
                            <NavigationMenuLink key={item.name} asChild>
                              <Link
                                to={item.href}
                                className="block px-4 py-2 rounded-md text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                              >
                                {item.name}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : link.hasDropdown ? (
                <NavigationMenu key={link.name}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`bg-transparent hover:bg-transparent data-[state=open]:bg-transparent px-0 font-medium min-w-[60px] text-center ${isActive("/shop") ? "text-metallic" : "text-foreground hover:text-metallic"
                          }`}
                      >
                        Shop
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-2 shadow-elevated z-50">
                          {shopDropdownItems.map((item) => (
                            <NavigationMenuLink key={item.name} asChild>
                              <Link
                                to={item.href}
                                className="block px-4 py-2 rounded-md text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                              >
                                {item.name}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : link.href === "/" ? (
                <a
                  key={link.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      window.location.href = "/";
                    }
                  }}
                  className={`transition-colors duration-300 font-medium min-w-[60px] text-center relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-primary after:transition-all after:duration-300 cursor-pointer ${isActive(link.href)
                      ? "text-metallic after:w-full"
                      : "text-foreground hover:text-metallic after:w-0 hover:after:w-full"
                    }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`transition-colors duration-300 font-medium min-w-[60px] text-center relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-primary after:transition-all after:duration-300 ${isActive(link.href)
                      ? "text-metallic after:w-full"
                      : "text-foreground hover:text-metallic after:w-0 hover:after:w-full"
                    }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? "w-48" : "w-10"}`}>
                {isSearchOpen && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                      }
                    }}
                  >
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 animate-fade-in"
                      onBlur={() => {
                        if (!searchQuery) setIsSearchOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                        }
                      }}
                    />
                  </form>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/20 transition-colors shrink-0"
                  onClick={() => {
                    if (isSearchOpen && searchQuery.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                    } else {
                      setIsSearchOpen(!isSearchOpen);
                    }
                  }}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/20 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-6 h-6 px-1.5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold animate-bounce-in shadow-glow">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-primary/20 transition-colors group">
                <Heart className={`w-5 h-5 transition-all duration-300 ${hasWishlistItems ? "fill-primary text-primary group-hover:fill-[hsl(var(--pink-primary))] group-hover:text-[hsl(var(--pink-primary))]" : "group-hover:text-primary"}`} />
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-primary/20 transition-colors">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`transition-colors duration-300 font-medium text-lg ${isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {shopDropdownItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/account"
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <Link
                to="/wishlist"
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

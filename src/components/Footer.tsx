import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  pages: [
    { name: "About Us", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Wishlist", href: "/wishlist" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Brand */}
          <div className="max-w-[220px]">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow logo-spin-hover">
                <span className="text-primary-foreground font-display font-bold text-sm">V</span>
              </div>
              <span className="font-display text-lg font-semibold text-foreground">
                Vinyl<span className="text-gradient">Verse</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Premium vinyl for audiophiles.
            </p>
          </div>

          {/* Pages Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-base">Pages</h4>
            <ul className="space-y-2">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-base">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-base">Follow Us</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 social-icon-bounce"
                >
                  <social.icon className="w-4 h-4 group-hover:animate-wiggle" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-6 pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 VinylVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
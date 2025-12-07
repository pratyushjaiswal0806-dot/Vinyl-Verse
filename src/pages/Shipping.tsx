import { Truck, Package, Globe, Clock, Shield, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const shippingOptions = [
  {
    icon: Package,
    title: "Standard Shipping",
    time: "5-7 business days",
    price: "Free on orders over $50",
    description: "Careful packaging with tracking included",
  },
  {
    icon: Truck,
    title: "Express Shipping",
    time: "2-3 business days",
    price: "$9.99",
    description: "Priority handling and faster delivery",
  },
  {
    icon: Clock,
    title: "Next Day Delivery",
    time: "1 business day",
    price: "$19.99",
    description: "Order by 2 PM for next-day delivery",
  },
];

const features = [
  {
    icon: Shield,
    title: "Insured Shipping",
    description: "All orders are fully insured against loss or damage during transit.",
  },
  {
    icon: Globe,
    title: "International Delivery",
    description: "We ship to over 50 countries. Customs fees may apply.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on unopened items.",
  },
];

const Shipping = () => {
  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shipping <span className="text-gradient">Information</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take extra care to ensure your vinyl arrives in perfect condition.
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {shippingOptions.map((option, index) => (
              <div
                key={option.title}
                className="group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <option.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {option.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-medium">{option.time}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-gradient font-semibold">{option.price}</span>
                </div>
                <p className="text-muted-foreground text-sm">{option.description}</p>
              </div>
            ))}
          </div>

          {/* Packaging Info */}
          <div className="bg-gradient-card rounded-2xl p-8 border border-border/50 mb-16 animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Premium Packaging
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-3">How We Package Your Vinyl</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Records removed from sleeves to prevent seam splits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Cardboard stiffeners on both sides
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Custom vinyl mailers with reinforced corners
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    "Do Not Bend" labels on all packages
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Weather-resistant outer packaging
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Order Tracking</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Once your order ships, you'll receive an email with tracking information. 
                  You can also track your order anytime from your account dashboard.
                </p>
                <h3 className="font-semibold text-foreground mb-3">Processing Time</h3>
                <p className="text-muted-foreground text-sm">
                  Orders placed before 2 PM EST on business days are typically processed 
                  same-day. Weekend orders are processed on the next business day.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;

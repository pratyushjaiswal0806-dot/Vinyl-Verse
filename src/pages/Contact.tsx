import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@vinylverse.com", href: "mailto:hello@vinylverse.com" },
    { icon: Phone, label: "Phone", value: "+1 (234) 567-890", href: "tel:+1234567890" },
    { icon: MapPin, label: "Address", value: "123 Vinyl Street, Music City", href: "#" },
    { icon: Clock, label: "Hours", value: "Mon-Sat: 10AM - 8PM", href: "#" },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gradient-card rounded-2xl p-8 shadow-elevated">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    className="mt-1 min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-primary border-0 gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow">
                        <item.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{item.label}</p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="bg-gradient-card rounded-xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-foreground font-medium text-sm">How long does shipping take?</p>
                    <p className="text-muted-foreground text-sm">
                      Standard shipping takes 5-7 business days. Express is 2-3 days.
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Do you ship internationally?</p>
                    <p className="text-muted-foreground text-sm">
                      Yes! We ship to over 50 countries worldwide.
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">What's your return policy?</p>
                    <p className="text-muted-foreground text-sm">
                      30-day returns on unopened items. Defective items can be returned anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
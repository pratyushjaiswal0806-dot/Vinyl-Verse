import { useState } from "react";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const mockOrders = [
    { id: "ORD-001", date: "2024-01-15", total: 64.98, status: "Delivered" },
    { id: "ORD-002", date: "2024-01-28", total: 29.99, status: "Shipped" },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen relative">
        <div className="animated-gradient-bg" />
        <Header />
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-card rounded-2xl p-8 shadow-elevated">
                <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground text-center mb-8">
                  Sign in to your VinylVerse account
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary border-0" size="lg">
                    Sign In
                  </Button>
                </form>
                <p className="text-muted-foreground text-center text-sm mt-6">
                  Don't have an account?{" "}
                  <button className="text-primary hover:underline">Sign up</button>
                </p>
              </div>
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
          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            My <span className="text-gradient">Account</span>
          </h1>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gradient-card rounded-xl p-4 shadow-card space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <div className="bg-gradient-card rounded-xl p-6 shadow-card">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                      Profile Information
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                        <User className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">John Doe</p>
                        <p className="text-muted-foreground text-sm">john@example.com</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input defaultValue="John" className="mt-1" />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input defaultValue="Doe" className="mt-1" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Email</Label>
                        <Input defaultValue="john@example.com" className="mt-1" />
                      </div>
                    </div>
                    <Button className="mt-6 bg-gradient-primary border-0">Save Changes</Button>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                      Order History
                    </h2>
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                        >
                          <div>
                            <p className="font-medium text-foreground">{order.id}</p>
                            <p className="text-muted-foreground text-sm">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gradient">${order.total}</p>
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                      My Wishlist
                    </h2>
                    <p className="text-muted-foreground">Your wishlist is empty.</p>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                      Account Settings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Password</Label>
                        <Input type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label>New Password</Label>
                        <Input type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label>Confirm New Password</Label>
                        <Input type="password" className="mt-1" />
                      </div>
                      <Button className="bg-gradient-primary border-0">Update Password</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
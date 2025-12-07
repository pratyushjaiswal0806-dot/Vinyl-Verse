import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturedAlbums } from "@/components/FeaturedAlbums";
import { FeaturesSection } from "@/components/FeaturesSection";
import { BrandPartnersSection } from "@/components/BrandPartnersSection";
import { InstagramFeedSection } from "@/components/InstagramFeedSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedAlbums />
        <FeaturesSection />
        <BrandPartnersSection />
        <InstagramFeedSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
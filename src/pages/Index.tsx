import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PricingSection } from '@/components/PricingSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { FloatingElements } from '@/components/FloatingElements';
import { InteractiveFeatures } from '@/components/InteractiveFeatures';
import { MobileOptimizations } from '@/components/MobileOptimizations';
import { Footer } from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll polyfill for better browser support
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Hide default scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: hsl(var(--background));
      }
      
      ::-webkit-scrollbar-thumb {
        background: hsl(var(--primary) / 0.3);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--primary) / 0.5);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Enhanced Interactive Features */}
      <InteractiveFeatures />
      
      {/* Mobile Optimizations */}
      <MobileOptimizations />
      
      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div id="home">
          <HeroSection />
        </div>

        {/* Pricing Section */}
        <PricingSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

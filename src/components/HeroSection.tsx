import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';

export function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="cursor-glow"
        style={{
          left: `${cursorPosition.x - 10}px`,
          top: `${cursorPosition.y - 10}px`,
        }}
      />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60 float-animation" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary-glow rounded-full opacity-40 float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-secondary rounded-full opacity-30 float-animation" style={{ animationDelay: '4s' }} />

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center z-10">
        {/* Logo */}
        <div className="mb-8 fade-up">
          <img src={logo} alt="Humanize AI Designs" className="w-20 h-20 mx-auto mb-6 glow-primary" />
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 fade-up text-gradient glow-text" style={{ animationDelay: '0.2s' }}>
          Humanize AI Designs
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto fade-up" style={{ animationDelay: '0.4s' }}>
          Reimagining Architecture with Artificial Intelligence
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="glass-button magnetic-hover group px-8 py-4 text-lg font-semibold"
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Explore Pricing
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="glass-button magnetic-hover group px-8 py-4 text-lg font-semibold border-primary/30 hover:border-primary/50"
          >
            See Projects
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
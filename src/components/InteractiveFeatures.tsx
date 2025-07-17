import { useEffect, useState } from 'react';

export function InteractiveFeatures() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Enhanced cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create subtle glow trail effect
      const trail = document.createElement('div');
      trail.className = 'fixed pointer-events-none z-50 w-2 h-2 bg-primary/20 rounded-full';
      trail.style.left = `${e.clientX - 4}px`;
      trail.style.top = `${e.clientY - 4}px`;
      trail.style.animation = 'fadeOut 1s ease-out forwards';
      
      document.body.appendChild(trail);
      
      setTimeout(() => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      }, 1000);
    };

    // Smooth scroll behavior for navigation links
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add parallax effect to hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('#home');
      if (hero) {
        (hero as HTMLElement).style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      // Add glow effect to visible cards
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          card.classList.add('animate-glow');
        }
      });
    };

    // Add CSS keyframes for fade out animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOut {
        0% { opacity: 0.6; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
      }
      
      .animate-glow {
        animation: glow 2s ease-in-out infinite alternate;
      }
      
      /* Enhanced magnetic hover effects */
      .magnetic-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .magnetic-hover:hover {
        transform: translateY(-4px) scale(1.02);
        filter: brightness(1.1);
      }
      
      /* Glass morphism enhancements */
      .glass-card {
        position: relative;
        overflow: hidden;
      }
      
      .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          hsl(var(--primary) / 0.1),
          transparent
        );
        transition: left 0.6s ease;
      }
      
      .glass-card:hover::before {
        left: 100%;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleLinkClick);
      document.head.removeChild(style);
    };
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      {/* Enhanced cursor */}
      <div
        className="fixed pointer-events-none z-50 w-8 h-8 border-2 border-primary/30 rounded-full transition-all duration-200 hidden md:block"
        style={{
          left: `${mousePosition.x - 16}px`,
          top: `${mousePosition.y - 16}px`,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.1), transparent)`,
        }}
      />
    </>
  );
}
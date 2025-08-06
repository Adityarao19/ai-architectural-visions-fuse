import { useEffect, useState, useRef, useCallback } from 'react';

export function InteractiveFeatures() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number>();
  const trailCountRef = useRef(0);

  // Smooth interpolation for cursor following
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Update smooth position with animation frame
  const updateSmoothPosition = useCallback(() => {
    setSmoothPosition(prev => ({
      x: lerp(prev.x, mousePosition.x, 0.15),
      y: lerp(prev.y, mousePosition.y, 0.15)
    }));
    animationFrameRef.current = requestAnimationFrame(updateSmoothPosition);
  }, [mousePosition]);

  useEffect(() => {
    setIsLoaded(true);

    // Enhanced cursor tracking with throttling
    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 16) return; // 60fps throttling
      lastTime = now;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Detect if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"], input, textarea, select');
      setIsHovering(!!isInteractive);
      
      // Enhanced trail effect with limited count
      if (trailCountRef.current < 8) { // Limit concurrent trails
        trailCountRef.current++;
        const trail = document.createElement('div');
        trail.className = 'fixed pointer-events-none z-40 rounded-full transition-all duration-1000';
        
        // Dynamic trail size based on movement speed
        const speed = Math.sqrt(
          Math.pow(e.movementX || 0, 2) + Math.pow(e.movementY || 0, 2)
        );
        const size = Math.min(Math.max(speed * 0.3, 2), 8);
        
        trail.style.cssText = `
          left: ${e.clientX - size/2}px;
          top: ${e.clientY - size/2}px;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.1));
          animation: trailFade 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
          if (document.body.contains(trail)) {
            document.body.removeChild(trail);
            trailCountRef.current--;
          }
        }, 800);
      }
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

    // Add CSS keyframes for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes trailFade {
        0% { 
          opacity: 1; 
          transform: scale(1); 
        }
        100% { 
          opacity: 0; 
          transform: scale(0.3); 
        }
      }
      
      @keyframes fadeOut {
        0% { opacity: 0.6; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
      }
      
      @keyframes cursorPulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.2); opacity: 1; }
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

    // Start smooth position animation
    updateSmoothPosition();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleLinkClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.head.removeChild(style);
    };
  }, [updateSmoothPosition]);

  if (!isLoaded) return null;

  return (
    <>
      {/* Enhanced cursor with smooth following */}
      <div
        className={`fixed pointer-events-none z-50 border-2 rounded-full transition-all duration-300 hidden md:block ${
          isHovering 
            ? 'w-12 h-12 border-primary/60 animate-[cursorPulse_1s_ease-in-out_infinite]' 
            : 'w-8 h-8 border-primary/30'
        }`}
        style={{
          left: `${smoothPosition.x - (isHovering ? 24 : 16)}px`,
          top: `${smoothPosition.y - (isHovering ? 24 : 16)}px`,
          background: isHovering 
            ? `radial-gradient(circle, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05), transparent)`
            : `radial-gradient(circle, hsl(var(--primary) / 0.1), transparent)`,
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Smooth cursor dot */}
      <div
        className="fixed pointer-events-none z-50 w-1 h-1 bg-primary rounded-full transition-all duration-100 hidden md:block"
        style={{
          left: `${mousePosition.x - 2}px`,
          top: `${mousePosition.y - 2}px`,
          transform: isHovering ? 'scale(0)' : 'scale(1)',
        }}
      />
    </>
  );
}
import { useEffect, useState } from 'react';

export function MobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Add mobile-specific styles
    if (isMobile) {
      const mobileStyle = document.createElement('style');
      mobileStyle.textContent = `
        /* Mobile-specific optimizations */
        .glass-card {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        .magnetic-hover:hover {
          transform: translateY(-1px) scale(1.01);
        }
        
        /* Reduce animation intensity on mobile for better performance */
        @media (max-width: 768px) {
          .float-animation {
            animation-duration: 8s;
            animation-iteration-count: infinite;
          }
          
          .fade-up {
            animation-duration: 0.6s;
          }
          
          /* Optimize touch targets */
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Reduce complexity for mobile performance */
          .glow-primary {
            box-shadow: 0 0 15px hsl(var(--primary) / 0.3);
          }
        }
      `;
      document.head.appendChild(mobileStyle);

      return () => {
        document.head.removeChild(mobileStyle);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return null;
}
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Zap, Users, Building2, Globe } from 'lucide-react';
import tier1Icon from '@/assets/tier1-icon.png';
import tier2Icon from '@/assets/tier2-icon.png';
import tier3Icon from '@/assets/tier3-icon.png';
import tier4Icon from '@/assets/tier4-icon.png';

const pricingTiers = [
  {
    id: 'tier1',
    name: 'AI Concept Design',
    price: '₹10',
    unit: '/sq.ft',
    icon: tier1Icon,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    features: [
      'AI-generated 2D floor plans',
      'Abstract white layouts',
      'Floating geometric 3D blocks',
      'Basic concept visualization',
      'Digital delivery in 48 hours'
    ],
    description: 'Perfect for initial concept exploration and basic layout planning.',
    buttonText: 'Start with AI',
    popular: false
  },
  {
    id: 'tier2',
    name: 'AI + Human Design',
    price: '₹25',
    unit: '/sq.ft',
    icon: tier2Icon,
    gradient: 'from-purple-500/20 to-pink-500/20',
    features: [
      'Fully rendered floor plans',
      'Warm furniture layouts',
      'Human architect review',
      'Collaborative design process',
      'Delivery in 5-7 days'
    ],
    description: 'Combining AI efficiency with human creativity and expertise.',
    buttonText: 'Choose Hybrid',
    popular: true
  },
  {
    id: 'tier3',
    name: 'Executive + BIM + Detail',
    price: '₹45',
    unit: '/sq.ft',
    icon: tier3Icon,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    features: [
      'Hyper-detailed 3D views',
      'BIM model overlays',
      'CAD-style technical layers',
      'Architectural grid systems',
      'Delivery in 10-14 days'
    ],
    description: 'Professional-grade designs with technical precision and detail.',
    buttonText: 'Go Executive',
    popular: false
  },
  {
    id: 'tier4',
    name: 'Custom Mega Projects',
    price: '₹60-80',
    unit: '/sq.ft',
    icon: tier4Icon,
    gradient: 'from-orange-500/20 to-red-500/20',
    features: [
      'Urban-scale zoning maps',
      'Landscape planning integration',
      'FSI optimization graphics',
      'Futuristic project dashboards',
      'Custom timeline & delivery'
    ],
    description: 'Large-scale projects with custom requirements and urban planning.',
    buttonText: 'Contact Sales',
    popular: false
  }
];

export function PricingSection() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(cardRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient glow-text">
            Pricing Tiers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your architectural project. From AI-powered concepts to comprehensive mega-project solutions.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.id}
              id={tier.id}
              ref={(el) => cardRefs.current[tier.id] = el}
              className={`relative group magnetic-hover ${
                visibleCards.has(tier.id) ? 'fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`glass-card p-8 h-full flex flex-col relative overflow-hidden ${
                tier.popular ? 'ring-2 ring-primary/50 glow-primary' : ''
              }`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-50`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <img src={tier.icon} alt={tier.name} className="w-16 h-16 mx-auto glow-primary" />
                  </div>

                  {/* Tier Name */}
                  <h3 className="text-2xl font-bold mb-2 text-center">{tier.name}</h3>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gradient">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.unit}</span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-center mb-6 text-sm">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full group ${
                      tier.popular 
                        ? 'bg-gradient-primary hover:opacity-90' 
                        : 'glass-button'
                    }`}
                    size="lg"
                  >
                    {tier.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Need a custom solution? We're here to help you reimagine architecture.
          </p>
          <Button variant="outline" size="lg" className="glass-button magnetic-hover">
            <Globe className="mr-2 h-5 w-5" />
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
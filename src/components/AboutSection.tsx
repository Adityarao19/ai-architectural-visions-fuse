import { useState, useRef, useEffect } from 'react';
import { Heart, Brain, Lightbulb, Users } from 'lucide-react';
import founderImage from '/lovable-uploads/5ffe4262-dea6-476d-b855-21cbcf3eb8ff.png';
import coFounderImage from '/lovable-uploads/eb485725-0d19-402a-9307-dd7d7dc67c37.png';
export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const features = [{
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Leveraging cutting-edge artificial intelligence to generate innovative architectural solutions.'
  }, {
    icon: Heart,
    title: 'Human-Centered Design',
    description: 'Every AI-generated concept is refined by human architects who understand emotion and livability.'
  }, {
    icon: Lightbulb,
    title: 'Innovative Solutions',
    description: 'Pushing the boundaries of what\'s possible in architectural design and urban planning.'
  }, {
    icon: Users,
    title: 'Collaborative Approach',
    description: 'Working closely with clients to bring their visions to life through technology and creativity.'
  }];
  return <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 text-gradient glow-text ${isVisible ? 'fade-up' : 'opacity-0'}`}>
            About Us
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? 'fade-up' : 'opacity-0'}`} style={{
          animationDelay: '0.2s'
        }}>
            Bridging the gap between artificial intelligence and human creativity in architectural design.
          </p>
        </div>

        {/* Co-Founders Section - Centered */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Founder 1 - Anukriti Verma */}
            <div className={`${isVisible ? 'fade-up' : 'opacity-0'}`} style={{
            animationDelay: '0.4s'
          }}>
              <div className="glass-card p-8 text-center h-full flex flex-col">
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/30 glow-primary">
                    <img src={founderImage} alt="Anukriti Verma - Founder" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                      Visionary Founder
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gradient">Anukriti Verma</h3>
                
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  "Our AI doesn't just generate buildings—it understands the human stories that will 
                  unfold within them. Every design decision is made with one goal: creating spaces that truly serve humanity."
                </p>
              </div>
            </div>

            {/* Founder 2 - Aditya Rao */}
            <div className={`${isVisible ? 'fade-up' : 'opacity-0'}`} style={{
            animationDelay: '0.6s'
          }}>
              <div className="glass-card p-8 text-center h-full flex flex-col">
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/30 glow-primary">
                    <img src={coFounderImage} alt="Aditya Rao - Co-Founder" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                      Tech Co-Founder
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gradient">Aditya Rao</h3>
                
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  "I bridge the gap between cutting-edge AI technology and practical architectural solutions. 
                  My focus is on building scalable systems that empower architects to push creative boundaries while maintaining precision and efficiency."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => <div key={feature.title} className={`glass-card p-6 magnetic-hover ${isVisible ? 'fade-up' : 'opacity-0'}`} style={{
          animationDelay: `${0.8 + index * 0.1}s`
        }}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>)}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'fade-up' : 'opacity-0'}`} style={{
        animationDelay: '1s'
      }}>
          {[{
          number: '500+',
          label: 'Projects Completed'
        }, {
          number: '98%',
          label: 'Client Satisfaction'
        }, {
          number: '50+',
          label: 'AI Models Trained'
        }, {
          number: '24/7',
          label: 'Support Available'
        }].map((stat, index) => <div key={stat.label} className="text-center glass-card p-6">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>)}
        </div>
      </div>
    </section>;
}
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import logo from '@/assets/logo.png';
export function Footer() {
  const socialLinks = [{
    icon: Github,
    href: '#',
    label: 'GitHub'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }, {
    icon: Twitter,
    href: '#',
    label: 'Twitter'
  }];
  const quickLinks = [{
    label: 'Home',
    href: '#home'
  }, {
    label: 'Pricing',
    href: '#pricing'
  }, {
    label: 'About',
    href: '#about'
  }, {
    label: 'Contact',
    href: '#contact'
  }];
  const services = [{
    label: 'AI Concept Design',
    href: '#'
  }, {
    label: 'Hybrid Design',
    href: '#'
  }, {
    label: 'BIM & Technical',
    href: '#'
  }, {
    label: 'Mega Projects',
    href: '#'
  }];
  return <footer className="bg-card/50 backdrop-blur-xl border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="HAD" className="w-10 h-10" />
              <span className="font-bold text-xl text-gradient">Humanize AI Designs</span>
            </div>
            <p className="text-muted-foreground">
              Reimagining Architecture with Artificial Intelligence. Creating spaces that blend 
              technology with human emotion and creativity.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => <a key={social.label} href={social.href} className="w-10 h-10 bg-glass border border-white/20 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all group" aria-label={social.label}>
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map(service => <li key={service.label}>
                  <a href={service.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {service.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>hello@humanizeai.design</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">© 2025 Humanize AI Designs. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
}
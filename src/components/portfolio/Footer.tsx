import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Vedant Shinde
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              BTech AIML Student passionate about building AI-powered solutions 
              and intelligent digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const section = document.getElementById(item.toLowerCase());
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Technologies</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {['Python', 'React', 'TensorFlow', 'Node.js', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>using</span>
            <Code className="h-4 w-4 text-primary" />
            <span>React + TypeScript</span>
            <Coffee className="h-4 w-4 text-amber-600" />
          </div>
          
          <p className="text-muted-foreground text-sm">
            © {currentYear} Vedant Shinde. All rights reserved. 
            <span className="mx-2">•</span>
            Designed & Developed with passion for innovation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
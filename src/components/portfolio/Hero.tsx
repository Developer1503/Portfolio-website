import { useEffect, useState } from 'react';
import { Download, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Building AI-Powered Solutions & Intelligent Digital Experiences';

  useEffect(() => {
    const typeText = () => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
    };

    const delay = setTimeout(typeText, 1000);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="particles-bg">
        <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Vedant Shinde
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-medium">
            BTech AIML Student | ML & Full-Stack Developer
          </h2>

          <div className="h-16 md:h-20 flex items-center justify-center mb-12">
            <p className="text-lg md:text-xl lg:text-2xl text-foreground font-light max-w-4xl">
              <span className="typing-text">{typedText}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              onClick={scrollToProjects}
              className="btn-hero text-lg px-8 py-4 rounded-xl font-semibold group"
              size="lg"
            >
              <ExternalLink className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              View My Work
            </Button>
            
            <Button
              variant="outline"
              className="btn-outline text-lg px-8 py-4 rounded-xl font-semibold group"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              Download Resume
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm mb-2 hidden sm:block">Scroll to explore</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
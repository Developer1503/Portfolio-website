import React, { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Code2, Database, Wrench, Sparkles } from "lucide-react";
import MagicBento from "@/components/ui/MagicBento"; // Technical Skills
import PixelBlast from "@/components/ui/pixle-blast"; // Background for heading

interface Skill {
  name: string;
  level: number;
  category: "programming" | "frameworks" | "databases" | "tools";
}



const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [animationPhase, setAnimationPhase] = useState(0);

  const technicalSkills: Skill[] = [
    { name: "Python", level: 95, category: "programming" },
    { name: "TypeScript", level: 92, category: "programming" },
    { name: "JavaScript", level: 90, category: "programming" },
    { name: "Java", level: 85, category: "programming" },
    { name: "Go", level: 78, category: "programming" },
    { name: "Rust", level: 72, category: "programming" },
    { name: "React", level: 94, category: "frameworks" },
    { name: "Next.js", level: 90, category: "frameworks" },
    { name: "Node.js", level: 88, category: "frameworks" },
    { name: "Express", level: 85, category: "frameworks" },
    { name: "TensorFlow", level: 87, category: "frameworks" },
    { name: "PyTorch", level: 83, category: "frameworks" },
    { name: "Scikit-learn", level: 90, category: "frameworks" },
    { name: "FastAPI", level: 86, category: "frameworks" },
    { name: "PostgreSQL", level: 88, category: "databases" },
    { name: "MongoDB", level: 87, category: "databases" },
    { name: "Redis", level: 82, category: "databases" },
    { name: "MySQL", level: 85, category: "databases" },
    { name: "Git", level: 95, category: "tools" },
    { name: "Docker", level: 88, category: "tools" },
    { name: "Kubernetes", level: 75, category: "tools" },
    { name: "AWS", level: 82, category: "tools" },
    { name: "Vercel", level: 90, category: "tools" },
    { name: "Terraform", level: 70, category: "tools" },
  ];



  const categoryIcons = {
    programming: Code2,
    frameworks: Sparkles,
    databases: Database,
    tools: Wrench,
  };

  const categoryColors = {
    programming: "from-blue-500 to-purple-500",
    frameworks: "from-purple-500 to-pink-500",
    databases: "from-green-500 to-blue-500",
    tools: "from-orange-500 to-red-500",
  };

  const filteredSkills = activeCategory === "all" 
    ? technicalSkills 
    : technicalSkills.filter(skill => skill.category === activeCategory);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setAnimationPhase(prev => prev + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase(prev => prev + 1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading with PixelBlast background */}
        <div className="fade-on-scroll relative mb-16">
          <div className="absolute inset-0 z-0">
            <PixelBlast />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="bg-gradient-primary bg-clip-text text-transparent">Technologies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive toolkit for building intelligent solutions and scalable applications
            </p>
          </div>
        </div>

        {/* Technical Skills with MagicBento */}
        <div className="fade-on-scroll mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Arsenal
            </h3>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Cutting-edge technologies & frameworks</span>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>



        {/* Enhanced Tech Stack with Interactive Categories */}
        <div className="fade-on-scroll text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Technology Arsenal
            </h3>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span>Cutting-edge tools & frameworks mastered</span>
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>

            {/* Interactive Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  All Skills
                </span>
              </button>
              {Object.entries(categoryIcons).map(([category, IconComponent]) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white shadow-lg scale-105`
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105"
                  }`}
                >
                  <span className="flex items-center gap-2 capitalize">
                    <IconComponent className="w-4 h-4" />
                    {category === "programming" ? "Languages" : category}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Enhanced Skills Grid with Animations */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${animationPhase}`}
                className="group relative"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <Card className="relative overflow-hidden border-0 bg-gradient-card hover:scale-105 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                  {/* Skill level indicator background */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                  
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors]} opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500`}></div>

                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {React.createElement(categoryIcons[skill.category as keyof typeof categoryIcons], {
                          className: "w-5 h-5 text-muted-foreground group-hover:text-white transition-colors duration-300"
                        })}
                        <span className="font-semibold text-sm text-foreground group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                    
                    {/* Skill level progress */}
                    <div className="relative">
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors]} progress-bar relative overflow-hidden ${
                            isVisible ? "animate" : ""
                          }`}
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div className="absolute inset-0 -skew-x-12 bg-white/20 group-hover:animate-pulse"></div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-muted-foreground group-hover:text-white/80 transition-colors duration-300 mt-1">
                        {skill.level}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Skills Summary Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Languages", count: technicalSkills.filter(s => s.category === "programming").length, icon: Code2 },
              { label: "Frameworks", count: technicalSkills.filter(s => s.category === "frameworks").length, icon: Sparkles },
              { label: "Databases", count: technicalSkills.filter(s => s.category === "databases").length, icon: Database },
              { label: "Tools", count: technicalSkills.filter(s => s.category === "tools").length, icon: Wrench },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                  {stat.count}+
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress-bar {
          from {
            width: 0;
            opacity: 0.5;
          }
          to {
            width: var(--target-width);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes scroll-reveal {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes skill-icon-hover {
          0%, 100% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) scale(1.05) rotate(2deg);
          }
          75% {
            transform: translateY(-10px) scale(1.1) rotate(-2deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
          }
        }

        @keyframes particle-float {
          0% {
            transform: translateY(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-10px) translateX(5px) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-50px) translateX(-5px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) translateX(0px) scale(0);
          }
        }

        @keyframes category-slide-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll-reveal {
          animation: scroll-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-category-slide {
          animation: category-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .skill-icon-preview {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-icon-preview:hover {
          animation: skill-icon-hover 0.8s ease-in-out;
          background: linear-gradient(45deg, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4));
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 40px rgba(168, 85, 247, 0.4);
        }

        .progress-bar.animate {
          animation: progress-bar 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .progress-bar .shimmer-effect {
          animation: shimmer 2s infinite;
        }

        .fade-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-on-scroll.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.9);
        }

        .glow-on-hover:hover {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .particle-animation {
          animation: particle-float 3s ease-out infinite;
        }

        /* Enhanced smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for better aesthetics */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #a855f7, #3b82f6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #9333ea, #2563eb);
        }
      `}</style>
    </section>
  );
};

export default Skills;
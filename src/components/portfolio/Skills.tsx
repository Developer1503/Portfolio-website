import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, MessageCircle, Crown, Clock, Zap, Target, Lightbulb } from "lucide-react";
import MagicBento from "@/components/ui/MagicBento"; // Technical Skills
import PixelBlast from "@/components/ui/pixle-blast"; // Background for heading

interface Skill {
  name: string;
  level: number;
  category: "programming" | "frameworks" | "databases" | "tools";
}

interface SoftSkill {
  name: string;
  level: number;
  description: string;
  icon: React.ElementType;
  achievements: string[];
  color: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const technicalSkills: Skill[] = [
    { name: "Python", level: 90, category: "programming" },
    { name: "JavaScript", level: 85, category: "programming" },
    { name: "Java", level: 80, category: "programming" },
    { name: "React", level: 88, category: "frameworks" },
    { name: "Node.js", level: 82, category: "frameworks" },
    { name: "Express", level: 80, category: "frameworks" },
    { name: "TensorFlow", level: 85, category: "frameworks" },
    { name: "Scikit-learn", level: 88, category: "frameworks" },
    { name: "MySQL", level: 82, category: "databases" },
    { name: "MongoDB", level: 85, category: "databases" },
    { name: "PostgreSQL", level: 78, category: "databases" },
    { name: "Git", level: 90, category: "tools" },
    { name: "Docker", level: 75, category: "tools" },
    { name: "AWS", level: 72, category: "tools" },
    { name: "Vercel", level: 85, category: "tools" },
    { name: "Hugging Face", level: 80, category: "tools" },
  ];

  const softSkills: SoftSkill[] = [
    { 
      name: "Problem Solving", 
      level: 92, 
      description: "Analytical thinking and creative solutions", 
      icon: Brain,
      achievements: ["Led 15+ complex technical challenges", "99% bug resolution rate", "Innovative algorithm optimization"],
      color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Team Collaboration", 
      level: 88, 
      description: "Effective teamwork and communication", 
      icon: Users,
      achievements: ["Managed 8-person development team", "Cross-functional project coordination", "Mentored 5+ junior developers"],
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "Communication", 
      level: 85, 
      description: "Clear technical and non-technical communication", 
      icon: MessageCircle,
      achievements: ["Technical documentation expert", "Client presentation specialist", "Workshop facilitator"],
      color: "from-green-500 to-emerald-500"
    },
    { 
      name: "Leadership", 
      level: 80, 
      description: "Project leadership and team coordination", 
      icon: Crown,
      achievements: ["Led 10+ successful projects", "Strategic decision making", "Team performance optimization"],
      color: "from-orange-500 to-red-500"
    },
    { 
      name: "Time Management", 
      level: 87, 
      description: "Efficient project planning and execution", 
      icon: Clock,
      achievements: ["95% on-time delivery rate", "Agile methodology expert", "Resource optimization specialist"],
      color: "from-indigo-500 to-purple-500"
    },
  ];

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

        {/* Soft Skills - Enhanced Interactive Cards */}
        <div className="fade-on-scroll mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Core Competencies
            </h3>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Target className="w-5 h-5 text-green-400" />
              <span>Professional skills that drive success</span>
              <Target className="w-5 h-5 text-green-400" />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {softSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              const isHovered = hoveredSkill === skill.name;
              
              return (
                <Card 
                  key={skill.name} 
                  className={`group relative project-card border-0 bg-gradient-card overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 ${
                    isHovered ? 'shadow-2xl shadow-purple-500/25' : ''
                  }`}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Floating particles effect */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${10 + i * 10}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  <CardContent className="p-6 relative z-10">
                    {/* Header with icon and level */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </h4>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs font-bold transition-all duration-300 ${
                          isHovered ? 'bg-white/20 text-white' : ''
                        }`}
                      >
                        {skill.level}%
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 group-hover:text-white/80 transition-colors duration-300">
                      {skill.description}
                    </p>

                    {/* Animated progress bar */}
                    <div className="relative mb-4">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${skill.color} progress-bar relative overflow-hidden ${
                            isVisible ? "animate" : ""
                          }`}
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${index * 0.15}s`,
                          }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -skew-x-12 bg-white/20 group-hover:animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements - shown on hover */}
                    <div className={`space-y-2 transition-all duration-500 ${
                      isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className="border-t border-white/10 pt-3">
                        <p className="text-xs font-semibold text-white/90 mb-2 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          Key Achievements
                        </p>
                        {skill.achievements.map((achievement, i) => (
                          <p key={i} className="text-xs text-white/70 mb-1 flex items-center gap-2">
                            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                            {achievement}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Badges - Enhanced with categories */}
        <div className="fade-on-scroll text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Technology Stack
            </h3>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Target className="w-5 h-5 text-orange-400" />
              <span>Tools & frameworks I work with daily</span>
              <Target className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          
          {/* Categorized skill display */}
          <div className="space-y-8">
            {["programming", "frameworks", "databases", "tools"].map((category) => (
              <div key={category} className="group">
                <h4 className="text-lg font-semibold mb-4 capitalize text-white/80 group-hover:text-white transition-colors duration-300">
                  {category === "programming" ? "Languages" : category}
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {technicalSkills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="px-4 py-2 text-sm font-medium hover:scale-110 transition-all duration-300 cursor-default 
                                 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white
                                 hover:shadow-lg hover:shadow-purple-500/25 group-hover:animate-pulse"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress-bar {
          from {
            width: 0;
          }
          to {
            width: var(--target-width);
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
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll-reveal {
          animation: scroll-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .skill-icon-preview {
          transition: all 0.3s ease;
        }

        .skill-icon-preview:hover {
          animation: skill-icon-hover 0.6s ease-in-out;
          background: linear-gradient(45deg, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4));
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
        }

        .progress-bar.animate {
          animation: progress-bar 1.5s ease-out forwards;
        }

        .fade-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-on-scroll.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.9);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default Skills;
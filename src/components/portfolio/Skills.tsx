import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MagicBento from "@/components/ui/MagicBento"; // ✅ your MagicBento component

interface Skill {
  name: string;
  level: number;
  category: "programming" | "frameworks" | "databases" | "tools";
}

interface SoftSkill {
  name: string;
  level: number;
  description: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    { name: "Problem Solving", level: 92, description: "Analytical thinking and creative solutions" },
    { name: "Team Collaboration", level: 88, description: "Effective teamwork and communication" },
    { name: "Communication", level: 85, description: "Clear technical and non-technical communication" },
    { name: "Leadership", level: 80, description: "Project leadership and team coordination" },
    { name: "Time Management", level: 87, description: "Efficient project planning and execution" },
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
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-on-scroll text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="bg-gradient-primary bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for building intelligent solutions and scalable applications
          </p>
        </div>

        {/* ✅ Replace Technical Skills section with MagicBento */}
        <div className="fade-on-scroll mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">Technical Skills</h3>
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

        {/* Soft Skills */}
        <div className="fade-on-scroll">
          <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">Soft Skills</h3>
          <div className="space-y-6">
            {softSkills.map((skill, index) => (
              <Card key={skill.name} className="project-card border-0 bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-foreground">{skill.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {skill.level}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-primary progress-bar ${
                        isVisible ? "animate" : ""
                      }`}
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${index * 0.15}s`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="fade-on-scroll text-center mt-16">
          <h3 className="text-2xl font-semibold mb-8">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technicalSkills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-default"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

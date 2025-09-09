import { useEffect, useRef } from 'react';
import { Code, Brain, Shield, Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import vedantHeadshot from '@/assets/vedant-headshot.jpg';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI & Machine Learning",
      description: "Passionate about developing intelligent systems and ML models for real-world applications"
    },
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: "Full-Stack Development",
      description: "Building scalable web applications with modern technologies and best practices"
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Cybersecurity Awareness",
      description: "Focused on building secure applications and understanding digital privacy"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Team Collaboration",
      description: "Strong communication skills and experience working in collaborative environments"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            Passionate about creating intelligent solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <div className="fade-on-scroll flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20 scale-110"></div>
              <img
                src={vedantHeadshot}
                alt="Vedant Shinde - AI/ML Student and Developer"
                className="relative w-80 h-80 object-cover rounded-2xl shadow-strong border-4 border-card hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6 fade-on-scroll">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                I'm currently a <strong className="text-primary">4th-year BTech student in Artificial Intelligence & Machine Learning</strong>, 
                passionate about leveraging technology to solve complex real-world problems. My journey spans across 
                machine learning, full-stack development, and cybersecurity awareness.
              </p>
              
              <p className="text-lg leading-relaxed text-foreground mb-6">
                I specialize in developing <strong className="text-accent">AI-driven healthcare solutions</strong>, 
                building robust web applications, and creating intelligent systems that make a meaningful impact. 
                My experience ranges from predictive modeling for medical diagnosis to developing enterprise-ready applications.
              </p>

              <p className="text-lg leading-relaxed text-foreground">
                As a <strong className="text-secondary">curious problem-solver and continuous learner</strong>, 
                I thrive in collaborative environments and am always eager to take on new challenges. 
                My goal is to build AI-powered products that enhance human capabilities and create positive change in society.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="fade-on-scroll project-card border-0 bg-gradient-card">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
import { useEffect, useRef, memo } from 'react';
import { Code, Brain, Shield, Users, Lightbulb, Activity, HeartPulse } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import vedantHeadshot from '@/assets/vedant-headhot.jpg';
import PixelBlast from "@/components/ui/pixle-blast";

// Memoized HighlightCard component
const HighlightCard = memo(({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="project-card border-0 bg-gradient-card">
    <CardContent className="p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
));

HighlightCard.displayName = 'HighlightCard';

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
      icon: <Brain className="h-8 w-8 text-primary" aria-label="AI & Machine Learning" />,
      title: "AI & Machine Learning",
      description: "Developing intelligent systems and ML models for real-world applications",
    },
    {
      icon: <Code className="h-8 w-8 text-accent" aria-label="Full-Stack Development" />,
      title: "Full-Stack Development",
      description: "Building scalable web applications with modern technologies",
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" aria-label="Cybersecurity Awareness" />,
      title: "Cybersecurity Awareness",
      description: "Building secure applications and understanding digital privacy",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" aria-label="Team Collaboration" />,
      title: "Team Collaboration",
      description: "Strong communication and experience in collaborative environments",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 bg-muted/30 overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Pixel Blast Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <PixelBlast />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="fade-on-scroll text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Turning ideas into intelligent solutions
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <div className="fade-on-scroll flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20 scale-110"></div>
              <img
                src={vedantHeadshot}
                alt="Vedant Shinde - AI/ML Student and Developer"
                className="relative w-80 h-80 object-cover rounded-2xl shadow-strong border-4 border-card hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Enhanced Bio Content with Icons and Styling */}
          <div className="space-y-6 fade-on-scroll">
            {/* First Paragraph with Hook */}
            <div className="relative p-4 bg-muted/50 rounded-lg border-l-4 border-gradient-primary">
              <p className="text-lg leading-[1.8] text-foreground">
                <span className="font-semibold text-xl">I'm Vedant</span> — a <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">4th-year BTech student</span> in
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold"> Artificial Intelligence & Machine Learning</span>,
                passionate about <span className="font-semibold">leveraging technology to solve real-world problems</span>.
              </p>
              <div className="flex space-x-2 mt-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">AI/ML</span>
                <Code className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Full-Stack</span>
                <Shield className="h-5 w-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Cybersecurity</span>
              </div>
            </div>

            {/* Second Paragraph with Specialization */}
            <div className="relative p-4 bg-muted/50 rounded-lg border-l-4 border-gradient-secondary">
              <p className="text-lg leading-[1.8] text-foreground">
                I specialize in <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-semibold">AI-driven healthcare solutions</span>,
                building <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-semibold">robust web applications</span>,
                and creating <span className="font-semibold">intelligent systems</span> with meaningful impact.
              </p>
              <div className="flex space-x-2 mt-2">
                <HeartPulse className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground">Healthcare AI</span>
                <Activity className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Web Apps</span>
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Intelligent Systems</span>
              </div>
            </div>

            {/* Third Paragraph with Goals */}
            <div className="relative p-4 bg-muted/50 rounded-lg border-l-4 border-gradient-accent">
              <p className="text-lg leading-[1.8] text-foreground">
                As a <span className="font-semibold">curious problem-solver</span> and
                <span className="font-semibold"> continuous learner</span>, I thrive in
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-semibold"> collaborative environments</span>
                and embrace new challenges. My goal is to build <span className="font-semibold">AI-powered products</span> that
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold"> enhance human capabilities</span>
                and create positive societal impact.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
            />
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
        .fade-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .border-gradient-primary {
          border-image: linear-gradient(to bottom, #8b5cf6, #ec4899) 1;
        }
        .border-gradient-secondary {
          border-image: linear-gradient(to bottom, #3b82f6, #06b6d4) 1;
        }
        .border-gradient-accent {
          border-image: linear-gradient(to bottom, #10b981, #059669) 1;
        }
      `}</style>
    </section>
  );
};

export default About;

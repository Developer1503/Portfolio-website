import { useEffect, useRef } from 'react';
import { Calendar, MapPin, Trophy, GraduationCap, Code, Shield, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  type: 'education' | 'hackathon' | 'certification' | 'project' | 'work';
  description: string[];
  technologies?: string[];
  achievements?: string[];
  icon: React.ReactNode;
}

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const timelineItems: TimelineItem[] = [
    {
      id: 'btech-aiml',
      title: 'BTech in Artificial Intelligence & Machine Learning',
      organization: 'DY Patil University',
      location: 'India',
      period: '2022 - 2026',
      type: 'education',
      description: [
        'Specializing in Machine Learning algorithms, Deep Learning, and AI applications',
        'Coursework includes Data Structures, Algorithms, Statistics, and Computer Vision',
        'Final year project on healthcare AI solutions with real-world impact'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn'],
      achievements: ['Academic Excellence Award', 'Dean\'s List 2023-24'],
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 'bluestar-intern',
      title: 'Data Analyst Intern',
      organization: 'Bluestar Pvt Ltd',
      location: 'Wada',
      period: '2026',
      type: 'work',
      description: [
        'Analyzing operational data to identify trends and optimize performance',
        'Creating comprehensive dashboards for data visualization and reporting',
        'Collaborating with cross-functional teams to drive data-driven decision making'
      ],
      technologies: ['Python', 'SQL', 'Excel', 'Power BI', 'Data Analytics'],
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      id: 'canara-hackathon',
      title: 'Canara Bank SuRaksha Cyber Hackathon 2025',
      organization: 'Canara Bank',
      period: 'January 2025',
      type: 'hackathon',
      description: [
        'Developed behavior-based authentication system for enhanced banking security',
        'Focused on fintech data privacy and cybersecurity solutions',
        'Implemented machine learning models for fraud detection and user behavior analysis'
      ],
      technologies: ['Python', 'Machine Learning', 'Cybersecurity', 'Data Analytics'],
      achievements: ['Finalist Position', 'Best Innovation Award'],
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: 'shell-ai-hackathon',
      title: 'Shell.ai Hackathon 2025',
      organization: 'Shell',
      period: 'February 2025',
      type: 'hackathon',
      description: [
        'Tackled Fuel Blend Properties Prediction Challenge using advanced ML techniques',
        'Developed predictive models for optimizing fuel composition and properties',
        'Collaborated with cross-functional teams to deliver innovative energy solutions'
      ],
      technologies: ['Python', 'TensorFlow', 'Data Science', 'Chemical Engineering ML'],
      achievements: ['Top 10 Finalist', 'Technical Excellence Award'],
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 'indegene-hackathon',
      title: 'Indegene Hackathon 2025',
      organization: 'Indegene',
      period: 'March 2025',
      type: 'hackathon',
      description: [
        'Healthcare technology challenge focusing on digital health solutions',
        'Developed AI-powered diagnostic assistance tools for medical professionals',
        'Implemented data-driven approaches for improving patient care outcomes'
      ],
      technologies: ['Healthcare AI', 'Python', 'React', 'Medical Data Analysis'],
      achievements: ['Healthcare Innovation Award', 'People\'s Choice Award'],
      icon: <Code className="h-5 w-5" />
    },
    {
      id: 'ml-projects',
      title: 'Multiple ML/AI Project Certifications',
      organization: 'Various Platforms',
      period: '2023 - 2024',
      type: 'certification',
      description: [
        'Completed comprehensive projects in healthcare AI, NLP, and cybersecurity',
        'Specialized certifications in Data Science and Full-Stack Development',
        'Advanced coursework in Machine Learning Operations (MLOps) and deployment'
      ],
      technologies: ['MLOps', 'Docker', 'AWS', 'CI/CD', 'Model Deployment'],
      achievements: ['98% Average Score', '15+ Completed Certifications'],
      icon: <Trophy className="h-5 w-5" />
    }
  ];

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-primary text-primary-foreground';
      case 'hackathon': return 'bg-accent text-accent-foreground';
      case 'certification': return 'bg-secondary text-secondary-foreground';
      case 'project': return 'bg-muted text-muted-foreground';
      case 'work': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'education': return 'Education';
      case 'hackathon': return 'Hackathon';
      case 'certification': return 'Certification';
      case 'project': return 'Project';
      case 'work': return 'Work Experience';
      default: return 'Other';
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-on-scroll text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="bg-gradient-primary bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through education, hackathons, and continuous learning in AI and technology
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div
                key={item.id}
                className={`fade-on-scroll relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-medium z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card className="project-card border-0 bg-gradient-card">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={`${getTypeColor(item.type)} mb-2`}>
                          {getTypeLabel(item.type)}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {item.period}
                        </div>
                      </div>

                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-base text-muted-foreground">{item.organization}</p>
                            {item.location && (
                              <>
                                <span className="text-muted-foreground">•</span>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {item.description.map((desc, i) => (
                          <li key={i} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {desc}
                          </li>
                        ))}
                      </ul>

                      {item.technologies && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2 text-foreground">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.achievements && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-foreground">Achievements:</h4>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <Trophy className="h-3 w-3 text-accent" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
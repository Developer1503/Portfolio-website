import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Brain, TrendingUp, Heart, FileText, ShoppingCart, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import project images
import parkinsonImage from '@/assets/parkinson-project.jpg';
import currencyImage from '@/assets/currency-project.jpg';
import insightCopilotImage from '@/assets/insight-copilot.jpg';
import furnitureImage from '@/assets/furniture-project.jpg';
import videoSummarizationImage from '@/assets/video-summarization.jpg';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  icon: React.ReactNode;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: 'ml' | 'web' | 'ai';
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 'parkinson-prediction',
      title: "Parkinson's Disease Prediction",
      description: "ML models with SMOTEENN and SHAP explainability for early diagnosis",
      longDescription: "Advanced machine learning pipeline using SVM, Random Forest, and Gradient Boosting with SMOTEENN for handling imbalanced datasets and SHAP for model interpretability in healthcare applications.",
      image: parkinsonImage,
      icon: <Brain className="h-6 w-6" />,
      technologies: ['Python', 'Scikit-learn', 'SHAP', 'SMOTEENN', 'Pandas', 'NumPy'],
      githubUrl: 'https://github.com/Developer1503',
      category: 'ml'
    },
    {
      id: 'currency-exchange',
      title: "Currency Exchange Rate Prediction",
      description: "ML-based forecasting system for financial market analysis",
      longDescription: "Time series forecasting model using advanced ML algorithms to predict currency exchange rates with high accuracy, featuring data visualization and trend analysis.",
      image: currencyImage,
      icon: <TrendingUp className="h-6 w-6" />,
      technologies: ['Python', 'TensorFlow', 'Pandas', 'Matplotlib', 'Seaborn'],
      githubUrl: 'https://github.com/Developer1503',
      category: 'ml'
    },
    {
      id: 'pdf-research-assistant',
      title: "PDF Research Assistant v2.0",
      description: "Enterprise AI-powered PDF analysis with multi-agent CrewAI framework",
      longDescription: "Advanced PDF research tool featuring AI querying, persistent indexed storage, citation verification, multi-document workspace, voice input support, and export to Markdown/JSON/HTML formats. Built with CrewAI multi-agent architecture and Streamlit UI.",
      image: insightCopilotImage,
      icon: <FileText className="h-6 w-6" />,
      technologies: ['Python', 'CrewAI', 'Streamlit', 'LangChain', 'PDF Processing', 'AI Agents'],
      demoUrl: 'https://pdf-crewai-assistant.streamlit.app/',
      githubUrl: 'https://github.com/Developer1503/PDF-crewai',
      category: 'ai'
    },
    {
      id: 'furniture-management',
      title: "Furniture Management Website",
      description: "Full-stack MERN application with modern UI design",
      longDescription: "Complete e-commerce solution for furniture management featuring product catalog, inventory management, user authentication, and payment integration with responsive design.",
      image: furnitureImage,
      icon: <ShoppingCart className="h-6 w-6" />,
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Stripe'],
      demoUrl: '#',
      githubUrl: 'https://github.com/Developer1503',
      category: 'web'
    },
    {
      id: 'video-summarization',
      title: "Video Summarization Tool",
      description: "Python-based application for automatic video content summaries",
      longDescription: "Advanced video processing tool that automatically generates concise summaries of video content using natural language processing and computer vision techniques.",
      image: videoSummarizationImage,
      icon: <Video className="h-6 w-6" />,
      technologies: ['Python', 'OpenCV', 'NLP', 'FFmpeg', 'Transformers'],
      githubUrl: 'https://github.com/Developer1503',
      category: 'ai'
    },
    {
      id: 'diabetes-prediction',
      title: "Diabetes Prediction System",
      description: "End-to-end ML pipeline for healthcare insights and risk assessment",
      longDescription: "Comprehensive healthcare ML solution for diabetes risk prediction featuring data preprocessing, model training, evaluation, and deployment with interactive web interface.",
      image: parkinsonImage, // Reusing similar medical image
      icon: <Heart className="h-6 w-6" />,
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Bootstrap', 'Pandas'],
      demoUrl: '#',
      githubUrl: 'https://github.com/Developer1503',
      category: 'ml'
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ml': return 'bg-primary text-primary-foreground';
      case 'ai': return 'bg-accent text-accent-foreground';
      case 'web': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ml': return 'Machine Learning';
      case 'ai': return 'Artificial Intelligence';
      case 'web': return 'Web Development';
      default: return 'Other';
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-on-scroll text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my work in machine learning, AI development, and full-stack applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="fade-on-scroll project-card border-0 bg-gradient-card group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={`${project.title} - Project Screenshot`}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className={`absolute top-4 left-4 ${getCategoryColor(project.category)}`}>
                  {getCategoryLabel(project.category)}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {project.icon}
                  </div>
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <p className="text-sm text-foreground mb-4 opacity-75">
                  {project.longDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-3">
                  {project.demoUrl && (
                    <Button size="sm" className="flex-1 group">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="flex-1 group">
                      <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="fade-on-scroll text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
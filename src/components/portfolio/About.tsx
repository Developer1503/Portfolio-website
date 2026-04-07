import { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';
import './About.css';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<{ transform: string; transition: string }>({ 
    transform: 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', 
    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' 
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; // Center is 0
    const y = e.clientY - rect.top - rect.height / 2; // Center is 0
    
    // The physics: hover the part makes it heavy -> it pushes 'backward'
    // So if x > 0 (right side), right side pushes back (rotateY negative)
    // If y > 0 (bottom side), bottom side pushes back (rotateX positive)
    const rotateX = (y / (rect.height / 2)) * 6; // max 6 degrees
    const rotateY = -(x / (rect.width / 2)) * 6; // max 6 degrees

    setTiltStyle({
      transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(0.98, 0.98, 0.98)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  const tags = [
    'Machine Learning',
    'Deep Learning',
    'Full-Stack Dev',
    'Computer Vision',
    'NLP',
    'AI in Healthcare',
    'React / Next.js',
    'Python',
    'Data Science',
    'Open Source',
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* Background Decor Elements */}
      <div className="about-bg-grid" />
      <div className="about-crosshair" style={{ top: '15%', left: '10%' }}>+</div>
      <div className="about-crosshair" style={{ top: '80%', left: '85%' }}>+</div>
      <div className="about-crosshair" style={{ top: '25%', left: '85%' }}>+</div>
      <div className="about-crosshair" style={{ top: '85%', left: '15%' }}>+</div>
      
      <div className="about-deco-square" style={{ top: '20%', left: '12%' }} />
      <div className="about-deco-square" style={{ bottom: '15%', right: '12%' }} />
      <div className="about-deco-square" style={{ top: '40%', left: '88%' }} />

      <div className="about-deco-line horizontal" style={{ top: '15%' }} />
      <div className="about-deco-line horizontal" style={{ bottom: '15%' }} />
      <div className="about-deco-line vertical" style={{ left: '10%' }} />
      <div className="about-deco-line vertical" style={{ right: '10%' }} />

      <div className="about-deco-circle about-deco-circle--left" />
      <div className="about-deco-circle about-deco-circle--right" />
      <div className="about-deco-dot" style={{ top: '25%', right: '12%' }} />
      <div className="about-deco-dot" style={{ bottom: '20%', left: '8%' }} />
      <div className="about-deco-dot" style={{ top: '60%', right: '6%' }} />

      {/* Section label above card */}
      <div className="about-section-heading">
        <h2>About Me</h2>
        <div className="heading-line" />
      </div>

      {/* Main card wrapper */}
      <div className={`about-card-wrapper ${isVisible ? 'visible' : ''}`}>

        {/* Vertical side text */}
        <div className="about-side-text">Profile • 2026</div>

        <div 
          ref={cardRef} 
          className="about-card"
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Corner accent (bottom-left) */}
          <div className="card-corner-bl" />

          {/* ── Left: Photo (Default Theme Placeholder) ── */}
          <div className="about-photo-wrapper bg-black/40 flex items-center justify-center border border-white/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <User 
              size={120} 
              strokeWidth={1} 
              className="text-white/20 transition-all duration-700 ease-out z-0 group-hover:scale-110 group-hover:text-white/40" 
            />
            
            {/* Subtle tech accents within frame */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30 z-20" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30 z-20" />
          </div>

          {/* ── Right: Content ── */}
          <div className="about-content">
            {/* Name + Role */}
            <div className="about-header">
              <h2 className="about-name">
                Vedant<br />Shinde
              </h2>
              <span className="about-role-badge">AI/ML Developer</span>
            </div>

            {/* Stats */}
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-label">Type</div>
                <div className="about-stat-value">Developer</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-label">Focus</div>
                <div className="about-stat-value">AI / ML</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-label">Base</div>
                <div className="about-stat-value">India</div>
              </div>
            </div>

            {/* Bio */}
            <p className="about-bio">
              4th-year BTech student in Artificial Intelligence & Machine Learning,
              passionate about building intelligent systems for real-world impact.
              I specialize in AI-driven healthcare solutions, full-stack web
              applications, and creating ML-powered products — sometimes all at once.
              I work with data, models, and code to structure an idea. Sometimes ship it.
            </p>

            {/* Tags */}
            <div className="about-tags">
              {tags.map((tag) => (
                <span key={tag} className="about-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="about-card-footer">
            <span>N°001</span>
            <span>2026 — IN</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

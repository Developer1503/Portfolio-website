import React, { useRef, useState } from 'react';
import './ProjectGallery.css';

// Natural rotation angles for a "hanging" feel
const ROTATIONS = [-1.2, 0.6, -0.9, 0.5, -0.7, 0.8];

interface TicketProps {
  category: 'WEB' | 'DEV' | 'ML' | 'STR';
  hugeTitle: string;
  serviceName: string;
  date: string;
  timelineTop: string[];
  timelineBottom: string[];
  bottomCode: string;
  id: string;
  rotation: number;
}

const categoryColor: Record<string, { tag: string; title: string; bottom: string }> = {
  WEB: { tag: 'tag-color-web', title: '#ff3333', bottom: 'bottom-web' },
  DEV: { tag: 'tag-color-dev', title: '#ffdd00', bottom: 'bottom-dev' },
  ML:  { tag: 'tag-color-ml',  title: '#a8ff3e', bottom: 'bottom-ml'  },
  STR: { tag: 'tag-color-str', title: '#b4ff6a', bottom: 'bottom-str' },
};

const ProjectTicket: React.FC<TicketProps> = ({
  category, hugeTitle, serviceName, date, timelineTop, timelineBottom, bottomCode, id, rotation,
}) => {
  const { tag, title, bottom } = categoryColor[category];

  return (
    <div
      className="ticket-unit"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* ── CARD (rod is masked here, revealed only at hole) ── */}
      <div className="ticket-card">

        {/* Black top section */}
        <div className="card-top-black">
          {/* ── TAG inside card ── */}
          <div className={`ticket-tag ${tag}`}>
            <span className="tag-label">{category}</span>
            <div className="tag-hole-row">
              {/* This hole visually "lets the rod through" */}
              <div className="tag-hole" />
              <span className="tag-date">{date}</span>
            </div>
          </div>
          <span className="pill-id-tag">#{id}</span>
          <h3 className="card-huge-title" style={{ color: title }}>
            {hugeTitle}
          </h3>
        </div>

        {/* Muted colored bottom section */}
        <div className={`card-bottom-colored ${bottom}`}>
          <div className="card-service-header">
            <p className="card-service-label">SERVICE</p>
            <h4 className="card-service-name">{serviceName}</h4>
          </div>

          <div className="card-timeline-container">
            <div className="timeline-labels-top">
              {timelineTop.map((item, i) => (
                <span key={i} className="timeline-item-top">{item}</span>
              ))}
            </div>
            <div className="timeline-line">
              {timelineTop.map((_, i) => (
                <div 
                  key={`tri-top-${i}`} 
                  className="timeline-triangle-up" 
                  style={{ left: `${((i + 1) / (timelineTop.length + 1)) * 100}%` }}
                ></div>
              ))}
              {timelineBottom.map((_, i) => (
                <div 
                  key={`tri-bot-${i}`} 
                  className="timeline-triangle-down" 
                  style={{ left: `${((i + 1) / (timelineBottom.length + 1)) * 100}%` }}
                ></div>
              ))}
            </div>
            <div className="timeline-labels-bottom">
              {timelineBottom.map((item, i) => (
                <span key={i} className="timeline-item-bottom">{item}</span>
              ))}
            </div>
          </div>

          <div className="dashed-divider-horizontal"></div>

          <div className="card-bottom-huge-text">
            {bottomCode}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── GALLERY COMPONENT ── */
const ProjectGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const projects = [
    {
      id: '01', category: 'WEB' as const,
      hugeTitle: 'WEB', serviceName: 'WEB DESIGN',
      date: '05-20-23', 
      timelineTop: ['UX', 'Prototypes', 'Components', 'Design Systems'],
      timelineBottom: ['Wireframes', 'Interactions', 'User Journeys'],
      bottomCode: 'WIR → PRO'
    },
    {
      id: '02', category: 'DEV' as const,
      hugeTitle: 'DEV', serviceName: 'WEB DEVELOPMENT',
      date: '02-10-03', 
      timelineTop: ['CSS/HTML/JS', 'GSAP', 'Astro', 'Git'],
      timelineBottom: ['Wordpress', 'Bricks', 'Agentic', 'Cursor'],
      bottomCode: 'FRO → BCK'
    },
    {
      id: '03', category: 'STR' as const,
      hugeTitle: 'STR', serviceName: 'BRAND STRATEGY',
      date: '11-02-24',
      timelineTop: ['Interviews', 'Reports', 'Personality'],
      timelineBottom: ['Workshops', 'Naming', 'Values'],
      bottomCode: 'B2B → B2C'
    },
    {
      id: '04', category: 'ML' as const,
      hugeTitle: 'AI', serviceName: 'AI AGENTS',
      date: '08-15-24', 
      timelineTop: ['LangChain', 'CrewAI', 'Vector DBs', 'RAG'],
      timelineBottom: ['OpenAI', 'Anthropic', 'Local Models'],
      bottomCode: 'PRM → RSN'
    },
    {
      id: '05', category: 'WEB' as const,
      hugeTitle: 'FIN', serviceName: 'FINTECH ORACLE',
      date: '03-08-24', 
      timelineTop: ['Time-Series', 'Volatility', 'Forecasting'],
      timelineBottom: ['Pandas', 'TensorFlow', 'Analysis'],
      bottomCode: 'DAT → INS'
    },
    {
      id: '06', category: 'DEV' as const,
      hugeTitle: 'ANLY', serviceName: 'ANALYTICS DASH',
      date: '07-20-24', 
      timelineTop: ['Sentiment', 'Dashboard', 'Real-time'],
      timelineBottom: ['Streamlit', 'NLP', 'Tracking'],
      bottomCode: 'RAW → VIZ'
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    scrollRef.current.classList.add('active');
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    setIsDown(false);
    scrollRef.current?.classList.remove('active');
  };
  const handleMouseUp = () => {
    setIsDown(false);
    scrollRef.current?.classList.remove('active');
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
  };

  return (
    <section id="project-gallery" className="project-gallery-section">
      {/* Header */}
      <header className="gallery-header">
        <h2 className="gallery-title">Projects</h2>
        <p className="gallery-header-desc">
          I'm a full-stack creative developer who can take any project from ground zero
          to an award-worthy launch. Browse the catalogue and{' '}
          <a href="#contact" className="underline">get in touch</a>.
        </p>
      </header>

      {/* Rod + Cards */}
      <div className="gallery-rod-wrapper">
        {/* Global metal rod — z-index 4 */}
        <div className="gallery-rod" />

        {/* Scrollable draggable area — z-index 10, ABOVE rod */}
        <div
          className="gallery-cards-viewport"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {projects.map((p, i) => (
            <ProjectTicket
              key={i}
              {...p}
              rotation={ROTATIONS[i % ROTATIONS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;

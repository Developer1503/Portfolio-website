import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SignalCanvas from './SignalCanvas';
import { useSignalTuner } from '@/hooks/useSignalTuner';
import { Github, Linkedin, Mail } from 'lucide-react';
import ResumePDF from '@/assets/Vedant14.pdf';

// ─── Google Font import for wide italic heading ─────────────────────────────
// Using "Outfit" for the wide bold look, italic via CSS skew
// Space Grotesk is already available; we'll use a wide/extended style

// ─── Glitch Text ──────────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.-_/:#%&';

function useGlitchText(target: string, strength: number, isLocked: boolean) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rafRef.current) clearInterval(rafRef.current);

    if (isLocked || strength >= 0.95) {
      setDisplay(target);
      return;
    }

    rafRef.current = setInterval(() => {
      setDisplay(
        target
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            const revealRatio = Math.pow(strength, 1.5);
            if (Math.random() < revealRatio) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
    }, 120);

    return () => {
      if (rafRef.current) clearInterval(rafRef.current);
    };
  }, [target, strength, isLocked]);

  return display;
}

// ─── Grid Background (fine subtle grid like reference) ───────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

// ─── Frequency Slider ────────────────────────────────────────────────────────
interface FrequencySliderProps {
  frequency: number;
  freqMin: number;
  freqMax: number;
  onFrequencyChange: (f: number) => void;
  signalStrength: number;
  isLocked?: boolean;
}

function FrequencySlider({ frequency, freqMin, freqMax, onFrequencyChange, signalStrength, isLocked }: FrequencySliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const calcFreq = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onFrequencyChange(parseFloat((freqMin + ratio * (freqMax - freqMin)).toFixed(1)));
  }, [freqMin, freqMax, onFrequencyChange]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging.current) calcFreq(e.clientX); };
    const onMouseUp = () => { isDragging.current = false; };
    const onTouchMove = (e: TouchEvent) => { if (isDragging.current) calcFreq(e.touches[0].clientX); };
    const onTouchEnd = () => { isDragging.current = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [calcFreq]);

  const pct = ((frequency - freqMin) / (freqMax - freqMin)) * 100;
  const ticks = [88, 92, 96, 100, 104, 108];

  return (
    <div className="flex items-center gap-6 sm:gap-12 w-full select-none">
      {/* Slider area */}
      <div className="flex-1">
        {/* Track */}
        <div
          ref={trackRef}
          className="relative cursor-pointer py-6 -my-6"
          onMouseDown={(e) => { isDragging.current = true; calcFreq(e.clientX); }}
          onTouchStart={(e) => { isDragging.current = true; calcFreq(e.touches[0].clientX); }}
        >
          {/* Main Track line — thin horizontal line */}
          <div className="w-full h-[1px] bg-white/20 relative">
             {/* Draw tiny ticks for each major number */}
             {ticks.map((t) => {
               const tickPct = ((t - freqMin) / (freqMax - freqMin)) * 100;
               return (
                 <div 
                   key={t}
                   className="absolute top-0 w-[1px] h-1.5 bg-white/10"
                   style={{ left: `${tickPct}%` }}
                 />
               );
             })}
          </div>

          {/* Slider puck / needle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center justify-center z-10"
            style={{ left: `${pct}%`, transition: isDragging.current ? 'none' : 'left 0.1s ease-out' }}
          >
            {isLocked ? (
              // Locked state puck (cyan circle with purple dot)
              <div 
                className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                style={{
                  border: '1.5px solid rgba(34, 211, 238, 0.6)',
                  boxShadow: '0 0 25px rgba(34, 211, 238, 0.4), inset 0 0 12px rgba(34, 211, 238, 0.3)',
                  background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 60%)'
                }}
              >
                {/* Purple dot */}
                <div 
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full z-10"
                  style={{
                    backgroundColor: '#B163FF',
                    boxShadow: '0 0 12px rgba(177, 99, 255, 0.9)'
                  }}
                />
                {/* Vertical white line pointing up */}
                <div className="absolute top-0 bottom-1/2 w-[1.5px] bg-white/90" />
              </div>
            ) : (
              // Searching state needle (simple vertical line with faint dot on top)
              <div className="flex flex-col items-center justify-end">
                <div className="w-[2px] h-[2px] bg-white/70 rounded-full mb-[2px] shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                <div className="w-[1.5px] h-5 bg-white/60" />
              </div>
            )}
          </div>
        </div>

        {/* Tick labels */}
        <div className="flex justify-between mt-4 pointer-events-none relative z-0 px-[1px]">
          {ticks.map(t => (
            <span key={t} className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/40">
              {t}
            </span>
          ))}
        </div>
        
        {/* Drag instruction text */}
        <div className="text-center mt-6 font-mono text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-white/40 uppercase pointer-events-none">
          Drag horizontally to tune the signal
        </div>
      </div>
    </div>
  );
}

// ─── Contact Reveal (text area) ──────────────────────────────────────────────
interface ContactRevealProps {
  signalStrength: number;
  isLocked: boolean;
}

function ContactReveal({ signalStrength, isLocked }: ContactRevealProps) {
  const nameText = useGlitchText('HELLO, THERE...', signalStrength, isLocked);
  const emailText = useGlitchText('vedantshinde305@gmail.com', signalStrength, isLocked);

  return (
    <div className="text-center pointer-events-none w-full">
      {/* "CONTACT" label — small, centered, spaced */}
      <div className="mb-6 sm:mb-8">
        <span
          className="text-[10px] sm:text-xs tracking-[0.35em] uppercase"
          style={{ color: 'rgba(180,200,180,0.5)' }}
        >
          CONTACT
        </span>
      </div>

      {/* Big heading — wide italic bold */}
      <h2
        className="text-[3rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-black uppercase leading-[0.9] relative z-10"
        style={{
          fontFamily: "'Inter', 'Space Grotesk', sans-serif",
          fontStyle: 'italic',
          color: isLocked ? 'rgba(230,230,230,1)' : 'rgba(130,130,130,0.55)',
          letterSpacing: '-0.03em',
          transition: 'color 0.8s ease',
          fontStretch: 'expanded',
        }}
      >
        {nameText}
      </h2>

      {/* Email with underline */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2">
        <span
          className="text-sm sm:text-base md:text-lg font-light tracking-[0.08em]"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: isLocked ? 'rgba(220,220,220,0.85)' : 'rgba(160,160,160,0.5)',
            transition: 'color 0.8s ease',
          }}
        >
          {emailText}
        </span>
        {/* Thin underline below email */}
        <div
          className="h-[1px] mt-1"
          style={{
            width: '200px',
            background: isLocked
              ? 'linear-gradient(90deg, transparent, rgba(220,220,220,0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(150,150,150,0.15), transparent)',
            transition: 'background 0.8s ease',
          }}
        />
      </div>

      {/* Revealed links */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            key="links"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-5 pointer-events-auto"
          >
            <a
              href="mailto:vedantshinde305@gmail.com"
              className="group flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] px-5 py-2.5 border border-white/10 rounded-full text-white/40 hover:text-white/80 hover:border-white/30 transition-all duration-400"
            >
              <Mail size={12} /> EMAIL
            </a>
            <a
              href="https://github.com/Developer1503"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] px-5 py-2.5 border border-white/10 rounded-full text-white/40 hover:text-white/80 hover:border-white/30 transition-all duration-400"
            >
              <Github size={12} /> GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/vedant-shinde-119866242/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] px-5 py-2.5 border border-white/10 rounded-full text-white/40 hover:text-white/80 hover:border-white/30 transition-all duration-400"
            >
              <Linkedin size={12} /> LINKEDIN
            </a>
            <a
              href={ResumePDF}
              download
              className="group flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] px-5 py-2.5 bg-white/5 border border-white/15 rounded-full text-white/60 hover:bg-white/10 hover:text-white/90 transition-all duration-400"
            >
              ↓ RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Contact Component ───────────────────────────────────────────────────
export default function Contact() {
  const signal = useSignalTuner();
  const sectionRef = useRef<HTMLElement>(null);

  // Dragging logic
  const isDraggingCanvas = useRef(false);
  const startX = useRef(0);
  const startFreq = useRef(0);

  const handleDragDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingCanvas.current = true;
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startFreq.current = signal.frequency;
  };

  useEffect(() => {
    const handleUp = () => { isDraggingCanvas.current = false; };
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingCanvas.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = x - startX.current;
      const windowWidth = window.innerWidth;
      const newFreq = startFreq.current - (delta / windowWidth) * 10;
      signal.setFrequency(newFreq);
    };

    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [signal]);

  // Wheel scroll removed as per user request

  // Status
  const statusLabel = signal.isLocked
    ? 'SIGNAL LOCKED'
    : signal.signalStrength > 0.3
      ? 'SIGNAL DETECTED...'
      : 'SEARCHING FOR SIGNAL...';

  const statusColor = signal.isLocked
    ? '#64ffb4'
    : signal.signalStrength > 0.3
      ? 'rgba(255,220,100,0.7)'
      : 'rgba(160,160,160,0.4)';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{
        background: '#050507',
        minHeight: '100vh',
        height: '100vh',
      }}
    >
      {/* Grid background */}
      <GridBackground />

      {/* ── Status indicator (top right) ─────────────────────────────── */}
      <div className="absolute top-20 right-10 flex items-center gap-2.5 z-30 pointer-events-none">
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: statusColor }}
          animate={{
            opacity: signal.isLocked ? [1, 0.3, 1] : 1,
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <span
          className="text-[10px] font-mono tracking-[0.2em] uppercase"
          style={{ color: statusColor }}
        >
          {statusLabel}
        </span>
      </div>

      {/* ── Main content area (drag to tune) ─────────────────────────── */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center cursor-ew-resize select-none"
        onMouseDown={handleDragDown}
        onTouchStart={handleDragDown}
      >
        {/* Waveform — full width, passing through the text */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SignalCanvas
            signalStrength={signal.signalStrength}
            isLocked={signal.isLocked}
          />
        </div>

        {/* Text content — centered, overlapping the wave */}
        <div className="relative z-10 w-full px-6 sm:px-12 max-w-6xl mx-auto">
          <ContactReveal
            signalStrength={signal.signalStrength}
            isLocked={signal.isLocked}
          />
        </div>
      </div>

      {/* ── Bottom controls ──────────────────────────────────────────── */}
      <div className="relative z-20 w-full px-8 sm:px-16 pb-12 pt-4">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          
          {/* Main tuning area encompassing frequency readout, track, and instruction */}
          <div className="w-full relative">
            {/* Frequency readout centered above the track */}
            <div className="text-center mb-6 font-mono text-[11px] sm:text-[12px] tracking-[0.2em] text-white/60 flex items-center justify-center gap-4">
              <span>{signal.frequency.toFixed(1)} MHZ</span>
              <span className="text-white/20">|</span>
              <span>SNR {signal.snr >= 0 ? '' : ''}{signal.snr}.0 DB</span>
            </div>

            {/* Slider + Knob wrapper */}
            <FrequencySlider
              frequency={signal.frequency}
              freqMin={signal.freqMin}
              freqMax={signal.freqMax}
              onFrequencyChange={signal.setFrequency}
              signalStrength={signal.signalStrength}
              isLocked={signal.isLocked}
            />
          </div>
          
        </div>
      </div>

      {/* Locked ambient glow */}
      <AnimatePresence>
        {signal.isLocked && (
          <motion.div
            key="glow"
            className="absolute inset-0 pointer-events-none z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(100,255,180,0.025) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

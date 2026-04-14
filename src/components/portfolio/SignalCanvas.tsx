import { useEffect, useRef } from 'react';

interface SignalCanvasProps {
  signalStrength: number; // 0–1
  isLocked: boolean;
}

/**
 * Renders a single thin flowing waveform line across the full width.
 * - Low signal → erratic high-frequency noise
 * - High signal → smooth gentle sine wave
 * - Locked → calm smooth sine with subtle glow
 *
 * Matches the reference: a single thin white/grey line flowing
 * through the text area like a radio oscilloscope trace.
 */
export default function SignalCanvas({ signalStrength, isLocked }: SignalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const phaseRef = useRef(0);
  const strengthRef = useRef(signalStrength);
  const lockedRef = useRef(isLocked);

  strengthRef.current = signalStrength;
  lockedRef.current = isLocked;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let lastTime = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    // Noise function — layered sinusoids for organic feel
    const noise = (x: number, t: number) =>
      Math.sin(x * 2.3 + t * 0.9) * 0.4 +
      Math.sin(x * 5.7 - t * 1.7) * 0.25 +
      Math.sin(x * 11.3 + t * 0.5) * 0.15 +
      Math.sin(x * 17.1 - t * 2.1) * 0.1 +
      Math.sin(x * 23.7 + t * 3.3) * 0.1;

    function draw(ts: number) {
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
      phaseRef.current += dt * 0.8;

      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const cy = h / 2;
      const s = strengthRef.current;
      const locked = lockedRef.current;
      const t = phaseRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Single flowing waveform line ─────────────────────────────────
      ctx.beginPath();

      const steps = Math.max(500, w);
      // Amplitude: noisy state = larger, locked = gentle smooth waves
      const noiseAmp = h * 0.28;
      const lockedAmp = h * 0.15;

      // Use a sharper curve so sine dominates earlier
      const smoothS = Math.pow(s, 1.8);

      for (let i = 0; i <= steps; i++) {
        const ratio = i / steps;
        const x = ratio * w;
        const nx = ratio * Math.PI * 10;

        // Chaotic noise component
        const noiseY = noise(nx, t) * noiseAmp;

        // Smooth sine component — gentle long-wavelength wave (like reference)
        const sineY =
          Math.sin(nx * 0.2 + t * 0.8) * lockedAmp * 1.0 +
          Math.sin(nx * 0.12 - t * 0.4) * lockedAmp * 0.5 +
          Math.sin(nx * 0.07 + t * 0.3) * lockedAmp * 0.2;

        // Interpolate — smoothS makes the transition clean
        const y = cy + noiseY * (1 - smoothS) + sineY * smoothS;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Styling — thin line, subtle glow
      if (locked) {
        ctx.strokeStyle = 'rgba(210, 220, 215, 0.6)';
        ctx.shadowColor = 'rgba(200, 255, 230, 0.4)';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.0;
      } else {
        const brightness = 150 + s * 70;
        ctx.strokeStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${0.35 + s * 0.3})`;
        ctx.shadowColor = `rgba(200, 200, 200, ${0.1 + s * 0.2})`;
        ctx.shadowBlur = 2 + s * 6;
        ctx.lineWidth = 0.8 + s * 0.4;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

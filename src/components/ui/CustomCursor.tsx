import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);

  // Position that mouse is currently at
  const mouse = useRef({ x: 0, y: 0 });
  
  // Position the dot and ring are currently at
  const dot = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animate = () => {
      // Linear interpolation for smooth trailing
      dot.current.x += (mouse.current.x - dot.current.x) * 0.3;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.3;

      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Initial position trigger to hide before first move
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // Click effect
  useEffect(() => {
    const handleMouseDown = () => {
      if (ringRef.current) ringRef.current.style.transform += ' scale(0.8)';
    };
    const handleMouseUp = () => {
      if (ringRef.current) ringRef.current.style.transform = ringRef.current.style.transform.replace(' scale(0.8)', '');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      />
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      />
    </>
  );
};

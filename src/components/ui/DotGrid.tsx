
import React, { useEffect, useRef } from 'react';
import './DotGrid.css';

interface DotGridProps {
    className?: string;
    gridSize?: number;
    dotSize?: number;
    dotColor?: string;
    dotColorHover?: string;
}

const DotGrid: React.FC<DotGridProps> = ({
    className = '',
    gridSize = 40,
    dotSize = 2,
    dotColor = 'rgba(120, 120, 120, 0.3)',
    dotColorHover = 'rgba(100, 100, 255, 0.8)',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const updateSize = () => {
            if (!containerRef.current) return;
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // Use ResizeObserver for accurate sizing
        const resizeObserver = new ResizeObserver(() => updateSize());
        resizeObserver.observe(containerRef.current);

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate relative position even if hovering over other elements
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Only update if near/inside the container
            if (x > -100 && x < width + 100 && y > -100 && y < height + 100) {
                mousePos.current = { x, y };
            } else {
                mousePos.current = { x: -1000, y: -1000 };
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / gridSize);
            const rows = Math.ceil(height / gridSize);

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const x = i * gridSize;
                    const y = j * gridSize;

                    const dx = mousePos.current.x - x;
                    const dy = mousePos.current.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 200; // Increased interaction radius

                    let currentDotSize = dotSize;
                    let currentColor = dotColor;

                    if (dist < maxDist) {
                        const scale = 1 + (maxDist - dist) / maxDist;
                        currentDotSize = dotSize * scale;
                        currentColor = dotColorHover;
                    }

                    ctx.fillStyle = currentColor;
                    ctx.beginPath();
                    ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Listen to window to catch moves over overlaying content
        window.addEventListener('mousemove', handleMouseMove);
        updateSize(); // Initial size
        draw();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gridSize, dotSize, dotColor, dotColorHover]);

    return (
        <div ref={containerRef} className={`dot-grid ${className}`}>
            <div className="dot-grid__wrap">
                <canvas ref={canvasRef} className="dot-grid__canvas" />
            </div>
        </div>
    );
};

export default DotGrid;

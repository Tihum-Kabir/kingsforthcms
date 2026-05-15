import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  intensity?: number;
}

export function AnimatedBackground({ intensity = 1 }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 80;
      const alpha = 0.03 * intensity;
      
      time += 0.0005;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offset = Math.sin(time + x * 0.001 + y * 0.001) * 20;
          
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + gridSize + offset, y);
          ctx.lineTo(x + gridSize + offset, y + gridSize);
          ctx.stroke();

          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + gridSize - offset);
          ctx.lineTo(x + gridSize, y + gridSize - offset);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(drawPattern);
    };

    drawPattern();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: intensity }}
    />
  );
}

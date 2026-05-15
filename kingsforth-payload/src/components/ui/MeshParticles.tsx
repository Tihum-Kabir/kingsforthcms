'use client';
import { useEffect, useRef } from 'react';

interface Props {
    /** Max particles — keep low for performance */
    count?: number;
    /** Connection draw distance in px */
    linkDist?: number;
    /** Particle color (CSS) */
    color?: string;
    className?: string;
}

export function MeshParticles({
    count = 38,
    linkDist = 130,
    color = '#22d3ee',
    className = '',
}: Props) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = 0, H = 0, raf = 0;
        let last = 0;
        const FPS_CAP = 30;
        const INTERVAL = 1000 / FPS_CAP;

        // Parse color to rgba helper
        const hexToRgb = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        };
        const rgb = color.startsWith('#') ? hexToRgb(color) : { r: 34, g: 211, b: 238 };

        interface Dot { x: number; y: number; vx: number; vy: number; r: number; }
        let dots: Dot[] = [];

        const resize = () => {
            W = canvas.offsetWidth;
            H = canvas.offsetHeight;
            canvas.width = W;
            canvas.height = H;
        };

        const init = () => {
            dots = Array.from({ length: count }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.8,
            }));
        };

        const draw = (ts: number) => {
            raf = requestAnimationFrame(draw);
            if (ts - last < INTERVAL) return;
            last = ts;

            ctx.clearRect(0, 0, W, H);

            // Move & wrap
            for (const d of dots) {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < 0) d.x = W;
                if (d.x > W) d.x = 0;
                if (d.y < 0) d.y = H;
                if (d.y > H) d.y = 0;
            }

            // Draw links
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < linkDist) {
                        const alpha = (1 - dist / linkDist) * 0.25;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw dots
            for (const d of dots) {
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`;
                ctx.fill();
            }
        };

        const onVisibilityChange = () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else raf = requestAnimationFrame(draw);
        };

        resize();
        init();
        raf = requestAnimationFrame(draw);

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [count, linkDist, color]);

    return (
        <canvas
            ref={ref}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            aria-hidden="true"
        />
    );
}

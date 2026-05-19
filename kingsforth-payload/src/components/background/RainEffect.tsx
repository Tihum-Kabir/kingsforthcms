'use client';

import { useEffect, useRef } from 'react';

interface Drop {
    x: number;
    y: number;
    len: number;
    speed: number;
    opacity: number;
    width: number;
}

const WIND     = 0.20;
const FRAME_MS = 1000 / 30; // 30 fps cap — half GPU cost vs 60 fps, rain still looks smooth

export function RainEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });

        const COUNT = window.innerWidth < 768 ? 30 : 60;

        const drops: Drop[] = Array.from({ length: COUNT }, () => ({
            x:       Math.random() * window.innerWidth,
            y:       Math.random() * window.innerHeight,
            len:     Math.random() * 60 + 25,
            speed:   Math.random() * 5 + 7,
            opacity: Math.random() * 0.45 + 0.3,
            width:   Math.random() * 1.0 + 0.6,
        }));

        let raf: number;
        let lastTime = 0;

        const draw = (now: number) => {
            raf = requestAnimationFrame(draw);
            if (now - lastTime < FRAME_MS) return;
            lastTime = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const dark = document.documentElement.classList.contains('dark');

            // Set shared state once — no per-drop save/restore or gradient alloc
            ctx.lineCap = 'round';

            for (const d of drops) {
                const dx = d.len * WIND;
                const dy = d.len;

                ctx.beginPath();
                ctx.lineWidth  = d.width;
                ctx.strokeStyle = dark
                    ? `rgba(160, 220, 255, ${d.opacity})`
                    : `rgba(40, 55, 120, ${d.opacity})`;
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x + dx, d.y + dy);
                ctx.stroke();

                d.y += d.speed;
                d.x += d.speed * WIND;

                if (d.y > canvas.height + d.len) {
                    d.y = -d.len - Math.random() * 120;
                    d.x = Math.random() * canvas.width;
                }
                if (d.x > canvas.width + 30) d.x = -30;
            }
        };

        raf = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-screen h-screen pointer-events-none z-[-5]"
        />
    );
}

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

/**
 * Interactive particle system:
 * - Day mode: floating golden dust motes / light particles that react to mouse
 * - Night mode: rain streaks falling + interactive glow near cursor
 */
export function TsParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -1000, y: -1000 };
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const currentTheme = theme === 'system' ? systemTheme : theme;
        const isDark = currentTheme === 'dark';

        let animId: number;

        // ─── RAIN DROPS (Night mode) ─────────────────────────────────────
        interface RainDrop {
            x: number; y: number; length: number; speed: number; opacity: number; width: number;
        }

        // ─── DUST MOTES (Day mode - Fireflies) ───────────────────────────────────────
        interface DustMote {
            x: number; y: number; radius: number; opacity: number;
            vx: number; vy: number; baseOpacity: number; phase: number;
        }

        // ─── BUBBLES AND LINES (Day mode - Scroll Particles) ─────────
        interface Bubble {
            x: number; y: number; r: number; vx: number; vy: number; baseOpacity: number;
        }
        interface Line {
            x: number; y: number; length: number; angle: number;
            vx: number; vy: number; spin: number; baseOpacity: number;
        }

        let rainDrops: RainDrop[] = [];
        let dustMotes: DustMote[] = [];
        let bubbles: Bubble[] = [];
        let lines: Line[] = [];

        // ─── Rain init ──────────────────────────────────────────────────
        const createDrop = (randomY: boolean, isNightTheme: boolean): RainDrop => ({
            x: Math.random() * (canvas.width + 200) - 100,
            y: randomY ? Math.random() * canvas.height : -20 - Math.random() * 300,
            length: isNightTheme
                ? 10 + Math.random() * 30   // night: mix of short and long streaks
                : 8  + Math.random() * 20,
            speed: isNightTheme
                ? 7  + Math.random() * 14
                : 5  + Math.random() * 9,
            opacity: isNightTheme
                ? 0.08 + Math.random() * 0.22
                : 0.25 + Math.random() * 0.35,
            width: isNightTheme
                ? 0.5 + Math.random() * 1.2
                : 0.8 + Math.random() * 1.6,
        });

        const initRain = (isNightTheme: boolean) => {
            rainDrops = [];
            // Increased density — capped at 160 to stay well within 60fps budget at 30fps gate
            const density = isNightTheme ? 0.10 : 0.07;
            const count = Math.min(160, Math.floor(canvas.width * density));
            for (let i = 0; i < count; i++) {
                rainDrops.push(createDrop(true, isNightTheme));
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initRain(isDark);
        };

        const initBubblesLines = () => {
            bubbles = [];
            lines = [];
            // Optimize memory by limiting particle counts
            const bubbleCount = Math.floor(canvas.width * 0.02);
            for (let i = 0; i < bubbleCount; i++) {
                bubbles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 4 + 2,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4 - 0.2,
                    baseOpacity: Math.random() * 0.4 + 0.1
                });
            }
            const lineCount = Math.floor(canvas.width * 0.015);
            for (let i = 0; i < lineCount; i++) {
                lines.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    length: Math.random() * 10 + 4,
                    angle: Math.random() * Math.PI * 2,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4 - 0.2,
                    spin: (Math.random() - 0.5) * 0.03,
                    baseOpacity: Math.random() * 0.4 + 0.1
                });
            }
        };

        // ─── Animation Loop — capped at 30fps (background, half GPU cost) ───
        let time = 0;
        let lastTs = 0;
        const animate = (ts: number) => {
            animId = requestAnimationFrame(animate);
            if (ts - lastTs < 32) return; // ~30fps gate
            lastTs = ts;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.033;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // ── RAIN STREAKS AND INTERACTIVE GLOW ──────────────
            const angle = 0.08;

            for (const drop of rainDrops) {
                const dx = drop.x - mx;
                const dy = drop.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Repel effect from cursor
                if (dist < 120) {
                    const repel = (1 - dist / 120) * 1.5;
                    drop.x += (dx / dist) * repel;
                }

                ctx.beginPath();
                
                if (isDark) {
                    // Yellow/Orange streetlamp glow near cursor in night theme
                    const glowBoost = dist < 200 ? (1 - dist / 200) * 0.4 : 0;
                    const r = 255;
                    const g = 190 + glowBoost * 20;
                    const b = 80 + glowBoost * 20;
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${drop.opacity + glowBoost})`;
                    ctx.lineWidth = drop.width + glowBoost * 0.8;
                } else {
                    // Dark grayish-blue rain for day theme to make it heavily visible
                    ctx.strokeStyle = `rgba(30, 40, 50, ${drop.opacity})`;
                    ctx.lineWidth = drop.width;
                }

                ctx.lineCap = 'round';

                const ddx = Math.sin(angle) * drop.length;
                const ddy = Math.cos(angle) * drop.length;
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x + ddx, drop.y + ddy);
                ctx.stroke();

                drop.y += drop.speed;
                drop.x += drop.speed * Math.sin(angle);

                if (drop.y > canvas.height + 50) {
                    Object.assign(drop, createDrop(false, isDark));
                }
            }

        };

        window.addEventListener('resize', resize);
        resize();
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, [mounted, theme, systemTheme]);

    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ opacity: 0.85 }}
        />
    );
}

'use client';

import { useEffect, useRef } from 'react';

// Trail length — more segments = longer tail
const N    = 22;
// How often (every N frames) a new point is pushed into the trail
const PUSH = 2;
// Lerp speed for the lagging ring (smooth follow)
const LERP = 0.10;

export function CursorTrail() {
    const cvs  = useRef<HTMLCanvasElement>(null);
    const raf  = useRef<number>(0);

    const mx    = useRef(-2000); const my    = useRef(-2000);
    const rx    = useRef(-2000); const ry    = useRef(-2000);
    const scale = useRef(1);
    const trail = useRef(new Float32Array(N * 2).fill(-2000));
    const frame = useRef(0);
    const hover = useRef(false);
    const alive = useRef(false);

    useEffect(() => {
        // Skip on touch devices — no cursor needed
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const canvas = cvs.current!;
        const ctx    = canvas.getContext('2d', { alpha: true })!;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // DO NOT hide OS cursor — we only add a trail on top of the native cursor
        // document.documentElement.classList.add('custom-cursor-active');

        const onMove = (e: MouseEvent) => {
            const px = e.clientX, py = e.clientY;
            if (!alive.current) {
                for (let i = 0; i < N * 2; i += 2) {
                    trail.current[i]     = px;
                    trail.current[i + 1] = py;
                }
                rx.current = px; ry.current = py;
                alive.current = true;
            }
            mx.current = px; my.current = py;
        };

        const onOver = (e: MouseEvent) => {
            hover.current = !!(e.target as Element)?.closest?.('a,button,[role="button"],[data-cursor]');
        };

        const animate = () => {
            raf.current = requestAnimationFrame(animate);
            if (!alive.current) return;

            // Smoothly lerp the lagging ring towards the cursor
            rx.current += (mx.current - rx.current) * LERP;
            ry.current += (my.current - ry.current) * LERP;

            // Scale up ring on hover
            const targetScale = hover.current ? 1.6 : 1;
            scale.current += (targetScale - scale.current) * 0.12;

            // Push a new trail point every PUSH frames
            frame.current++;
            if (frame.current % PUSH === 0) {
                trail.current.copyWithin(2, 0);
                trail.current[0] = mx.current;
                trail.current[1] = my.current;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const t = trail.current;

            // Build the smooth quadratic bezier path through all trail points
            const buildPath = () => {
                ctx.beginPath();
                ctx.moveTo(t[0], t[1]);
                for (let i = 0; i < (N - 2) * 2; i += 2) {
                    const x0 = t[i],     y0 = t[i + 1];
                    const x1 = t[i + 2], y1 = t[i + 3];
                    ctx.quadraticCurveTo(x0, y0, (x0 + x1) * 0.5, (y0 + y1) * 0.5);
                }
                ctx.lineTo(t[(N - 1) * 2], t[(N - 1) * 2 + 1]);
            };

            // ── Pass 1: fat glow halo behind the trail ───────────────────
            ctx.save();
            ctx.shadowColor = '#22d3ee';
            ctx.shadowBlur  = 16;
            ctx.strokeStyle = 'rgba(34,211,238,0.14)';
            ctx.lineWidth   = 7;
            ctx.lineCap     = 'round';
            ctx.lineJoin    = 'round';
            buildPath();
            ctx.stroke();
            ctx.restore();

            // ── Pass 2: vivid comet — cyan → purple gradient ──────────────
            const x0 = t[0], y0 = t[1];
            const xN = t[(N - 1) * 2], yN = t[(N - 1) * 2 + 1];
            const grad = ctx.createLinearGradient(x0, y0, xN, yN);
            grad.addColorStop(0,    'rgba(255,255,255,0.0)');
            grad.addColorStop(0.04, 'rgba(255,255,255,0.9)');
            grad.addColorStop(0.18, 'rgba(34,211,238,0.80)');
            grad.addColorStop(0.50, 'rgba(139,92,246,0.40)');
            grad.addColorStop(1,    'rgba(139,92,246,0.0)');
            ctx.strokeStyle = grad;
            ctx.lineWidth   = 2;
            ctx.lineCap     = 'round';
            ctx.lineJoin    = 'round';
            buildPath();
            ctx.stroke();

            // ── Pass 3: bright cyan tip dot at head ───────────────────────
            ctx.save();
            ctx.shadowColor = '#22d3ee';
            ctx.shadowBlur  = 22;
            ctx.fillStyle   = 'rgba(34,211,238,0.95)';
            ctx.beginPath();
            ctx.arc(t[0], t[1], 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // ── Lag ring — subtle hollow ring that trails behind ──────────
            ctx.save();
            const ringR = hover.current ? 10 * scale.current : 7 * scale.current;
            ctx.shadowColor = hover.current ? '#22d3ee' : 'rgba(255,255,255,0.35)';
            ctx.shadowBlur  = hover.current ? 14 : 5;
            ctx.strokeStyle = hover.current
                ? 'rgba(34,211,238,0.6)'
                : 'rgba(255,255,255,0.20)';
            ctx.lineWidth   = 1;
            ctx.beginPath();
            ctx.arc(rx.current, ry.current, ringR, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(raf.current);
            // No need to remove custom-cursor-active since we never added it
        };
    }, []);

    return <canvas ref={cvs} aria-hidden className="cursor-canvas" />;
}

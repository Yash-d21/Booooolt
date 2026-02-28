import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseX: number;
    baseY: number;
    color: string;
    glow: number;
    mass: number;
}

export const InteractiveParticleField: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number | undefined>(undefined);
    const [isHovering, setIsHovering] = useState(false);

    // Smooth cursor tracking with optimized spring physics
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const smoothCursorX = useSpring(cursorX, { stiffness: 400, damping: 30, mass: 0.5 });
    const smoothCursorY = useSpring(cursorY, { stiffness: 400, damping: 30, mass: 0.5 });

    // Initialize particles with better distribution
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const particleCount = 50;
        const newParticles: Particle[] = [];

        const goldColors = [
            'rgba(249, 241, 216, 1)',  // gold-100 - lightest
            'rgba(230, 203, 125, 1)',  // gold-300
            'rgba(221, 184, 83, 1)',   // gold-400
            'rgba(207, 159, 35, 1)',   // gold-500
            'rgba(170, 132, 35, 1)',   // gold-600
        ];

        // Create particles in a more organized pattern
        const cols = 10;
        const rows = 5;
        const spacingX = rect.width / (cols + 1);
        const spacingY = rect.height / (rows + 1);

        for (let i = 0; i < particleCount; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);

            // Base position with slight randomization
            const baseX = spacingX * (col + 1) + (Math.random() - 0.5) * spacingX * 0.3;
            const baseY = spacingY * (row + 1) + (Math.random() - 0.5) * spacingY * 0.3;

            newParticles.push({
                id: i,
                x: baseX,
                y: baseY,
                vx: 0,
                vy: 0,
                size: Math.random() * 6 + 6, // Larger particles (6-12px)
                baseX,
                baseY,
                color: goldColors[Math.floor(Math.random() * goldColors.length)],
                glow: Math.random() * 0.3 + 0.7, // More consistent glow
                mass: Math.random() * 0.5 + 0.75, // Mass affects movement
            });
        }

        setParticles(newParticles);
    }, []);

    // Enhanced animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Calculate distance from mouse
                const dx = mousePos.current.x - particle.x;
                const dy = mousePos.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                // Enhanced repulsion with mass consideration
                if (distance < maxDistance && isHovering) {
                    const force = ((maxDistance - distance) / maxDistance) * (1 / particle.mass);
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 1.2;
                    particle.vy -= Math.sin(angle) * force * 1.2;
                }

                // Stronger return to base position
                const returnForce = 0.03;
                particle.vx += (particle.baseX - particle.x) * returnForce;
                particle.vy += (particle.baseY - particle.y) * returnForce;

                // Apply velocity with stronger damping
                particle.vx *= 0.92;
                particle.vy *= 0.92;

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Soft boundary constraints
                const padding = 20;
                if (particle.x < padding) particle.vx += 0.5;
                if (particle.x > canvas.width - padding) particle.vx -= 0.5;
                if (particle.y < padding) particle.vy += 0.5;
                if (particle.y > canvas.height - padding) particle.vy -= 0.5;

                // Enhanced particle rendering
                const glowIntensity = distance < maxDistance && isHovering
                    ? 2.0 + (1 - distance / maxDistance)
                    : particle.glow;

                // Multiple glow layers for premium effect
                for (let i = 3; i > 0; i--) {
                    ctx.shadowBlur = 15 * i * glowIntensity;
                    ctx.shadowColor = particle.color;

                    const gradient = ctx.createRadialGradient(
                        particle.x - particle.size * 0.25,
                        particle.y - particle.size * 0.25,
                        0,
                        particle.x,
                        particle.y,
                        particle.size * (1 + i * 0.1)
                    );

                    gradient.addColorStop(0, particle.color);
                    gradient.addColorStop(0.4, particle.color.replace('1)', '0.9)'));
                    gradient.addColorStop(0.7, particle.color.replace('1)', '0.5)'));
                    gradient.addColorStop(1, particle.color.replace('1)', '0)'));

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Premium highlight
                ctx.shadowBlur = 0;
                const highlightGradient = ctx.createRadialGradient(
                    particle.x - particle.size * 0.35,
                    particle.y - particle.size * 0.35,
                    0,
                    particle.x - particle.size * 0.2,
                    particle.y - particle.size * 0.2,
                    particle.size * 0.6
                );
                highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
                highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.fillStyle = highlightGradient;
                ctx.beginPath();
                ctx.arc(
                    particle.x - particle.size * 0.3,
                    particle.y - particle.size * 0.3,
                    particle.size * 0.5,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });

            // Enhanced connection lines
            ctx.shadowBlur = 0;
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.4;

                        // Gradient line for premium effect
                        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        gradient.addColorStop(0, `rgba(207, 159, 35, ${opacity})`);
                        gradient.addColorStop(0.5, `rgba(221, 184, 83, ${opacity * 1.2})`);
                        gradient.addColorStop(1, `rgba(207, 159, 35, ${opacity})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [particles, isHovering]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mousePos.current = { x, y };
        cursorX.set(e.clientX - rect.left);
        cursorY.set(e.clientY - rect.top);
    };

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.parentElement?.getBoundingClientRect();
        if (rect) {
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
            {/* Enhanced Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/8 via-transparent to-gold-500/8 rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,165,44,0.12),transparent_70%)]" />

            {/* Main Container */}
            <div
                ref={containerRef}
                className="relative w-full max-w-3xl aspect-[4/3] bg-gradient-to-br from-neutral-900/70 to-black/70 backdrop-blur-md rounded-3xl border border-gold-500/30 shadow-2xl shadow-gold-900/30 overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ cursor: 'none' }}
                />

                {/* Premium Custom Cursor - Optimized */}
                {isHovering && (
                    <motion.div
                        className="absolute pointer-events-none z-50"
                        style={{
                            left: smoothCursorX,
                            top: smoothCursorY,
                            x: '-50%',
                            y: '-50%',
                            willChange: 'transform',
                        }}
                    >
                        {/* Simplified cursor for better performance */}
                        <div className="relative w-12 h-12">
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-lg" />

                            {/* Outer ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-gold-400/70 bg-gold-500/5 animate-[spin_8s_linear_infinite]" />

                            {/* Inner ring */}
                            <div className="absolute inset-2 rounded-full border border-gold-300/50" />

                            {/* Center dot */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,165,44,0.9)]" />

                            {/* Crosshair lines */}
                            <div className="absolute inset-0">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-gradient-to-b from-gold-400 to-transparent" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-gradient-to-t from-gold-400 to-transparent" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2 bg-gradient-to-r from-gold-400 to-transparent" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2 bg-gradient-to-l from-gold-400 to-transparent" />
                            </div>
                        </div>
                    </motion.div>
                )}
                {/* Enhanced Corner Decorations */}
                <div className="absolute top-3 left-3 w-10 h-10 border-l-2 border-t-2 border-gold-500/40 rounded-tl-xl pointer-events-none" />
                <div className="absolute top-3 right-3 w-10 h-10 border-r-2 border-t-2 border-gold-500/40 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2 border-gold-500/40 rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2 border-gold-500/40 rounded-br-xl pointer-events-none" />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-1 h-1 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(212,165,44,0.8)] pointer-events-none" />
                <div className="absolute top-3 right-3 w-1 h-1 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(212,165,44,0.8)] pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(212,165,44,0.8)] pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-1 h-1 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(212,165,44,0.8)] pointer-events-none" />
            </div>

            {/* Refined Instruction Hint */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-3 bg-black/70 backdrop-blur-xl border border-gold-500/30 rounded-full shadow-2xl"
            >
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse shadow-[0_0_8px_rgba(212,165,44,0.8)]" />
                    <p className="text-gold-300 text-sm font-medium tracking-wide">
                        Move your cursor to interact
                    </p>
                </div>
            </motion.div>

            {/* Enhanced Ambient Glow */}
            <div className="absolute -inset-10 bg-gold-500/15 blur-[120px] -z-10 rounded-full opacity-60" />
        </div>
    );
};

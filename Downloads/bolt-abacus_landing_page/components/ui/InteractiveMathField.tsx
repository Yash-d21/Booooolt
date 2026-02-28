import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface FloatingNumber {
    id: number;
    value: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    scale: number;
    color: string;
    isSelected: boolean;
}

interface AbacusBead {
    id: number;
    delay: number;
}

export const InteractiveMathField: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const numbersRef = useRef<FloatingNumber[]>([]);
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [result, setResult] = useState<number | null>(null);
    const [showAbacus, setShowAbacus] = useState(false);
    const [abacusBeads, setAbacusBeads] = useState<AbacusBead[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number | undefined>(undefined);

    // Smooth cursor tracking
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const smoothCursorX = useSpring(cursorX, { stiffness: 400, damping: 30, mass: 0.5 });
    const smoothCursorY = useSpring(cursorY, { stiffness: 400, damping: 30, mass: 0.5 });

    // Vibrant billiard ball colors - one for each number 1-9
    const numberColors = [
        '#EF4444', // 1 - red
        '#3B82F6', // 2 - blue
        '#10B981', // 3 - green
        '#F59E0B', // 4 - yellow
        '#8B5CF6', // 5 - purple
        '#F97316', // 6 - orange
        '#EC4899', // 7 - pink
        '#06B6D4', // 8 - cyan
        '#84CC16', // 9 - lime
    ];

    // Initialize canvas and numbers
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const updateCanvasSize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;

                // Initialize numbers only if not already initialized
                if (numbersRef.current.length === 0 && canvas.width > 0 && canvas.height > 0) {
                    const newNumbers: FloatingNumber[] = [];

                    for (let i = 1; i <= 9; i++) {
                        newNumbers.push({
                            id: i - 1,
                            value: i,
                            x: Math.random() * (canvas.width - 100) + 50,
                            y: Math.random() * (canvas.height - 100) + 50,
                            vx: (Math.random() - 0.5) * 2,
                            vy: (Math.random() - 0.5) * 2,
                            rotation: Math.random() * 360,
                            rotationSpeed: (Math.random() - 0.5) * 2,
                            scale: 1,
                            color: numberColors[i - 1], // Each number gets its own color
                            isSelected: false,
                        });
                    }

                    numbersRef.current = newNumbers;
                }
            }
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, []);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw numbers
            numbersRef.current.forEach((num) => {
                // No cursor attraction - just natural floating
                // Scale only when selected
                num.scale = num.isSelected ? 1.3 : 1;

                // Bounce off walls with slight randomness
                if (num.x < 50 || num.x > canvas.width - 50) {
                    num.vx *= -0.8;
                    num.vy += (Math.random() - 0.5) * 0.5; // Add slight vertical variation
                }
                if (num.y < 50 || num.y > canvas.height - 50) {
                    num.vy *= -0.8;
                    num.vx += (Math.random() - 0.5) * 0.5; // Add slight horizontal variation
                }

                // Keep in bounds
                num.x = Math.max(50, Math.min(canvas.width - 50, num.x));
                num.y = Math.max(50, Math.min(canvas.height - 50, num.y));

                // Apply velocity - natural floating
                num.x += num.vx;
                num.y += num.vy;
                num.rotation += num.rotationSpeed;

                // Gentle damping for smooth floating
                num.vx *= 0.995;
                num.vy *= 0.995;

                // Add tiny random movement for natural floating effect
                num.vx += (Math.random() - 0.5) * 0.05;
                num.vy += (Math.random() - 0.5) * 0.05;

                // Draw number - billiard ball style
                ctx.save();
                ctx.translate(num.x, num.y);
                ctx.rotate((num.rotation * Math.PI) / 180);
                ctx.scale(num.scale, num.scale);

                // Outer glow
                const glowSize = num.isSelected ? 30 : 20;
                ctx.shadowBlur = glowSize;
                ctx.shadowColor = num.color;

                // Solid circle background - billiard ball style
                ctx.fillStyle = num.color;
                ctx.beginPath();
                ctx.arc(0, 0, 40, 0, Math.PI * 2);
                ctx.fill();

                // Inner shadow for depth
                ctx.shadowBlur = 0;
                const innerShadow = ctx.createRadialGradient(0, 10, 0, 0, 0, 40);
                innerShadow.addColorStop(0, 'rgba(0,0,0,0)');
                innerShadow.addColorStop(0.8, 'rgba(0,0,0,0)');
                innerShadow.addColorStop(1, 'rgba(0,0,0,0.4)');
                ctx.fillStyle = innerShadow;
                ctx.beginPath();
                ctx.arc(0, 0, 40, 0, Math.PI * 2);
                ctx.fill();

                // Glossy highlight - top left
                const highlight = ctx.createRadialGradient(-8, -8, 0, -8, -8, 15);
                highlight.addColorStop(0, 'rgba(255,255,255,0.9)');
                highlight.addColorStop(0.5, 'rgba(255,255,255,0.3)');
                highlight.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = highlight;
                ctx.beginPath();
                ctx.arc(-8, -8, 15, 0, Math.PI * 2);
                ctx.fill();

                // White border
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, 40, 0, Math.PI * 2);
                ctx.stroke();

                // Number text - white and bold
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(0,0,0,0.8)';
                ctx.font = 'bold 42px Inter, sans-serif';
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(num.value.toString(), 0, 2);

                // Selection ring - bright and pulsing
                if (num.isSelected) {
                    ctx.shadowBlur = 25;
                    ctx.shadowColor = '#FFD700';
                    ctx.strokeStyle = '#FFD700';
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.arc(0, 0, 50, 0, Math.PI * 2);
                    ctx.stroke();
                }

                ctx.restore();
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || showAbacus) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Find clicked number
        const clickedNum = numbersRef.current.find(num => {
            const dx = clickX - num.x;
            const dy = clickY - num.y;
            return Math.sqrt(dx * dx + dy * dy) < 45;
        });

        if (clickedNum && !clickedNum.isSelected) {
            setSelectedNumbers(prev => {
                const newSelected = [...prev, clickedNum.id];

                // Mark as selected
                numbersRef.current = numbersRef.current.map(n =>
                    n.id === clickedNum.id ? { ...n, isSelected: true } : n
                );

                // Calculate when 2 numbers selected
                if (newSelected.length === 2) {
                    const num1 = numbersRef.current.find(n => n.id === newSelected[0]);
                    const num2 = numbersRef.current.find(n => n.id === newSelected[1]);

                    if (num1 && num2) {
                        const sum = num1.value + num2.value;
                        setResult(sum);
                        setShowAbacus(true);

                        // Create beads
                        const beads: AbacusBead[] = [];
                        for (let i = 0; i < sum; i++) {
                            beads.push({ id: i, delay: i * 0.15 });
                        }
                        setAbacusBeads(beads);

                        // Reset
                        setTimeout(() => {
                            setShowAbacus(false);
                            setResult(null);
                            setSelectedNumbers([]);
                            setAbacusBeads([]);
                            numbersRef.current = numbersRef.current.map(n => ({ ...n, isSelected: false }));
                        }, 4000 + sum * 150);
                    }
                }

                return newSelected.length >= 2 ? newSelected : newSelected;
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        cursorX.set(e.clientX - rect.left);
        cursorY.set(e.clientY - rect.top);
    };

    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-500/10 rounded-2xl animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,165,44,0.15),transparent_70%)]" />

            {/* Main Container */}
            <div
                ref={containerRef}
                className="relative w-full max-w-3xl aspect-[4/3] bg-gradient-to-br from-neutral-900/70 to-black/70 backdrop-blur-md rounded-3xl border border-gold-500/30 shadow-2xl shadow-gold-900/30 overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Canvas for floating numbers */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ cursor: 'none' }}
                    onClick={handleCanvasClick}
                />

                {/* Abacus Result Display */}
                <AnimatePresence>
                    {showAbacus && result !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-xl z-50"
                        >
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="relative"
                            >
                                {/* Celebration particles */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(30)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{
                                                x: 0,
                                                y: 0,
                                                scale: 0,
                                                opacity: 1
                                            }}
                                            animate={{
                                                x: (Math.random() - 0.5) * 400,
                                                y: (Math.random() - 0.5) * 400,
                                                scale: [0, 1, 0],
                                                opacity: [1, 1, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.05,
                                                ease: "easeOut"
                                            }}
                                            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor: numberColors[i % numberColors.length]
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Result Frame */}
                                <div className="relative px-20 py-16 bg-gradient-to-br from-neutral-900/95 to-black/95 rounded-3xl border-4 border-gold-500/60 shadow-2xl">
                                    {/* Animated Title */}
                                    <motion.div
                                        initial={{ y: -30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                        className="text-center mb-6"
                                    >
                                        <div className="text-gold-400 text-2xl font-bold mb-3 animate-bounce">
                                            🎉 Amazing! 🎉
                                        </div>
                                        <div className="text-gold-200 text-7xl font-black drop-shadow-[0_0_20px_rgba(212,165,44,0.8)]">
                                            {result}
                                        </div>
                                    </motion.div>

                                    {/* Abacus Beads - Billiard Ball Style */}
                                    <div className="flex flex-wrap items-center justify-center gap-2 min-h-[100px] max-w-[500px]">
                                        {abacusBeads.map((bead) => {
                                            // Billiard ball colors - vibrant and solid
                                            const ballColors = [
                                                '#EF4444', // red
                                                '#3B82F6', // blue
                                                '#10B981', // green
                                                '#F59E0B', // yellow
                                                '#8B5CF6', // purple
                                                '#F97316', // orange
                                                '#EC4899', // pink
                                                '#06B6D4', // cyan
                                                '#84CC16', // lime
                                            ];
                                            const ballColor = ballColors[bead.id % ballColors.length];

                                            return (
                                                <motion.div
                                                    key={bead.id}
                                                    initial={{ scale: 0, y: -100, rotate: -180 }}
                                                    animate={{ scale: 1, y: 0, rotate: 0 }}
                                                    transition={{
                                                        delay: bead.delay,
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 12,
                                                    }}
                                                    className="relative"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            y: [0, -5, 0],
                                                            rotate: [0, 5, -5, 0]
                                                        }}
                                                        transition={{
                                                            delay: bead.delay + 0.5,
                                                            duration: 0.6,
                                                            repeat: Infinity,
                                                            repeatDelay: 1,
                                                        }}
                                                        className="w-14 h-14 rounded-full shadow-[inset_0_-4px_12px_rgba(0,0,0,0.5),0_8px_20px_rgba(0,0,0,0.7)] border-2 border-white/20"
                                                        style={{
                                                            backgroundColor: ballColor,
                                                        }}
                                                    >
                                                        {/* Glossy highlight - billiard ball shine */}
                                                        <div className="absolute top-2 left-3 w-6 h-5 bg-gradient-to-br from-white/90 to-white/20 rounded-full blur-[2px]" />
                                                        <div className="absolute top-1 left-2.5 w-4 h-3 bg-white/60 rounded-full blur-[1px]" />
                                                    </motion.div>
                                                    {/* Colored glow matching ball color */}
                                                    <div
                                                        className="absolute inset-0 rounded-full blur-xl animate-pulse opacity-60"
                                                        style={{ backgroundColor: ballColor + '66' }}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Sparkle corners */}
                                    {[0, 1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                rotate: [0, 180, 360]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.2
                                            }}
                                            className={`absolute w-4 h-4 ${i === 0 ? 'top-4 left-4' :
                                                i === 1 ? 'top-4 right-4' :
                                                    i === 2 ? 'bottom-4 left-4' :
                                                        'bottom-4 right-4'
                                                }`}
                                            style={{ color: numberColors[i] }}
                                        >
                                            ✨
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Fun Custom Cursor */}
                {isHovering && !showAbacus && (
                    <motion.div
                        className="absolute pointer-events-none z-40"
                        style={{
                            left: smoothCursorX,
                            top: smoothCursorY,
                            x: '-50%',
                            y: '-50%',
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="relative w-12 h-12"
                        >
                            <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl" />
                            <div className="absolute inset-0 rounded-full border-3 border-gold-400 border-dashed" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                                ✨
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Corner Decorations */}
                <div className="absolute top-3 left-3 w-10 h-10 border-l-2 border-t-2 border-gold-500/40 rounded-tl-xl pointer-events-none" />
                <div className="absolute top-3 right-3 w-10 h-10 border-r-2 border-t-2 border-gold-500/40 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2 border-gold-500/40 rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2 border-gold-500/40 rounded-br-xl pointer-events-none" />
            </div>

            {/* Fun Instruction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-3 bg-black/70 backdrop-blur-xl border border-gold-500/30 rounded-full shadow-2xl"
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-xl"
                    >
                        👆
                    </motion.div>
                    <p className="text-gold-300 text-sm font-medium tracking-wide">
                        Click two floating numbers to add them!
                    </p>
                </div>
            </motion.div>

            {/* Ambient Glow */}
            <div className="absolute -inset-10 bg-gold-500/15 blur-[120px] -z-10 rounded-full opacity-60" />
        </div>
    );
};

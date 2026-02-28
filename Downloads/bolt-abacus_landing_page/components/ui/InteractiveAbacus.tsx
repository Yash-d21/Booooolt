import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Bead {
    id: number;
    position: number; // 0 to 1, where 0 is left and 1 is right
    isActive: boolean;
}

interface Rod {
    id: number;
    beads: Bead[];
    heavenBeads: Bead[]; // Top beads (typically 2)
    earthBeads: Bead[]; // Bottom beads (typically 5)
}

export const InteractiveAbacus: React.FC = () => {
    const [rods, setRods] = useState<Rod[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize abacus with 7 rods
    useEffect(() => {
        const initialRods: Rod[] = Array.from({ length: 7 }, (_, rodIndex) => ({
            id: rodIndex,
            beads: [],
            heavenBeads: Array.from({ length: 2 }, (_, beadIndex) => ({
                id: beadIndex,
                position: 0, // Start at top
                isActive: false,
            })),
            earthBeads: Array.from({ length: 5 }, (_, beadIndex) => ({
                id: beadIndex,
                position: 0, // Start at bottom
                isActive: false,
            })),
        }));
        setRods(initialRods);
    }, []);

    const handleBeadClick = (rodId: number, beadId: number, type: 'heaven' | 'earth') => {
        setRods(prevRods => {
            const newRods = [...prevRods];
            const rod = newRods[rodId];

            if (type === 'heaven') {
                const bead = rod.heavenBeads[beadId];
                bead.position = bead.position === 0 ? 1 : 0;
                bead.isActive = bead.position === 1;
            } else {
                const bead = rod.earthBeads[beadId];
                bead.position = bead.position === 0 ? 1 : 0;
                bead.isActive = bead.position === 1;
            }

            return newRods;
        });
    };

    const handleBeadDrag = (rodId: number, beadId: number, type: 'heaven' | 'earth', newPosition: number) => {
        setRods(prevRods => {
            const newRods = [...prevRods];
            const rod = newRods[rodId];

            if (type === 'heaven') {
                const bead = rod.heavenBeads[beadId];
                bead.position = Math.max(0, Math.min(1, newPosition));
                bead.isActive = bead.position > 0.5;
            } else {
                const bead = rod.earthBeads[beadId];
                bead.position = Math.max(0, Math.min(1, newPosition));
                bead.isActive = bead.position > 0.5;
            }

            return newRods;
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full min-h-[500px] flex items-center justify-center p-8"
        >
            {/* Ambient Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-500/5 rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,165,44,0.1),transparent_70%)]" />

            {/* Abacus Frame */}
            <div className="relative w-full max-w-3xl aspect-[4/3] bg-gradient-to-br from-neutral-900/80 to-black/80 backdrop-blur-sm rounded-3xl border border-gold-500/20 shadow-2xl shadow-gold-900/20 p-8">
                {/* Top Frame Bar */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gold-900/40 to-transparent rounded-t-3xl border-b border-gold-500/10" />

                {/* Bottom Frame Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gold-900/40 to-transparent rounded-b-3xl border-t border-gold-500/10" />

                {/* Main Abacus Area */}
                <div className="relative h-full flex flex-col justify-center gap-6 py-8">
                    {/* Heaven Section (Top Beads) */}
                    <div className="relative h-[30%]">
                        <div className="flex justify-around items-end h-full gap-4">
                            {rods.map((rod) => (
                                <div key={`heaven-${rod.id}`} className="relative flex-1 h-full flex flex-col justify-end items-center">
                                    {/* Vertical Rod */}
                                    <div className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-gold-600/60 via-gold-500/40 to-transparent rounded-full shadow-lg" />

                                    {/* Heaven Beads */}
                                    <div className="relative z-10 flex flex-col gap-2">
                                        {rod.heavenBeads.map((bead) => (
                                            <motion.div
                                                key={`heaven-bead-${rod.id}-${bead.id}`}
                                                className="relative cursor-pointer group"
                                                animate={{
                                                    y: bead.position * 40,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 25,
                                                }}
                                                onClick={() => handleBeadClick(rod.id, bead.id, 'heaven')}
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div
                                                    className={`
                            w-10 h-10 rounded-full 
                            bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700
                            shadow-[inset_0_-2px_8px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.5)]
                            border-2 border-gold-400/30
                            transition-all duration-300
                            ${bead.isActive ? 'shadow-[0_0_20px_rgba(212,165,44,0.8),inset_0_-2px_8px_rgba(0,0,0,0.4)]' : ''}
                            group-hover:shadow-[0_0_25px_rgba(212,165,44,1)]
                          `}
                                                >
                                                    {/* Bead Highlight */}
                                                    <div className="absolute top-1 left-1/4 w-1/2 h-1/3 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-sm" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider Bar */}
                    <div className="relative h-[2px] w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent shadow-[0_0_10px_rgba(212,165,44,0.5)]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/40 to-transparent blur-sm" />
                    </div>

                    {/* Earth Section (Bottom Beads) */}
                    <div className="relative h-[60%]">
                        <div className="flex justify-around items-start h-full gap-4">
                            {rods.map((rod) => (
                                <div key={`earth-${rod.id}`} className="relative flex-1 h-full flex flex-col items-center">
                                    {/* Vertical Rod */}
                                    <div className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-gold-500/40 to-gold-600/60 rounded-full shadow-lg" />

                                    {/* Earth Beads */}
                                    <div className="relative z-10 flex flex-col gap-2 pt-2">
                                        {rod.earthBeads.map((bead) => (
                                            <motion.div
                                                key={`earth-bead-${rod.id}-${bead.id}`}
                                                className="relative cursor-pointer group"
                                                animate={{
                                                    y: bead.position * -60,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 25,
                                                }}
                                                onClick={() => handleBeadClick(rod.id, bead.id, 'earth')}
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div
                                                    className={`
                            w-10 h-10 rounded-full 
                            bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700
                            shadow-[inset_0_-2px_8px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.5)]
                            border-2 border-gold-400/30
                            transition-all duration-300
                            ${bead.isActive ? 'shadow-[0_0_20px_rgba(212,165,44,0.8),inset_0_-2px_8px_rgba(0,0,0,0.4)]' : ''}
                            group-hover:shadow-[0_0_25px_rgba(212,165,44,1)]
                          `}
                                                >
                                                    {/* Bead Highlight */}
                                                    <div className="absolute top-1 left-1/4 w-1/2 h-1/3 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-sm" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold-500/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold-500/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold-500/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/30 rounded-br-lg" />
            </div>

            {/* Floating Instruction Hint */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-xl border border-gold-500/20 rounded-full shadow-2xl"
            >
                <p className="text-gold-400 text-sm font-medium tracking-wide">
                    Click or drag beads to interact
                </p>
            </motion.div>
        </div>
    );
};

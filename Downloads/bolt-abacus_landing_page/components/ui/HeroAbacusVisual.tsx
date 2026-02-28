import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── 1. Config ────────────────────────────────────────────────────────────────

const STEPS = [
    { eq: '6 + 4', ans: '10', label: '1.4s' },
    { eq: '13 + 8', ans: '21', label: '1.6s' },
    { eq: '27 + 15', ans: '42', label: '1.9s' },
    { eq: '9 × 4', ans: '36', label: '1.3s' },
    { eq: '48 ÷ 6', ans: '8', label: '1.5s' },
];

const PALETTE = [
    { on: '#F59E0B', glow: 'rgba(245,158,11,0.6)', off: '#33230A' },
    { on: '#F43F5E', glow: 'rgba(244,63,94,0.6)', off: '#331218' },
    { on: '#22D3EE', glow: 'rgba(34,211,238,0.6)', off: '#0A2D33' },
    { on: '#A78BFA', glow: 'rgba(167,139,250,0.6)', off: '#1D1333' },
    { on: '#34D399', glow: 'rgba(52,211,153,0.6)', off: '#0E291C' },
];

// ─── 2. Bead geometry ─────────────────────────────────────────────────────────

const BEAD_W = 28;
const BEAD_H = 16;
const SLIDE = 14;
const UPPER_H = BEAD_H + SLIDE;
const LOWER_H = (BEAD_H * 4) + SLIDE;

// ─── 3. Sub-components ───────────────────────────────────────────────────────

const BeadRod: React.FC<{ value: number; rodIdx: number }> = ({ value, rodIdx }) => {
    const p = PALETTE[rodIdx];

    // Physical state of the abacus rod based on value (0-9)
    const upperActive = value >= 5;
    const lowerActiveCount = value % 5;

    // To prevent sudden jumps, use spring transitions
    const transition = { type: 'spring', stiffness: 350, damping: 25 };

    return (
        <div style={{ position: 'relative', width: BEAD_W, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* The vertical rod line */}
            <div style={{
                position: 'absolute', top: 0, bottom: 0, left: '50%',
                width: 3, transform: 'translateX(-50%)',
                background: `linear-gradient(180deg, rgba(0,0,0,0.8), rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, rgba(0,0,0,0.8))`,
                borderRadius: 2,
                zIndex: 0,
                boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.5)'
            }} />

            {/* Upper deck (1 bead) */}
            <div style={{ position: 'relative', height: UPPER_H, width: '100%', zIndex: 1 }}>
                <motion.div
                    animate={{ y: upperActive ? SLIDE : 0 }}
                    transition={transition}
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        height: BEAD_H, borderRadius: '8px',
                        display: 'flex', justifyContent: 'center',
                        // Make active beads slightly brighter to signify they are "in play"
                        background: upperActive
                            ? `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.6) 0%, ${p.on} 40%, rgba(0,0,0,0.7) 100%)`
                            : `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.3) 0%, ${p.off} 60%, rgba(0,0,0,0.8) 100%)`,
                        boxShadow: upperActive
                            ? `0 0 10px ${p.glow}, 0 4px 6px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)`
                            : `0 4px 6px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)`,
                        border: `1px solid ${upperActive ? p.on : 'rgba(255,255,255,0.05)'}`,
                        opacity: 1 // Full opacity always
                    }}
                >
                    {/* Bead highlight */}
                    <div style={{ position: 'absolute', top: 2, left: '20%', right: '20%', height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
                </motion.div>
            </div>

            {/* Middle Horizontal Separator Beam */}
            <div style={{
                height: 8,
                width: '100%',
                marginLeft: '-10%',
                marginRight: '-10%',
                padding: '0 10%',
                background: 'linear-gradient(180deg, rgba(40,40,40,1) 0%, rgba(20,20,20,1) 100%)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(0,0,0,0.8)',
                zIndex: 2,
                marginTop: 2,
                marginBottom: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }} />

            {/* Lower deck (4 beads) */}
            <div style={{ position: 'relative', height: LOWER_H, width: '100%', zIndex: 1 }}>
                {Array.from({ length: 4 }).map((_, i) => {
                    // Beads act as rigid bodies. 
                    // i=0 is top bead, i=3 is bottom bead.
                    // If active, it touches the beam (y = i * BEAD_H).
                    // If inactive, it slides down (y = SLIDE + i * BEAD_H).
                    const active = i < lowerActiveCount;
                    const y = active ? i * BEAD_H : SLIDE + i * BEAD_H;

                    return (
                        <motion.div
                            key={i}
                            animate={{ y }}
                            transition={transition}
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0,
                                height: BEAD_H, borderRadius: '8px',
                                background: active
                                    ? `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.6) 0%, ${p.on} 40%, rgba(0,0,0,0.7) 100%)`
                                    : `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.3) 0%, ${p.off} 60%, rgba(0,0,0,0.8) 100%)`,
                                boxShadow: active
                                    ? `0 0 10px ${p.glow}, 0 4px 6px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)`
                                    : `0 4px 6px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)`,
                                border: `1px solid ${active ? p.on : 'rgba(255,255,255,0.05)'}`,
                                opacity: 1 // No fading
                            }}
                        >
                            <div style={{ position: 'absolute', top: 2, left: '20%', right: '20%', height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── 4. Main ─────────────────────────────────────────────────────────────────

export const HeroAbacusVisual: React.FC = () => {
    const [si, setSi] = useState(0);
    const [phase, setPhase] = useState<'computing' | 'solved'>('computing');
    const [activeRods, setActiveRods] = useState<number[]>([0, 0, 0, 0, 0]);

    const cur = STEPS[si];

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        let t1: ReturnType<typeof setTimeout>;
        let t2: ReturnType<typeof setTimeout>;

        setPhase('computing');

        // Rapid fire random calculating effect
        interval = setInterval(() => {
            setActiveRods(Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)));
        }, 120);

        t1 = setTimeout(() => {
            clearInterval(interval);
            setPhase('solved');

            // Convert answer to array of 5 rods (padded with 0s)
            const ansStr = cur.ans.padStart(5, '0');
            setActiveRods(ansStr.split('').map(Number));
        }, 1700);

        t2 = setTimeout(() => {
            setPhase('computing');
            setTimeout(() => setSi(i => (i + 1) % STEPS.length), 420);
        }, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [si]);

    return (
        <div
            className="relative w-full flex justify-center items-center select-none"
            style={{ isolation: 'isolate' }}
        >
            {/* ── Coloured gradient blobs (behind card for glassmorphism) ── */}
            <div
                className="absolute pointer-events-none -z-10"
                style={{ inset: '-60px', filter: 'blur(56px)', opacity: 0.6 }}
                aria-hidden
            >
                <div style={{ position: 'absolute', top: '5%', left: '-5%', width: 240, height: 240, borderRadius: '50%', background: 'rgba(245,158,11,0.42)' }} />
                <div style={{ position: 'absolute', bottom: '0%', right: '-10%', width: 180, height: 180, borderRadius: '50%', background: 'rgba(244,63,94,0.28)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '25%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(34,211,238,0.2)' }} />
                <div style={{ position: 'absolute', top: '35%', right: '10%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(167,139,250,0.22)' }} />
            </div>

            {/* ── Gradient-border shell ── */}
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                    width: '100%', maxWidth: 460,
                    padding: 1.5,
                    borderRadius: 24,
                    background: 'linear-gradient(145deg, rgba(245,158,11,0.65) 0%, rgba(20,14,4,0.0) 55%, rgba(244,63,94,0.4) 100%)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 80px rgba(245,158,11,0.07)',
                }}
            >
                {/* ── Glassmorphism inner card ── */}
                <div style={{
                    borderRadius: 23,
                    background: 'rgba(8,6,3,0.82)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    overflow: 'hidden',
                }}>

                    {/* ···· Title bar ···· */}
                    <div
                        className="flex items-center justify-between"
                        style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <div className="flex gap-1.5">
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(248,113,113,0.7)' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(251,191,36,0.7)' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(52,211,153,0.7)' }} />
                        </div>
                        <span style={{
                            fontSize: 10, fontWeight: 800,
                            letterSpacing: '0.28em', textTransform: 'uppercase',
                            background: 'linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.5))',
                        }}>
                            Bolt Abacus
                        </span>
                        <div style={{ width: 46 }} />
                    </div>

                    {/* ···· Equation ···· */}
                    <div style={{ padding: '22px 24px 6px', textAlign: 'center' }}>
                        {/* Phase label */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`${si}-${phase}`}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.22 }}
                                style={{
                                    fontSize: 9, fontWeight: 800,
                                    letterSpacing: '0.36em', textTransform: 'uppercase',
                                    marginBottom: 10,
                                    color: phase === 'solved' ? '#34D399' : 'rgba(245,158,11,0.5)',
                                }}
                            >
                                {phase === 'solved'
                                    ? `✓  Solved  ·  ${cur.label}`
                                    : '·  ·  ·  Computing  ·  ·  ·'}
                            </motion.p>
                        </AnimatePresence>

                        {/* Expression */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={si}
                                initial={{ opacity: 0, y: -14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 14 }}
                                transition={{ duration: 0.26 }}
                                className="flex items-baseline justify-center"
                                style={{ gap: 14 }}
                            >
                                <span style={{
                                    fontSize: 38, fontWeight: 900, color: '#fff',
                                    letterSpacing: '-0.035em', fontVariantNumeric: 'tabular-nums',
                                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                                }}>
                                    {cur.eq}
                                </span>
                                <span style={{ fontSize: 32, fontWeight: 200, color: 'rgba(255,255,255,0.16)' }}>
                                    =
                                </span>
                                <AnimatePresence mode="wait">
                                    {phase === 'solved' ? (
                                        <motion.span
                                            key="ans"
                                            initial={{ scale: 0.25, opacity: 0, filter: 'blur(18px)' }}
                                            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                            exit={{ scale: 0.65, opacity: 0 }}
                                            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                                            style={{
                                                fontSize: 38, fontWeight: 900,
                                                color: '#F59E0B', letterSpacing: '-0.035em',
                                                textShadow: '0 0 36px rgba(245,158,11,0.85)',
                                            }}
                                        >
                                            {cur.ans}
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="q"
                                            animate={{ opacity: [0.12, 0.45, 0.12] }}
                                            transition={{ duration: 1.1, repeat: Infinity }}
                                            style={{ fontSize: 38, fontWeight: 900, color: 'rgba(255,255,255,0.13)' }}
                                        >
                                            ?
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ···· Soroban Abacus ···· */}
                    <div
                        style={{
                            margin: '14px 20px',
                            borderRadius: 18,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: 'radial-gradient(ellipse at 50% 50%, rgba(30,30,30,0.6) 0%, rgba(0,0,0,0.8) 100%)',
                            position: 'relative',
                            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Top crossbeam */}
                        <div style={{
                            height: 12,
                            background: 'linear-gradient(180deg, rgba(80,80,80,1) 0%, rgba(20,20,20,1) 100%)',
                            borderBottom: '1px solid rgba(0,0,0,0.8)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }} />

                        {/* Bead rods */}
                        <div style={{
                            padding: '12px 24px',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 16,
                            position: 'relative'
                        }}>
                            {activeRods.map((val, ri) => (
                                <BeadRod key={ri} value={val} rodIdx={ri} />
                            ))}
                        </div>

                        {/* Bottom crossbeam */}
                        <div style={{
                            height: 12,
                            background: 'linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(80,80,80,1) 100%)',
                            borderTop: '1px solid rgba(0,0,0,0.8)',
                        }} />
                    </div>

                    {/* ···· Progress dots ···· */}
                    <div className="flex justify-center" style={{ gap: 7, marginBottom: 14 }}>
                        {STEPS.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    width: i === si ? 26 : 5,
                                    opacity: i === si ? 1 : 0.18,
                                    background: i === si ? '#F59E0B' : '#555',
                                }}
                                transition={{ duration: 0.32 }}
                                style={{ height: 4, borderRadius: 4 }}
                            />
                        ))}
                    </div>

                    {/* ···· Speed Race ···· */}
                    <div
                        key={si}
                        style={{
                            margin: '0 16px 16px',
                            borderRadius: 14,
                            border: '1px solid rgba(255,255,255,0.06)',
                            background: 'rgba(0,0,0,0.25)',
                            padding: '14px 16px',
                        }}
                    >
                        <p style={{
                            fontSize: 8, fontWeight: 800, letterSpacing: '0.32em',
                            textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
                            marginBottom: 12,
                        }}>
                            Speed Comparison
                        </p>

                        {/* Abacus bar */}
                        <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: '#F59E0B', width: 56, textTransform: 'uppercase', flexShrink: 0 }}>
                                Abacus
                            </span>
                            <div style={{ flex: 1, height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: '96%' }}
                                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        borderRadius: 8,
                                        background: 'linear-gradient(90deg, #D97706, #F59E0B, #FCD34D)',
                                        boxShadow: '0 0 14px rgba(245,158,11,0.6)',
                                    }}
                                />
                            </div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1, duration: 0.3 }}
                                style={{ fontSize: 9, fontWeight: 800, color: '#34D399', width: 28, textAlign: 'right', flexShrink: 0 }}
                            >
                                {cur.label}
                            </motion.span>
                        </div>

                        {/* Traditional bar */}
                        <div className="flex items-center gap-3">
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', width: 56, textTransform: 'uppercase', flexShrink: 0 }}>
                                Pen &amp; Paper
                            </span>
                            <div style={{ flex: 1, height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: '32%' }}
                                    transition={{ duration: 2.6, ease: 'linear', delay: 0.2 }}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        borderRadius: 8,
                                        background: 'rgba(255,255,255,0.22)',
                                    }}
                                />
                            </div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.9, duration: 0.3 }}
                                style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.3)', width: 28, textAlign: 'right', flexShrink: 0 }}
                            >
                                4.2s
                            </motion.span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

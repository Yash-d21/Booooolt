import React, { useState, useEffect } from 'react';
import { Globe2, Trophy, Medal, Flame, Star, Zap, Users, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const competitionPoints = [
  { icon: <Globe2 />, col: '#60a5fa', text: 'Students compete globally', sub: 'From your classroom to the world stage' },
  { icon: <Trophy />, col: '#f59e0b', text: 'Regular online tournaments', sub: 'Weekly stakes, real rankings' },
  { icon: <Flame />, col: '#fb923c', text: 'Rankings & challenges', sub: 'Leaderboards that drive daily practice' },
  { icon: <Medal />, col: '#f87171', text: 'Motivation beyond the classroom', sub: 'They practice because they want to win' },
];

// --- F1 Style Leaderboard Component ---
const INITIAL_STUDENTS = [
  { id: 's1', name: 'Aarav P.', score: 8450, trend: 'up' },
  { id: 's2', name: 'Riya S.', score: 8320, trend: 'same' },
  { id: 's3', name: 'Vihaan K.', score: 8100, trend: 'up' },
  { id: 's4', name: 'Ananya D.', score: 7950, trend: 'down' },
  { id: 's5', name: 'Krishna R.', score: 7820, trend: 'up' },
  { id: 's6', name: 'Diya N.', score: 7600, trend: 'down' },
  { id: 's7', name: 'Arjun M.', score: 7450, trend: 'same' },
];

const LiveLeaderboard = () => {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [timer, setTimer] = useState(134); // Start at 02:14

  // Ticking Timer (Countdown)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Simulation loop: Randomly boost scores to trigger overtakes
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents((current) => {
        const next = [...current];
        // Pick 1 or 2 random students to get a massive score boost
        const boostCount = Math.random() > 0.5 ? 2 : 1;

        for (let i = 0; i < boostCount; i++) {
          const randomIndex = Math.floor(Math.random() * (next.length - 1)) + 1; // Don't always boost 1st place initially
          next[randomIndex] = {
            ...next[randomIndex],
            score: next[randomIndex].score + Math.floor(Math.random() * 400) + 100,
          };
        }

        // Sort by new scores
        const sorted = next.sort((a, b) => b.score - a.score);

        // Update trends based on new positions relative to old
        return sorted.map((student, newIndex) => {
          const oldIndex = current.findIndex(s => s.id === student.id);
          let trend = 'same';
          if (newIndex < oldIndex) trend = 'up';
          if (newIndex > oldIndex) trend = 'down';
          return { ...student, trend };
        });
      });
    }, 2500); // Every 2.5s an overtake might happen

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col pt-2">
      {/* Live Timer Bar */}
      <div className="flex justify-between items-end mb-4 px-2 border-b border-white/5 pb-2">
        <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Heat 4 / Div A</div>
        <div className="text-xl font-mono font-bold text-gold-400 tabular-nums tracking-tight">
          {formatTimer(timer)}
        </div>
      </div>

      {/* Leaderboard Rows */}
      <div className="flex-1 relative space-y-2">
        <AnimatePresence>
          {students.map((student, index) => {
            const isTop3 = index < 3;
            // Colors for podium
            const rankColor = index === 0 ? 'text-gold-400' : index === 1 ? 'text-neutral-300' : index === 2 ? 'text-orange-400' : 'text-neutral-500';
            const bgGradient = index === 0
              ? 'bg-gradient-to-r from-gold-500/10 to-transparent border-gold-500/20'
              : index === 1
                ? 'bg-gradient-to-r from-white/5 to-transparent border-white/10'
                : index === 2
                  ? 'bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/20'
                  : 'bg-white/[0.02] border-white/5';

            return (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`flex items-center gap-4 py-2.5 px-4 rounded-xl border ${bgGradient}`}
              >
                {/* Rank & Trend */}
                <div className="flex items-center gap-2 w-12 shrink-0">
                  <span className={`text-base font-black italic ${rankColor}`}>
                    {index + 1}
                  </span>
                  {student.trend === 'up' && <ArrowUpRight size={14} className="text-emerald-400" />}
                  {student.trend === 'down' && <ArrowDownRight size={14} className="text-rose-400" />}
                  {student.trend === 'same' && <Minus size={14} className="text-neutral-600" />}
                </div>

                {/* Name */}
                <div className={`flex-1 font-semibold text-sm ${isTop3 ? 'text-white' : 'text-neutral-300'}`}>
                  {student.name}
                </div>

                {/* Score */}
                <div className="font-mono text-sm font-bold text-white tabular-nums">
                  {student.score.toLocaleString()}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Competitions: React.FC = () => {
  return (
    <section
      id="competitions"
      className="py-32 relative overflow-hidden border-t border-white/5"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #000000 100%)' }}
    >
      {/* Background ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gold-500/6 rounded-full blur-[120px]" />
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-blue-600/4 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ─── Left: Text ─── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mb-5"
            >
              <span className="px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400">
                Competitions
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.08]"
            >
              Practice Alone is Boring.{' '}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-500 to-orange-400">
                Competition Changes Everything.
              </span>
            </motion.h2>

            <div className="space-y-4 mb-8">
              {competitionPoints.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${pt.col}18`, color: pt.col }}
                  >
                    {React.cloneElement(pt.icon as React.ReactElement<any>, { size: 18 })}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base leading-tight">{pt.text}</p>
                    <p className="text-neutral-500 text-sm mt-0.5">{pt.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Right: Visual ─── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div
              className="relative rounded-3xl overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #1a1008 0%, #0a0a0a 60%)',
                border: '1px solid rgba(245,158,11,0.12)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.05)',
              }}
            >
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
                }}
              />

              {/* VS watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  className="text-[200px] font-black italic select-none leading-none"
                  style={{ color: 'rgba(245,158,11,0.04)', fontFamily: 'serif' }}
                >
                  VS
                </span>
              </div>

              {/* Abacus visualization */}
              <div className="relative z-10 p-10 flex flex-col items-center gap-6" style={{ minHeight: 420 }}>
                {/* Header */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-bold tracking-wider uppercase">Live Tourney</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Users size={11} className="text-neutral-400" />
                    <span className="text-neutral-400 text-xs font-medium">2,400+ active</span>
                  </div>
                </div>

                {/* Live Leaderboard Animation */}
                <div className="w-full flex-1">
                  <LiveLeaderboard />
                </div>
              </div>
            </div>
            {/* Redesigned Teacher hook banner below the main card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 w-full rounded-2xl p-4 flex flex-col md:flex-row items-center md:justify-between gap-4 border border-gold-500/15 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(90deg, #110B05 0%, #000000 100%)',
              }}
            >
              {/* Hover sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Star size={14} className="text-gold-400 fill-gold-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gold-500/80 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Teacher Benefit</span>
                  <p className="text-neutral-200 font-medium text-sm leading-none">
                    Global PvP routing handled entirely by Bolt.
                  </p>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hidden md:flex items-center gap-2 relative z-10 shrink-0">
                <Zap size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-widest">Zero Setup</span>
              </div>
            </motion.div>

            {/* Ambient glow */}
            <div className="absolute -inset-8 bg-gold-500/4 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
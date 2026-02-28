import React, { useRef, useState, useCallback } from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

// ── Data ─────────────────────────────────────────────────────────────────────
// 28 days, 4 weeks. Three series telling the full story.

const RAW_NO_PLATFORM = [97, 95, 93, 91, 89, 87, 84, 81, 78, 74, 70, 67, 63, 59, 55, 51, 47, 44, 40, 37, 33, 30, 27, 24, 22, 19, 17, 15];
const RAW_TRADITIONAL = [82, 80, 79, 78, 76, 75, 73, 71, 70, 68, 66, 65, 63, 62, 60, 58, 57, 55, 54, 52, 51, 50, 49, 47, 46, 45, 44, 43];
const RAW_BOLT = [88, 89, 90, 91, 91, 92, 92, 93, 92, 93, 93, 94, 93, 94, 94, 95, 95, 95, 96, 95, 96, 96, 96, 97, 96, 97, 96, 97];

const N = 28;
const CX0 = 54, CX1 = 870;   // chart x (leaving 130px on right for end labels)
const CY0 = 20, CY1 = 196;   // chart y (top=100%, bottom=0%)
const VW = 1000, VH = 240;

function svgPts(raw: number[]) {
  return raw.map((pct, i) => ({
    x: CX0 + (i / (N - 1)) * (CX1 - CX0),
    y: CY0 + (1 - pct / 100) * (CY1 - CY0),
    pct, day: i + 1,
    week: Math.ceil((i + 1) / 7),
  }));
}

function catmullPath(pts: ReturnType<typeof svgPts>) {
  let d = `M ${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i];
    const p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = (p1.x + (p2.x - p0.x) / 6).toFixed(2);
    const c1y = (p1.y + (p2.y - p0.y) / 6).toFixed(2);
    const c2x = (p2.x - (p3.x - p1.x) / 6).toFixed(2);
    const c2y = (p2.y - (p3.y - p1.y) / 6).toFixed(2);
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

const PTS_A = svgPts(RAW_NO_PLATFORM);
const PTS_B = svgPts(RAW_TRADITIONAL);
const PTS_C = svgPts(RAW_BOLT);

const LINE_A = catmullPath(PTS_A);
const LINE_B = catmullPath(PTS_B);
const LINE_C = catmullPath(PTS_C);

const FILL_A = `${LINE_A} L ${CX1},${CY1} L ${CX0},${CY1} Z`;
const FILL_B = `${LINE_B} L ${CX1},${CY1} L ${CX0},${CY1} Z`;
const FILL_C = `${LINE_C} L ${CX1},${CY1} L ${CX0},${CY1} Z`;

const SEP_X = [6, 13, 20].map(i => (PTS_A[i].x + PTS_A[i + 1].x) / 2);

const WEEK_LBL = [
  { label: 'WEEK 1', x: (PTS_A[0].x + PTS_A[6].x) / 2 },
  { label: 'WEEK 2', x: (PTS_A[7].x + PTS_A[13].x) / 2 },
  { label: 'WEEK 3', x: (PTS_A[14].x + PTS_A[20].x) / 2 },
  { label: 'WEEK 4', x: (PTS_A[21].x + PTS_A[27].x) / 2 },
];

function interpolate(pts: typeof PTS_A, svgX: number) {
  const clamped = Math.max(CX0, Math.min(CX1, svgX));
  let idx = pts.findIndex(p => p.x >= clamped);
  if (idx <= 0) idx = 1;
  if (idx >= pts.length) idx = pts.length - 1;
  const a = pts[idx - 1], b = pts[idx];
  const t = (clamped - a.x) / (b.x - a.x);
  return {
    x: clamped,
    y: a.y + t * (b.y - a.y),
    pct: Math.round(a.pct + t * (b.pct - a.pct)),
    day: Math.round(a.day + t * (b.day - a.day)),
    week: a.week,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

type Hover = { svgX: number; a: ReturnType<typeof interpolate>; b: ReturnType<typeof interpolate>; c: ReturnType<typeof interpolate> } | null;

import { BouncyCardsFeatures } from '../ui/bounce-card-features';

export const Problem: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<Hover>(null);

  const handleMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const svgX = ((e.clientX - rect.left) / rect.width) * VW;
    const clamped = Math.max(CX0, Math.min(CX1, svgX));
    setHover({ svgX: clamped, a: interpolate(PTS_A, clamped), b: interpolate(PTS_B, clamped), c: interpolate(PTS_C, clamped) });
  }, []);

  const handleLeave = useCallback(() => setHover(null), []);

  // Tooltip box — keep within SVG
  const tipW = 180, tipH = 88;
  const tipX = hover ? Math.min(Math.max(hover.svgX - tipW / 2, 4), VW - tipW - 4) : 0;
  const tipY = hover ? Math.max(CY0 + 4, hover.c.y - tipH - 18) : 0;  // above Bolt line

  return (
    <section id="problem" className="pt-8 pb-24 bg-black relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        <BouncyCardsFeatures />

        {/* Side-by-side layout for Chart and Statement */}
        <div className="flex flex-col xl:flex-row items-stretch gap-8 mt-16 w-full max-w-7xl mx-auto">
          {/* Left: Chart */}
          <div className="w-full xl:w-[65%] flex flex-col justify-center">
            {/* ── Chart Card ──────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-3xl overflow-hidden h-full flex flex-col"
              style={{
                background: 'linear-gradient(160deg,#0d0d0d 0%,#0a0a0a 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 0 100px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-8 py-5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                    style={{ background: '#F59E0B', boxShadow: '0 0 6px #F59E0B' }}
                  />
                  <span
                    className="text-[10px] font-bold tracking-[0.25em] uppercase"
                    style={{ color: 'rgba(245,158,11,0.6)' }}
                  >
                    Student Practice Engagement  ·  4-Week Study
                  </span>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6">
                  {[
                    { color: '#F87171', label: 'No Platform' },
                    { color: '#64748B', label: 'Traditional' },
                    { color: '#F59E0B', label: 'Bolt Abacus', bold: true },
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-2">
                      <svg width="20" height="3">
                        <line x1="0" y1="1.5" x2="20" y2="1.5"
                          stroke={l.color} strokeWidth={l.bold ? 2.5 : 1.5}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span
                        className="text-[10px] tracking-wide"
                        style={{ color: l.bold ? l.color : 'rgba(150,150,150,0.7)', fontWeight: l.bold ? 700 : 400 }}
                      >
                        {l.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SVG Chart */}
              <div className="px-6 pb-4 pt-2" style={{ cursor: 'crosshair' }}>
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${VW} ${VH}`}
                  preserveAspectRatio="none"
                  className="w-full"
                  style={{ height: 280, overflow: 'visible' }}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                >
                  <defs>
                    {/* Line gradients */}
                    <linearGradient id="lg-a" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FCA5A5" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="lg-b" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#334155" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="lg-c" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FDE68A" stopOpacity="1" />
                      <stop offset="60%" stopColor="#F59E0B" stopOpacity="1" />
                      <stop offset="100%" stopColor="#D97706" stopOpacity="1" />
                    </linearGradient>

                    {/* Area gradients */}
                    <linearGradient id="ag-a" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F87171" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="ag-b" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#64748B" stopOpacity="0.07" />
                      <stop offset="100%" stopColor="#64748B" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="ag-c" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                      <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>

                    {/* Glow filters */}
                    <filter id="glow-c" x="-15%" y="-150%" width="130%" height="400%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2" />
                      <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow-a" x="-15%" y="-150%" width="130%" height="400%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                    </filter>
                    <filter id="label-drop" x="-20%" y="-40%" width="140%" height="180%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.8)" />
                    </filter>
                  </defs>

                  {/* Grid lines */}
                  {[100, 75, 50, 25].map((v, gi) => {
                    const gy = CY0 + (1 - v / 100) * (CY1 - CY0);
                    return (
                      <motion.g key={v}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: gi * 0.06, duration: 0.3 }}
                      >
                        <line x1={CX0} y1={gy} x2={CX1} y2={gy}
                          stroke="rgba(255,255,255,0.04)" strokeWidth="1"
                        />
                        <text x={CX0 - 8} y={gy + 4} textAnchor="end" fontSize="9.5"
                          fill="rgba(255,255,255,0.18)" fontFamily="'SF Mono',monospace"
                        >
                          {v}%
                        </text>
                      </motion.g>
                    );
                  })}

                  {/* Baseline */}
                  <line x1={CX0} y1={CY1} x2={CX1} y2={CY1}
                    stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  {/* Week separators */}
                  {SEP_X.map((sx, si) => (
                    <motion.line key={si}
                      x1={sx} y1={CY0} x2={sx} y2={CY1}
                      stroke="rgba(255,255,255,0.035)" strokeWidth="1" strokeDasharray="3 5"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.4 + si * 0.07 }}
                    />
                  ))}

                  {/* ── Area fills ── */}
                  <motion.path d={FILL_A} fill="url(#ag-a)"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: 2.0, duration: 0.8 }}
                  />
                  <motion.path d={FILL_B} fill="url(#ag-b)"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: 2.1, duration: 0.8 }}
                  />
                  <motion.path d={FILL_C} fill="url(#ag-c)"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: 2.2, duration: 0.8 }}
                  />

                  {/* ── Line A: No Platform (red) ── */}
                  <motion.path d={LINE_A} fill="none" stroke="url(#lg-a)" strokeWidth="1.5"
                    strokeLinecap="round" filter="url(#glow-a)"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* ── Line B: Traditional (slate) ── */}
                  <motion.path d={LINE_B} fill="none" stroke="url(#lg-b)" strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* ── Line C: Bolt Abacus (gold, HERO) ── */}
                  <motion.path d={LINE_C} fill="none" stroke="url(#lg-c)" strokeWidth="2.5"
                    strokeLinecap="round" filter="url(#glow-c)"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* Shimmer on Bolt line */}
                  <motion.path d={LINE_C} fill="none"
                    stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round"
                    initial={{ pathLength: 0, pathOffset: 0 }}
                    whileInView={{ pathLength: 0.1, pathOffset: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.6, delay: 1.1, ease: 'easeOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 2 }}
                  />

                  {/* ── End-of-line labels (right side) ── */}
                  {/* No Platform */}
                  <motion.g initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 2.2, duration: 0.4 }}>
                    <circle cx={PTS_A[N - 1].x} cy={PTS_A[N - 1].y} r="3.5"
                      fill="#F87171" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
                    <rect x={CX1 + 8} y={PTS_A[N - 1].y - 10} width="50" height="20" rx="5"
                      fill="rgba(248,113,113,0.12)" stroke="rgba(248,113,113,0.25)" strokeWidth="1" />
                    <text x={CX1 + 33} y={PTS_A[N - 1].y + 4}
                      textAnchor="middle" fontSize="11" fontWeight="700"
                      fill="#F87171" fontFamily="system-ui,sans-serif">15%</text>
                  </motion.g>

                  {/* Traditional */}
                  <motion.g initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 2.3, duration: 0.4 }}>
                    <circle cx={PTS_B[N - 1].x} cy={PTS_B[N - 1].y} r="3.5"
                      fill="#64748B" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
                    <rect x={CX1 + 8} y={PTS_B[N - 1].y - 10} width="50" height="20" rx="5"
                      fill="rgba(100,116,139,0.1)" stroke="rgba(100,116,139,0.22)" strokeWidth="1" />
                    <text x={CX1 + 33} y={PTS_B[N - 1].y + 4}
                      textAnchor="middle" fontSize="11" fontWeight="700"
                      fill="#64748B" fontFamily="system-ui,sans-serif">43%</text>
                  </motion.g>

                  {/* Bolt Abacus end label */}
                  <motion.g initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 2.5, duration: 0.4 }}>
                    {/* Pulse ring */}
                    <motion.circle cx={PTS_C[N - 1].x} cy={PTS_C[N - 1].y} r="10"
                      fill="none" stroke="rgba(245,158,11,0.35)" strokeWidth="1"
                      animate={{ r: [8, 16, 8], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <circle cx={PTS_C[N - 1].x} cy={PTS_C[N - 1].y} r="4.5"
                      fill="#F59E0B" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5"
                      filter="url(#dot-glow)"
                    />
                    <rect x={CX1 + 8} y={PTS_C[N - 1].y - 11} width="62" height="22" rx="6"
                      fill="rgba(245,158,11,0.14)" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
                    <text x={CX1 + 39} y={PTS_C[N - 1].y + 5}
                      textAnchor="middle" fontSize="12" fontWeight="800"
                      fill="#FDE68A" fontFamily="system-ui,sans-serif">97% ↑</text>
                  </motion.g>

                  {/* Bolt Abacus start pulsing dot */}
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: 2.6 }}>
                    <motion.circle cx={PTS_C[0].x} cy={PTS_C[0].y} r="9"
                      fill="none" stroke="rgba(253,230,138,0.3)" strokeWidth="1"
                      animate={{ r: [9, 17, 9], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <circle cx={PTS_C[0].x} cy={PTS_C[0].y} r="4"
                      fill="#FDE68A" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
                  </motion.g>

                  {/* ── Hover layer ── */}
                  {hover && (
                    <g>
                      {/* Vertical hair */}
                      <line x1={hover.svgX} y1={CY0} x2={hover.svgX} y2={CY1}
                        stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />

                      {/* Dots on each line */}
                      {[
                        { h: hover.a, col: '#F87171' },
                        { h: hover.b, col: '#64748B' },
                        { h: hover.c, col: '#F59E0B', big: true },
                      ].map(({ h, col, big }) => (
                        <g key={col}>
                          <circle cx={h.x} cy={h.y} r={big ? 10 : 7}
                            fill={`${col}18`} stroke={`${col}55`} strokeWidth="1" />
                          <circle cx={h.x} cy={h.y} r={big ? 4.5 : 3.5}
                            fill={col} stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
                        </g>
                      ))}

                      {/* Multi-series tooltip */}
                      <g filter="url(#label-drop)">
                        {/* Background */}
                        <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="10"
                          fill="rgba(8,8,8,0.92)"
                          stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                        />
                        {/* Gold top accent */}
                        <rect x={tipX} y={tipY} width={tipW} height="2" rx="1"
                          fill="rgba(245,158,11,0.6)" />

                        {/* Header */}
                        <text x={tipX + tipW / 2} y={tipY + 16}
                          textAnchor="middle" fontSize="9" fontWeight="700"
                          fill="rgba(245,158,11,0.6)" fontFamily="'SF Mono',monospace" letterSpacing="2">
                          {`WEEK ${hover.a.week}  ·  DAY ${hover.a.day}`}
                        </text>

                        {/* Separator */}
                        <line x1={tipX + 10} y1={tipY + 22} x2={tipX + tipW - 10} y2={tipY + 22}
                          stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

                        {/* Row: Bolt Abacus */}
                        <circle cx={tipX + 16} cy={tipY + 36} r="4"
                          fill="#F59E0B" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
                        <text x={tipX + 26} y={tipY + 40} fontSize="11" fontWeight="600"
                          fill="rgba(255,255,255,0.55)" fontFamily="system-ui,sans-serif">
                          Bolt Abacus
                        </text>
                        <text x={tipX + tipW - 10} y={tipY + 40} textAnchor="end" fontSize="12"
                          fontWeight="800" fill="#FDE68A" fontFamily="system-ui,sans-serif">
                          {hover.c.pct}%
                        </text>

                        {/* Row: Traditional */}
                        <circle cx={tipX + 16} cy={tipY + 56} r="4"
                          fill="#64748B" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
                        <text x={tipX + 26} y={tipY + 60} fontSize="11" fontWeight="400"
                          fill="rgba(255,255,255,0.4)" fontFamily="system-ui,sans-serif">
                          Traditional
                        </text>
                        <text x={tipX + tipW - 10} y={tipY + 60} textAnchor="end" fontSize="12"
                          fontWeight="700" fill="#64748B" fontFamily="system-ui,sans-serif">
                          {hover.b.pct}%
                        </text>

                        {/* Row: No Platform */}
                        <circle cx={tipX + 16} cy={tipY + 76} r="4"
                          fill="#F87171" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
                        <text x={tipX + 26} y={tipY + 80} fontSize="11" fontWeight="400"
                          fill="rgba(255,255,255,0.4)" fontFamily="system-ui,sans-serif">
                          No Platform
                        </text>
                        <text x={tipX + tipW - 10} y={tipY + 80} textAnchor="end" fontSize="12"
                          fontWeight="700" fill="#F87171" fontFamily="system-ui,sans-serif">
                          {hover.a.pct}%
                        </text>
                      </g>
                    </g>
                  )}

                  {/* Week labels */}
                  {WEEK_LBL.map((wl, wi) => (
                    <motion.text key={wi} x={wl.x} y={VH - 4}
                      textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.2)"
                      fontFamily="'SF Mono',monospace" fontWeight="600" letterSpacing="2"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.6 + wi * 0.08 }}
                    >
                      {wl.label}
                    </motion.text>
                  ))}
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Right: Unique Confident Statement */}
          <div className="w-full xl:w-[35%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative h-full flex flex-col justify-center"
            >
              {/* Background Quote Mark */}
              <div className="absolute -top-16 -left-2 md:-left-8 text-[120px] font-serif leading-none text-neutral-900/40 select-none pointer-events-none z-0">
                "
              </div>

              <div className="relative h-full z-10 flex flex-col items-stretch gap-0 border border-gold-500/10 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900/50 to-black/80 backdrop-blur-xl shadow-2xl">

                {/* Top Side: The Problem (Dark & Stark) */}
                <div className="w-full p-6 md:px-10 md:py-8 relative flex-1 flex flex-col justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_70%)]" />
                  <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed">
                    Without a structured digital platform, practice completion{' '}
                    <span className="font-bold text-white relative inline-block mt-1">
                      collapses within weeks.
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500/80 to-transparent origin-left"
                      />
                    </span>
                  </p>
                </div>

                {/* Bottom Side: The Solution (Bright & Gold) */}
                <div className="w-full p-6 md:px-10 md:py-8 relative flex flex-col justify-center bg-gradient-to-br from-gold-900/30 to-black overflow-hidden group">
                  {/* Sweeping light effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gold-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold-500/20 blur-[60px] rounded-full" />

                  <div className="relative z-10 w-full">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center mb-5 border border-gold-500/30 shadow-[0_0_20px_rgba(212,165,44,0.2)]">
                      <Trophy className="w-5 h-5 text-gold-400" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 leading-tight drop-shadow-[0_2px_10px_rgba(212,165,44,0.4)]">
                      Bolt Abacus <br />
                      <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mt-1 inline-block">
                        reverses this entirely.
                      </span>
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating particle accents */}
              <motion.div
                animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-2 top-8 w-1.5 h-1.5 bg-gold-400 rounded-full blur-[1px]"
              />
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute left-6 -bottom-4 w-2 h-2 bg-red-400 rounded-full blur-[2px]"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
import React from 'react';
import { BarChart3, FileX, Globe, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Features8 } from '../ui/features-8';
import { FeatureCarousel } from '../ui/feature-carousel';

/* ─── Teacher feature data ─── */
const teacherFeatures = [
  { icon: <BarChart3 />, text: "Track every student's practice & progress", col: '#34d399' },
  { icon: <FileX />, text: 'Zero manual correction — ever', col: '#ffffff' },
  { icon: <TrendingUp />, text: 'Parent-visible progress reports', col: '#f87171' },
  { icon: <Users />, text: 'Batch & level management', col: '#fb923c' },
  { icon: <Globe />, text: 'Access to global competitions', col: '#60a5fa' },
  { icon: <ShieldCheck />, text: 'Teacher-only community & support', col: '#93c5fd' },
];

/* ─── Main component ─── */
export const Features: React.FC = () => {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 4 — FOR STUDENTS
      ═══════════════════════════════════════════════ */}
      <section
        id="students"
        className="py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #060810 0%, #090e18 100%)' }}
      >
        {/* Ambient radial glows — subtle, neutral/cool tones */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-0 w-[700px] h-[500px] rounded-full blur-[160px]"
            style={{ background: 'rgba(99,102,241,0.06)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[140px]"
            style={{ background: 'rgba(236,72,153,0.05)' }}
          />
          <div
            className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ background: 'rgba(245,158,11,0.04)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex justify-center mb-5"
          >
            <span
              className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase"
              style={{ border: '1px solid rgba(129,140,248,0.2)', color: 'rgba(165,180,252,0.8)', background: 'rgba(99,102,241,0.08)' }}
            >
              For Students
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-6xl font-bold text-center text-white mb-4 leading-tight"
          >
            Everything a Student Needs{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              to Stay Hooked
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-lg mb-6 max-w-xl mx-auto"
            style={{ color: '#9ca3af' }}
          >
            Not homework. Not a chore. A platform they'll actually open themselves.
          </motion.p>

          {/* Tap hint */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="text-center text-sm mb-16"
            style={{ color: 'rgba(129,140,248,0.6)' }}
          >
            ✦ Tap any card to flip it
          </motion.p>

          <div className="mb-24">
            <Features8 />
          </div>

          {/* Pricing cue */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <div
              className="flex items-center gap-3 rounded-full px-6 py-2.5 backdrop-blur-sm"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <p className="text-neutral-400 text-sm">
                Students access Bolt Abacus via a subscription.{' '}
                <span className="text-indigo-400 font-medium">Exact pricing on request.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — FOR TEACHERS
      ═══════════════════════════════════════════════ */}
      <section id="teachers" className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0000 0%, #000000 100%)' }}>
        {/* Diagonal gold beam */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gold-500/6 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-900/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex justify-center mb-5"
          >
            <span className="px-4 py-1.5 rounded-full border border-gold-500/20 text-[11px] font-bold tracking-[0.25em] uppercase text-gold-500/60">
              For Teachers — Always Free
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-6xl font-bold text-center text-white mb-4 leading-tight"
          >
            Your Dashboard.{' '}
            <span className="text-gold-500">Your Control.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-neutral-400 text-lg mb-20 max-w-lg mx-auto"
          >
            Teachers never pay. And you never lose control of your classroom.
          </motion.p>

          <div className="max-w-5xl mx-auto mb-20 relative z-20" style={{ height: '600px' }}>
            <FeatureCarousel
              title=""
              description=""
              image={{
                step1light1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", // Dashboard 1
                step1light2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200", // Dashboard data
                step2light1: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200", // Zero Manual
                step2light2: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200", // Auto Grading
                step3light: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200", // Management
                step4light: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200", // Global scale
                alt: "Teacher platform demonstration"
              }}
              /* Positioning for Dashboard Slide */
              step1img1Class="pointer-events-none w-[55%] border border-white/10 transition-all duration-500 rounded-2xl shadow-2xl left-[5%] top-[50%] md:left-[10%] md:top-[40%] object-cover h-[300px]"
              step1img2Class="pointer-events-none w-[45%] border border-white/10 transition-all duration-500 rounded-2xl shadow-2xl left-[45%] top-[35%] md:left-[50%] md:top-[25%] backdrop-blur-md object-cover h-[250px]"
              /* Positioning for Zero Manual Slide */
              step2img1Class="pointer-events-none w-[50%] border border-white/10 transition-all duration-500 rounded-2xl shadow-2xl left-[10%] top-[45%] md:left-[15%] md:top-[35%] object-cover h-[300px]"
              step2img2Class="pointer-events-none w-[40%] border border-white/10 transition-all duration-500 rounded-2xl shadow-2xl left-[50%] top-[30%] md:left-[55%] md:top-[20%] backdrop-blur-md object-cover h-[250px]"
              /* Positioning for Management Slide */
              step3imgClass="pointer-events-none w-[80%] border border-white/10 transition-all duration-500 rounded-2xl shadow-2xl left-[10%] top-[35%] md:left-[10%] md:top-[30%] object-cover h-[350px]"
              /* Positioning for Global Slide */
              step4imgClass="pointer-events-none w-[80%] border border-white/10 transition-all duration-500 rounded-2xl shadow-2xl left-[10%] top-[35%] md:left-[10%] md:top-[30%] object-cover h-[350px]"
            />
          </div>
        </div>
      </section>
    </>
  );
};
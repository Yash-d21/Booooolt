import React from 'react';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #000 0%, #0a0700 50%, #000 100%)' }}>
      {/* Multi-layer glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gold-500/8 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold-400/6 rounded-full blur-[60px]" />
      </div>

      {/* Subtle top divider glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20">
            <Zap size={12} className="text-gold-400 fill-gold-400" />
            <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">Start Today — Teacher Portal is Free</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.05]"
          style={{ textShadow: '0 0 80px rgba(245,158,11,0.15)' }}
        >
          Bring Structured Practice
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-200 via-gold-500 to-gold-300">
            Into Your Classes
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-neutral-400 text-xl mb-14 max-w-xl mx-auto leading-relaxed"
        >
          No commitment. No cards. Just see if it fits — your students will tell you within a week.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <a href="mailto:demo@boltabacus.com">
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(245,158,11,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-black font-bold text-base cursor-pointer"
            >
              Book a Free Demo
              <ArrowRight size={16} />
            </motion.div>
          </a>
          <a href="#students">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-neutral-300 font-medium text-base cursor-pointer hover:border-gold-500/30 hover:text-gold-400 transition-colors"
            >
              See Curriculum
            </motion.div>
          </a>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-2">
            {['#818cf8', '#f59e0b', '#34d399'].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-black" style={{ background: c }} />
            ))}
          </div>
          <p className="text-neutral-500 text-sm">
            Trusted by abacus educators across India
          </p>
        </motion.div>
      </div>
    </section>
  );
};
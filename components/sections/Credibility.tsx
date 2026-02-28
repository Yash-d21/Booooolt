import React from 'react';
import { Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { TestimonialsSection } from '../ui/testimonial-v2';

const records = [
  { title: 'Limca Book', sub: 'of World Records' },
  { title: 'Asia Book', sub: 'of World Records' },
  { title: 'India Book', sub: 'of World Records' },
];

export const Credibility: React.FC = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/5 min-h-screen flex flex-col justify-center">
      {/* Ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/4 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gold-500/4 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <TestimonialsSection />

        {/* Curriculum Validation — World Record Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Glowing border */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-gold-500/20 via-gold-300/30 to-gold-500/20" />
          <div
            className="relative rounded-3xl py-14 px-10"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(0,0,0,0.95) 60%, rgba(245,158,11,0.04) 100%)' }}
          >
            {/* Center glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_65%)] pointer-events-none" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 mb-6">
                <Award className="text-gold-400 w-7 h-7" />
              </div>

              <p className="text-gold-400/60 text-xs font-bold tracking-[0.3em] uppercase mb-3">
                Curriculum Validated By
              </p>

              <h3 className="text-white font-bold text-3xl md:text-4xl mb-10 leading-tight">
                A World Record Holder in Abacus
              </h3>

              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {records.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-white font-black text-2xl leading-tight">{r.title}</span>
                    <span className="text-gold-500/50 text-xs font-semibold tracking-wider uppercase mt-1">{r.sub}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
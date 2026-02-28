import React from 'react';
import { UserPlus, Users, BarChart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    icon: <UserPlus />,
    title: 'Teacher creates a',
    highlight: 'Free Teacher Account',
    color: '#818cf8',
    desc: 'Sign up in 60 seconds. No credit card, no commitment.',
  },
  {
    num: '02',
    icon: <Users />,
    title: 'Students join and',
    highlight: 'Subscribe to Practice',
    color: '#f59e0b',
    desc: 'Students get access to the full practice engine.',
  },
  {
    num: '03',
    icon: <BarChart />,
    title: 'Teacher tracks',
    highlight: 'Progress & Guides',
    color: '#34d399',
    desc: 'Live dashboard. Zero correction work. Full visibility.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden min-h-screen flex flex-col justify-center" style={{ background: 'linear-gradient(180deg, #000 0%, #070706 100%)' }}>
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gold-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400">
            Getting Started
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-5xl md:text-6xl font-bold text-white text-center mb-4 leading-tight"
        >
          How Bolt Abacus Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 font-light text-center text-xl md:text-2xl mb-16 md:mb-24 max-w-2xl mx-auto"
        >
          Three steps is all it takes to transform your classroom.
        </motion.p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto relative pt-4 pb-16 items-end">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full"
            >
              {/* Outer Glow container */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Card */}
              <div className={`relative z-10 w-full rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-6 md:p-8 overflow-hidden transition-all duration-500 group-hover:border-white/10 group-hover:bg-neutral-900/60 shadow-2xl flex flex-col min-h-[340px] md:min-h-0 ${i === 0 ? "md:h-[340px]" : i === 1 ? "md:h-[390px]" : "md:h-[440px]"}`}>

                {/* Massive faint number background */}
                <div
                  className="absolute -right-4 -bottom-10 text-[180px] font-black leading-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none select-none z-0 tracking-tighter"
                  style={{ color: step.color }}
                >
                  {step.num}
                </div>

                {/* Gradient glow spot inside card */}
                <div
                  className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0"
                  style={{ backgroundColor: step.color }}
                />

                <div className="relative z-10 font-sans flex flex-col h-full">
                  {/* Floating Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-xl relative top-0 group-hover:-translate-y-2 transition-transform duration-500"
                    style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    {React.cloneElement(step.icon as React.ReactElement<any>, { size: 22, style: { color: step.color, filter: `drop-shadow(0 0 10px ${step.color}80)` } })}
                  </div>

                  <div className="mt-auto text-left">
                    {/* Step label */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: step.color }}>STEP {step.num}</span>
                      <div className="h-px flex-1 opacity-20" style={{ backgroundImage: `linear-gradient(90deg, ${step.color}, transparent)` }} />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight tracking-tight">
                      <span className="block text-neutral-400 font-medium text-base md:text-lg leading-snug mb-0.5">{step.title}</span>
                      {step.highlight}
                    </h3>

                    <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base pr-4">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-16"
        >

        </motion.div>
      </div>
    </section>
  );
};
import React from 'react';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { HeroAbacusVisual } from '../ui/HeroAbacusVisual';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,44,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,165,44,0.05),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-white tracking-tight mb-6">
              Modern Practice <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">
                Revolution.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              A premium dashboard for teachers. <br className="hidden md:block" />
              An addictive game for students.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4 items-center lg:items-start"
          >
            <div className="flex flex-col gap-3">
              {[
                "Teacher dashboard is 100% Free",
                "Students subscribe for Practice",
                "World Record Holder Curriculum"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                  <span className="text-neutral-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4"
          >
            <a href="#contact">
              <InteractiveHoverButton text="Book Free Demo" className="w-48 bg-gold-500 text-black border-gold-500 hover:bg-gold-400" />
            </a>
            <a href="#students">
              <InteractiveHoverButton text="See Student View" className="w-48 border-white/20 hover:border-gold-500/50" />
            </a>
          </motion.div>
        </div>

        {/* Right Visual - Animated Abacus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative lg:block hidden"
        >
          <HeroAbacusVisual />
        </motion.div>
      </div>
    </section>
  );
};
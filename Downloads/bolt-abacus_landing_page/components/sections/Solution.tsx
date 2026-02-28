import React from 'react';
import { Layers, Users, Gamepad2, Trophy, BarChart3, Globe, Zap, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const Solution: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-neutral-950 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Bolt Abacus is a Practice Platform <br></br>{' '}
            <span className="text-gold-500">Not Just Software</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg text-neutral-400"
          >
            Bolt Abacus gives students a structured, gamified, competitive practice environment while giving teachers a free dashboard to track and guide them.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Student Journey Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900/50 rounded-3xl p-2 border border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col h-full"
          >
            <div className="flex-1 bg-black/50 rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

              <h3 className="text-3xl font-bold text-white mb-6">Student Journey</h3>

              {/* Image / Tablet representation */}
              <div className="relative w-full max-w-sm aspect-[4/3] bg-neutral-800 rounded-xl mb-8 border border-neutral-700 overflow-hidden shadow-2xl shadow-blue-900/20 group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800"
                  alt="Student Interface"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono border border-blue-500/30 backdrop-blur-md">
                    Level 5 • Speed Drill
                  </span>
                </div>
              </div>

              {/* Bottom Icons Row */}
              <div className="grid grid-cols-3 gap-4 w-full mt-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Zap size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Daily Structured Practice</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Gamepad2 size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Gamified Challenges</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Trophy size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Global Tournaments</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Teacher View Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900/50 rounded-3xl p-2 border border-white/5 hover:border-gold-500/30 transition-colors group flex flex-col h-full"
          >
            <div className="flex-1 bg-black/50 rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-50" />

              <h3 className="text-3xl font-bold text-white mb-6">Teacher View</h3>

              {/* Image / Dashboard representation */}
              <div className="relative w-full max-w-sm aspect-[4/3] bg-neutral-800 rounded-xl mb-8 border border-neutral-700 overflow-hidden shadow-2xl shadow-gold-900/20 group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                  alt="Teacher Dashboard"
                  className="w-full h-full object-cover opacity-80 sepia-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4">
                  <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-mono border border-gold-500/30 backdrop-blur-md">
                    Admin Dashboard • Batch A
                  </span>
                </div>
              </div>

              {/* Bottom Icons Row */}
              <div className="grid grid-cols-3 gap-4 w-full mt-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                    <BarChart3 size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Free Dashboard</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                    <Globe size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Student Tracks</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                    <Settings size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Batch Management</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
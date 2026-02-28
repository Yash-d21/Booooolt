import React, { useState } from 'react';
import { Layers, Users, Gamepad2, Trophy, BarChart3, Globe, Zap, Settings, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Solution: React.FC = () => {
  const [hoverSide, setHoverSide] = useState<'student' | 'teacher' | null>(null);

  // Constants for animations based on screen size
  const studentWidth = hoverSide === 'student' ? '70%' : hoverSide === 'teacher' ? '30%' : '50%';
  const teacherWidth = hoverSide === 'teacher' ? '70%' : hoverSide === 'student' ? '30%' : '50%';

  return (
    <section className="py-24 bg-gradient-to-b from-black to-neutral-950 relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Bolt Abacus is a <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Practice Platform</span> <br className="hidden md:block"></br>
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

        {/* Expanding Split Container */}
        <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto lg:h-[650px] relative">

          {/* Student Journey Side */}
          <motion.div
            layout
            onMouseEnter={() => setHoverSide('student')}
            onMouseLeave={() => setHoverSide(null)}
            animate={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? studentWidth : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-neutral-900/50 rounded-3xl p-2 border border-white/5 hover:border-blue-500/50 transition-colors group flex flex-col min-h-[500px] lg:min-h-0 relative overflow-hidden"
          >
            <div className="flex-1 bg-black/50 rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

              <h3 className="text-3xl font-bold text-white mb-6 whitespace-nowrap">Student Journey</h3>

              {/* Image / Tablet representation */}
              <div className="relative w-full max-w-sm aspect-[4/3] bg-neutral-800 rounded-xl mb-6 border border-neutral-700 overflow-hidden shadow-2xl shadow-blue-900/20 group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
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
              <motion.div
                animate={{ opacity: hoverSide === 'teacher' ? 0 : 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-auto pt-4 transition-opacity duration-300"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Zap size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Daily Practice</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Gamepad2 size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Gamified Drills</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Trophy size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Global Tournaments</span>
                </div>
              </motion.div>

              {/* Student CTA */}
              <div className="mt-8 pt-6 w-full flex justify-center border-t border-blue-500/10 relative z-10 transition-all duration-300">
                <a href="https://student.boltabacus.com/student/auth" target="_blank" rel="noopener noreferrer" className="w-full max-w-sm">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold flex flex-row items-center justify-center gap-2 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                  >
                    <span className="whitespace-nowrap">Student Login</span>
                    <ArrowRight size={18} className="flex-shrink-0" />
                  </motion.div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Teacher View Side */}
          <motion.div
            layout
            onMouseEnter={() => setHoverSide('teacher')}
            onMouseLeave={() => setHoverSide(null)}
            animate={{ width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? teacherWidth : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-neutral-900/50 rounded-3xl p-2 border border-white/5 hover:border-gold-500/50 transition-colors group flex flex-col min-h-[500px] lg:min-h-0 relative overflow-hidden"
          >
            <div className="flex-1 bg-black/50 rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-50" />

              <h3 className="text-3xl font-bold text-white mb-6 whitespace-nowrap">Teacher View</h3>

              {/* Image / Dashboard representation */}
              <div className="relative w-full max-w-sm aspect-[4/3] bg-neutral-800 rounded-xl mb-6 border border-neutral-700 overflow-hidden shadow-2xl shadow-gold-900/20 group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                  alt="Teacher Dashboard"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4">
                  <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-mono border border-gold-500/30 backdrop-blur-md">
                    Admin Dashboard • Batch A
                  </span>
                </div>
              </div>

              {/* Bottom Icons Row */}
              <motion.div
                animate={{ opacity: hoverSide === 'student' ? 0 : 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-auto pt-4 transition-opacity duration-300"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <BarChart3 size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Free Dashboard</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <Globe size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Student Tracks</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <Settings size={18} />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Batch Management</span>
                </div>
              </motion.div>

              {/* Teacher CTA */}
              <div className="mt-8 pt-6 w-full flex justify-center border-t border-gold-500/10 relative z-10 transition-all duration-300">
                <a href="https://teacher.boltabacus.com/teacher/auth" target="_blank" rel="noopener noreferrer" className="w-full max-w-sm">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold flex flex-row items-center justify-center gap-2 hover:bg-gold-500/20 hover:border-gold-400/50 transition-all shadow-[0_0_20px_rgba(212,165,44,0.1)] hover:shadow-[0_0_30px_rgba(212,165,44,0.2)]"
                  >
                    <span className="whitespace-nowrap">Teacher Login</span>
                    <ArrowRight size={18} className="flex-shrink-0" />
                  </motion.div>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// --- Magnetic Nav Item Component ---
const NavItem = ({
  children,
  onClick,
  isActive,
  id
}: {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  id: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative z-10 h-full px-6 text-sm font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center ${isActive ? 'text-white drop-shadow-sm' : 'text-neutral-400 hover:text-white'
        }`}
    >
      {children}
    </button>
  );
};

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  // Floating animation for the entire navbar
  const y = useTransform(scrollY, [0, 100], [0, -20]);
  const opacity = useTransform(scrollY, [0, 50], [1, 1]); // Always visible now, just floating
  const width = useTransform(scrollY, [0, 100], ['100%', '90%']); // Slight shrink on scroll is optional, but let's keep it fixed width mostly

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['problem', 'students', 'teachers', 'how-it-works'];
      // Simple check to see which section is in view
      // In a real app, use IntersectionObserver for better performance
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Why Bolt?', id: 'problem' },
    { label: 'Students', id: 'students' },
    { label: 'Teachers', id: 'teachers' },
    { label: 'How It Works', id: 'how-it-works' }
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="group flex-shrink-0"
        >
          <img src="/logo.png" alt="Bolt Abacus" className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(212,165,44,0.2)]" />
        </button>

        {/* Navigation Items (Desktop) */}
        <div className="hidden md:flex relative items-center bg-gold-950/20 rounded-full border border-gold-500/10 p-1">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <div className="h-10 flex items-center">
                <NavItem
                  id={item.id}
                  isActive={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </NavItem>
              </div>

              {activeSection === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-y-0 inset-x-0 bg-gold-500/25 rounded-full border border-gold-500/20 shadow-[0_0_20px_rgba(212,165,44,0.2)]"
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">


            <a
              href="https://www.boltabacus.com/sign"
              className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[#0a0a0a] to-[#111111] rounded-full border border-gold-500/30 shadow-[0_0_20px_rgba(212,165,44,0.1),_inset_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(212,165,44,0.25),_inset_0_1px_rgba(255,255,255,0.1)] hover:border-gold-500/60 transition-all duration-300 whitespace-nowrap group"
            >
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </div>
              <span className="text-xs font-bold text-white tracking-[0.1em] uppercase mt-[1px]">Sign In</span>
              <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ml-1 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-colors">
                <User size={10} className="text-gold-400" />
              </div>
            </a>
          </div>

          <button
            className="md:hidden w-10 h-10 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="flex flex-col gap-6 items-center relative z-10 w-full px-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 hover:to-gold-400 tracking-tight"
                >
                  {item.label}
                </motion.button>
              ))}


            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .mix-blend-difference {
          mix-blend-mode: difference;
        }
      `}</style>
    </>
  );
};
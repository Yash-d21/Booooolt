import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
    // Usually triggers auth logic
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden font-sans selection:bg-gold-500 selection:text-black">
      {/* Background - Shadow Fight / Cinematic Dark Vibe */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,165,44,0.15),_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        {/* Dynamic mystical dust particles (simplified with purely CSS/divs for effect) */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[100vw] h-[50vh] bg-gold-500/5 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-1/4 w-[100vw] h-[50vh] bg-emerald-500/5 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
      >
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:border-gold-500/50 group-hover:bg-gold-500/10 transition-all">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="text-sm font-bold tracking-widest uppercase">Back to Home</span>
      </Link>

      {/* Login Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-8 md:p-12"
      >
        {/* Box styling - Glassmorphic high-tech dark cinematic */}
        <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5),_inset_0_1px_rgba(255,255,255,0.05)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          <div className="absolute left-0 top-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="mb-10 text-center">
            <motion.div 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto bg-black rounded-2xl border border-gold-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,165,44,0.15)] mb-6"
            >
              <img src="/icon.png" alt="Bolt" className="w-8 h-8 object-contain" />
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">ACCESS HUB</h1>
            <p className="text-sm text-neutral-400 tracking-wider uppercase font-medium">Verify your credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-gold-500/10 rounded-xl blur-lg transition-opacity duration-300 ${isFocused === 'email' ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`relative flex items-center bg-black/50 border rounded-xl overflow-hidden transition-colors duration-300 ${isFocused === 'email' ? 'border-gold-500/50' : 'border-white/10 hover:border-white/20'}`}>
                  <div className="pl-4 pr-3 text-neutral-500">
                    <User size={18} className={isFocused === 'email' ? 'text-gold-400' : ''} />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    required
                    className="w-full bg-transparent border-none py-4 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-0 text-base"
                    placeholder="Operator ID / Email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-gold-500/10 rounded-xl blur-lg transition-opacity duration-300 ${isFocused === 'password' ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`relative flex items-center bg-black/50 border rounded-xl overflow-hidden transition-colors duration-300 ${isFocused === 'password' ? 'border-gold-500/50' : 'border-white/10 hover:border-white/20'}`}>
                  <div className="pl-4 pr-3 text-neutral-500">
                    <Lock size={18} className={isFocused === 'password' ? 'text-gold-400' : ''} />
                  </div>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    required
                    className="w-full bg-transparent border-none py-4 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-0 text-base font-mono"
                    placeholder="••••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs tracking-widest font-bold uppercase mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative w-4 h-4 rounded-sm border border-neutral-600 group-hover:border-gold-500/50 flex items-center justify-center transition-colors">
                  <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer" />
                  <div className="w-2 h-2 bg-gold-500 rounded-sm opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
                <span className="text-neutral-400 group-hover:text-white transition-colors mt-[1px]">Remember me</span>
              </label>
              <a href="#" className="flex items-center gap-1 text-gold-500 hover:text-gold-400 transition-colors">
                Recover Key
                <ExternalLink size={12} />
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="relative w-full group mt-6"
            >
              <div className="absolute inset-0 bg-gold-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full bg-gradient-to-r from-gold-950 via-gold-900 to-gold-950 border border-gold-500/50 text-gold-100 py-4 rounded-xl flex items-center justify-center gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite_linear]" />
                <span className="relative text-sm font-black tracking-[0.2em] uppercase mt-[1px]">Initialize</span>
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(212,165,44,1)] animate-pulse" />
              </div>
            </motion.button>
          </form>
          
          <div className="mt-8 text-center border-t border-white/5 pt-8">
            <p className="text-xs text-neutral-500 font-medium tracking-widest uppercase">
              No access clearance? <br className="md:hidden" />
              <a href="#contact" className="text-white hover:text-gold-400 ml-1 transition-colors underline decoration-white/20 underline-offset-4">Request Auth</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

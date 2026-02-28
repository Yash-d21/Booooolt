import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-gold-500 rounded-sm rotate-45"></div>
               <span className="text-xl font-bold text-white tracking-wide">BOLT ABACUS</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
               The modern standard for Abacus practice. Empowering teachers, engaging students.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex gap-12 md:gap-24">
             <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
                <ul className="space-y-3 text-sm text-neutral-400">
                   <li><a href="#" className="hover:text-gold-400 transition-colors">For Teachers</a></li>
                   <li><a href="#" className="hover:text-gold-400 transition-colors">For Students</a></li>
                   <li><a href="#" className="hover:text-gold-400 transition-colors">Pricing</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
                <ul className="space-y-3 text-sm text-neutral-400">
                   <li><a href="#" className="hover:text-gold-400 transition-colors">About Us</a></li>
                   <li><a href="#" className="hover:text-gold-400 transition-colors">Contact</a></li>
                   <li><a href="#" className="hover:text-gold-400 transition-colors">Blog</a></li>
                </ul>
             </div>
          </div>

          {/* Socials */}
          <div>
             <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Follow Us</h4>
             <div className="flex gap-3">
                {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                   <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-gold-500 hover:text-black transition-all">
                      <Icon size={16} />
                   </a>
                ))}
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 gap-4">
          <p>© {new Date().getFullYear()} Bolt Abacus. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
            <a href="#" className="hover:text-neutral-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
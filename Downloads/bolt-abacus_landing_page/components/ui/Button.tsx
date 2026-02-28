import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  icon = false,
  className = '',
  href,
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-500 transform flex items-center justify-center gap-3 overflow-hidden group select-none";
  
  const variants = {
    primary: "bg-gold-500 text-black shadow-[0_0_20px_rgba(212,165,44,0.3)] hover:shadow-[0_0_40px_rgba(212,165,44,0.6)] hover:scale-105 active:scale-95",
    secondary: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-gold-500/50 hover:text-gold-400 hover:shadow-[0_0_20px_rgba(212,165,44,0.2)]",
    outline: "bg-transparent text-white border border-neutral-700 hover:border-gold-500 hover:text-gold-400",
    ghost: "bg-transparent text-neutral-400 hover:text-white"
  };

  const content = (
    <>
      {/* Shimmer Effect for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
      )}
      
      <span className="relative z-20 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} hover:-translate-y-1 active:scale-95`}
      {...props}
    >
      {content}
    </button>
  );
};
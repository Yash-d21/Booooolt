import React from "react";
import { motion } from "framer-motion";
import { UserX, FileQuestion, EyeOff, PenTool, Trophy } from "lucide-react";

export const BouncyCardsFeatures = () => {
    return (
        <div className="w-full text-slate-800 pb-16">
            <div className="mb-20 flex flex-col justify-center items-center text-center px-4">
                <span className="text-2xl md:text-3xl font-semibold text-neutral-300 mb-2">
                    Teaching Abacus isn't the problem.
                </span>
                <h2 className="w-full text-4xl md:text-5xl font-bold text-gold-500 leading-tight max-w-5xl">
                    Student practice is.
                </h2>
            </div>

            <div className="mb-4 grid grid-cols-12 gap-4">
                <BounceCard className="col-span-12 md:col-span-8 group hover:bg-neutral-900 border border-white/5 bg-neutral-950">
                    <div className="relative z-10">
                        <UserX className="w-10 h-10 text-red-400 mb-4" />
                        <CardTitle>Students don't practice regularly at home</CardTitle>
                    </div>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] border border-white/10 overflow-hidden backdrop-blur-sm">
                        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800" alt="Bored student" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                        <span className="relative block text-center font-semibold text-red-200 mt-4">
                            Without digital engagement, abacus practice drops by 80% after week 2.
                        </span>
                    </div>
                </BounceCard>

                <BounceCard className="col-span-12 md:col-span-4 group hover:bg-neutral-900 border border-white/5 bg-neutral-950">
                    <div className="relative z-10">
                        <FileQuestion className="w-10 h-10 text-amber-400 mb-4" />
                        <CardTitle>Worksheets get boring</CardTitle>
                    </div>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] border border-white/10 overflow-hidden backdrop-blur-sm">
                        <img src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800" alt="Stack of papers" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                        <span className="relative block text-center font-semibold text-amber-200 mt-4">
                            Paper sheets feel like homework, not play.
                        </span>
                    </div>
                </BounceCard>
            </div>

            <div className="grid grid-cols-12 gap-4">
                <BounceCard className="col-span-12 md:col-span-4 group hover:bg-neutral-900 border border-white/5 bg-neutral-950">
                    <div className="relative z-10">
                        <EyeOff className="w-10 h-10 text-emerald-400 mb-4" />
                        <CardTitle>Parents are blind</CardTitle>
                    </div>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:-rotate-[1deg] border border-white/10 overflow-hidden backdrop-blur-sm">
                        <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800" alt="Parent confused" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                        <span className="relative block text-center font-semibold text-emerald-200">
                            Zero visibility into actual daily progress.
                        </span>
                    </div>
                </BounceCard>

                <BounceCard className="col-span-12 md:col-span-4 group hover:bg-neutral-900 border border-white/5 bg-neutral-950">
                    <div className="relative z-10">
                        <PenTool className="w-10 h-10 text-indigo-400 mb-4" />
                        <CardTitle>Endless correcting</CardTitle>
                    </div>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[1deg] border border-white/10 overflow-hidden backdrop-blur-sm">
                        <img src="https://unsplash.com/photos/black-retractable-pen-on-white-printer-paper-_zsL306fDck" alt="Correcting papers" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                        <span className="relative block text-center font-semibold text-indigo-200">
                            Teachers waste hours grading manual sheets.
                        </span>
                    </div>
                </BounceCard>

                <BounceCard className="col-span-12 md:col-span-4 group hover:bg-neutral-900 border border-white/5 bg-neutral-950">
                    <div className="relative z-10">
                        <Trophy className="w-10 h-10 text-gold-400 mb-4" />
                        <CardTitle>No competitions</CardTitle>
                    </div>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-gold-500/20 to-orange-500/20 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] border border-white/10 overflow-hidden backdrop-blur-sm">
                        <img src="https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=800" alt="Trophy" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                        <span className="relative block text-center font-semibold text-gold-200 mt-2">
                            Isolated practice lacks the motivation of a leaderboard.
                        </span>
                    </div>
                </BounceCard>
            </div>
        </div>
    );
};

const BounceCard = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return (
        <motion.div
            whileHover={{ scale: 0.98, rotate: "-1deg" }}
            className={`relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl p-8 ${className}`}
        >
            {children}
        </motion.div>
    );
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h3 className="text-xl md:text-2xl font-bold text-white max-w-xs">{children}</h3>
    );
};

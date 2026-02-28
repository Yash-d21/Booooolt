import React from 'react';
import { motion } from "framer-motion";

// --- Types ---
export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

// --- Data ---
const baseTestimonials: Testimonial[] = [
    {
        text: "My students practice 3× more because they want to top the leaderboard. It's not homework anymore — it's a sport.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Asvaan Zuhair",
        role: "Director, Abacus Institute 1",
    },
    {
        text: "The teacher dashboard is the thing I never knew I needed. I can tell at a glance who is falling behind — before the test.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Yashwanth Devulapally",
        role: "Director, Abacus Institute 2",
    },
    {
        text: "Parents stopped asking 'how is my child doing?' because they can see it themselves. That alone saves me hours a month.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Md. Mujahed",
        role: "Director, Abacus Institute 3",
    },
];

// Duplicate the data a few times to ensure smooth scrolling
const testimonials: Testimonial[] = [
    ...baseTestimonials,
    ...baseTestimonials,
    ...baseTestimonials
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <motion.li
                                    key={`${index}-${i}`}
                                    aria-hidden={index === 1 ? "true" : "false"}
                                    tabIndex={index === 1 ? -1 : 0}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.15), 0 10px 10px -5px rgba(245, 158, 11, 0.05)",
                                        transition: { type: "spring", stiffness: 400, damping: 17 }
                                    }}
                                    className="p-8 rounded-3xl border border-white/10 shadow-lg shadow-black/5 max-w-xs w-full bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 cursor-default select-none group focus:outline-none"
                                >
                                    <blockquote className="m-0 p-0 flex flex-col h-full">
                                        <p className="text-neutral-300 leading-relaxed font-normal m-0 transition-colors duration-300 flex-grow">
                                            "{text}"
                                        </p>
                                        <footer className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
                                            <img
                                                width={40}
                                                height={40}
                                                src={image}
                                                alt={`Avatar of ${name}`}
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-800 group-hover:ring-gold-500/50 transition-all duration-300 ease-in-out"
                                            />
                                            <div className="flex flex-col">
                                                <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300 text-sm">
                                                    {name}
                                                </cite>
                                                <span className="text-xs leading-5 tracking-tight text-gold-500/80 mt-0.5 transition-colors duration-300 uppercase font-semibold">
                                                    {role}
                                                </span>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </motion.li>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.ul>
        </div>
    );
};

export const TestimonialsSection = () => {
    return (
        <div className="bg-transparent py-10 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.0,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className="container px-4 z-10 mx-auto"
            >
                <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16 px-4">
                    <div className="flex justify-center mb-6">
                        <span className="px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400 bg-neutral-900/50 backdrop-blur-sm">
                            Trusted by Educators
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-white leading-tight">
                        Real Teachers.{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">
                            Real Results.
                        </span>
                    </h2>
                    <p className="text-center mt-6 text-neutral-400 text-lg leading-relaxed max-w-xl">
                        Not just software — a platform that changes how abacus teaching works.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[700px] overflow-hidden px-4"
                    role="region"
                    aria-label="Scrolling Testimonials"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={20} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={25} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={22} />
                </div>
            </motion.div>
        </div>
    );
};

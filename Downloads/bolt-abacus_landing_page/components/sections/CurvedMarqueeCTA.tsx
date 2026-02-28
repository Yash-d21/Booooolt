import React, { useEffect, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { Highlighter } from '../ui/highlighter';

const images = [
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400&h=400", // kids raising hands
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400&h=400", // kids studying
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400&h=400", // classroom
    "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&q=80&w=400&h=400", // student
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400&h=400", // learning
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400&h=400", // writing
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=400", // books
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&h=400", // students together
    "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=400&h=400", // kid smiling
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=400&h=400", // learning math
];

// Combine all images multiple times since we want an infinite looping carousel
const LOOP_IMAGES = [...images, ...images];

export const CurvedMarqueeCTA: React.FC = () => {
    // Radius of the huge circle
    const RADIUS = 1800;
    const CARD_W = 260;
    const CARD_H = 320;

    const ANGLE_STEP = 12;
    const TOTAL_ANGLE = LOOP_IMAGES.length * ANGLE_STEP;

    const [rotation, setRotation] = useState(0);

    // Infinite rotation driving the wheel
    useAnimationFrame((t, delta) => {
        const rotationSpeed = 0.015; // slightly faster
        setRotation((prev) => {
            const next = prev - rotationSpeed * delta;
            if (next <= -(images.length * ANGLE_STEP)) {
                return next + (images.length * ANGLE_STEP);
            }
            return next;
        });
    });

    return (
        <section className="relative w-full h-[100vh] min-h-screen bg-[#070707] overflow-hidden flex flex-col justify-center items-center border-t border-white/5 z-0">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
            </div>

            {/* The Invisible Huge Wheel */}
            {/* 
                We place the pivot of the wheel way down so the top of the wheel arches above our central text.
                If RADIUS is 1800, placing the pivot at `top: 70%` makes the top of the circle stretch up and arc overhead.
             */}
            <div className="absolute left-1/2 z-0 pointer-events-none" style={{ transform: 'translateX(-50%)', top: 'calc(10vh + 1800px)' }}>
                <div
                    className="relative"
                    style={{
                        width: 0,
                        height: 0,
                        transform: `rotate(${rotation}deg)`,
                    }}
                >
                    {LOOP_IMAGES.map((src, i) => {
                        // Start placing images from -90 degrees roughly (left to right)
                        // Actually let's just place them sequentially starting ahead of the user
                        const currentAngle = i * ANGLE_STEP; // from 0 up to 200 degrees
                        return (
                            <div
                                key={i}
                                className="absolute rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                                style={{
                                    width: CARD_W,
                                    height: CARD_H,
                                    left: -CARD_W / 2,
                                    top: -RADIUS, // Put the image up at the edge of the circle
                                    transformOrigin: `50% ${RADIUS}px`, // Rotate from the bottom center of the circle
                                    transform: `rotate(${currentAngle}deg)`,
                                }}
                            >
                                <img
                                    src={src}
                                    alt="Student learning"
                                    className="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-[100vh]">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight max-w-2xl"
                >
                    We let kids{' '}
                    <Highlighter action="underline" color="#F59E0B">
                        fall in love
                    </Highlighter>
                    {' '}with math
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg md:text-xl text-neutral-400 mb-10 max-w-md font-light leading-relaxed"
                >
                    Interactive classes that make kids love numbers. <br />
                    Taught by certified abacus trainers.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <a href="#contact" className="inline-block">
                        <InteractiveHoverButton
                            text="Claim your free demo class now"
                            className="bg-[#F8E231] text-black border-none hover:bg-yellow-400 font-bold px-8 py-3 w-auto md:w-[320px] rounded-2xl text-lg shadow-[0_0_40px_rgba(248,226,49,0.3)] transition-all"
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

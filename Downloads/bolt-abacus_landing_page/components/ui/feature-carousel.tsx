"use client"

import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
    type MouseEvent,
} from "react"
import clsx from "clsx"
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    type MotionStyle,
    type MotionValue,
    type Variants,
} from "framer-motion"
import Balancer from "react-wrap-balancer"
import { cn } from "@/lib/utils"

type WrapperStyle = MotionStyle & {
    "--x": MotionValue<string>
    "--y": MotionValue<string>
}

interface CardProps {
    title: string
    description: string
    bgClass?: string
}

interface ImageSet {
    step1light1: string
    step1light2: string
    step2light1: string
    step2light2: string
    step3light: string
    step4light: string
    alt: string
}

export interface ComponentProps extends CardProps {
    step1img1Class?: string
    step1img2Class?: string
    step2img1Class?: string
    step2img2Class?: string
    step3imgClass?: string
    step4imgClass?: string
    image: ImageSet
}

interface StepImageProps {
    src: string
    alt: string
    className?: string
    style?: React.CSSProperties
}

interface Step {
    id: string
    name: string
    title: string
    description: string
}

const TOTAL_STEPS = 4

const steps: readonly Step[] = [
    {
        id: "1",
        name: "Dashboard",
        title: "Track Practice & Progress Easily",
        description: "Our comprehensive dashboard lets you see exactly how each student is performing at a glance. Identify who needs help before the next test.",
    },
    {
        id: "2",
        name: "Zero Manual Work",
        title: "Zero Manual Correction — Ever",
        description: "Stop spending hours grading worksheets. The platform auto-grades every single drill instantly and generates parent-visible progress reports.",
    },
    {
        id: "3",
        name: "Management",
        title: "Smarter Batch & Level Control",
        description: "Manage multiple batches and advance student levels exactly when they are ready. Total control over your classroom pacing without the headache.",
    },
    {
        id: "4",
        name: "Global Scale",
        title: "Access Global Competitions",
        description: "Enroll your batches directly into worldwide abacus tournaments with a single click. Plus access a teacher-only community for support.",
    },
] as const

const ANIMATION_PRESETS = {
    fadeInScale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.5,
        },
    },
    slideInRight: {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.5,
        },
    },
    slideInLeft: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.5,
        },
    },
} as const

type AnimationPreset = keyof typeof ANIMATION_PRESETS

interface AnimatedStepImageProps extends StepImageProps {
    preset?: AnimationPreset
    delay?: number
    onAnimationComplete?: () => void
}

function useNumberCycler(
    totalSteps: number = TOTAL_STEPS,
    interval: number = 4000
) {
    const [currentNumber, setCurrentNumber] = useState(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const setupTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            setCurrentNumber((prev) => (prev + 1) % totalSteps)
            setupTimer()
        }, interval)
    }, [interval, totalSteps])

    const increment = useCallback((val?: number) => {
        setCurrentNumber((prev) => (prev + 1) % totalSteps)
        setupTimer()
    }, [totalSteps, setupTimer])

    useEffect(() => {
        setupTimer()
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [setupTimer])

    return {
        currentNumber,
        setCurrentNumber,
        increment,
    }
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const userAgent = navigator.userAgent
        const isSmall = window.matchMedia("(max-width: 768px)").matches
        const isMobileUserAgent = Boolean(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
                userAgent
            )
        )
        setIsMobile(isSmall || isMobileUserAgent)
    }, [])
    return isMobile
}

function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
            className={cn("h-4 w-4", className)}
            {...props}
        >
            <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
        </svg>
    )
}

const stepVariants: Variants = {
    inactive: {
        scale: 0.8,
        opacity: 0.5,
    },
    active: {
        scale: 1,
        opacity: 1,
    },
}

const StepImage = forwardRef<
    HTMLImageElement,
    StepImageProps & { [key: string]: any }
>(({ src, alt, className, style, ...props }, ref) => {
    return (
        <img
            ref={ref}
            alt={alt}
            className={className}
            src={src}
            style={{
                position: "absolute",
                userSelect: "none",
                objectFit: "cover",
                ...style,
            }}
            {...props}
        />
    )
})
StepImage.displayName = "StepImage"

const MotionStepImage = motion(StepImage)

const AnimatedStepImage = ({
    preset = "fadeInScale",
    delay = 0,
    onAnimationComplete,
    ...props
}: AnimatedStepImageProps) => {
    const presetConfig = ANIMATION_PRESETS[preset]
    return (
        <MotionStepImage
            {...props}
            {...presetConfig}
            transition={{ ...presetConfig.transition, delay }}
            onAnimationComplete={onAnimationComplete}
        />
    )
}

function FeatureCard({
    bgClass,
    children,
    step,
}: CardProps & {
    children: React.ReactNode
    step: number
}) {
    const [mounted, setMounted] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const isMobile = useIsMobile()

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (isMobile) return
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <motion.div
            className="animated-cards relative w-full rounded-[16px]"
            onMouseMove={handleMouseMove}
            style={
                {
                    "--x": useMotionTemplate`${mouseX}px`,
                    "--y": useMotionTemplate`${mouseY}px`,
                } as WrapperStyle
            }
        >
            <div
                className={clsx(
                    "group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/90 to-black transition duration-300 hover:border-gold-500/20",
                    bgClass
                )}
            >
                <div className="m-10 min-h-[500px] w-full relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="flex w-5/6 md:w-4/6 flex-col gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <motion.h2
                                className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            >
                                {steps[step].title}
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <p className="text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg">
                                    <Balancer>{steps[step].description}</Balancer>
                                </p>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                    {mounted ? children : null}
                </div>
            </div>
        </motion.div>
    )
}

function Steps({
    steps: stepData,
    current,
    onChange,
}: {
    steps: readonly Step[]
    current: number
    onChange: (index: number) => void
}) {
    return (
        <nav aria-label="Progress" className="flex justify-center px-4 w-full">
            <ol
                className="flex w-full flex-wrap items-center justify-center gap-2 md:gap-4 lg:w-[90%]"
                role="list"
            >
                {stepData.map((step, stepIdx) => {
                    const isCompleted = current > stepIdx
                    const isCurrent = current === stepIdx
                    const isFuture = !isCompleted && !isCurrent

                    return (
                        <motion.li
                            key={`${step.name}-${stepIdx}`}
                            initial="inactive"
                            animate={isCurrent ? "active" : "inactive"}
                            variants={stepVariants}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "relative z-50 rounded-full px-4 py-2 transition-all duration-300 ease-in-out md:flex",
                                isCurrent ? "bg-white/10 border border-white/20" : "bg-neutral-900 border border-neutral-800",
                                "cursor-pointer hover:bg-neutral-800"
                            )}
                            onClick={() => onChange(stepIdx)}
                        >
                            <div className="flex w-full items-center">
                                <span className="flex items-center gap-2 text-sm font-medium">
                                    <motion.span
                                        initial={false}
                                        animate={{ scale: isCurrent ? 1.2 : 1 }}
                                        className={cn(
                                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full duration-300",
                                            isCompleted && "bg-emerald-500 text-black",
                                            isCurrent && "bg-gold-500 text-black",
                                            isFuture && "bg-neutral-800 border border-neutral-700 text-neutral-500"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <IconCheck className="h-3 w-3 stroke-black stroke-[3] text-black" />
                                            </motion.div>
                                        ) : (
                                            <span className={cn("text-xs font-bold")}>{stepIdx + 1}</span>
                                        )}
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={clsx(
                                            "text-sm font-semibold duration-300 ml-1",
                                            isCompleted && "text-neutral-400",
                                            isCurrent && "text-gold-400",
                                            isFuture && "text-neutral-500"
                                        )}
                                    >
                                        {step.name}
                                    </motion.span>
                                </span>
                            </div>
                        </motion.li>
                    )
                })}
            </ol>
        </nav>
    )
}

const defaultClasses = {
    step1img1: "pointer-events-none w-[60%] border border-white/10 transition-all duration-500 rounded-2xl shadow-2xl shadow-black",
    step1img2: "pointer-events-none w-[50%] border border-white/10 transition-all duration-500 overflow-hidden rounded-2xl shadow-2xl shadow-black backdrop-blur-sm",
    step2img1: "pointer-events-none w-[55%] border border-white/10 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl shadow-black",
    step2img2: "pointer-events-none w-[45%] border border-white/10 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl shadow-black backdrop-blur-sm",
    step3img: "pointer-events-none w-[85%] border border-white/10 rounded-2xl transition-all duration-500 overflow-hidden shadow-2xl shadow-black",
    step4img: "pointer-events-none w-[85%] border border-white/10 rounded-2xl transition-all duration-500 overflow-hidden shadow-2xl shadow-black",
} as const

export const FeatureCarousel = ({
    image,
    step1img1Class = defaultClasses.step1img1,
    step1img2Class = defaultClasses.step1img2,
    step2img1Class = defaultClasses.step2img1,
    step2img2Class = defaultClasses.step2img2,
    step3imgClass = defaultClasses.step3img,
    step4imgClass = defaultClasses.step4img,
    ...props
}: ComponentProps) => {
    const { currentNumber: step, setCurrentNumber } = useNumberCycler()
    const [isAnimating, setIsAnimating] = useState(false)

    const handleAnimationComplete = () => {
        setIsAnimating(false)
    }

    const renderStepContent = () => {
        const content = () => {
            switch (step) {
                case 0:
                    return (
                        <motion.div className="relative w-full h-full" onAnimationComplete={handleAnimationComplete}>
                            <AnimatedStepImage alt={image.alt} className={clsx(step1img1Class)} src={image.step1light1} preset="slideInLeft" />
                            <AnimatedStepImage alt={image.alt} className={clsx(step1img2Class)} src={image.step1light2} preset="slideInRight" delay={0.1} />
                        </motion.div>
                    )
                case 1:
                    return (
                        <motion.div className="relative w-full h-full" onAnimationComplete={handleAnimationComplete}>
                            <AnimatedStepImage alt={image.alt} className={clsx(step2img1Class)} src={image.step2light1} preset="fadeInScale" />
                            <AnimatedStepImage alt={image.alt} className={clsx(step2img2Class)} src={image.step2light2} preset="fadeInScale" delay={0.1} />
                        </motion.div>
                    )
                case 2:
                    return (
                        <motion.div className="relative w-full h-full" onAnimationComplete={handleAnimationComplete}>
                            <AnimatedStepImage alt={image.alt} className={clsx(step3imgClass)} src={image.step3light} preset="slideInRight" />
                        </motion.div>
                    )
                case 3:
                    return (
                        <motion.div className="relative w-full h-full" onAnimationComplete={handleAnimationComplete}>
                            <AnimatedStepImage alt={image.alt} className={clsx(step4imgClass)} src={image.step4light} preset="slideInLeft" />
                        </motion.div>
                    )
                default:
                    return null
            }
        }

        return (
            <AnimatePresence mode="wait">
                <motion.div key={step} {...ANIMATION_PRESETS.fadeInScale} className="w-full h-full absolute">
                    {content()}
                </motion.div>
            </AnimatePresence>
        )
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full mb-8 z-50"
            >
                <Steps
                    current={step}
                    steps={steps}
                    onChange={(idx) => {
                        setCurrentNumber(idx)
                    }}
                />
            </motion.div>
            <FeatureCard {...props} step={step}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,44,0.1),transparent_50%)]" />
                {renderStepContent()}
            </FeatureCard>
        </div>
    )
}

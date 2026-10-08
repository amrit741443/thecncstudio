"use client"

import React, { useEffect, useRef } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  Variants,
} from "motion/react"

import {
  Sparkles,
  ArrowRight,
  Play,
  Star,
  Zap,
  Calendar,
  Video,
} from "lucide-react"
import { CollaborateButton } from "../global/cta-button"
import Image from "next/image"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const floatAnimation = (delay = 0, yOffset = 8) => ({
  animate: {
    y: [0, -yOffset, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
      delay: delay,
    },
  },
})

function Counter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number
  decimals?: number
  suffix: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  const motionValue = useMotionValue(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1] as const,
        onUpdate: (latest) => {
          if (ref.current) {
            const formatted =
              decimals > 0
                ? latest.toFixed(decimals)
                : Math.floor(latest).toLocaleString()
            ref.current.textContent = formatted + suffix
          }
        },
      })
      return () => controls.stop()
    }
  }, [isInView, value, decimals, suffix, motionValue])

  return (
    <span ref={ref} className="inline-block font-heading font-extrabold">
      {decimals > 0 ? (0).toFixed(decimals) : 0}
      {suffix}
    </span>
  )
}

export function HeroSection() {
  return (
    <div className="w-full py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid w-full grid-cols-1 items-center justify-center gap-10 lg:grid-cols-12 lg:gap-8"
      >
        {/* Left Column Content */}
        <div className="w-full space-y-6 text-left lg:col-span-6">
          <motion.div variants={fadeInUp} className="inline-block">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/70 bg-white/10 px-3.5 py-1.5 text-xs font-medium shadow-sm shadow-amber-900/5 backdrop-blur backdrop-blur-md sm:px-4 sm:text-sm">
              <span className="inline-flex items-center gap-1.5 font-heading font-semibold">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                Skill Beyond Classroom
              </span>
              <span className="text-slate-300">|</span>
              <span className="font-heading font-semibold text-primary">
                Next-Gen Youth
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="w-full font-heading text-3xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-200"
          >
            Transforming <br className="hidden sm:inline" />
            Learning into{" "}
            <span className="relative inline-block bg-gradient-to-r from-primary via-indigo-700 to-amber-400 bg-clip-text text-transparent">
              Action
              <span className="mb-1 ml-1 inline-block h-2 w-2 rounded-full bg-amber-500 align-baseline sm:h-2.5 sm:w-2.5" />
            </span>
          </motion.h1>

          {/* Subheadline Paragraph - Removed max-w on mobile/tablet */}
          <motion.p
            variants={fadeInUp}
            className="w-full text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg lg:max-w-xl dark:text-slate-400"
          >
            From Coding and Robotics to Football and Public Speaking,{" "}
            <strong className="font-heading font-semibold text-slate-900 dark:text-slate-200">
              The CNC Studio
            </strong>{" "}
            blends advanced tech, visual arts, and athletic dynamism to nurture
            tomorrow's well-rounded leaders.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-col items-stretch gap-3.5 pt-2 sm:flex-row sm:items-center"
          >
            <CollaborateButton label="Book a Demo" />
            <CollaborateButton
              label="Schedule a meeting"
              variant={"outline"}
              icon={Video}
            />
          </motion.div>

          {/* Stat Counters - Full width on mobile/tablet */}
          <motion.div
            variants={fadeInUp}
            className="grid w-full grid-cols-3 gap-2 border-t border-slate-200/20 pt-6 sm:gap-8 lg:max-w-lg"
          >
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-200">
                <Counter value={1200} suffix="+" />
              </div>
              <div className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                Active Learners
              </div>
            </div>

            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-200">
                <Counter value={40} suffix="+" />
              </div>
              <div className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                Certified Mentors
              </div>
            </div>

            <div>
              <div className="text-xl font-extrabold tracking-tight text-primary sm:text-3xl">
                <Counter value={98.4} decimals={1} suffix="%" />
              </div>
              <div className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                Parent Endorsements
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column Media & Badges */}
        <div className="relative mt-6 flex w-full items-center justify-center lg:col-span-6 lg:mt-0">
          <div className="relative w-full">
            {/* Main Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/3] min-h-[420px] w-full overflow-hidden rounded-3xl border-2 border-white shadow-2xl shadow-slate-900/10 sm:aspect-[16/10] sm:min-h-[520px] sm:border-4 lg:aspect-[1/1] lg:min-h-[600px] xl:aspect-[4/3] xl:min-h-[640px] dark:border-slate-900 dark:bg-slate-600"
            >
              <Image
                src="/banner.png"
                alt="Students building VEX robotics at The CNC Studio"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover object-center"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute right-4 bottom-4 left-4 z-10 text-white sm:right-6 sm:bottom-6 sm:left-6">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="rounded-md bg-orange-500 px-2 py-0.5 font-heading text-[10px] font-bold tracking-wider text-white uppercase shadow-sm sm:px-2.5 sm:text-xs">
                    LIVE WORKSHOP
                  </span>
                </div>
                <h3 className="font-heading text-sm font-bold tracking-tight text-white sm:text-lg">
                  Robotics & Micro-Sensors Lab
                </h3>
                <p className="mt-0.5 hidden text-xs text-slate-300 sm:block">
                  Hands-on hardware prototyping & visual telemetry
                </p>
              </div>
            </motion.div>

            {/* FLOATING CARD 1: Top-Left Review Badge */}
            <motion.div
              //   {...floatAnimation(0, 8)}
              className="absolute -top-8 left-2 z-20 flex max-w-[200px] items-center gap-2.5 rounded-2xl border border-slate-100 bg-background p-2.5 shadow-sm backdrop-blur-md sm:-top-8 sm:-left-6 sm:max-w-[240px] sm:gap-3 sm:p-3.5 dark:border-slate-700"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100/15 text-amber-500 sm:h-9 sm:w-9">
                <Star className="h-4 w-4 fill-amber-400 sm:h-5 sm:w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-extrabold text-slate-900 sm:text-sm dark:text-slate-300">
                    4.9 / 5.0
                  </span>
                  <span className="text-[9px] text-slate-400 sm:text-[10px]">
                    (450+)
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-600 sm:text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  Verified Hub
                </div>
              </div>
            </motion.div>

            {/* FLOATING CARD 2: Middle-Right Surge Badge */}
            <motion.div
              //   {...floatAnimation(1.5, 10)}
              className="absolute top-2/6 -right-2 z-20 flex -translate-y-1/2 items-center gap-2.5 rounded-2xl border border-slate-100 bg-background p-2.5 shadow-sm backdrop-blur-md sm:-right-6 sm:gap-3 sm:p-3.5 dark:border-slate-700"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-300/15 sm:h-10 sm:w-10">
                <Zap className="h-4 w-4 fill-primary text-primary sm:h-5 sm:w-5" />
              </div>
              <div>
                <div className="flex items-center text-xs leading-none font-extrabold text-slate-900 sm:text-base dark:text-slate-200">
                  +<Counter value={85} suffix="%" />{" "}
                  <span className="ml-1"> Surge</span>
                </div>
                <div className="sm mt-1 text-[10px] font-medium text-slate-500 sm:text-[11px] dark:text-slate-300">
                  Logic & Speech
                </div>
              </div>
            </motion.div>

            {/* FLOATING CARD 3: Bottom-Left Cohort Badge */}
            <motion.div
              // {...floatAnimation(2.5, 6)}
              className="absolute right-3 -bottom-5 z-20 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-background px-3 py-2 shadow-xl backdrop-blur-md sm:right-6 sm:-bottom-6 sm:gap-3 sm:px-4 sm:py-3 dark:border-slate-700"
            >
              <div className="relative h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600 sm:h-3 sm:w-3">
                <div className="absolute inset-0 h-full w-full animate-ping rounded-full bg-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 sm:text-sm dark:text-slate-200">
                  Spring Cohort Open
                </div>
                <div className="text-[9px] font-medium text-slate-500 sm:text-xs dark:text-slate-300">
                  Max 12 students / group
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

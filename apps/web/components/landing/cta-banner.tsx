"use client"

import React from "react"
import { motion } from "motion/react"
import { Sparkles, Calendar, Video, ArrowRight } from "lucide-react"
import { CollaborateButton } from "../global/cta-button"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function CtaBannerSection() {
  return (
    <section className="w-full py-12 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-blue-500/10 via-sky-400/5 to-amber-500/10 p-8 shadow-xl shadow-slate-900/5 sm:p-12 lg:p-16 dark:border-slate-800 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-900"
      >
        {/* Decorative Background Blur Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* Left Text Content */}
          <div className="max-w-2xl space-y-4">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/20 bg-white/60 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md dark:border-primary/40 dark:bg-slate-900/60 dark:text-violet-400">
              <Sparkles className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
              <span>Next-Gen Youth Platform</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-4xl dark:text-slate-100">
              Unlock Your Child’s Potential With{" "}
              <span className="relative inline-block bg-gradient-to-r from-primary via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                The CNC Studio
                <span className="mb-1 ml-1 inline-block h-2 w-2 rounded-full bg-amber-500 align-baseline" />
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Join The CNC Studio today to experience transformative, hands-on
              learning across tech, public speaking, and athletics. Nurture
              leadership and practical skills for tomorrow.
            </p>
          </div>

          {/* Right CTA Action Buttons */}
          <div className="flex shrink-0 flex-col items-stretch gap-3.5 sm:flex-row sm:items-center">
            <CollaborateButton label="Book a Free Demo" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import React from "react"
import { motion } from "motion/react"
import {
  ShieldCheck,
  Award,
  GraduationCap,
  Building2,
  Cpu,
  Globe2,
  Code2,
  Sparkles,
} from "lucide-react"

// Partner list with icons (replace/supplement with custom SVG brand logos as needed)
const PARTNERS = [
  { name: "Apex Academy", category: "Education Partner", icon: GraduationCap },
  { name: "VEX Robotics Lab", category: "STEM Affiliate", icon: Cpu },
  { name: "Global Youth Forum", category: "Public Speaking", icon: Globe2 },
  { name: "TechFuture Foundation", category: "Grant Partner", icon: Code2 },
  {
    name: "Metro Innovation School",
    category: "Institutional",
    icon: Building2,
  },
  { name: "National STEM Alliance", category: "Accreditation", icon: Award },
]

export function TrustedBySection() {
  return (
    <section className="w-full border-y border-slate-200/60 bg-slate-50/50 py-12 dark:border-slate-700/50 dark:bg-slate-900/40">
      <div className="mx-auto flex flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        {/* Section Header Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-600 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Trusted by 50+ Schools & Leading Tech Institutions</span>
        </div>

        {/* Infinite Scroll Marquee Container */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div className="flex w-max gap-8 sm:gap-12">
            {/* Render items twice for infinite seamless loop */}
            {[...PARTNERS, ...PARTNERS].map((partner, index) => {
              const Icon = partner.icon
              return (
                <div
                  key={index}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 shadow-xs backdrop-blur-sm transition-all hover:border-primary/40 dark:border-slate-800/80 dark:bg-slate-900/80"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-slate-800 dark:text-slate-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-heading text-sm font-bold text-slate-800 group-hover:text-primary dark:text-slate-200">
                      {partner.name}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {partner.category}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Trust Metric Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>ISO 9001 Certified Curriculum</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-blue-500" />
            <span>National Robotics Championship Finalists</span>
          </div>
        </div>
      </div>
    </section>
  )
}

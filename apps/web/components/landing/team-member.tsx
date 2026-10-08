"use client"

import React from "react"
import Image from "next/image"
import { motion, Variants } from "motion/react"
import { Title } from "../global/title"

interface TeamMember {
  name: string
  role: string
  company: string
  image: string
  bgColor: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ayaan Rahman",
    role: "Lead Robotics Mentor",
    company: "The CNC Studio",
    image: "/teams/01.png",
    bgColor: "bg-[#D8F276]", // Bright Lime Green
  },
  {
    name: "Kristin Watson",
    role: "Full-Stack Dev Instructor",
    company: "The CNC Studio",
    image: "/teams/02.png",
    bgColor: "bg-[#E6DEC8]", // Warm Beige
  },
  {
    name: "Floyd Miles",
    role: "Public Speaking Coach",
    company: "The CNC Studio",
    image: "/teams/03.png",
    bgColor: "bg-[#719F80]", // Muted Sage Green
  },
  {
    name: "Sara Hossain",
    role: "Digital Arts Lead",
    company: "The CNC Studio",
    image: "/teams/04.png",
    bgColor: "bg-[#FAD689]", // Warm Pastel Yellow
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function TeamSection() {
  return (
    <section className="w-full py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <Title
          title="Meet Our Teams"
          subTitle="From professional athletes to tech innovators, our team is dedicated to nurturing every child's unique potential."
        />

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-start"
            >
              {/* Aspect Ratio Image Container */}
              <div
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-3xl ${member.bgColor} shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="transition-scale object-cover object-center duration-300 group-hover:scale-105"
                />
              </div>

              {/* Member Details */}
              <div className="mt-4 space-y-1 text-left">
                <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-slate-100">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                  {member.role} at{" "}
                  <span className="font-semibold">{member.company}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

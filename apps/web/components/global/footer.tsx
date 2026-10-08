"use client"

import React from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Sparkles } from "lucide-react"

import { AiFillInstagram, AiFillYoutube } from "react-icons/ai"
import { FaFacebook } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { Logo } from "./logo"

export function FooterSection() {
  return (
    <footer className="w-full border-t border-slate-200/20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-300 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      {/* Top Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-16 lg:gap-8">
          {/* Column 1: Brand Info (Spans 4 columns on large screens) */}
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <Logo className="h-8 w-auto md:h-9" />
              <span className="hidden font-heading text-base font-bold sm:inline-block">
                Thecncstudio
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              At The CNC Studio, we blend advanced tech, robotics, visual arts,
              and athletic dynamism to nurture well-rounded future leaders
              beyond traditional classrooms.
            </p>
          </div>

          {/* Column 2: Programs / Product (Spans 2 columns) */}
          <div className="space-y-4 lg:col-span-2 lg:col-start-6">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/programs/robotics"
                  className="transition-colors hover:text-white"
                >
                  Robotics & AI
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/coding"
                  className="transition-colors hover:text-white"
                >
                  Coding & Tech
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/public-speaking"
                  className="transition-colors hover:text-white"
                >
                  Public Speaking
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/athletics"
                  className="transition-colors hover:text-white"
                >
                  Youth Football
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Resources (Spans 2 columns) */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="transition-colors hover:text-white"
                >
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (Spans 4 columns) */}
          <div className="space-y-4 lg:col-span-4">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:info@thecncstudio.com"
                  className="transition-colors hover:text-white"
                >
                  info@thecncstudio.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>123 Innovation Way, Tech District, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 px-6 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} The CNC Studio. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="#"
              className="rounded-lg p-1.5 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Twitter"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-lg p-1.5 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Instagram"
            >
              <AiFillInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-lg p-1.5 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-lg p-1.5 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="YouTube"
            >
              <AiFillYoutube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

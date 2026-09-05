'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 border-b border-studio-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Typography & Action (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Studio Metadata Badge */}
              <div className="inline-flex items-center space-x-3 font-mono text-[11px] uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3">
                <span className="font-bold text-studio-fg">SAN3A</span>
                <span className="text-studio-darkmuted">//</span>
                <span>CREATIVE TECHNOLOGY STUDIO</span>
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[0.92] text-studio-fg">
                WE BUILD <br />
                <span className="text-studio-fg">DIGITAL WORK</span> <br />
                <span className="text-studio-muted font-light italic">THAT MATTERS.</span>
              </h1>
            </motion.div>

            {/* Description & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 max-w-xl border-t border-studio-border/60 pt-8"
            >
              <p className="text-lg md:text-xl text-studio-muted font-normal leading-relaxed">
                Websites, applications and visual experiences designed and built with intention by SAN3A.
              </p>

              {/* Minimal Dual CTAs linking to real routes */}
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/work"
                  className="group inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-bold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
                >
                  <span>View Our Work</span>
                  <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-studio-fg hover:text-studio-accent transition-colors duration-300 py-4"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural SAN3A Blueprint Card (4 Columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative mt-4 lg:mt-0"
          >
            <div className="border border-studio-border bg-studio-surface p-6 space-y-6 font-mono text-xs text-studio-muted">
              
              <div className="flex items-center justify-between border-b border-studio-border pb-4">
                <span className="text-studio-fg font-bold tracking-widest">[ SAN3A CORE ]</span>
                <span className="w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
              </div>

              <div className="space-y-4 text-[11px] leading-relaxed">
                <div>
                  <span className="text-studio-darkmuted uppercase block mb-1">// PARTNERS</span>
                  <p className="text-studio-fg">Two-Person Engineering & Design Duo</p>
                </div>

                <div>
                  <span className="text-studio-darkmuted uppercase block mb-1">// FOCUS</span>
                  <p className="text-studio-fg">Web Apps, Mobile Systems, Branding & Custom Software</p>
                </div>

                <div>
                  <span className="text-studio-darkmuted uppercase block mb-1">// METHOD</span>
                  <p className="text-studio-fg">No bloat. Direct founder access. Precision execution.</p>
                </div>
              </div>

              <div className="border-t border-studio-border pt-4 flex justify-between items-center text-[10px] text-studio-darkmuted">
                <span>SYSTEM STATUS</span>
                <span className="text-emerald-500 font-semibold">AVAILABLE Q2/Q3</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

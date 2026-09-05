'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 md:py-36 border-b border-studio-border bg-studio-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-studio-border pb-8 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l border-studio-accent pl-3 block mb-2">
              // SAN3A PORTFOLIO
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-studio-fg">
              Selected Work
            </h2>
          </div>
          <div className="font-mono text-xs text-studio-muted uppercase tracking-wider">
            [ ARCHIVE UPDATE IN QUEUE ]
          </div>
        </div>

        {/* Premium Editorial Work Status Banner (Zero Fake Projects) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="border border-studio-border bg-studio-surface p-8 sm:p-12 md:p-16 relative overflow-hidden"
        >
          <div className="max-w-3xl space-y-8 relative z-10">
            
            <div className="inline-flex items-center space-x-3 font-mono text-xs uppercase tracking-widest text-studio-accent border border-studio-border px-3 py-1.5 bg-studio-bg">
              <Layers className="w-3.5 h-3.5" />
              <span>SELECTED CASES PREPARATION</span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-studio-fg leading-tight">
              CURATED CASE STUDIES PUBLISHING SOON.
            </h3>

            <p className="text-base sm:text-lg text-studio-muted leading-relaxed font-normal">
              We publish selected client case studies, technical architecture breakdowns, and visual systems directly through our SAN3A management repository. In the meantime, custom client references and live walkthroughs are available upon direct request.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href="/work"
                className="group inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-6 py-3.5 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
              >
                <span>Read Portfolio Status</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="font-mono text-xs uppercase tracking-widest text-studio-muted hover:text-studio-fg transition-colors"
              >
                Request Private References →
              </Link>
            </div>

          </div>

          {/* Background Structural Lines */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex flex-col justify-between p-8 font-mono text-xs text-studio-fg">
            <div>// SAN3A ARCHIVE</div>
            <div>STATUS: STANDBY</div>
            <div>VER: 2026.1</div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

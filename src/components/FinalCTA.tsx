'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section id="contact" className="py-28 md:py-44 border-b border-studio-border bg-studio-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-5xl space-y-12">
          
          {/* Header Tag */}
          <div className="inline-flex items-center space-x-3 font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3">
            <span>SAN3A INQUIRIES</span>
            <span className="text-studio-darkmuted">//</span>
            <span className="text-studio-fg">Q2/Q3 AVAILABLE</span>
          </div>

          {/* Large Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tightest leading-[0.92] text-studio-fg uppercase"
          >
            LET&apos;S BUILD <br />
            <span className="text-studio-muted italic font-light">SOMETHING GREAT.</span>
          </motion.h2>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center gap-8 pt-6"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center space-x-4 bg-studio-fg text-studio-bg px-8 py-5 text-sm uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 font-mono text-sm text-studio-muted hover:text-studio-fg transition-colors duration-200 py-3"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp Direct Chat</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

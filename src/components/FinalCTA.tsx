'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowUpLeft, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function FinalCTA() {
  const { t, isRTL } = useLanguage()

  const ActionIcon = isRTL ? ArrowUpLeft : ArrowUpRight

  return (
    <section id="contact" className="py-28 md:py-44 border-b border-studio-border bg-studio-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-5xl space-y-12">
          
          {/* Header Tag */}
          <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
            <span>{t.cta.tag}</span>
            <span className="text-studio-darkmuted">//</span>
            <span className="text-studio-fg">SAN3A STUDIO</span>
          </div>

          {/* Large Statement with requested headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tightest leading-[0.95] text-studio-fg"
          >
            {t.cta.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl md:text-2xl text-studio-muted max-w-2xl"
          >
            {t.cta.subheading}
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center gap-8 pt-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-studio-fg text-studio-bg px-8 py-5 text-sm uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 font-mono"
            >
              <span>{t.cta.buttonText}</span>
              <ActionIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <a
              href="https://wa.me/201226806622"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-mono text-sm text-studio-muted hover:text-studio-fg transition-colors duration-200 py-3"
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

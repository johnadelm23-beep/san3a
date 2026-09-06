'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { t, isRTL } = useLanguage()

  const MainArrow = isRTL ? ArrowLeft : ArrowRight
  const DownArrow = isRTL ? ArrowLeft : ArrowDownRight

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 border-b border-studio-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Typography & Action (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Studio Metadata Badge */}
              <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
                <span className="font-bold text-studio-fg">SAN3A</span>
                <span className="text-studio-darkmuted">//</span>
                <span>{t.hero.badge}</span>
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[0.92] text-studio-fg">
                {t.hero.titlePart1} <br />
                <span className="text-studio-fg">{t.hero.titlePart2}</span> <br />
                <span className="text-studio-muted font-light italic">{t.hero.titlePart3}</span>
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
                {t.hero.description}
              </p>

              {/* Minimal Dual CTAs linking to real routes */}
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-bold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
                >
                  <span>{t.hero.viewWork}</span>
                  <DownArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-studio-fg hover:text-studio-accent transition-colors duration-300 py-4"
                >
                  <span>{t.hero.startProject}</span>
                  <MainArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: SAN3A Brand Logo Visual Blueprint Card (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            <div className="border border-studio-border bg-studio-surface p-4 sm:p-5 space-y-4 font-mono text-xs text-studio-muted">
              
              <div className="flex items-center justify-between border-b border-studio-border pb-3">
                <span className="text-studio-fg font-bold tracking-widest">{t.hero.brandSystem}</span>
                <span className="w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
              </div>

              {/* Official SAN3A Logo Image Display */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border border-studio-border group">
                <Image
                  src="/projects/san3a.jpeg"
                  alt="SAN3A Official Studio Brand"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed pt-1">
                <div className="flex justify-between border-b border-studio-border/40 pb-2">
                  <span className="text-studio-darkmuted uppercase">{t.hero.founders}</span>
                  <span className="text-studio-fg font-semibold">{t.hero.foundersNames}</span>
                </div>

                <div className="flex justify-between border-b border-studio-border/40 pb-2">
                  <span className="text-studio-darkmuted uppercase">{t.hero.focus}</span>
                  <span className="text-studio-fg font-semibold">{t.hero.focusAreas}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-studio-darkmuted uppercase">{t.hero.availability}</span>
                  <span className="text-emerald-500 font-semibold">{t.hero.acceptingProjects}</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

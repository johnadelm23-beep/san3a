'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function Statement() {
  const { t } = useLanguage()

  return (
    <section className="relative py-24 md:py-36 border-b border-studio-border bg-studio-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Section Marker */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l border-studio-accent pl-3 block rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
              {t.statement.tag}
            </span>
          </div>

          {/* Core Headline & Narrative */}
          <div className="lg:col-span-9 space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-studio-fg leading-[1.05]"
            >
              {t.statement.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl md:text-2xl text-studio-muted font-normal max-w-3xl leading-relaxed"
            >
              {t.statement.subheading}
            </motion.p>

            {/* Stat Badges Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-studio-border/60 py-6"
            >
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-studio-darkmuted uppercase block">{t.statement.stat1Label}</span>
                <span className="font-mono text-base font-bold text-studio-fg">{t.statement.stat1Value}</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-studio-darkmuted uppercase block">{t.statement.stat2Label}</span>
                <span className="font-mono text-base font-bold text-studio-accent">{t.statement.stat2Value}</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-studio-darkmuted uppercase block">{t.statement.stat3Label}</span>
                <span className="font-mono text-base font-bold text-emerald-400">{t.statement.stat3Value}</span>
              </div>
            </motion.div>

            {/* 3 Pillars Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4"
            >
              {[
                { number: '01', title: t.statement.bullet1Title, text: t.statement.bullet1Desc },
                { number: '02', title: t.statement.bullet2Title, text: t.statement.bullet2Desc },
                { number: '03', title: t.statement.bullet3Title, text: t.statement.bullet3Desc },
              ].map((pillar) => (
                <div key={pillar.number} className="space-y-3 border border-studio-border bg-studio-surface p-6">
                  <span className="font-mono text-xs text-studio-accent font-semibold tracking-wider">
                    {pillar.number} //
                  </span>
                  <h3 className="text-sm font-bold tracking-wider text-studio-fg uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-studio-muted leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'

export default function Statement() {
  return (
    <section className="relative py-24 md:py-36 border-b border-studio-border bg-studio-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Section Marker */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l border-studio-accent pl-3 block">
              // SAN3A PHILOSOPHY
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
              Technology meets design.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl md:text-2xl text-studio-muted font-normal max-w-3xl leading-relaxed"
            >
              SAN3A is built on a simple premise: combine robust software architecture, precise user experience, and expressive visual communication to create complete digital experiences. Two founders, zero management friction.
            </motion.p>

            {/* 3 Pillars Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-studio-border pt-12 mt-12"
            >
              {[
                { number: '01', title: 'SOFTWARE ENGINEERING', text: 'Custom web apps, mobile solutions, and APIs built for speed, reliability, and scale.' },
                { number: '02', title: 'VISUAL ARCHITECTURE', text: 'Brand identity systems, refined interface design, and presentation decks.' },
                { number: '03', title: 'FOUNDER EXCLUSIVITY', text: 'You work directly with the two creators of SAN3A from kickoff through launch.' },
              ].map((pillar) => (
                <div key={pillar.number} className="space-y-3">
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

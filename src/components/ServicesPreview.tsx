'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ServicesPreview() {
  const { t, isRTL } = useLanguage()

  const services = [
    { id: '01', title: t.services.webDevTitle, slug: 'web-development', tag: 'Next.js / React / TypeScript / Supabase' },
    { id: '02', title: t.services.mobileDevTitle, slug: 'mobile-development', tag: 'iOS & Android / Flutter / React Native' },
    { id: '03', title: t.services.uiUxTitle, slug: 'ui-ux-design', tag: 'Design Systems / Prototypes / Figma' },
    { id: '04', title: t.services.graphicDesignTitle, slug: 'graphic-design', tag: 'Editorial Design / Digital Collateral' },
    { id: '05', title: t.services.videoEditingTitle, slug: 'video-editing', tag: 'Post-Production / Motion Graphics' },
    { id: '06', title: t.services.presentationTitle, slug: 'presentation-design', tag: 'Pitch Decks / Executive Templates' },
    { id: '07', title: t.services.brandingTitle, slug: 'branding', tag: 'Brand Architecture / Typography / Logo Systems' },
    { id: '08', title: t.services.customSoftwareTitle, slug: 'custom-software', tag: 'Backend APIs / Database Systems / Automation' },
  ]

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section id="services" className="py-24 md:py-36 border-b border-studio-border bg-studio-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-studio-border">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l border-studio-accent pl-3 block mb-2 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
              {t.services.tag}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-studio-fg">
              {t.services.title}
            </h2>
          </div>
          <div className="lg:col-span-4 font-mono text-xs text-studio-muted uppercase tracking-wider flex justify-between lg:justify-end gap-4">
            <span>[ 08 DISCIPLINES ]</span>
            <Link href="/services" className="text-studio-fg hover:text-studio-accent underline">
              {t.services.viewAllServices} →
            </Link>
          </div>
        </div>

        {/* Numbered Typographic List */}
        <div className="divide-y divide-studio-border border-t border-b border-studio-border">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
            >
              <Link
                href={`/services`}
                className="group py-7 px-2 md:px-6 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300 hover:bg-studio-surface block"
              >
                {/* Left: Number & Title */}
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-sm sm:text-base text-studio-accent font-semibold tracking-wider">
                    {service.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-studio-fg group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Right: Subtag & Indicator */}
                <div className="flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-studio-border/40">
                  <span className="font-mono text-xs text-studio-muted uppercase tracking-widest group-hover:text-studio-fg transition-colors">
                    {service.tag}
                  </span>
                  <ArrowIcon className="w-4 h-4 text-studio-darkmuted group-hover:text-studio-fg group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all duration-300 shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

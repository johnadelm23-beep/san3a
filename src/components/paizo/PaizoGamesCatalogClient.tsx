'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gamepad2, ArrowRight, ArrowLeft, Sparkles, Layers } from 'lucide-react'
import { paizoGames, PAIZO_LOGO_URL } from '@/lib/data/paizoGames'
import { useLanguage } from '@/context/LanguageContext'
import GameCard from './GameCard'

export default function PaizoGamesCatalogClient() {
  const { t, isRTL } = useLanguage()

  const ActionIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="pt-32 pb-24 md:pt-44 md:pb-36 border-b border-studio-border bg-studio-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-b border-studio-border pb-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-studio-muted flex-wrap">
            <Link href="/" className="hover:text-studio-fg transition-colors">
              San3a
            </Link>
            <span>/</span>
            <Link href="/paizo" className="hover:text-studio-fg transition-colors">
              PAIZO
            </Link>
            <span>/</span>
            <span className="text-studio-fg font-bold">
              {isRTL ? 'مجموعة الألعاب' : 'Games'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-md overflow-hidden bg-studio-surface border border-studio-border shrink-0">
              <Image src={PAIZO_LOGO_URL} alt="PAIZO Logo" fill sizes="24px" className="object-contain p-0.5" />
            </div>
            <span className="text-studio-fg font-bold uppercase tracking-widest text-[11px]">
              PAIZO COLLECTION
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-studio-accent border border-studio-border px-3 py-1.5 bg-studio-surface rounded-md">
            <Layers className="w-4 h-4 text-studio-accent" />
            <span>{isRTL ? 'ألعاب وتجارب PAIZO الإبداعية' : 'PAIZO Games & Experiences'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-studio-fg">
            {isRTL ? 'مجموعة ألعاب PAIZO التفاعلية' : 'PAIZO Interactive Games Collection'}
          </h1>

          <p className="text-lg text-studio-muted leading-relaxed font-normal max-w-2xl">
            {isRTL
              ? 'تصفح كافة الألعاب والأنشطة الجماعية والتجارب التفاعلية الأصلية المصممة بعناية من بيزو واصنع لحظات لا تُنسى في فعاليّتك.'
              : 'Explore all original interactive games, collaborative group challenges, and experiential activities engineered by PAIZO for retreats and youth gatherings.'}
          </p>
        </div>

        {/* 05 Game Cards Collection Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-studio-border/60 pb-3 font-mono text-xs">
            <span className="text-studio-fg font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-studio-accent" />
              <span>{isRTL ? 'جميع التجارب والألعاب المتاحة (٠٥ ألعاب)' : 'All 05 PAIZO Experiences'}</span>
            </span>
            <span className="text-studio-muted">[ PAIZO CATALOG ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paizoGames.map((game, idx) => (
              <GameCard key={game.id} game={game} index={idx} />
            ))}
          </div>
        </div>

        {/* Bottom CTA to PAIZO Brand Page */}
        <div className="border border-studio-border bg-studio-surface p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-2xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg">
              {isRTL ? 'تعرّف على هوية ورؤية PAIZO' : 'Discover the PAIZO Brand Architecture'}
            </h3>
            <p className="text-sm text-studio-muted leading-relaxed">
              {isRTL
                ? 'بيزو هي إحدى العلامات والتخصصات الإبداعية في استوديو صنعة المخصصة للألعاب والفعاليات الجماعية.'
                : 'PAIZO is a dedicated creative discipline within SAN3A engineering interactive entertainment and community experiences.'}
            </p>
          </div>

          <Link
            href="/paizo"
            className="group inline-flex items-center gap-3 bg-studio-fg text-studio-bg px-8 py-4 text-xs uppercase tracking-widest font-extrabold rounded-xl shrink-0 hover:bg-transparent hover:text-studio-fg border border-studio-fg transition-all duration-300 font-mono"
          >
            <span>{isRTL ? 'العودة إلى PAIZO ←' : 'Back to PAIZO Brand →'}</span>
            <ActionIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

      </div>
    </div>
  )
}

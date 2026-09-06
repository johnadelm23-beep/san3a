'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Gamepad2, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'
import { paizoGames, PAIZO_LOGO_URL } from '@/lib/data/paizoGames'
import { useLanguage } from '@/context/LanguageContext'
import PaizoImage from './PaizoImage'

export default function PaizoHomepagePreview() {
  const { t, isRTL } = useLanguage()

  // Select 3 featured experiences representing both General Games & Study Games
  const featuredGames = [
    paizoGames.find((g) => g.id === 'st-mime') || paizoGames[0],
    paizoGames.find((g) => g.id === 'levit') || paizoGames[1],
    paizoGames.find((g) => g.id === 'exodus') || paizoGames[2],
  ]

  const ActionIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section id="paizo-preview" className="py-24 md:py-32 border-b border-studio-border bg-studio-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Header with PAIZO Logo & Brand Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-studio-border pb-10 gap-8">
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl border border-studio-border bg-studio-surface overflow-hidden p-2 shrink-0">
                <Image
                  src={PAIZO_LOGO_URL}
                  alt="PAIZO Logo"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-studio-accent border-l border-studio-accent pl-3 block rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
                  {t.paizo.tag}
                </span>
                <span className="font-mono text-[11px] text-studio-muted uppercase tracking-wider block mt-0.5">
                  {isRTL ? 'ألعاب تفاعلية وتجارب دراسات بصرية' : 'INTERACTIVE GAMES & VISUAL STUDY EXPERIENCES'}
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-studio-fg">
              {isRTL ? 'بيزو (PAIZO)' : 'PAIZO'}
            </h2>

            <p className="text-base sm:text-lg text-studio-muted leading-relaxed font-normal">
              {t.paizo.brandDesc}
            </p>
          </div>

          {/* CTA Link to /paizo */}
          <div className="shrink-0 flex items-center gap-4 flex-wrap">
            <Link
              href="/paizo/study-games"
              className="group inline-flex items-center gap-2 border border-amber-500/40 bg-amber-950/20 text-amber-300 px-6 py-3.5 text-xs font-mono uppercase font-bold tracking-widest rounded-xl hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.paizo.exploreStudyGames}</span>
            </Link>

            <Link
              href="/paizo"
              className="group inline-flex items-center gap-3 bg-studio-fg text-studio-bg px-7 py-3.5 text-xs uppercase tracking-widest font-extrabold rounded-xl hover:bg-transparent hover:text-studio-fg border border-studio-fg transition-all duration-300 font-mono"
            >
              <span>{isRTL ? 'اكتشف PAIZO ←' : 'Explore PAIZO →'}</span>
              <ActionIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Visual Cards Preview (General Games + Levit & Exodus Study Highlights) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredGames.map((game) => {
            const name = isRTL ? game.nameAr : game.name
            const badge = isRTL ? game.badgeAr : game.badge
            const isStudy = game.category === 'study-games'
            const href = isStudy ? `/paizo/study-games/${game.slug}` : `/paizo/games/${game.slug}`
            const BadgeIcon = isStudy ? BookOpen : Gamepad2

            return (
              <Link
                key={game.id}
                href={href}
                className={`group border rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isStudy
                    ? 'border-amber-900/40 bg-gradient-to-b from-studio-surface to-amber-950/10 hover:border-amber-500/60'
                    : 'border-studio-border bg-studio-surface hover:border-studio-border-light'
                }`}
              >
                <div className="p-4 space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-studio-border/60">
                    <PaizoImage
                      src={game.image}
                      alt={name}
                      fallbackTitle={name}
                      aspectRatioClass="aspect-[16/10]"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-20">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest bg-studio-bg/90 backdrop-blur-md border px-2.5 py-1 rounded-md ${
                        isStudy ? 'text-amber-200 border-amber-500/40' : 'text-studio-fg border-studio-border'
                      }`}>
                        <BadgeIcon className={`w-3 h-3 ${isStudy ? 'text-amber-400' : 'text-studio-accent'}`} />
                        <span>{badge}</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 px-1">
                    <h3 className="text-xl font-bold tracking-tight text-studio-fg group-hover:text-studio-accent transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs text-studio-muted line-clamp-2">
                      {isRTL ? game.shortDescriptionAr : game.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-studio-border/60 flex items-center justify-between font-mono text-xs text-studio-muted">
                  <span>{isStudy ? (isRTL ? 'استكشف الدراسة' : 'Explore Study') : t.paizo.discoverGame}</span>
                  <ActionIcon className="w-4 h-4 text-studio-fg group-hover:text-studio-accent transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

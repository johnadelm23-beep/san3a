'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { studyPaizoGames, PAIZO_LOGO_URL } from '@/lib/data/paizoGames'
import { useLanguage } from '@/context/LanguageContext'
import PaizoImage from './PaizoImage'

export default function StudyGamesCatalogClient() {
  const { t, isRTL } = useLanguage()

  const ActionIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="pt-32 pb-24 md:pt-44 md:pb-36 border-b border-studio-border bg-studio-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-b border-studio-border pb-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-studio-muted flex-wrap">
            <Link href="/" className="hover:text-studio-fg transition-colors">
              {isRTL ? 'صنّعة' : 'San3a'}
            </Link>
            <span>/</span>
            <Link href="/paizo" className="hover:text-studio-fg transition-colors">
              PAIZO
            </Link>
            <span>/</span>
            <span className="text-studio-fg font-bold">
              {isRTL ? 'ألعاب الدراسات' : 'Study Games'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-md overflow-hidden bg-studio-surface border border-studio-border shrink-0">
              <Image src={PAIZO_LOGO_URL} alt="PAIZO Logo" fill sizes="24px" className="object-contain p-0.5" />
            </div>
            <span className="text-studio-fg font-bold uppercase tracking-widest text-[11px]">
              STUDY GAMES
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 border border-amber-500/40 px-3.5 py-1.5 bg-amber-950/20 rounded-md">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>{isRTL ? 'دراسات كتابية بصرية' : 'VISUAL BIBLE STUDIES'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-studio-fg">
            {t.paizo.studyGamesTitle}
          </h1>

          <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal">
            {t.paizo.studyGamesSubtitle}
          </p>
        </div>

        {/* Study Games Collection Grid (Levit & Exodus Large Visual Cards) */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-studio-border/60 pb-3 font-mono text-xs">
            <span className="text-studio-fg font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isRTL ? 'سلسلة دراسات الكتاب المقدس البصرية' : 'Visual Scripture Study Series'}</span>
            </span>
            <span className="text-amber-400 font-semibold">[ PAIZO STUDY SERIES ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {studyPaizoGames.map((game) => {
              const name = isRTL ? game.nameAr : game.name
              const shortDesc = isRTL ? game.shortDescriptionAr : game.shortDescription
              const badge = isRTL ? game.badgeAr : game.badge

              return (
                <div
                  key={game.id}
                  className="group border border-amber-900/40 bg-gradient-to-b from-studio-surface via-studio-surface to-amber-950/10 rounded-2xl overflow-hidden hover:border-amber-500/60 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <Link href={`/paizo/study-games/${game.slug}`} className="block p-6 sm:p-8 space-y-6 flex-1">
                    {/* Large Visual Image */}
                    <div className="relative rounded-xl overflow-hidden border border-amber-500/30 group-hover:border-amber-400/60 transition-colors duration-500 shadow-xl">
                      <PaizoImage
                        src={game.image}
                        alt={name}
                        fallbackTitle={name}
                        aspectRatioClass="aspect-[16/10]"
                        className="group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                      <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-20">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-200 bg-black/80 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-md">
                          <BookOpen className="w-3 h-3 text-amber-400" />
                          <span>{badge}</span>
                        </span>
                      </div>
                    </div>

                    {/* Game Title & Description */}
                    <div className="space-y-3">
                      <h2 className="text-3xl font-extrabold tracking-tight text-studio-fg group-hover:text-amber-400 transition-colors duration-300">
                        {name}
                      </h2>
                      <p className="text-sm text-studio-muted leading-relaxed">
                        {shortDesc}
                      </p>
                    </div>
                  </Link>

                  {/* Card Footer CTA */}
                  <div className="p-6 border-t border-studio-border/60 flex items-center justify-between font-mono text-xs">
                    <span className="uppercase tracking-widest text-studio-fg font-bold group-hover:text-amber-400 transition-colors">
                      {isRTL ? 'استكشف الدراسة' : 'Explore Study'}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-amber-500/40 bg-studio-bg flex items-center justify-center text-studio-fg group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                      <ActionIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA to All PAIZO Games */}
        <div className="border border-studio-border bg-studio-surface p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-2xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg">
              {isRTL ? 'تصفح كافة ألعاب وبيزو التفاعلية' : 'Looking for Interactive Group Games?'}
            </h3>
            <p className="text-sm text-studio-muted leading-relaxed">
              {isRTL
                ? 'بالإضافة لألعاب الدراسات، تقدم بيزو ألعاب مسرحية وتحديات حركية وسرعة مخصصة للمجموعات.'
                : 'Explore PAIZO’s physical charades, reaction games, and group team-building activities.'}
            </p>
          </div>

          <Link
            href="/paizo/games"
            className="group inline-flex items-center gap-3 bg-studio-fg text-studio-bg px-8 py-4 text-xs uppercase tracking-widest font-extrabold rounded-xl shrink-0 hover:bg-transparent hover:text-studio-fg border border-studio-fg transition-all duration-300 font-mono"
          >
            <span>{isRTL ? 'جميع الألعاب والتجارب ←' : 'View All PAIZO Games →'}</span>
            <ActionIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

      </div>
    </div>
  )
}

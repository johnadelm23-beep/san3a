'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Gamepad2, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'
import { generalPaizoGames, studyPaizoGames, PAIZO_LOGO_URL } from '@/lib/data/paizoGames'
import { useLanguage } from '@/context/LanguageContext'
import GameCard from './GameCard'
import PaizoMarquee from './PaizoMarquee'

export default function PaizoSection() {
  const { t, isRTL } = useLanguage()

  const ActionIcon = isRTL ? ArrowLeft : ArrowRight

  // Exactly 3 General Games & 2 Study Games for the PAIZO preview layout
  const featuredGeneralGames = generalPaizoGames.slice(0, 3)
  const featuredStudyGames = studyPaizoGames.slice(0, 2)

  return (
    <section id="paizo" className="py-24 md:py-36 border-b border-studio-border bg-studio-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Section Header with PAIZO Logo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-studio-border pb-10 gap-8">
          <div className="space-y-6 max-w-3xl">
            {/* PAIZO Logo & Discipline Tag */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl border border-studio-border bg-studio-surface overflow-hidden p-2 shrink-0">
                <Image
                  src={PAIZO_LOGO_URL}
                  alt="PAIZO Interactive Games Logo"
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

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-studio-fg">
              {t.paizo.title}
            </h2>

            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal">
              {t.paizo.brandDesc}
            </p>
          </div>

          <div className="font-mono text-xs text-studio-muted uppercase tracking-wider space-y-2 shrink-0">
            <div className="flex items-center gap-2 text-studio-fg font-bold">
              <Gamepad2 className="w-4 h-4 text-studio-accent" />
              <span>{isRTL ? '[ ٣ ألعاب تفاعلية + دراستان بصرِيَتان ]' : '[ 3 GENERAL GAMES + 2 STUDY GAMES ]'}</span>
            </div>
            <p className="text-[11px] text-studio-darkmuted">
              {isRTL ? 'تصميم وتطوير استوديو صنعة' : 'DESIGNED & ENGINEERED BY SAN3A'}
            </p>
          </div>
        </div>

        {/* Category 1: General Interactive Games (Exactly 3 Games) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border/60 pb-4 gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-studio-accent" />
                <span>{isRTL ? 'الألعاب والأنشطة التفاعلية' : 'Interactive Games & Activities'}</span>
              </h3>
              <p className="text-xs text-studio-muted mt-1 font-mono">
                {isRTL ? 'ألعاب حركية ومسرحية وسرعة مخصصة للمجموعات واللقاءات' : 'Charades, speed reaction, and team-building games for youth gatherings.'}
              </p>
            </div>
            <Link
              href="/paizo/games"
              className="group inline-flex items-center gap-2 font-mono text-xs text-studio-muted hover:text-studio-accent transition-colors underline shrink-0"
            >
              <span>{isRTL ? 'عرض كل الألعاب ←' : 'View All Games →'}</span>
            </Link>
          </div>

          {/* 3 General Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGeneralGames.map((game, idx) => (
              <GameCard key={game.id} game={game} index={idx} />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              href="/paizo/games"
              className="group inline-flex items-center gap-3 border border-studio-border bg-studio-surface text-studio-fg px-8 py-3.5 text-xs font-mono uppercase font-bold tracking-widest rounded-xl hover:border-studio-accent hover:text-studio-accent transition-all duration-300"
            >
              <span>{isRTL ? 'عرض كل الألعاب ←' : 'View All Games →'}</span>
              <ActionIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Infinite Moving Game Image Gallery */}
        <div className="space-y-6 pt-6 border-t border-studio-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <span className="text-studio-fg font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
              {isRTL ? 'معرض صور الفعاليّات والألعاب' : 'Live Game & Event Visual Gallery'}
            </span>
            <span className="text-studio-muted text-[11px] uppercase">
              {isRTL ? 'تصفح مستمر — مرر أو انتظر' : 'Continuous Stream — Pause On Hover'}
            </span>
          </div>

          <PaizoMarquee />
        </div>

        {/* Category 2: Dedicated Study Games Section (Levit & Exodus) */}
        <div className="space-y-8 pt-8 border-t border-studio-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-amber-900/40 pb-6 gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 border border-amber-500/40 px-3 py-1 bg-amber-950/20 rounded-md">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{isRTL ? 'ألعاب الدراسات' : 'Study Games'}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
                {t.paizo.studyGamesTitle}
              </h3>
              <p className="text-base text-studio-muted leading-relaxed">
                {t.paizo.studyGamesDesc}
              </p>
            </div>

            <Link
              href="/paizo/study-games"
              className="group inline-flex items-center gap-3 bg-amber-400 text-black px-7 py-3.5 text-xs font-mono uppercase font-bold tracking-widest rounded-xl hover:bg-amber-300 transition-all duration-300 shrink-0"
            >
              <span>{isRTL ? 'عرض كل الدراسات ←' : 'View All Study Games →'}</span>
              <ActionIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Exactly 2 Featured Study Games: Levit & Exodus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredStudyGames.map((game, idx) => (
              <GameCard key={game.id} game={game} index={idx} />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              href="/paizo/study-games"
              className="group inline-flex items-center gap-3 border border-amber-500/40 bg-amber-950/20 text-amber-300 px-8 py-3.5 text-xs font-mono uppercase font-bold tracking-widest rounded-xl hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
              <span>{isRTL ? 'عرض كل الدراسات ←' : 'View All Study Games →'}</span>
              <ActionIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Explore PAIZO CTA Banner */}
        <div className="border border-studio-border bg-studio-surface p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-2xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg">
              {isRTL ? 'هل تخطط لفعالية أو لقاء شبابي؟' : 'Planning a Youth Gathering or Team Experience?'}
            </h3>
            <p className="text-sm text-studio-muted leading-relaxed">
              {isRTL ? 'نقدم ألعاب بيزو كأنشطة متكاملة موجهة للمجتمعات والمؤتمرات واللقاءات التفاعلية.' : 'PAIZO delivers custom game experiences, workshop facilitators, and interactive toolkits for retreats, conventions, and group meetings.'}
            </p>
          </div>

          <Link
            href="/paizo/study-games"
            className="group inline-flex items-center gap-3 bg-studio-fg text-studio-bg px-8 py-4 text-xs uppercase tracking-widest font-extrabold rounded-xl shrink-0 hover:bg-transparent hover:text-studio-fg border border-studio-fg transition-all duration-300 font-mono"
          >
            <span>{t.paizo.exploreStudyGames}</span>
            <ActionIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  )
}


'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Users,
  Clock,
  Gamepad2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react'
import { paizoGames, PAIZO_LOGO_URL } from '@/lib/data/paizoGames'
import { useLanguage } from '@/context/LanguageContext'
import PaizoImage from './PaizoImage'
import GameCard from './GameCard'

interface GameDetailClientProps {
  slug: string
}

export default function GameDetailClient({ slug }: GameDetailClientProps) {
  const { t, language, isRTL } = useLanguage()

  const currentIndex = paizoGames.findIndex((g) => g.slug === slug)
  const game = paizoGames[currentIndex]

  if (!game) {
    return (
      <article className="pt-32 pb-24 border-b border-studio-border">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-3xl font-extrabold text-studio-fg">
            {isRTL ? 'اللعبة غير موجودة' : 'Game Not Found'}
          </h1>
          <p className="text-studio-muted">
            {isRTL
              ? 'تعذر العثور على لعبة PAIZO المطلوبة في مجموعتنا.'
              : 'The requested PAIZO game could not be found in our collection.'}
          </p>
          <Link
            href="/paizo/games"
            className="inline-flex items-center gap-2 bg-studio-fg text-studio-bg px-6 py-3 font-mono text-xs uppercase font-bold rounded-lg"
          >
            <span>{t.paizo.backToGames}</span>
          </Link>
        </div>
      </article>
    )
  }

  const prevGame = paizoGames[(currentIndex - 1 + paizoGames.length) % paizoGames.length]
  const nextGame = paizoGames[(currentIndex + 1) % paizoGames.length]
  const otherGames = paizoGames.filter((g) => g.slug !== slug)

  const name = isRTL ? game.nameAr : game.name
  const shortDesc = isRTL ? game.shortDescriptionAr : game.shortDescription
  const about = isRTL ? game.aboutAr : game.about
  const badge = isRTL ? game.badgeAr : game.badge
  const players = isRTL ? game.playersAr : game.players
  const duration = isRTL ? game.durationAr : game.duration
  const type = isRTL ? game.typeAr : game.type
  const difficulty = isRTL ? game.difficultyAr : game.difficulty

  const prevGameName = isRTL ? prevGame.nameAr : prevGame.name
  const nextGameName = isRTL ? nextGame.nameAr : nextGame.name

  const BackIcon = isRTL ? ArrowRight : ArrowLeft
  const ForwardIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <article className="pt-32 pb-24 md:pt-44 md:pb-36 border-b border-studio-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Top Breadcrumb Navigation Bar: San3a → PAIZO → Games → Game Name */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 font-mono text-xs gap-4">
          <div className="flex items-center gap-2 text-studio-muted flex-wrap">
            <Link href="/" className="hover:text-studio-fg transition-colors">
              San3a
            </Link>
            <span>/</span>
            <Link href="/paizo" className="hover:text-studio-fg transition-colors">
              PAIZO
            </Link>
            <span>/</span>
            <Link href="/paizo/games" className="hover:text-studio-fg transition-colors">
              {isRTL ? 'الألعاب' : 'Games'}
            </Link>
            <span>/</span>
            <span className="text-studio-fg font-bold">{name}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/paizo/games"
              className="group inline-flex items-center gap-2 text-studio-muted hover:text-studio-fg transition-colors mr-2 rtl:mr-0 rtl:ml-2"
            >
              <BackIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              <span>{t.paizo.backToGames}</span>
            </Link>
            <div className="relative w-6 h-6 rounded-md overflow-hidden bg-studio-surface border border-studio-border shrink-0">
              <Image src={PAIZO_LOGO_URL} alt="PAIZO Logo" fill sizes="24px" className="object-contain p-0.5" />
            </div>
          </div>
        </div>

        {/* Game Hero Grid (Desktop ~60-70% content width visual, Mobile 90-100%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Hero Image Showcase (7 Cols = ~60% Width Desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-studio-border bg-studio-surface p-2 sm:p-3">
              <PaizoImage
                src={game.image}
                alt={`PAIZO ${name}`}
                fallbackTitle={name}
                aspectRatioClass="aspect-[16/10]"
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="rounded-xl object-contain bg-black/40"
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-studio-muted px-1">
              <span>{isRTL ? `أرشيف ألعاب PAIZO التفاعلي // ${game.id.toUpperCase()}` : `PAIZO INTERACTIVE ARCHIVE // ${game.id.toUpperCase()}`}</span>
              <span>{isRTL ? 'صورة معتمدة عبر Cloudinary' : 'PAIZO CERTIFIED ASSET'}</span>
            </div>
          </div>

          {/* Right Details & Metadata Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-studio-accent border border-studio-border px-3 py-1.5 bg-studio-surface rounded-md">
                <Gamepad2 className="w-4 h-4" />
                <span>{badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-studio-fg">
                {name}
              </h1>

              <p className="text-base text-studio-muted leading-relaxed font-normal">
                {shortDesc}
              </p>
            </div>

            {/* Game Metadata Specification Grid */}
            <div className="border border-studio-border bg-studio-surface p-6 rounded-xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-studio-border pb-3">
                <span className="text-studio-darkmuted uppercase font-bold">
                  {isRTL ? 'بطاقة المعلومات' : '// SPECIFICATIONS'}
                </span>
                <span className="text-studio-accent font-semibold">
                  {isRTL ? 'معتمد من PAIZO' : 'PAIZO CERTIFIED'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-studio-muted text-[10px] uppercase block">
                    {t.paizo.playersLabel}
                  </span>
                  <span className="text-studio-fg font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-studio-accent shrink-0" />
                    {players}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-studio-muted text-[10px] uppercase block">
                    {t.paizo.durationLabel}
                  </span>
                  <span className="text-studio-fg font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-studio-muted shrink-0" />
                    {duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-studio-muted text-[10px] uppercase block">
                    {t.paizo.typeLabel}
                  </span>
                  <span className="text-studio-fg font-semibold truncate block">
                    {type}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-studio-muted text-[10px] uppercase block">
                    {t.paizo.difficultyLabel}
                  </span>
                  <span className="text-studio-accent font-bold block">
                    {difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div>
              <a
                href="#how-to-play"
                className="w-full inline-flex items-center justify-center gap-3 bg-studio-fg text-studio-bg px-8 py-4 text-xs uppercase tracking-widest font-extrabold rounded-xl border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 font-mono"
              >
                <span>{t.paizo.howToPlay}</span>
                <ForwardIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* About the Game Section */}
        <div className="border-t border-studio-border pt-16 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-accent border-l-2 border-studio-accent pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3 block">
              {isRTL ? '// تفاصيل اللعبة' : '// GAME CONCEPT'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
              {t.paizo.aboutGame}
            </h2>
            <p className="text-base sm:text-lg text-studio-muted leading-relaxed font-normal">
              {about}
            </p>
          </div>
        </div>

        {/* Live Experience Photos Gallery (e.g. for Live It or games with extra photos) */}
        {game.galleryImages && game.galleryImages.length > 0 && (
          <div className="border-t border-studio-border pt-16 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-studio-accent border-l-2 border-studio-accent pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3 block">
                {isRTL ? '// معرض الصور التفاعلي' : '// VISUAL GALLERY'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg">
                {isRTL ? 'صور الفعالية والمحاكاة المباشرة' : 'Live Experience Photos'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {game.galleryImages.map((gallerySrc, idx) => (
                <div key={gallerySrc} className="rounded-xl overflow-hidden border border-studio-border bg-studio-surface shadow-md hover:border-studio-accent/50 transition-colors">
                  <PaizoImage
                    src={gallerySrc}
                    alt={isRTL ? `${name} صورة ${idx + 1}` : `${name} Photo ${idx + 1}`}
                    fallbackTitle={isRTL ? `${name} صورة ${idx + 1}` : `${name} Photo ${idx + 1}`}
                    aspectRatioClass="aspect-[16/10]"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step How To Play Section */}
        <div id="how-to-play" className="border-t border-studio-border pt-16 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-accent border-l-2 border-studio-accent pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3 block">
              {isRTL ? '// دليل اللعب' : '// INSTRUCTION MANUAL'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
              {t.paizo.howToPlay}
            </h2>
            <p className="text-sm md:text-base text-studio-muted">
              {isRTL
                ? 'اتبع تعليمات اللعب خطوة بخطوة للحصول على أفضل تجربة تفاعلية.'
                : 'Follow these official step-by-step gameplay instructions for the best interactive experience.'}
            </p>
          </div>

          <div className="space-y-6">
            {game.howToPlay.map((stepItem) => {
              const stepTitle = isRTL ? stepItem.titleAr : stepItem.title
              const stepDesc = isRTL ? stepItem.descriptionAr : stepItem.description

              return (
                <div
                  key={stepItem.step}
                  className="border border-studio-border bg-studio-surface p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start gap-6 hover:border-studio-border-light transition-all"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-black text-studio-accent border border-studio-border bg-studio-bg px-4 py-2 rounded-xl shrink-0">
                    {stepItem.step}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold tracking-tight text-studio-fg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{stepTitle}</span>
                    </h3>
                    <p className="text-sm text-studio-muted leading-relaxed font-normal">
                      {stepDesc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Previous & Next Game Navigation Controls */}
        <div className="border-t border-studio-border pt-16 space-y-6">
          <div className="font-mono text-xs text-studio-muted uppercase tracking-widest border-b border-studio-border/60 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-studio-accent" />
            <span>{isRTL ? 'التنقل بين ألعاب PAIZO' : 'PAIZO COLLECTION NAVIGATION'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Game Button */}
            <Link
              href={`/paizo/games/${prevGame.slug}`}
              className="group border border-studio-border bg-studio-surface p-6 rounded-2xl flex items-center justify-between hover:border-studio-accent/50 hover:bg-studio-surface/80 transition-all duration-300"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs text-studio-accent uppercase font-semibold flex items-center gap-2">
                  <BackIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                  <span>{t.paizo.previousGame}</span>
                </span>
                <h4 className="text-lg font-bold text-studio-fg group-hover:text-studio-accent transition-colors">
                  {prevGameName}
                </h4>
              </div>
            </Link>

            {/* Next Game Button */}
            <Link
              href={`/paizo/games/${nextGame.slug}`}
              className="group border border-studio-border bg-studio-surface p-6 rounded-2xl flex items-center justify-between text-right rtl:text-left hover:border-studio-accent/50 hover:bg-studio-surface/80 transition-all duration-300"
            >
              <div className="space-y-1 flex-1">
                <span className="font-mono text-xs text-studio-accent uppercase font-semibold flex items-center justify-end rtl:justify-start gap-2">
                  <span>{t.paizo.nextGame}</span>
                  <ForwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
                <h4 className="text-lg font-bold text-studio-fg group-hover:text-studio-accent transition-colors">
                  {nextGameName}
                </h4>
              </div>
            </Link>
          </div>
        </div>

        {/* Related PAIZO Games */}
        <div className="border-t border-studio-border pt-16 space-y-8">
          <div className="flex items-center justify-between border-b border-studio-border/60 pb-3 font-mono text-xs">
            <span className="text-studio-fg font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-studio-accent" />
              <span>{t.paizo.relatedGames}</span>
            </span>
            <Link href="/paizo/games" className="text-studio-muted hover:text-studio-fg underline">
              {t.paizo.exploreGames}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherGames.slice(0, 3).map((otherGame, idx) => (
              <GameCard key={otherGame.id} game={otherGame} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  Clock,
  Gamepad2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react'
import {
  paizoGames,
  generalPaizoGames,
  studyPaizoGames,
  PAIZO_LOGO_URL,
} from '@/lib/data/paizoGames'
import { useLanguage } from '@/context/LanguageContext'
import PaizoImage from './PaizoImage'
import GameCard from './GameCard'

interface GameDetailClientProps {
  slug: string
}

export default function GameDetailClient({ slug }: GameDetailClientProps) {
  const { t, isRTL } = useLanguage()

  const game = paizoGames.find((g) => g.slug === slug)

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
            href="/paizo"
            className="inline-flex items-center gap-2 bg-studio-fg text-studio-bg px-6 py-3 font-mono text-xs uppercase font-bold rounded-lg"
          >
            <span>{t.paizo.backToGames}</span>
          </Link>
        </div>
      </article>
    )
  }

  const isStudyGame = game.category === 'study-games'
  const activePool = isStudyGame ? studyPaizoGames : generalPaizoGames
  const currentIndex = activePool.findIndex((g) => g.slug === slug)

  const prevGame = activePool[(currentIndex - 1 + activePool.length) % activePool.length]
  const nextGame = activePool[(currentIndex + 1) % activePool.length]
  const otherGames = activePool.filter((g) => g.slug !== slug)

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

  const backCategoryHref = isStudyGame ? '/paizo/study-games' : '/paizo/games'
  const backCategoryLabel = isStudyGame ? t.paizo.backToStudyGames : t.paizo.backToGames
  const prevLabel = isStudyGame ? t.paizo.previousStudy : t.paizo.previousGame
  const nextLabel = isStudyGame ? t.paizo.nextStudy : t.paizo.nextGame
  const relatedSectionTitle = isStudyGame ? t.paizo.moreStudyGames : t.paizo.relatedGames
  const categoryBadgeIcon = isStudyGame ? BookOpen : Gamepad2

  return (
    <article className="pt-32 pb-24 md:pt-44 md:pb-36 border-b border-studio-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Top Breadcrumb Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 font-mono text-xs gap-4">
          <div className="flex items-center gap-2 text-studio-muted flex-wrap">
            <Link href="/" className="hover:text-studio-fg transition-colors">
              {isRTL ? 'صنّعة' : 'San3a'}
            </Link>
            <span>/</span>
            <Link href="/paizo" className="hover:text-studio-fg transition-colors">
              PAIZO
            </Link>
            <span>/</span>
            <Link href={backCategoryHref} className="hover:text-studio-fg transition-colors">
              {isStudyGame ? (isRTL ? 'ألعاب الدراسات' : 'Study Games') : (isRTL ? 'الألعاب' : 'Games')}
            </Link>
            <span>/</span>
            <span className="text-studio-fg font-bold">{name}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={backCategoryHref}
              className="group inline-flex items-center gap-2 text-studio-muted hover:text-studio-fg transition-colors mr-2 rtl:mr-0 rtl:ml-2"
            >
              <BackIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              <span>{backCategoryLabel}</span>
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
            <div className={`rounded-2xl overflow-hidden shadow-2xl border p-2 sm:p-3 ${isStudyGame ? 'border-amber-900/40 bg-gradient-to-b from-studio-surface to-amber-950/20' : 'border-studio-border bg-studio-surface'}`}>
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
              <span>{isRTL ? `أرشيف PAIZO // ${game.id.toUpperCase()}` : `PAIZO ARCHIVE // ${game.id.toUpperCase()}`}</span>
              <span>{isRTL ? 'صورة معتمدة عبر Cloudinary' : 'PAIZO CERTIFIED ASSET'}</span>
            </div>
          </div>

          {/* Right Details & Metadata Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-md border ${isStudyGame ? 'text-amber-400 border-amber-500/40 bg-amber-950/20' : 'text-studio-accent border-studio-border bg-studio-surface'}`}>
                {isStudyGame ? <BookOpen className="w-4 h-4 text-amber-400" /> : <Gamepad2 className="w-4 h-4 text-studio-accent" />}
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
                <span>{isStudyGame ? (isRTL ? 'دليل دراسة السفر' : 'Read Study Guide') : t.paizo.howToPlay}</span>
                <ForwardIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* About the Game Section */}
        <div className="border-t border-studio-border pt-16 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-accent border-l-2 border-studio-accent pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3 block">
              {isStudyGame ? (isRTL ? '// مفهوم الدراسة' : '// STUDY CONCEPT') : (isRTL ? '// تفاصيل اللعبة' : '// GAME CONCEPT')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
              {t.paizo.aboutGame}
            </h2>
            <p className="text-base sm:text-lg text-studio-muted leading-relaxed font-normal">
              {about}
            </p>
          </div>
        </div>

        {/* Gallery Section (e.g. 12 images for Exodus or Levit) */}
        {game.galleryImages && game.galleryImages.length > 0 && (
          <div className="border-t border-studio-border pt-16 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 border-l-2 border-amber-400 pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3 block">
                {isRTL ? '// معرض صفحات الدراسة البصرية' : '// VISUAL STUDY GALLERY'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg">
                {isRTL ? 'معرض صفحات ومعاينات الدراسة الكاملة' : 'Complete Visual Study Gallery'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {game.galleryImages.map((gallerySrc, idx) => (
                <div key={gallerySrc} className="rounded-xl overflow-hidden border border-amber-900/40 bg-studio-surface shadow-md hover:border-amber-400/60 transition-colors">
                  <PaizoImage
                    src={gallerySrc}
                    alt={isRTL ? `${name} صفحة ${idx + 1}` : `${name} Page ${idx + 1}`}
                    fallbackTitle={isRTL ? `${name} صفحة ${idx + 1}` : `${name} Page ${idx + 1}`}
                    aspectRatioClass="aspect-[16/10]"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Manual Section */}
        <div id="how-to-play" className="border-t border-studio-border pt-16 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-accent border-l-2 border-studio-accent pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3 block">
              {isStudyGame ? (isRTL ? '// خطوات الاستفادة من الدراسة' : '// HOW TO STUDY') : (isRTL ? '// دليل اللعب' : '// INSTRUCTION MANUAL')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
              {isStudyGame ? (isRTL ? 'طريقة دراسة السفر' : 'How to Use This Study') : t.paizo.howToPlay}
            </h2>
            <p className="text-sm md:text-base text-studio-muted">
              {isRTL
                ? 'اتبع الخطوات الموضحة للحصول على أقصى فائدة روحية وبصرية من هذه الدراسة.'
                : 'Follow these step-by-step guidelines for an engaging and enriching study journey.'}
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

        {/* Previous & Next Controls (Scoped strictly within active pool: general or study-games) */}
        <div className="border-t border-studio-border pt-16 space-y-6">
          <div className="font-mono text-xs text-studio-muted uppercase tracking-widest border-b border-studio-border/60 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-studio-accent" />
            <span>{isStudyGame ? (isRTL ? 'التنقل بين ألعاب الدراسات' : 'STUDY GAMES NAVIGATION') : (isRTL ? 'التنقل بين ألعاب PAIZO' : 'PAIZO COLLECTION NAVIGATION')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Control */}
            <Link
              href={isStudyGame ? `/paizo/study-games/${prevGame.slug}` : `/paizo/games/${prevGame.slug}`}
              className="group border border-studio-border bg-studio-surface p-6 rounded-2xl flex items-center justify-between hover:border-studio-accent/50 hover:bg-studio-surface/80 transition-all duration-300"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs text-studio-accent uppercase font-semibold flex items-center gap-2">
                  <BackIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                  <span>{prevLabel}</span>
                </span>
                <h4 className="text-lg font-bold text-studio-fg group-hover:text-studio-accent transition-colors">
                  {prevGameName}
                </h4>
              </div>
            </Link>

            {/* Next Control */}
            <Link
              href={isStudyGame ? `/paizo/study-games/${nextGame.slug}` : `/paizo/games/${nextGame.slug}`}
              className="group border border-studio-border bg-studio-surface p-6 rounded-2xl flex items-center justify-between text-right rtl:text-left hover:border-studio-accent/50 hover:bg-studio-surface/80 transition-all duration-300"
            >
              <div className="space-y-1 flex-1">
                <span className="font-mono text-xs text-studio-accent uppercase font-semibold flex items-center justify-end rtl:justify-start gap-2">
                  <span>{nextLabel}</span>
                  <ForwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
                <h4 className="text-lg font-bold text-studio-fg group-hover:text-studio-accent transition-colors">
                  {nextGameName}
                </h4>
              </div>
            </Link>
          </div>
        </div>

        {/* Related Items Section */}
        <div className="border-t border-studio-border pt-16 space-y-8">
          <div className="flex items-center justify-between border-b border-studio-border/60 pb-3 font-mono text-xs">
            <span className="text-studio-fg font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-studio-accent" />
              <span>{relatedSectionTitle}</span>
            </span>
            <Link href={backCategoryHref} className="text-studio-muted hover:text-studio-fg underline">
              {isStudyGame ? t.paizo.exploreStudyGames : t.paizo.exploreGames}
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

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowUpLeft, Users, Clock, Gamepad2 } from 'lucide-react'
import { PaizoGame } from '@/lib/data/paizoGames'
import { useLanguage } from '@/context/LanguageContext'
import PaizoImage from './PaizoImage'

interface GameCardProps {
  game: PaizoGame
  index?: number
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const { t, language, isRTL } = useLanguage()

  const name = language === 'ar' ? game.nameAr : game.name
  const shortDesc = language === 'ar' ? game.shortDescriptionAr : game.shortDescription
  const badge = language === 'ar' ? game.badgeAr : game.badge
  const players = language === 'ar' ? game.playersAr : game.players
  const duration = language === 'ar' ? game.durationAr : game.duration

  const ActionIcon = isRTL ? ArrowUpLeft : ArrowUpRight

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col justify-between border border-studio-border bg-studio-surface rounded-xl overflow-hidden hover:border-studio-border-light hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      <Link href={`/paizo/games/${game.slug}`} className="block flex-1 flex flex-col justify-between p-6 space-y-6">
        <div className="space-y-5">
          {/* Game Image Container */}
          <div className="relative rounded-lg overflow-hidden border border-studio-border/60 group-hover:border-studio-accent/40 transition-colors duration-500">
            <PaizoImage
              src={game.image}
              alt={`PAIZO ${game.name}`}
              fallbackTitle={game.name}
              aspectRatioClass="aspect-[16/10]"
              className="group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Top Badge */}
            <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-20">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-studio-fg bg-studio-bg/90 backdrop-blur-md border border-studio-border px-2.5 py-1 rounded-md">
                <Gamepad2 className="w-3 h-3 text-studio-accent" />
                <span>{badge}</span>
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2.5">
            <h3 className="text-2xl font-extrabold tracking-tight text-studio-fg group-hover:text-studio-accent transition-colors duration-300">
              {name}
            </h3>
            <p className="text-sm text-studio-muted leading-relaxed line-clamp-2">
              {shortDesc}
            </p>
          </div>
        </div>

        {/* Footer Metadata & CTA */}
        <div className="space-y-4 pt-4 border-t border-studio-border/60">
          <div className="flex flex-wrap items-center justify-between font-mono text-[11px] text-studio-muted gap-2">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-studio-accent" />
              <span>{players}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-studio-muted" />
              <span>{duration}</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-fg font-semibold group-hover:text-studio-accent transition-colors">
              {t.paizo.discoverGame}
            </span>
            <div className="w-8 h-8 rounded-full border border-studio-border bg-studio-bg flex items-center justify-center text-studio-fg group-hover:bg-studio-fg group-hover:text-studio-bg group-hover:border-studio-fg transition-all duration-300">
              <ActionIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

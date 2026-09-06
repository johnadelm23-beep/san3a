import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GameDetailClient from '@/components/paizo/GameDetailClient'
import { paizoGames } from '@/lib/data/paizoGames'

interface GamePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return paizoGames.map((game) => ({
    slug: game.slug,
  }))
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params
  const game = paizoGames.find((g) => g.slug === slug)

  if (!game) {
    return {
      title: 'Game Not Found — PAIZO',
    }
  }

  return {
    title: `PAIZO — ${game.name} (${game.nameAr}) | ألعاب PAIZO التفاعلية`,
    description: `${game.shortDescription} / ${game.shortDescriptionAr}`,
    openGraph: {
      title: `PAIZO — ${game.name} | ${game.nameAr}`,
      description: game.shortDescription,
      images: [{ url: game.image }],
    },
  }
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { slug } = await params

  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />
      <GameDetailClient slug={slug} />
      <Footer />
    </main>
  )
}

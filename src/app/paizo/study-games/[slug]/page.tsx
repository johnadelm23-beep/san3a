import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GameDetailClient from '@/components/paizo/GameDetailClient'
import { studyPaizoGames } from '@/lib/data/paizoGames'

interface StudyGamePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return studyPaizoGames.map((game) => ({
    slug: game.slug,
  }))
}

export async function generateMetadata({ params }: StudyGamePageProps): Promise<Metadata> {
  const { slug } = await params
  const game = studyPaizoGames.find((g) => g.slug === slug)

  if (!game) {
    return {
      title: 'Study Game Not Found — PAIZO',
    }
  }

  return {
    title: `PAIZO Study Games — ${game.name} (${game.nameAr}) | ألعاب الدراسات من PAIZO`,
    description: `${game.shortDescription} / ${game.shortDescriptionAr}`,
    openGraph: {
      title: `PAIZO Study Games — ${game.name} | ${game.nameAr}`,
      description: game.shortDescription,
      images: [{ url: game.image }],
    },
  }
}

export default async function StudyGameDetailPage({ params }: StudyGamePageProps) {
  const { slug } = await params

  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />
      <GameDetailClient slug={slug} />
      <Footer />
    </main>
  )
}

import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PaizoGamesCatalogClient from '@/components/paizo/PaizoGamesCatalogClient'

export const metadata: Metadata = {
  title: 'PAIZO Games & Experiences — Collection | مجموعة ألعاب PAIZO التفاعلية',
  description: 'Explore the full catalog of PAIZO interactive games and creative experiences engineered by SAN3A: ST Mime, TAKO, Bible Mime, Team Work Game, and Levit.',
}

export const revalidate = 0

export default function PaizoGamesPage() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />
      <PaizoGamesCatalogClient />
      <Footer />
    </main>
  )
}

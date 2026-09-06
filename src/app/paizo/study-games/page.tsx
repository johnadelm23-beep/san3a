import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StudyGamesCatalogClient from '@/components/paizo/StudyGamesCatalogClient'

export const metadata: Metadata = {
  title: 'PAIZO Study Games — Visual Bible Studies | ألعاب الدراسات من PAIZO',
  description: 'Visual Bible studies designed by PAIZO to make Scripture easier to explore, understand, and remember: Levit (Leviticus) and Exodus (Ten Plagues).',
}

export const revalidate = 0

export default function StudyGamesPage() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />
      <StudyGamesCatalogClient />
      <Footer />
    </main>
  )
}

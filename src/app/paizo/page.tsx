import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PaizoSection from '@/components/paizo/PaizoSection'

export const metadata = {
  title: 'PAIZO — Interactive Games & Creative Experiences | ألعاب وبيزو التفاعلية',
  description: 'PAIZO creates original interactive games, group experiences, creative activities, and workshops engineered by SAN3A.',
}

export const revalidate = 0

export default function PaizoPage() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />
      <div className="pt-20">
        <PaizoSection />
      </div>
      <Footer />
    </main>
  )
}

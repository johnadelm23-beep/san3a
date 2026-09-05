import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Statement from '@/components/Statement'
import SelectedWork from '@/components/SelectedWork'
import ServicesPreview from '@/components/ServicesPreview'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />
      <Hero />
      <Statement />
      <SelectedWork />
      <ServicesPreview />
      <FinalCTA />
      <Footer />
    </main>
  )
}

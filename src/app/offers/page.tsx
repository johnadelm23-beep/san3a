import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Tag, Clock, Check } from 'lucide-react'

export const metadata = {
  title: 'Special Offers — SAN3A',
  description: 'Custom packages and promotional offers by SAN3A.',
}

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Page Title */}
          <div className="max-w-4xl space-y-6 mb-20">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 block">
              // SAN3A PACKAGES
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              SPECIAL OFFERS.
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              Curated service packages, sprint offers, and tailored project bundles.
            </p>
          </div>

          {/* Premium Editorial Empty State Box */}
          <div className="border border-studio-border bg-studio-surface p-8 sm:p-14 md:p-20 space-y-8 relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-studio-border pb-6 font-mono text-xs text-studio-muted uppercase tracking-wider">
              <span className="flex items-center gap-2 text-studio-fg font-bold">
                <Tag className="w-4 h-4 text-studio-accent" />
                OFFERS STATUS: AVAILABLE UPON REQUEST
              </span>
              <span>SUPABASE SYNC ACTIVE</span>
            </div>

            <div className="space-y-6 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg">
                CUSTOM TAILORED PACKAGES AVAILABLE.
              </h2>
              <p className="text-sm md:text-base text-studio-muted leading-relaxed">
                Seasonal offers, startup launch packages, and combined development + branding bundles are managed directly through our SAN3A admin portal. Active promotional codes and custom quotes are issued during direct consultation.
              </p>
            </div>

            {/* Feature Outline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b border-studio-border py-8 font-mono text-xs text-studio-muted">
              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">// PACKAGE TYPES</span>
                <p className="text-studio-fg">Full Web Sprint / MVP Launch / Brand Identity</p>
              </div>

              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">// ADMIN CONTROLS</span>
                <p className="text-studio-fg">Dynamic Pricing & Expiration Dates</p>
              </div>

              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">// INQUIRIES</span>
                <p className="text-studio-fg">Custom Quote Response in &lt;24h</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-6">
              <Link
                href="/contact"
                className="group inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="font-mono text-xs uppercase tracking-widest text-studio-muted hover:text-studio-fg transition-colors"
              >
                Browse Standard Services →
              </Link>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

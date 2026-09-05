import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Layers, Lock } from 'lucide-react'

export const metadata = {
  title: 'Selected Work — SAN3A',
  description: 'Selected SAN3A client projects, web platforms, and visual systems.',
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="max-w-4xl space-y-6 mb-20">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 block">
              // SAN3A ARCHIVE
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              WORK IN PROGRESS.
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              We publish selected client case studies, technical architecture breakdowns, and visual systems directly through our SAN3A management repository.
            </p>
          </div>

          {/* Premium Editorial Empty State Box */}
          <div className="border border-studio-border bg-studio-surface p-8 sm:p-14 md:p-20 relative space-y-8">
            
            <div className="flex items-center justify-between border-b border-studio-border pb-6 font-mono text-xs text-studio-muted uppercase tracking-wider">
              <span className="flex items-center gap-2 text-studio-fg font-bold">
                <Layers className="w-4 h-4 text-studio-accent" />
                PORTFOLIO STATUS: CURATING
              </span>
              <span>INDEX 2026</span>
            </div>

            <div className="space-y-6 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-studio-fg">
                RELEASING REAL CASE STUDIES SOON.
              </h2>
              <p className="text-sm md:text-base text-studio-muted leading-relaxed">
                In adherence to our strict quality guidelines, we do not showcase dummy projects or stock illustrations. Real client builds, live application metrics, and architectural write-ups will appear here as they pass public disclosure approval.
              </p>
            </div>

            {/* Technical Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b border-studio-border py-8 font-mono text-xs text-studio-muted">
              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">// SECURITY</span>
                <p className="text-studio-fg flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-studio-accent" />
                  NDAs & Client Consent Verified
                </p>
              </div>

              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">// REPOSITORY</span>
                <p className="text-studio-fg">Admin Managed & Supabase Ready</p>
              </div>

              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">// INQUIRIES</span>
                <p className="text-studio-fg">Direct References Available</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-6">
              <Link
                href="/contact"
                className="group inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
              >
                <span>Request Project References</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="font-mono text-xs uppercase tracking-widest text-studio-muted hover:text-studio-fg transition-colors"
              >
                Explore Core Services →
              </Link>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

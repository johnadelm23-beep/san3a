import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, User, Terminal, Palette, Code2 } from 'lucide-react'

export const metadata = {
  title: 'About SAN3A — Two-Person Creative Studio',
  description: 'Learn about SAN3A: an independent two-person studio combining full-stack software development and visual design.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="max-w-4xl space-y-6 mb-20">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 block">
              // ABOUT SAN3A
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              TWO CREATIVES. <br />
              <span className="text-studio-muted font-light italic">ONE DEDICATED TEAM.</span>
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              SAN3A is an independent creative technology studio founded by two partners who bridge engineering, design, and visual communication.
            </p>
          </div>

          {/* Philosophy Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-b border-studio-border py-16 mb-20">
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs text-studio-accent uppercase tracking-widest block">
                // OUR APPROACH
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-studio-fg">
                WHY SAN3A?
              </h2>
            </div>
            
            <div className="lg:col-span-8 space-y-8 text-base md:text-lg text-studio-muted leading-relaxed font-normal">
              <p>
                Most traditional agencies introduce communication lag through project managers, account executives, and bloated junior teams. At SAN3A, you work directly with the two creators who actually design your interface and write your codebase.
              </p>
              <p>
                We believe that software engineering and visual design are not separate silos—they are complementary expressions of the same problem-solving discipline. By combining technical full-stack architecture with Swiss typographic design, we deliver digital products that look exceptional and perform under load.
              </p>
            </div>
          </div>

          {/* Founders & Team Placeholders */}
          <div className="space-y-12 mb-20">
            <div className="flex justify-between items-end border-b border-studio-border pb-6">
              <div>
                <span className="font-mono text-xs text-studio-muted uppercase tracking-widest block mb-1">
                  // THE FOUNDERS
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-studio-fg">
                  Studio Partners
                </h2>
              </div>
              <span className="font-mono text-xs text-studio-muted">[ 02 CORE MEMBERS ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Founder 1 Placeholder */}
              <div className="border border-studio-border bg-studio-surface p-8 space-y-6">
                <div className="flex items-center space-x-4 border-b border-studio-border pb-6">
                  <div className="w-14 h-14 bg-studio-bg border border-studio-border flex items-center justify-center text-studio-accent">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-studio-fg">
                      Software Architect & Co-Founder
                    </h3>
                    <span className="font-mono text-xs text-studio-accent">
                      LEAD ENGINEERING
                    </span>
                  </div>
                </div>

                <p className="text-sm text-studio-muted leading-relaxed font-normal">
                  Leads software architecture, Next.js engineering, backend API pipelines, database schema design, and cloud infrastructure deployment.
                </p>

                <div className="font-mono text-xs text-studio-muted border-t border-studio-border pt-4 flex items-center justify-between">
                  <span>DISCIPLINE: SOFTWARE & SYSTEMS</span>
                  <span className="text-studio-fg">SAN3A ENG</span>
                </div>
              </div>

              {/* Founder 2 Placeholder */}
              <div className="border border-studio-border bg-studio-surface p-8 space-y-6">
                <div className="flex items-center space-x-4 border-b border-studio-border pb-6">
                  <div className="w-14 h-14 bg-studio-bg border border-studio-border flex items-center justify-center text-studio-accent">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-studio-fg">
                      Creative Director & Co-Founder
                    </h3>
                    <span className="font-mono text-xs text-studio-accent">
                      LEAD VISUAL DESIGN
                    </span>
                  </div>
                </div>

                <p className="text-sm text-studio-muted leading-relaxed font-normal">
                  Leads UI/UX design systems, typography grids, brand identity architecture, motion editorial design, and executive presentation systems.
                </p>

                <div className="font-mono text-xs text-studio-muted border-t border-studio-border pt-4 flex items-center justify-between">
                  <span>DISCIPLINE: DESIGN & BRAND</span>
                  <span className="text-studio-fg">SAN3A DESIGN</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom CTA */}
          <div className="border border-studio-border p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-studio-bg">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-studio-fg">
                WORK DIRECTLY WITH THE FOUNDERS OF SAN3A
              </h3>
              <p className="text-sm text-studio-muted">
                No middle management. Pure technical and visual execution.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-8 py-4 text-xs uppercase tracking-widest font-extrabold shrink-0 hover:bg-transparent hover:text-studio-fg border border-studio-fg transition-all"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

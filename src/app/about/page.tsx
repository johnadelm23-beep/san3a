import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { DataService } from '@/lib/services/dataService'
import { ArrowRight, Phone, MessageSquare, Terminal, Palette } from 'lucide-react'

export const metadata = {
  title: 'About SAN3A — John & George',
  description: 'Learn about SAN3A: an independent creative technology studio led by John and George.',
}

export const revalidate = 0

export default async function AboutPage() {
  const teamList = await DataService.getTeam()
  const activeTeam = teamList.filter((m) => m.active)

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
              JOHN & GEORGE. <br />
              <span className="text-studio-muted font-light italic">ONE DEDICATED TEAM.</span>
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              SAN3A is an independent creative technology studio founded by John and George to build complete web platforms, mobile applications, visual systems, and custom software.
            </p>
          </div>

          {/* Studio Brand Showcase Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-b border-studio-border py-16 mb-20">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-studio-accent uppercase tracking-widest block">
                // OFFICIAL BRAND MARK
              </span>
              <div className="relative aspect-[16/10] w-full border border-studio-border bg-black p-4">
                <Image
                  src="/projects/san3a.jpeg"
                  alt="SAN3A Studio Logo Visual"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain p-2"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-8 text-base md:text-lg text-studio-muted leading-relaxed font-normal flex flex-col justify-center">
              <p>
                At SAN3A, we operate without middle management or agency overhead. When you work with us, you collaborate directly with John and George—the two partners responsible for your software architecture, interface design, and visual communication.
              </p>
              <p>
                We combine full-stack engineering with Swiss graphic layout principles. Every product we build is designed for high performance, clarity, and visual impact.
              </p>
            </div>
          </div>

          {/* Founders Section */}
          <div className="space-y-12 mb-20">
            <div className="flex justify-between items-end border-b border-studio-border pb-6">
              <div>
                <span className="font-mono text-xs text-studio-muted uppercase tracking-widest block mb-1">
                  // THE FOUNDERS
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-studio-fg">
                  John & George
                </h2>
              </div>
              <span className="font-mono text-xs text-studio-muted">[ 02 STUDIO PARTNERS ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeTeam.map((member, index) => {
                const IconComponent = index === 0 ? Terminal : Palette
                const displayPhone = member.phone || (member.name.toLowerCase().includes('john') ? '01226806622' : '+20 12 29518750')
                const displayWa = member.whatsapp || (member.name.toLowerCase().includes('john') ? 'https://wa.me/201226806622' : 'https://wa.me/201229518750')

                return (
                  <div key={member.id} className="border border-studio-border bg-studio-surface p-8 space-y-6 font-mono text-xs flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 border-b border-studio-border pb-6">
                        <div className="w-12 h-12 bg-studio-bg border border-studio-border flex items-center justify-center text-studio-accent font-bold">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-studio-fg font-sans uppercase">
                            {member.name}
                          </h3>
                          <span className="text-studio-accent uppercase">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-studio-muted leading-relaxed font-normal font-sans">
                        {member.bio}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-studio-border text-xs">
                      {displayPhone && (
                        <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="flex items-center justify-between p-2.5 border border-studio-border bg-studio-bg hover:border-studio-fg transition-colors">
                          <span className="flex items-center gap-2 text-studio-fg font-bold">
                            <Phone className="w-3.5 h-3.5 text-studio-accent" />
                            <span>{displayPhone}</span>
                          </span>
                          <span className="text-studio-muted text-[10px]">Call →</span>
                        </a>
                      )}

                      {displayWa && (
                        <a href={displayWa.startsWith('http') ? displayWa : `https://wa.me/${displayWa.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 border border-studio-border bg-studio-bg hover:border-emerald-500/60 transition-colors">
                          <span className="flex items-center gap-2 text-studio-fg font-bold">
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                            <span>WhatsApp</span>
                          </span>
                          <span className="text-emerald-400 text-[10px]">Chat ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="border border-studio-border p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-studio-bg">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-studio-fg">
                WORK DIRECTLY WITH JOHN & GEORGE AT SAN3A
              </h3>
              <p className="text-sm text-studio-muted">
                No middle management. Pure technical and visual execution.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-8 py-4 text-xs uppercase tracking-widest font-extrabold shrink-0 hover:bg-transparent hover:text-studio-fg border border-studio-fg transition-all font-mono"
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

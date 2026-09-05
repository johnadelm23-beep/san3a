import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { DataService } from '@/lib/services/dataService'
import { ArrowRight, Tag, Check, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Special Offers — SAN3A',
  description: 'Custom packages and promotional offers by SAN3A.',
}

export const revalidate = 0

export default async function OffersPage() {
  const offerList = await DataService.getOffers()
  const activeOffers = offerList.filter((o) => o.active)

  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative font-sans">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Page Title */}
          <div className="max-w-4xl space-y-6 mb-20">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 block">
              // SAN3A PACKAGES
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              SPECIAL OFFERS.
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              Curated service packages, sprint offers, and tailored project bundles engineered directly by John & George.
            </p>
          </div>

          {activeOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {activeOffers.map((offer) => {
                const coverImage = offer.cover_image || offer.image
                const priceText = offer.new_price || offer.price || 'Custom Quote'

                return (
                  <article 
                    key={offer.id} 
                    className="border border-studio-border bg-studio-surface p-6 sm:p-10 space-y-8 flex flex-col justify-between transition-all duration-300 hover:border-studio-border-light group relative"
                  >
                    {offer.featured && (
                      <div className="absolute top-4 right-4 bg-studio-fg text-studio-bg font-mono text-[10px] uppercase font-extrabold px-3 py-1 tracking-widest z-10 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-studio-accent" />
                        <span>FEATURED PACKAGE</span>
                      </div>
                    )}

                    <div className="space-y-6">
                      
                      {/* Package Cover Image if available */}
                      {coverImage ? (
                        <div className="relative aspect-[16/9] w-full overflow-hidden border border-studio-border bg-studio-bg">
                          <Image
                            src={coverImage}
                            alt={offer.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="border border-studio-border bg-studio-bg p-4 flex items-center justify-between font-mono text-xs text-studio-muted">
                          <span className="uppercase text-studio-accent font-bold">SAN3A STUDIO PACKAGE</span>
                          <span>{offer.price_label || 'FIXED SCOPE'}</span>
                        </div>
                      )}

                      {/* Header & Pricing */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono border-b border-studio-border pb-4">
                          <div>
                            <span className="text-[10px] text-studio-muted uppercase block font-semibold">
                              {offer.price_label || 'PACKAGE INVESTMENT'}
                            </span>
                            <div className="flex items-baseline space-x-3 mt-1">
                              <span className="text-2xl sm:text-3xl font-extrabold text-studio-fg font-sans">
                                {priceText}
                              </span>
                              {offer.old_price && (
                                <span className="text-sm text-studio-darkmuted line-through">
                                  {offer.old_price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-studio-fg pt-2">
                          {offer.title}
                        </h2>
                        
                        <p className="text-sm text-studio-muted font-normal leading-relaxed">
                          {offer.description}
                        </p>
                      </div>

                      {/* Features List */}
                      {offer.features && offer.features.length > 0 && (
                        <div className="pt-4 border-t border-studio-border space-y-3 font-mono text-xs">
                          <span className="text-[10px] uppercase tracking-widest text-studio-fg font-bold block">
                            DELIVERABLES & INCLUDED SCOPE
                          </span>
                          <ul className="space-y-2 text-studio-muted">
                            {offer.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-studio-accent shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>

                    <div className="pt-6 border-t border-studio-border">
                      <Link
                        href="/contact"
                        className="group/btn w-full inline-flex items-center justify-center space-x-3 bg-studio-fg text-studio-bg py-4 text-xs font-mono uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300"
                      >
                        <span>Claim Package Offer</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            /* Premium Editorial Empty State Box */
            <div className="border border-studio-border bg-studio-surface p-8 sm:p-14 md:p-20 space-y-8 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-studio-border pb-6 font-mono text-xs text-studio-muted uppercase tracking-wider">
                <span className="flex items-center gap-2 text-studio-fg font-bold">
                  <Tag className="w-4 h-4 text-studio-accent" />
                  OFFERS STATUS: AVAILABLE UPON REQUEST
                </span>
                <span>SUPABASE ACTIVE</span>
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
                  className="group inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 font-mono"
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
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}

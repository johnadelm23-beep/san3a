import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { DataService } from '@/lib/services/dataService'
import { ArrowRight, Layers, Lock, ExternalLink, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Selected Work — SAN3A',
  description: 'Selected SAN3A client projects, web platforms, and visual systems.',
}

export const revalidate = 0

export default async function WorkPage() {
  const publishedProjects = await DataService.getPublishedProjects()

  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative font-sans">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="max-w-4xl space-y-6 mb-20">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 block">
              // SAN3A ARCHIVE
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              SELECTED WORK.
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl font-sans">
              Case studies, technical architecture breakdowns, and visual systems engineered by John & George.
            </p>
          </div>

          {publishedProjects.length > 0 ? (
            <div className="space-y-16">
              {publishedProjects.map((project, index) => {
                const numStr = (index + 1).toString().padStart(2, '0')
                const imageUrl = project.cover_image || '/projects/san3a.jpeg'

                return (
                  <article 
                    key={project.id} 
                    className="border border-studio-border bg-studio-surface p-6 sm:p-10 md:p-12 transition-all duration-500 hover:border-studio-border-light group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                      
                      {/* Dominant Image Section (7 Cols) */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="relative aspect-[16/10] w-full overflow-hidden border border-studio-border bg-studio-bg">
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 700px"
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                          />
                        </div>
                        <div className="flex justify-between items-center font-mono text-[10px] text-studio-darkmuted pt-1">
                          <span>ARCHIVE REF // {numStr}</span>
                          <span>IMAGE ASSET RESOLVED</span>
                        </div>
                      </div>

                      {/* Content Section (5 Cols) */}
                      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          
                          <div className="flex items-center justify-between font-mono text-xs border-b border-studio-border pb-3">
                            <span className="text-studio-accent font-bold uppercase tracking-wider">
                              {project.category}
                            </span>
                            <span className="text-studio-muted">
                              {project.year || '2026'}
                            </span>
                          </div>

                          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg group-hover:text-studio-accent transition-colors duration-300">
                            {project.title}
                          </h2>

                          <p className="text-sm md:text-base text-studio-muted leading-relaxed font-normal">
                            {project.short_description || project.description}
                          </p>

                          {project.full_description && (
                            <p className="text-xs text-studio-darkmuted leading-relaxed hidden sm:block">
                              {project.full_description}
                            </p>
                          )}
                        </div>

                        <div className="space-y-6 pt-4 border-t border-studio-border">
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="space-y-2">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-studio-muted block">
                                ARCHITECTURE & STACK
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <span 
                                    key={tech} 
                                    className="px-2.5 py-1 border border-studio-border font-mono text-[11px] text-studio-fg bg-studio-bg"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            {project.client_name ? (
                              <span className="font-mono text-xs text-studio-muted">
                                CLIENT: <strong className="text-studio-fg">{project.client_name}</strong>
                              </span>
                            ) : (
                              <span className="font-mono text-[11px] text-studio-darkmuted uppercase">
                                SAN3A CREATIVE STUDIO
                              </span>
                            )}

                            {project.project_url && (
                              <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-studio-fg hover:text-studio-accent font-bold transition-colors"
                              >
                                <span>Visit Build</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                      </div>

                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            /* Premium Editorial Empty State Box */
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
                  <p className="text-studio-fg">Admin Managed & Supabase Active</p>
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
                  className="group inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all duration-300 font-mono"
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
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}

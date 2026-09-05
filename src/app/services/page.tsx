import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export const metadata = {
  title: 'Core Services — SAN3A',
  description: 'Full-spectrum creative technology services by SAN3A: Web, Mobile, UI/UX, Graphic Design, Video, Presentations, Branding, and Custom Software.',
}

const services = [
  {
    number: '01',
    title: 'Web Development',
    slug: 'web-development',
    description: 'High-performance web platforms, editorial web apps, and custom digital portals engineered with Next.js, React, and TypeScript.',
    deliverables: ['Custom Next.js App Architecture', 'Responsive UI & Micro-interactions', 'Database Schemas & APIs', 'SEO & Speed Optimization'],
  },
  {
    number: '02',
    title: 'Mobile App Development',
    slug: 'mobile-development',
    description: 'Cross-platform native mobile applications for iOS and Android built with React Native for fluid mobile user experiences.',
    deliverables: ['iOS & Android Builds', 'Offline State Management', 'Push Notifications & Auth', 'App Store Submission'],
  },
  {
    number: '03',
    title: 'UI / UX Design',
    slug: 'ui-ux-design',
    description: 'Systematic interface design, user research, interactive wireframing, and comprehensive design token systems.',
    deliverables: ['Figma Design Systems', 'User Journey Mapping', 'Clickable Prototypes', 'Design Handoff Docs'],
  },
  {
    number: '04',
    title: 'Graphic Design',
    slug: 'graphic-design',
    description: 'Editorial graphic design, digital brand assets, publication design, and visual communication frameworks.',
    deliverables: ['Editorial Publication Layouts', 'Digital Marketing Assets', 'Grid & Graphic Systems', 'Print & Physical Guidelines'],
  },
  {
    number: '05',
    title: 'Video Editing / Montage',
    slug: 'video-editing',
    description: 'Post-production video montage, motion graphic sequencing, color grading, and high-impact digital reel editing.',
    deliverables: ['Editorial Montage Cut', 'Motion Graphics Overlay', 'Color Grading & Balancing', 'Audio Mixing & Sound Design'],
  },
  {
    number: '06',
    title: 'PowerPoint & Presentation Design',
    slug: 'presentation-design',
    description: 'Executive pitch decks, keynote presentations, investor slides, and corporate deck templates designed to persuade.',
    deliverables: ['Custom Presentation Templates', 'Investor Pitch Decks', 'Data & Chart Redesign', 'Editable Master Decks'],
  },
  {
    number: '07',
    title: 'Branding',
    slug: 'branding',
    description: 'Complete brand architecture, typographic systems, logo marks, brand voice guidelines, and visual strategy.',
    deliverables: ['Logo Identity System', 'Typographic Hierarchy', 'Brand Book & Guidelines', 'Visual Identity Assets'],
  },
  {
    number: '08',
    title: 'Custom Software Solutions',
    slug: 'custom-software',
    description: 'Bespoke backend APIs, internal automation engines, CRM custom workflows, and tailored software architectures.',
    deliverables: ['REST & GraphQL APIs', 'Automation Workflows', 'Custom Dashboard Backends', 'Cloud Deployment Architecture'],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Page Title */}
          <div className="max-w-4xl space-y-6 mb-20">
            <span className="font-mono text-xs uppercase tracking-widest text-studio-muted border-l-2 border-studio-accent pl-3 block">
              // SAN3A CAPABILITIES
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
              CORE SERVICES.
            </h1>
            <p className="text-lg md:text-xl text-studio-muted leading-relaxed font-normal max-w-2xl">
              We combine technical development, visual design, and strategic communication to craft complete digital products.
            </p>
          </div>

          {/* Editorial Services Breakdown Grid */}
          <div className="space-y-12">
            {services.map((service) => (
              <div
                key={service.number}
                className="border border-studio-border bg-studio-surface p-8 sm:p-12 transition-all duration-300 hover:border-studio-border-light group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Number & Main Title (5 Cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="font-mono text-sm text-studio-accent font-semibold tracking-wider block">
                      {service.number} // DISCIPLINE
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-studio-fg group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h2>
                    <p className="text-sm text-studio-muted leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Center: What We Provide (5 Cols) */}
                  <div className="lg:col-span-5 space-y-3 border-t lg:border-t-0 lg:border-l border-studio-border pt-6 lg:pt-0 lg:pl-8">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-studio-fg font-semibold block mb-2">
                      WHAT WE PROVIDE
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-studio-muted">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-studio-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Link to Dedicated Page (2 Cols) */}
                  <div className="lg:col-span-2 flex lg:justify-end pt-4 lg:pt-0">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/btn inline-flex items-center space-x-2 border border-studio-border px-5 py-3 text-xs uppercase tracking-widest text-studio-fg hover:bg-studio-fg hover:text-studio-bg transition-all duration-300"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 border border-studio-border p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-studio-bg">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-studio-fg">
                HAVE A SPECIFIC PROJECT REQUIREMENT?
              </h3>
              <p className="text-sm text-studio-muted">
                Directly consult with the two founders of SAN3A to scope your custom digital product.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-studio-fg text-studio-bg px-7 py-4 text-xs uppercase tracking-widest font-extrabold shrink-0 hover:bg-transparent hover:text-studio-fg border border-studio-fg transition-all"
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

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, ShieldCheck, Terminal, Cpu } from 'lucide-react'

// Master Service Database Map
const servicesMap: Record<
  string,
  {
    number: string
    title: string
    category: string
    description: string
    detailedOverview: string
    deliverables: string[]
    processSteps: { step: string; title: string; desc: string }[]
    technologies: string[]
  }
> = {
  'web-development': {
    number: '01',
    title: 'Web Development',
    category: 'Engineering & Software Architecture',
    description: 'High-performance web applications, editorial platforms, and scalable digital tools engineered with Next.js and TypeScript.',
    detailedOverview:
      'SAN3A builds custom web platforms optimized for speed, search visibility, and seamless user interaction. We write clean modular code without relying on bloated templates, ensuring your web application remains maintainable and lightning-fast.',
    deliverables: [
      'Custom Next.js App Router Architecture',
      'TypeScript Strict Type Checking',
      'Tailwind CSS Design Token Integration',
      'Supabase & PostgreSQL Database Architecture',
      'Server-Side Rendering (SSR) & Static Optimization',
      'SEO Metadata & Semantic HTML5 Schema',
    ],
    processSteps: [
      { step: '01', title: 'Architecture Scoping', desc: 'Defining data schemas, API routes, and page routing logic.' },
      { step: '02', title: 'UI Component Engineering', desc: 'Building reusable responsive components following SAN3A tokens.' },
      { step: '03', title: 'Integration & Testing', desc: 'Connecting database queries, auth guards, and performance audits.' },
      { step: '04', title: 'Production Deployment', desc: 'Deploying to Vercel/Edge infrastructure with domain SSL setup.' },
    ],
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'Framer Motion'],
  },

  'mobile-development': {
    number: '02',
    title: 'Mobile App Development',
    category: 'Cross-Platform Engineering',
    description: 'Native iOS & Android mobile applications built with React Native for fluid, responsive mobile experiences.',
    detailedOverview:
      'We design and develop cross-platform mobile applications that feel fully native. From offline data synchronization to push notifications and smooth 60fps animations, SAN3A delivers production-ready apps.',
    deliverables: [
      'Cross-Platform iOS & Android Codebase',
      'React Native Component Architecture',
      'Offline-First Data Sync & Storage',
      'Push Notification & Auth Pipeline',
      'Device API Access (Camera, Biometrics, GPS)',
      'Apple App Store & Google Play Publishing',
    ],
    processSteps: [
      { step: '01', title: 'UX & Device Specs', desc: 'Mapping touch flows, offline states, and platform-specific UI.' },
      { step: '02', title: 'Core Development', desc: 'Building mobile screens and state management pipeline.' },
      { step: '03', title: 'Device Testing', desc: 'Stress testing across multiple iOS and Android screen resolutions.' },
      { step: '04', title: 'Store Deployment', desc: 'Handling certificates, metadata submission, and approval.' },
    ],
    technologies: ['React Native', 'TypeScript', 'Expo', 'Supabase Auth', 'iOS Swift Native', 'Android Kotlin'],
  },

  'ui-ux-design': {
    number: '03',
    title: 'UI / UX Design',
    category: 'Visual & Experience Architecture',
    description: 'Systematic interface design, user research, wireframing, and comprehensive design token systems.',
    detailedOverview:
      'SAN3A creates interfaces that prioritize utility, clarity, and visual elegance. We build scalable Figma design systems with explicit spacing grids, typography tokens, and interactive components ready for engineering handoff.',
    deliverables: [
      'Comprehensive Figma Design Systems',
      'Interactive Clickable Prototypes',
      'User Journey & Wireframe Flows',
      'Typography & Color Palette Guidelines',
      'Developer Handoff Documentation',
      'Micro-interaction & Motion Specs',
    ],
    processSteps: [
      { step: '01', title: 'UX Research', desc: 'Analyzing user goals, competing tools, and structural requirements.' },
      { step: '02', title: 'Wireframing', desc: 'Structuring low-fidelity layouts and navigation hierarchies.' },
      { step: '03', title: 'High-Fidelity UI', desc: 'Applying design tokens, custom typography, and component states.' },
      { step: '04', title: 'Design System Handoff', desc: 'Exporting assets and token variables directly to engineering.' },
    ],
    technologies: ['Figma', 'Design Tokens', 'Prototyping', 'User Research', 'Typography Systems'],
  },

  'graphic-design': {
    number: '04',
    title: 'Graphic Design',
    category: 'Visual Communication',
    description: 'Editorial graphic design, publication layouts, digital brand assets, and structural graphic systems.',
    detailedOverview:
      'We craft disciplined visual communication. Whether it is an editorial publication, digital campaign collateral, or a brand lookbook, SAN3A applies Swiss grid precision and strong typography to every layout.',
    deliverables: [
      'Editorial Publication & Book Layouts',
      'Digital Marketing & Social Collateral',
      'Grid Systems & Layout Templates',
      'Vector Graphics & Iconography',
      'Print-Ready CMYK Documents',
      'Brand Asset Packages',
    ],
    processSteps: [
      { step: '01', title: 'Visual Concept', desc: 'Establishing visual moodboards, typographic grids, and layout rules.' },
      { step: '02', title: 'Composition', desc: 'Assembling editorial layouts, scale, whitespace, and image framing.' },
      { step: '03', title: 'Refinement', desc: 'Polishing typography kerning, color contrast, and export specs.' },
      { step: '04', title: 'Final Asset Package', desc: 'Delivering vector formats (SVG, PDF, EPS) and digital files.' },
    ],
    technologies: ['Adobe Illustrator', 'InDesign', 'Photoshop', 'Vector Art', 'Print Prepress'],
  },

  'video-editing': {
    number: '05',
    title: 'Video Editing / Montage',
    category: 'Post-Production & Motion',
    description: 'Post-production video montage, motion graphics, audio sync, and high-impact digital reel editing.',
    detailedOverview:
      'Video content needs precise pacing, crisp cuts, and polished motion graphics. SAN3A handles raw video editing, motion overlays, color correction, and audio mastering to create compelling promotional media.',
    deliverables: [
      'Editorial Commercial & Montage Cut',
      'Custom Motion Graphics & Titles',
      'Color Grading & Balancing',
      'Sound Design & Audio Mastering',
      'Multi-Format Exports (4K, Vertical 9:16, 16:9)',
      'Subtitles & Motion Text Overlay',
    ],
    processSteps: [
      { step: '01', title: 'Footage Ingestion', desc: 'Reviewing raw clips, selecting hero takes, and setting timeline structure.' },
      { step: '02', title: 'Editorial Assembly', desc: 'Cutting narrative pace, sound sync, and motion sequencing.' },
      { step: '03', title: 'Color & Audio Grade', desc: 'Polishing color profiles and sound equalization.' },
      { step: '04', title: 'Render & Delivery', desc: 'Exporting optimized web and social broadcast files.' },
    ],
    technologies: ['DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Sound Design', '4K Rendering'],
  },

  'presentation-design': {
    number: '06',
    title: 'PowerPoint & Presentation Design',
    category: 'Executive Communications',
    description: 'Executive pitch decks, keynote presentations, and investor slides designed to command attention.',
    deliverables: [
      'Custom PowerPoint & Keynote Master Decks',
      'Investor Pitch Deck Architecture',
      'Complex Data & Chart Visual Redesign',
      'Custom Slide Layout Templates',
      'Exported PDF & Editable Source Files',
      'Presenter Notes & Animation Specs',
    ],
    detailedOverview:
      'We transform dense bullet points into clean, high-impact presentation decks. SAN3A designs executive slide decks for investor pitches, keynotes, and strategic board meetings.',
    processSteps: [
      { step: '01', title: 'Narrative Audit', desc: 'Reviewing deck copy, slide sequence, and key takeaways.' },
      { step: '02', title: 'Visual Hierarchy', desc: 'Redesigning slide layouts with large numbers, clean typography, and spatial grid.' },
      { step: '03', title: 'Data Visualization', desc: 'Converting raw financial tables into clear architectural charts.' },
      { step: '04', title: 'Template Handoff', desc: 'Providing fully editable PowerPoint/Keynote master files.' },
    ],
    technologies: ['PowerPoint', 'Keynote', 'Figma Presentation', 'Vector Charts'],
  },

  'branding': {
    number: '07',
    title: 'Branding',
    category: 'Brand Architecture & Identity',
    description: 'Complete brand architecture, typographic systems, logo marks, brand voice guidelines, and visual strategy.',
    detailedOverview:
      'A brand identity should be recognizable, scalable, and timeless. SAN3A builds complete brand architecture systems—from logo marks and typographic pairings to comprehensive brand manuals.',
    deliverables: [
      'Primary Logo & Mark Variations',
      'Typographic Pairing Framework',
      'Curated Color Palette System',
      'Comprehensive Brand Book & Manual',
      'Stationery & Digital Brand Assets',
      'Brand Application Mockups',
    ],
    processSteps: [
      { step: '01', title: 'Discovery & Strategy', desc: 'Defining brand positioning, audience tone, and visual direction.' },
      { step: '02', title: 'Identity Exploration', desc: 'Designing geometric logo marks and typographic pairings.' },
      { step: '03', title: 'System Expansion', desc: 'Building brand guidelines, collateral rules, and color tokens.' },
      { step: '04', title: 'Brand Book Delivery', desc: 'Delivering full vector asset packages and digital guidelines.' },
    ],
    technologies: ['Brand Strategy', 'Logo Design', 'Typographic Systems', 'Brand Guidelines'],
  },

  'custom-software': {
    number: '08',
    title: 'Custom Software Solutions',
    category: 'Backend & Enterprise Engineering',
    description: 'Bespoke backend APIs, internal automation engines, CRM custom workflows, and specialized software architectures.',
    detailedOverview:
      'When off-the-shelf tools fail, SAN3A engineers custom software solutions tailored to your operational workflows. From RESTful microservices to custom internal admin platforms, we build secure, scalable backend software.',
    deliverables: [
      'REST & GraphQL API Endpoints',
      'Internal Admin Tool Architecture',
      'Automated Workflow Pipelines',
      'Database Schema Optimization & Migrations',
      'Third-Party API & Webhook Integrations',
      'Security & Authentication Safeguards',
    ],
    processSteps: [
      { step: '01', title: 'Requirements Audit', desc: 'Mapping database relationships, security constraints, and data flows.' },
      { step: '02', title: 'Backend Engineering', desc: 'Writing clean TypeScript/Node server code and API endpoints.' },
      { step: '03', title: 'Integration Testing', desc: 'Validating payload responses, error handling, and performance.' },
      { step: '04', title: 'Cloud Infrastructure', desc: 'Deploying serverless functions and database instances.' },
    ],
    technologies: ['Node.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'REST APIs', 'Serverless Functions'],
  },
}

export function generateStaticParams() {
  return Object.keys(servicesMap).map((slug) => ({ slug }))
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesMap[slug]

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-studio-bg text-studio-fg relative">
      <Header />

      <section className="pt-36 pb-24 md:pt-48 md:pb-36 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center space-x-3 font-mono text-xs text-studio-muted mb-12 uppercase tracking-widest">
            <Link href="/services" className="hover:text-studio-fg transition-colors">
              SERVICES
            </Link>
            <span>/</span>
            <span className="text-studio-accent">{service.number}</span>
            <span>/</span>
            <span className="text-studio-fg font-semibold">{service.title}</span>
          </div>

          {/* Service Title Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs text-studio-accent uppercase tracking-widest border-l-2 border-studio-accent pl-3 block">
                {service.category}
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[0.95] text-studio-fg">
                {service.title.toUpperCase()}
              </h1>
              <p className="text-xl text-studio-muted leading-relaxed font-normal">
                {service.description}
              </p>
            </div>

            <div className="lg:col-span-4 border border-studio-border bg-studio-surface p-6 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-studio-fg font-semibold block border-b border-studio-border pb-3">
                [ SERVICE SUMMARY ]
              </span>
              <div className="space-y-2 font-mono text-xs text-studio-muted">
                <div className="flex justify-between">
                  <span>INDEX:</span>
                  <span className="text-studio-fg">{service.number} / 08</span>
                </div>
                <div className="flex justify-between">
                  <span>EXECUTORS:</span>
                  <span className="text-studio-fg">SAN3A FOUNDERS</span>
                </div>
                <div className="flex justify-between">
                  <span>DELIVERY:</span>
                  <span className="text-studio-fg">PRODUCTION READY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="border-t border-studio-border pt-16 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-studio-muted uppercase tracking-widest block">
                  // DETAILED SCOPE
                </span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg md:text-xl text-studio-fg leading-relaxed font-normal">
                  {service.detailedOverview}
                </p>
              </div>
            </div>
          </div>

          {/* Deliverables & Technologies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            
            {/* Deliverables (8 Cols) */}
            <div className="lg:col-span-8 border border-studio-border bg-studio-surface p-8 sm:p-12 space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-studio-fg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-studio-accent" />
                WHAT WE DELIVER
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-studio-border">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-studio-accent shrink-0 mt-1" />
                    <span className="text-sm text-studio-fg font-medium leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack & Tools (4 Cols) */}
            <div className="lg:col-span-4 border border-studio-border bg-studio-bg p-8 space-y-6">
              <h2 className="text-xl font-bold tracking-tight text-studio-fg flex items-center gap-2">
                <Terminal className="w-4 h-4 text-studio-accent" />
                TOOLS & STACK
              </h2>
              <ul className="space-y-2.5 font-mono text-xs text-studio-muted pt-2 border-t border-studio-border">
                {service.technologies.map((tech) => (
                  <li key={tech} className="flex items-center gap-2 text-studio-fg">
                    <Cpu className="w-3.5 h-3.5 text-studio-darkmuted" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* 4-Step Process */}
          <div className="border border-studio-border bg-studio-surface p-8 sm:p-12 mb-20 space-y-10">
            <div className="flex justify-between items-end border-b border-studio-border pb-6">
              <h2 className="text-2xl font-bold tracking-tight text-studio-fg">
                THE SAN3A PROCESS
              </h2>
              <span className="font-mono text-xs text-studio-muted">04 SEQUENTIAL PHASES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.processSteps.map((step) => (
                <div key={step.step} className="space-y-3">
                  <span className="font-mono text-xs text-studio-accent font-semibold">
                    PHASE {step.step} //
                  </span>
                  <h3 className="text-base font-bold text-studio-fg uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-xs text-studio-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="border border-studio-border p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-studio-bg">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-studio-fg">
                READY TO BUILD YOUR {service.title.toUpperCase()}?
              </h3>
              <p className="text-sm text-studio-muted">
                Initiate your project inquiry directly with the SAN3A team.
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

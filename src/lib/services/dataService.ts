import { supabase } from '../supabase/client'
import { isSupabaseConfigured } from '../supabase/env'
import { deleteStorageFile } from '../supabase/storage'
import type { Database } from '../types/database.types'

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']
export type ProjectImage = Database['public']['Tables']['project_images']['Row']

export type Service = Database['public']['Tables']['services']['Row']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type ServiceUpdate = Database['public']['Tables']['services']['Update']

export type Offer = Database['public']['Tables']['offers']['Row']
export type OfferInsert = Database['public']['Tables']['offers']['Insert']
export type OfferUpdate = Database['public']['Tables']['offers']['Update']

export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']

export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert']
export type TeamMemberUpdate = Database['public']['Tables']['team_members']['Update']

// Fallback in-memory state when Supabase tables are empty or unreachable
let localLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Karim Al-Hassan',
    email: 'karim@example.com',
    phone: '+20 100 123 4567',
    service: 'Web Development',
    budget: '$5,000 - $10,000',
    description: 'Looking to build a modern web platform for our logistics enterprise.',
    message: 'Looking to build a modern web platform for our logistics enterprise.',
    status: 'new',
    source: 'Website',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Sarah Jenkins',
    email: 's.jenkins@innovate.co',
    phone: '+1 (555) 019-2834',
    service: 'UI / UX Design',
    budget: '$10,000+',
    description: 'Design system refresh and complete web app dashboard redesign.',
    message: 'Design system refresh and complete web app dashboard redesign.',
    status: 'contacted',
    source: 'Referral',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

let localProjects: Project[] = [
  {
    id: 'proj-egtma3na',
    title: 'Egtma3na',
    slug: 'egtma3na',
    description: 'Egtma3na is a digital platform designed to improve interaction, engagement and management for youth meetings and communities.',
    short_description: 'Digital mobile platform for youth meetings and community management.',
    full_description: 'Egtma3na is a digital platform designed to improve interaction, engagement and management for youth meetings and communities. Built with Flutter and Firebase for seamless real-time syncing and offline reliability.',
    category: 'Mobile Application',
    client_name: 'Youth Community Platform',
    year: '2026',
    featured: true,
    published: true,
    status: 'published',
    cover_image: '/projects/home_egtma3na.jpeg',
    project_url: null,
    technologies: ['Flutter', 'Firebase', 'Real-time', 'Offline'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-thehammer',
    title: 'The Hammer',
    slug: 'thehammer',
    description: 'The Hammer is a professional digital commerce platform built to showcase industrial motors and related products with a modern, multilingual web experience.',
    short_description: 'Digital commerce platform for industrial motors and equipment.',
    full_description: 'The Hammer is a professional digital commerce platform built to showcase industrial motors and related products with a modern, multilingual web experience.',
    category: 'Digital Commerce',
    client_name: 'The Hammer UK',
    year: '2026',
    featured: true,
    published: true,
    status: 'published',
    cover_image: '/projects/thehammer.png',
    project_url: 'https://thehammer.uk/',
    technologies: ['Next.js', 'React', 'TypeScript', 'Multilingual'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-saint-john',
    title: 'St. John the Beloved Youth Meeting',
    slug: 'saint-john',
    description: 'Official digital platform and web portal for St. John the Beloved Youth Meeting, featuring event tracking, media resources, and interactive community services.',
    short_description: 'Official web platform and community portal.',
    full_description: 'Official digital web portal delivering event tracking, announcements, media archives, and interactive member engagement tools.',
    category: 'Web Platform',
    client_name: 'St. John Youth Meeting',
    year: '2026',
    featured: true,
    published: true,
    status: 'published',
    cover_image: '/projects/saint_john_site.png',
    project_url: 'https://saint-john.vercel.app/',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-ecommerce',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'High-performance digital store with real-time checkout and automated inventory management.',
    short_description: 'Full-stack retail platform with custom inventory engine.',
    full_description: 'Modern e-commerce platform built for high speed, instant cart synchronization, and payment automation.',
    category: 'Web Development',
    client_name: 'Retail Enterprise',
    year: '2025',
    featured: true,
    published: true,
    status: 'published',
    cover_image: '/projects/ecommerce-platform.jpg',
    project_url: null,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-medlab',
    title: 'MedLab Management System',
    slug: 'medlab-system',
    description: 'Specialized diagnostic laboratory software for managing patient records and test results.',
    short_description: 'Diagnostic lab workflow & records management system.',
    full_description: 'Enterprise healthcare software solution streamlining patient intake, sample tracking, and diagnostic report generation.',
    category: 'Custom Software',
    client_name: 'Medical Diagnostics Lab',
    year: '2025',
    featured: false,
    published: true,
    status: 'published',
    cover_image: '/projects/medlab-system.jpg',
    project_url: null,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-brand',
    title: 'Brand Identity System',
    slug: 'brand-identity',
    description: 'Comprehensive visual architecture, custom typography guidelines, and digital brand design.',
    short_description: 'Editorial layout, typography system & brand guidelines.',
    full_description: 'Strategic visual identity design including typographic systems, brand manual, logo marks, and digital assets.',
    category: 'Branding & UI',
    client_name: 'SAN3A Creative Studio',
    year: '2026',
    featured: false,
    published: true,
    status: 'published',
    cover_image: '/projects/brand-identity.jpg',
    project_url: null,
    technologies: ['Figma', 'UI/UX Design', 'Brand Architecture'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-san3a',
    title: 'SAN3A Studio OS',
    slug: 'san3a-os',
    description: 'Custom studio workflow management platform built to streamline project lifecycles.',
    short_description: 'Internal project management & studio operations tool.',
    full_description: 'In-house management suite for tracking studio leads, project deliverables, and client communications.',
    category: 'Internal Tech Stack',
    client_name: 'SAN3A Studio',
    year: '2026',
    featured: false,
    published: true,
    status: 'published',
    cover_image: '/projects/san3a.jpeg',
    project_url: null,
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let localProjectImages: ProjectImage[] = [
  {
    id: 'img-1',
    project_id: 'proj-egtma3na',
    image_url: '/projects/home_egtma3na.jpeg',
    storage_path: null,
    alt_text: 'Home Screen',
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-2',
    project_id: 'proj-egtma3na',
    image_url: '/projects/dayCotent_egtma3na.jpeg',
    storage_path: null,
    alt_text: 'Daily Content',
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-3',
    project_id: 'proj-egtma3na',
    image_url: '/projects/exam_egtma3na.jpeg',
    storage_path: null,
    alt_text: 'Exam & Quiz View',
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-4',
    project_id: 'proj-egtma3na',
    image_url: '/projects/profile_egtma3na.jpeg',
    storage_path: null,
    alt_text: 'Profile View',
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-5',
    project_id: 'proj-egtma3na',
    image_url: '/projects/qr_egtma3na.jpeg',
    storage_path: null,
    alt_text: 'QR Code Check-in',
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
]

let localServices: Service[] = [
  {
    id: 'srv-1',
    title: 'Web Development',
    slug: 'web-development',
    description: 'Custom web applications and high-performance editorial platforms engineered with Next.js and TypeScript.',
    short_description: 'Custom Next.js & TypeScript platforms.',
    full_description: 'Custom web applications and high-performance editorial platforms engineered with Next.js and TypeScript.',
    deliverables: ['Custom Next.js Architecture', 'Responsive UI Engineering', 'Database Integration', 'Performance Optimization'],
    icon: 'code',
    featured: true,
    active: true,
    display_order: 1,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-2',
    title: 'Mobile App Development',
    slug: 'mobile-development',
    description: 'Cross-platform native iOS & Android applications built with React Native for fluid mobile experiences.',
    short_description: 'Native iOS & Android apps via React Native.',
    full_description: 'Cross-platform native iOS & Android applications built with React Native for fluid mobile experiences.',
    deliverables: ['iOS & Android Builds', 'Offline Capability', 'Push Notifications', 'App Store Deployment'],
    icon: 'smartphone',
    featured: true,
    active: true,
    display_order: 2,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-3',
    title: 'UI / UX Design',
    slug: 'ui-ux-design',
    description: 'Systematic interface architecture, user research, wireframing, and design token systems.',
    short_description: 'Design systems & interactive prototypes.',
    full_description: 'Systematic interface architecture, user research, wireframing, and design token systems.',
    deliverables: ['Figma Design Systems', 'User Journey Mapping', 'Interactive Prototypes', 'Handoff Documentation'],
    icon: 'layout',
    featured: true,
    active: true,
    display_order: 3,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-4',
    title: 'Graphic Design',
    slug: 'graphic-design',
    description: 'Editorial graphic design, publication layouts, digital brand assets, and structural graphic systems.',
    short_description: 'Editorial layouts & digital brand assets.',
    full_description: 'Editorial graphic design, publication layouts, digital brand assets, and structural graphic systems.',
    deliverables: ['Editorial Design', 'Digital Collateral', 'Typography Layouts', 'Print Guidelines'],
    icon: 'image',
    featured: false,
    active: true,
    display_order: 4,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-5',
    title: 'Video Editing / Montage',
    slug: 'video-editing',
    description: 'Post-production video montage, motion graphics, audio sync, and high-impact digital reel editing.',
    short_description: 'Post-production video & motion graphics.',
    full_description: 'Post-production video montage, motion graphics, audio sync, and high-impact digital reel editing.',
    deliverables: ['Raw Footage Editing', 'Motion Graphics', 'Color Grading', 'Sound Design & Mixing'],
    icon: 'film',
    featured: false,
    active: true,
    display_order: 5,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-6',
    title: 'PowerPoint & Presentation Design',
    slug: 'presentation-design',
    description: 'Executive pitch decks, keynote presentations, and investor slides designed to command attention.',
    short_description: 'Investor pitch decks & executive decks.',
    full_description: 'Executive pitch decks, keynote presentations, and investor slides designed to command attention.',
    deliverables: ['Custom Presentation Templates', 'Investor Pitch Decks', 'Data Visualization', 'Editable Master Decks'],
    icon: 'file-text',
    featured: false,
    active: true,
    display_order: 6,
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-7',
    title: 'Branding',
    slug: 'branding',
    description: 'Complete brand architecture, typographic systems, logo marks, and verbal positioning.',
    short_description: 'Brand guidelines & visual identity.',
    full_description: 'Complete brand architecture, typographic systems, logo marks, and verbal positioning.',
    deliverables: ['Logo Identity System', 'Typographic Framework', 'Brand Book & Manual', 'Visual Guidelines'],
    icon: 'award',
    featured: false,
    active: true,
    display_order: 7,
    sort_order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-8',
    title: 'Custom Software Solutions',
    slug: 'custom-software',
    description: 'Bespoke backend APIs, internal automation tools, custom CRM workflows, and specialized software systems.',
    short_description: 'APIs, automation & custom software.',
    full_description: 'Bespoke backend APIs, internal automation tools, custom CRM workflows, and specialized software systems.',
    deliverables: ['API Development', 'Workflow Automation', 'Database Schema Architecture', 'Cloud Deployment'],
    icon: 'cpu',
    featured: false,
    active: true,
    display_order: 8,
    sort_order: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let localOffers: Offer[] = []

let localTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'John Adel',
    role: 'Co-Founder & Software Architect',
    bio: 'Co-leads technical software architecture, web application engineering, mobile platform development (Flutter/React Native), and cloud backends.',
    phone: '01226806622',
    email: 'john@san3a.co',
    whatsapp: 'https://wa.me/201226806622',
    photo: '/projects/JohnPhoto.jpeg',
    image_url: '/projects/JohnPhoto.jpeg',
    image_storage_path: null,
    social_links: [
      { name: 'Facebook', url: 'https://www.facebook.com/share/p/191qx2khJL/' },
    ],
    active: true,
    display_order: 1,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'team-2',
    name: 'George',
    role: 'Co-Founder & Creative Director',
    bio: 'Co-leads interface design systems (UI/UX), visual architecture, graphic design, and brand identity strategy.',
    phone: '+20 12 29518750',
    email: 'george@san3a.co',
    whatsapp: 'https://wa.me/201229518750',
    photo: '/projects/george_photo.jpg',
    image_url: '/projects/george_photo.jpg',
    image_storage_path: null,
    social_links: [
      { name: 'Facebook', url: 'https://www.facebook.com/share/p/191qx2khJL/' },
    ],
    active: true,
    display_order: 2,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DataService = {
  // ---------------------------------------------------------------------------
  // PROJECTS MANAGEMENT
  // ---------------------------------------------------------------------------
  async getProjects(): Promise<Project[]> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
        if (!error && data && data.length > 0) return data as Project[]
      }
    } catch {
      // Fallback
    }
    return localProjects
  },

  async getPublishedProjects(): Promise<Project[]> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('projects')
          .select('*')
          .or('status.eq.published,published.eq.true')
          .order('created_at', { ascending: false })
        if (!error && data) return data as Project[]
      }
    } catch {
      // Fallback
    }
    return localProjects.filter((p) => p.status === 'published' || p.published === true)
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single()
        if (!error && data) return data as Project
      }
    } catch {
      // Fallback
    }
    return localProjects.find((p) => p.slug === slug) || null
  },

  async saveProject(projectData: ProjectInsert & { id?: string }): Promise<Project> {
    if (isSupabaseConfigured() && supabase) {
      try {
        if (projectData.id) {
          const { data, error } = await (supabase as any)
            .from('projects')
            .update(projectData)
            .eq('id', projectData.id)
            .select()
            .single()
          if (!error && data) return data as Project
        } else {
          const { data, error } = await (supabase as any)
            .from('projects')
            .insert(projectData)
            .select()
            .single()
          if (!error && data) return data as Project
        }
      } catch {
        // Fallback
      }
    }

    if (projectData.id) {
      const idx = localProjects.findIndex((p) => p.id === projectData.id)
      if (idx !== -1) {
        localProjects[idx] = { ...localProjects[idx], ...projectData } as Project
        return localProjects[idx]
      }
    }

    const newProj: Project = {
      id: projectData.id || `proj-${Date.now()}`,
      title: projectData.title,
      slug: projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: projectData.description,
      short_description: projectData.short_description || null,
      full_description: projectData.full_description || null,
      category: projectData.category,
      client_name: projectData.client_name || null,
      year: projectData.year || null,
      featured: projectData.featured ?? false,
      published: projectData.published ?? (projectData.status === 'published' || projectData.status === 'Published'),
      status: projectData.status || 'draft',
      cover_image: projectData.cover_image || null,
      project_url: projectData.project_url || null,
      technologies: projectData.technologies || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localProjects.unshift(newProj)
    return newProj
  },

  async deleteProject(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        // Fetch project and gallery images before deletion to clean up storage files
        const { data: proj } = await (supabase as any).from('projects').select('cover_image').eq('id', id).single()
        const { data: gallery } = await (supabase as any).from('project_images').select('storage_path').eq('project_id', id)

        if (gallery && gallery.length > 0) {
          for (const img of gallery) {
            if (img.storage_path) {
              await deleteStorageFile('projects', img.storage_path)
            }
          }
        }

        if (proj?.cover_image && proj.cover_image.includes('/projects/')) {
          const pathSegments = proj.cover_image.split('/projects/')
          if (pathSegments[1]) {
            await deleteStorageFile('projects', pathSegments[1])
          }
        }

        await (supabase as any).from('projects').delete().eq('id', id)
      } catch {
        // Fallback
      }
    }
    localProjects = localProjects.filter((p) => p.id !== id)
  },

  // ---------------------------------------------------------------------------
  // PROJECT IMAGES
  // ---------------------------------------------------------------------------
  async getProjectImages(projectId: string): Promise<ProjectImage[]> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('project_images')
          .select('*')
          .eq('project_id', projectId)
          .order('sort_order', { ascending: true })
        if (!error && data) return data as ProjectImage[]
      }
    } catch {
      // Fallback
    }
    return localProjectImages.filter((img) => img.project_id === projectId)
  },

  async deleteProjectImage(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: img } = await (supabase as any).from('project_images').select('storage_path').eq('id', id).single()
        if (img?.storage_path) {
          await deleteStorageFile('projects', img.storage_path)
        }
        await (supabase as any).from('project_images').delete().eq('id', id)
      } catch {
        // Fallback
      }
    }
    localProjectImages = localProjectImages.filter((img) => img.id !== id)
  },

  // ---------------------------------------------------------------------------
  // SERVICES MANAGEMENT
  // ---------------------------------------------------------------------------
  async getServices(): Promise<Service[]> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('services')
          .select('*')
          .order('sort_order', { ascending: true })
        if (!error && data && data.length > 0) return data as Service[]
      }
    } catch {
      // Fallback
    }
    return localServices
  },

  async getServiceBySlug(slug: string): Promise<Service | null> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('services')
          .select('*')
          .eq('slug', slug)
          .single()
        if (!error && data) return data as Service
      }
    } catch {
      // Fallback
    }
    return localServices.find((s) => s.slug === slug) || null
  },

  async saveService(serviceData: ServiceInsert & { id?: string }): Promise<Service> {
    if (isSupabaseConfigured() && supabase) {
      try {
        if (serviceData.id) {
          const { data, error } = await (supabase as any)
            .from('services')
            .update(serviceData)
            .eq('id', serviceData.id)
            .select()
            .single()
          if (!error && data) return data as Service
        } else {
          const { data, error } = await (supabase as any)
            .from('services')
            .insert(serviceData)
            .select()
            .single()
          if (!error && data) return data as Service
        }
      } catch {
        // Fallback
      }
    }

    if (serviceData.id) {
      const idx = localServices.findIndex((s) => s.id === serviceData.id)
      if (idx !== -1) {
        localServices[idx] = { ...localServices[idx], ...serviceData } as Service
        return localServices[idx]
      }
    }

    const newSrv: Service = {
      id: serviceData.id || `srv-${Date.now()}`,
      title: serviceData.title,
      slug: serviceData.slug || serviceData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: serviceData.description,
      short_description: serviceData.short_description || null,
      full_description: serviceData.full_description || null,
      deliverables: serviceData.deliverables || [],
      icon: serviceData.icon || null,
      featured: serviceData.featured ?? false,
      active: serviceData.active ?? true,
      display_order: serviceData.display_order ?? serviceData.sort_order ?? (localServices.length + 1),
      sort_order: serviceData.sort_order ?? serviceData.display_order ?? (localServices.length + 1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localServices.push(newSrv)
    return newSrv
  },

  async deleteService(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await (supabase as any).from('services').delete().eq('id', id)
      } catch {
        // Fallback
      }
    }
    localServices = localServices.filter((s) => s.id !== id)
  },

  async toggleServiceActive(id: string): Promise<void> {
    const service = localServices.find((s) => s.id === id)
    if (service) {
      const nextActive = !service.active
      service.active = nextActive
      if (isSupabaseConfigured() && supabase) {
        try {
          await (supabase as any).from('services').update({ active: nextActive }).eq('id', id)
        } catch {
          // Fallback
        }
      }
    }
  },

  // ---------------------------------------------------------------------------
  // OFFERS MANAGEMENT
  // ---------------------------------------------------------------------------
  async getOffers(): Promise<Offer[]> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('offers')
          .select('*')
          .order('sort_order', { ascending: true })
        if (!error && data && data.length > 0) {
          return data.map((o: any) => ({
            ...o,
            cover_image: o.cover_image || o.image || null,
            image: o.image || o.cover_image || null,
          })) as Offer[]
        }
      }
    } catch {
      // Fallback
    }
    return localOffers
  },

  async saveOffer(offerData: OfferInsert & { id?: string }): Promise<Offer> {
    const offerSlug = offerData.slug || offerData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const imageUrl = offerData.cover_image || offerData.image || null
    const payload = {
      ...offerData,
      slug: offerSlug,
      image: imageUrl,
      cover_image: imageUrl,
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        if (offerData.id) {
          const { data, error } = await (supabase as any)
            .from('offers')
            .update(payload)
            .eq('id', offerData.id)
            .select()
            .single()
          if (!error && data) {
            return {
              ...data,
              cover_image: data.cover_image || data.image || imageUrl,
              image: data.image || data.cover_image || imageUrl,
            } as Offer
          }
        } else {
          const { data, error } = await (supabase as any)
            .from('offers')
            .insert(payload)
            .select()
            .single()
          if (!error && data) {
            return {
              ...data,
              cover_image: data.cover_image || data.image || imageUrl,
              image: data.image || data.cover_image || imageUrl,
            } as Offer
          }
        }
      } catch {
        // Fallback
      }
    }

    if (offerData.id) {
      const idx = localOffers.findIndex((o) => o.id === offerData.id)
      if (idx !== -1) {
        localOffers[idx] = { ...localOffers[idx], ...payload } as Offer
        return localOffers[idx]
      }
    }

    const newOffer: Offer = {
      id: offerData.id || `offer-${Date.now()}`,
      title: offerData.title,
      slug: offerSlug,
      description: offerData.description,
      price: offerData.price || null,
      new_price: offerData.new_price || offerData.price || null,
      price_label: offerData.price_label || null,
      old_price: offerData.old_price || null,
      features: offerData.features || [],
      image: imageUrl,
      cover_image: imageUrl,
      featured: offerData.featured ?? false,
      active: offerData.active ?? true,
      status: offerData.status || (offerData.active ? 'Active' : 'Draft'),
      sort_order: offerData.sort_order ?? 0,
      start_date: offerData.start_date || null,
      end_date: offerData.end_date || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localOffers.unshift(newOffer)
    return newOffer
  },

  async deleteOffer(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await (supabase as any).from('offers').delete().eq('id', id)
      } catch {
        // Fallback
      }
    }
    localOffers = localOffers.filter((o) => o.id !== id)
  },

  // ---------------------------------------------------------------------------
  // LEADS MANAGEMENT
  // ---------------------------------------------------------------------------
  async submitLead(lead: LeadInsert & { description?: string | null }): Promise<Lead> {
    const leadMsg = lead.message || lead.description || null
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('leads')
          .insert({
            name: lead.name,
            email: lead.email || null,
            phone: lead.phone || null,
            service: lead.service || null,
            budget: lead.budget || null,
            description: lead.description || leadMsg,
            message: leadMsg,
            status: lead.status || 'new',
            source: lead.source || 'Website',
          })
          .select()
          .single()
        if (!error && data) return data as Lead
      }
    } catch {
      // Fallback
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: lead.name,
      email: lead.email || null,
      phone: lead.phone || null,
      service: lead.service || null,
      budget: lead.budget || null,
      description: lead.description || leadMsg,
      message: leadMsg,
      status: lead.status || 'new',
      source: lead.source || 'Website',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localLeads.unshift(newLead)
    return newLead
  },

  async getLeads(): Promise<Lead[]> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
        if (!error && data && data.length > 0) return data as Lead[]
      }
    } catch {
      // Fallback
    }
    return localLeads
  },

  async updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
    try {
      if (isSupabaseConfigured() && supabase) {
        await (supabase as any).from('leads').update({ status }).eq('id', id)
      }
    } catch {
      // Fallback
    }
    const target = localLeads.find((l) => l.id === id)
    if (target) target.status = status
  },

  async deleteLead(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await (supabase as any).from('leads').delete().eq('id', id)
      } catch {
        // Fallback
      }
    }
    localLeads = localLeads.filter((l) => l.id !== id)
  },

  // ---------------------------------------------------------------------------
  // TEAM MANAGEMENT
  // ---------------------------------------------------------------------------
  async getTeam(): Promise<TeamMember[]> {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await (supabase as any)
          .from('team_members')
          .select('*')
          .order('sort_order', { ascending: true })
        if (!error && data && data.length > 0) return data as TeamMember[]
      }
    } catch {
      // Fallback
    }
    return localTeam
  },

  async saveTeamMember(memberData: TeamMemberInsert & { id?: string }): Promise<TeamMember> {
    if (isSupabaseConfigured() && supabase) {
      try {
        if (memberData.id) {
          const { data, error } = await (supabase as any)
            .from('team_members')
            .update(memberData)
            .eq('id', memberData.id)
            .select()
            .single()
          if (!error && data) return data as TeamMember
        } else {
          const { data, error } = await (supabase as any)
            .from('team_members')
            .insert(memberData)
            .select()
            .single()
          if (!error && data) return data as TeamMember
        }
      } catch {
        // Fallback
      }
    }

    if (memberData.id) {
      const idx = localTeam.findIndex((m) => m.id === memberData.id)
      if (idx !== -1) {
        localTeam[idx] = { ...localTeam[idx], ...memberData } as TeamMember
        return localTeam[idx]
      }
    }

    const newMember: TeamMember = {
      id: memberData.id || `team-${Date.now()}`,
      name: memberData.name,
      role: memberData.role,
      bio: memberData.bio || null,
      phone: memberData.phone || null,
      email: memberData.email || null,
      whatsapp: memberData.whatsapp || null,
      photo: memberData.photo || null,
      image_url: memberData.image_url || null,
      image_storage_path: memberData.image_storage_path || null,
      social_links: memberData.social_links || [],
      active: memberData.active ?? true,
      display_order: memberData.display_order ?? memberData.sort_order ?? 0,
      sort_order: memberData.sort_order ?? memberData.display_order ?? 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localTeam.push(newMember)
    return newMember
  },

  async deleteTeamMember(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await (supabase as any).from('team_members').delete().eq('id', id)
      } catch {
        // Fallback
      }
    }
    localTeam = localTeam.filter((m) => m.id !== id)
  },
}

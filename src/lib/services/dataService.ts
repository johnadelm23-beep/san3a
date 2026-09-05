import { supabase } from '../supabase/client'
import type { Database } from '../types/database.types'

type Project = Database['public']['Tables']['projects']['Row']
type Service = Database['public']['Tables']['services']['Row']
type Offer = Database['public']['Tables']['offers']['Row']
type Lead = Database['public']['Tables']['leads']['Row']
type TeamMember = Database['public']['Tables']['team_members']['Row']

// In-memory data store for fallback when Supabase is not configured
let localLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Karim Al-Hassan',
    email: 'karim@example.com',
    phone: '+20 100 123 4567',
    service: 'Web Development',
    budget: '$5,000 - $10,000',
    description: 'Looking to build a modern web platform for our logistics enterprise.',
    status: 'New',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Sarah Jenkins',
    email: 's.jenkins@innovate.co',
    phone: '+1 (555) 019-2834',
    service: 'UI / UX Design',
    budget: '$10,000+',
    description: 'Design system refresh and complete web app dashboard redesign.',
    status: 'Contacted',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

let localProjects: Project[] = []

let localServices: Service[] = [
  {
    id: 'srv-1',
    title: 'Web Development',
    slug: 'web-development',
    description: 'Custom web applications and high-performance editorial platforms engineered with Next.js and TypeScript.',
    deliverables: ['Custom Next.js Architecture', 'Responsive UI Engineering', 'Database Integration', 'Performance Optimization'],
    order_num: 1,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-2',
    title: 'Mobile App Development',
    slug: 'mobile-development',
    description: 'Cross-platform native iOS & Android applications built with React Native for fluid mobile experiences.',
    deliverables: ['iOS & Android Builds', 'Offline Capability', 'Push Notifications', 'App Store Deployment'],
    order_num: 2,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-3',
    title: 'UI / UX Design',
    slug: 'ui-ux-design',
    description: 'Systematic interface architecture, user research, wireframing, and design token systems.',
    deliverables: ['Figma Design Systems', 'User Journey Mapping', 'Interactive Prototypes', 'Handoff Documentation'],
    order_num: 3,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-4',
    title: 'Graphic Design',
    slug: 'graphic-design',
    description: 'Editorial graphic design, publication layouts, digital brand assets, and structural graphic systems.',
    deliverables: ['Editorial Design', 'Digital Collateral', 'Typography Layouts', 'Print Guidelines'],
    order_num: 4,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-5',
    title: 'Video Editing / Montage',
    slug: 'video-editing',
    description: 'Post-production video montage, motion graphics, audio sync, and high-impact digital reel editing.',
    deliverables: ['Raw Footage Editing', 'Motion Graphics', 'Color Grading', 'Sound Design & Mixing'],
    order_num: 5,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-6',
    title: 'PowerPoint & Presentation Design',
    slug: 'presentation-design',
    description: 'Executive pitch decks, keynote presentations, and investor slides designed to command attention.',
    deliverables: ['Custom Presentation Templates', 'Investor Pitch Decks', 'Data Visualization', 'Editable Master Decks'],
    order_num: 6,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-7',
    title: 'Branding',
    slug: 'branding',
    description: 'Complete brand architecture, typographic systems, logo marks, and verbal positioning.',
    deliverables: ['Logo Identity System', 'Typographic Framework', 'Brand Book & Manual', 'Visual Guidelines'],
    order_num: 7,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'srv-8',
    title: 'Custom Software Solutions',
    slug: 'custom-software',
    description: 'Bespoke backend APIs, internal automation tools, custom CRM workflows, and specialized software systems.',
    deliverables: ['API Development', 'Workflow Automation', 'Database Schema Architecture', 'Cloud Deployment'],
    order_num: 8,
    active: true,
    created_at: new Date().toISOString(),
  },
]

let localOffers: Offer[] = []

let localTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Founder & Software Architect',
    role: 'Lead Engineering & Full-Stack Architecture',
    bio: 'Specializing in web systems, Next.js, performance optimization, and scalable backend infrastructure.',
    photo: null,
    social_links: [
      { name: 'GitHub', url: '#' },
      { name: 'LinkedIn', url: '#' },
    ],
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'team-2',
    name: 'Founder & Creative Director',
    role: 'Lead Visual Design & UI/UX Systems',
    bio: 'Specializing in editorial design, typographic hierarchy, interface systems, and brand positioning.',
    photo: null,
    social_links: [
      { name: 'Dribbble', url: '#' },
      { name: 'Twitter', url: '#' },
    ],
    display_order: 2,
    created_at: new Date().toISOString(),
  },
]

export const DataService = {
  // LEADS MANAGEMENT
  async submitLead(lead: Omit<Lead, 'id' | 'status' | 'created_at'>): Promise<Lead> {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { data, error } = await (supabase as any)
          .from('leads')
          .insert({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            service: lead.service,
            budget: lead.budget,
            description: lead.description,
            status: 'New',
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
      ...lead,
      status: 'New',
      created_at: new Date().toISOString(),
    }
    localLeads.unshift(newLead)
    return newLead
  },

  async getLeads(): Promise<Lead[]> {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { data, error } = await (supabase as any).from('leads').select('*').order('created_at', { ascending: false })
        if (!error && data) return data as Lead[]
      }
    } catch {
      // Fallback
    }
    return localLeads
  },

  async updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        await (supabase as any).from('leads').update({ status }).eq('id', id)
      }
    } catch {
      // Fallback
    }
    const target = localLeads.find((l) => l.id === id)
    if (target) target.status = status
  },

  // PROJECTS MANAGEMENT
  async getProjects(): Promise<Project[]> {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { data, error } = await (supabase as any).from('projects').select('*').order('created_at', { ascending: false })
        if (!error && data) return data as Project[]
      }
    } catch {
      // Fallback
    }
    return localProjects
  },

  async saveProject(projectData: Omit<Project, 'id' | 'created_at'> & { id?: string }): Promise<Project> {
    const isEdit = Boolean(projectData.id)
    if (isEdit && projectData.id) {
      const existingIdx = localProjects.findIndex((p) => p.id === projectData.id)
      if (existingIdx !== -1) {
        localProjects[existingIdx] = {
          ...localProjects[existingIdx],
          ...projectData,
        }
        return localProjects[existingIdx]
      }
    }

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: projectData.title,
      slug: projectData.slug,
      description: projectData.description,
      category: projectData.category,
      year: projectData.year,
      technologies: projectData.technologies,
      cover_image: projectData.cover_image,
      project_url: projectData.project_url,
      featured: projectData.featured,
      published: projectData.published,
      created_at: new Date().toISOString(),
    }
    localProjects.unshift(newProj)
    return newProj
  },

  async deleteProject(id: string): Promise<void> {
    localProjects = localProjects.filter((p) => p.id !== id)
  },

  // SERVICES MANAGEMENT
  async getServices(): Promise<Service[]> {
    return localServices
  },

  async toggleServiceActive(id: string): Promise<void> {
    const s = localServices.find((item) => item.id === id)
    if (s) s.active = !s.active
  },

  // OFFERS MANAGEMENT
  async getOffers(): Promise<Offer[]> {
    return localOffers
  },

  async saveOffer(offerData: Omit<Offer, 'id' | 'created_at'> & { id?: string }): Promise<Offer> {
    if (offerData.id) {
      const idx = localOffers.findIndex((o) => o.id === offerData.id)
      if (idx !== -1) {
        localOffers[idx] = { ...localOffers[idx], ...offerData }
        return localOffers[idx]
      }
    }
    const newOffer: Offer = {
      id: `offer-${Date.now()}`,
      ...offerData,
      created_at: new Date().toISOString(),
    }
    localOffers.unshift(newOffer)
    return newOffer
  },

  async deleteOffer(id: string): Promise<void> {
    localOffers = localOffers.filter((o) => o.id !== id)
  },

  // TEAM MANAGEMENT
  async getTeam(): Promise<TeamMember[]> {
    return localTeam
  },
}

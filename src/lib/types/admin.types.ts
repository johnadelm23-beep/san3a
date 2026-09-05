export type ProjectStatus = 'Published' | 'Draft'
export type OfferStatus = 'Draft' | 'Active' | 'Expired' | 'Inactive'
export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Rejected'

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  full_description?: string
  category: string
  year: string
  technologies: string[]
  cover_image: string
  gallery_images?: string[]
  project_url?: string | null
  featured: boolean
  published: boolean
  updated_at: string
}

export interface Service {
  id: string
  title: string
  slug: string
  short_description: string
  full_description?: string
  deliverables: string[]
  active: boolean
  display_order: number
}

export interface Offer {
  id: string
  title: string
  description: string
  old_price?: string | null
  new_price: string
  currency: string
  features: string[]
  cover_image?: string | null
  start_date?: string | null
  end_date?: string | null
  active: boolean
  status: OfferStatus
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string | null
  service: string
  budget: string
  description: string
  status: LeadStatus
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo?: string | null
  email?: string | null
  whatsapp?: string | null
  social_links: { name: string; url: string }[]
  display_order: number
  active: boolean
}

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  text: string
  type: ToastType
}

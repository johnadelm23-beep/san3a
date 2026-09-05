export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Rejected' | 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
export type ProjectStatus = 'Published' | 'Draft' | 'draft' | 'published' | 'archived'
export type OfferStatus = 'Draft' | 'Active' | 'Expired' | 'Inactive' | 'draft' | 'active'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'user'
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'admin' | 'user'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'user'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          full_description?: string | null
          category: string
          client_name: string | null
          year: string | null
          featured: boolean
          published?: boolean
          status: string
          cover_image: string | null
          project_url: string | null
          technologies: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug?: string
          description: string
          short_description?: string | null
          full_description?: string | null
          category: string
          client_name?: string | null
          year?: string | null
          featured?: boolean
          published?: boolean
          status?: string
          cover_image?: string | null
          project_url?: string | null
          technologies?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          full_description?: string | null
          category?: string
          client_name?: string | null
          year?: string | null
          featured?: boolean
          published?: boolean
          status?: string
          cover_image?: string | null
          project_url?: string | null
          technologies?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          storage_path: string | null
          alt_text: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          storage_path?: string | null
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          storage_path?: string | null
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          full_description?: string | null
          deliverables: string[]
          icon: string | null
          featured: boolean
          active: boolean
          display_order?: number
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug?: string
          description: string
          short_description?: string | null
          full_description?: string | null
          deliverables?: string[]
          icon?: string | null
          featured?: boolean
          active?: boolean
          display_order?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          full_description?: string | null
          deliverables?: string[]
          icon?: string | null
          featured?: boolean
          active?: boolean
          display_order?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          price: string | null
          new_price?: string | null
          price_label: string | null
          old_price: string | null
          currency?: string
          features: string[]
          image: string | null
          cover_image?: string | null
          featured: boolean
          active: boolean
          status?: string
          sort_order: number
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug?: string
          description: string
          price?: string | null
          new_price?: string | null
          price_label?: string | null
          old_price?: string | null
          currency?: string
          features?: string[]
          image?: string | null
          cover_image?: string | null
          featured?: boolean
          active?: boolean
          status?: string
          sort_order?: number
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          price?: string | null
          new_price?: string | null
          price_label?: string | null
          old_price?: string | null
          currency?: string
          features?: string[]
          image?: string | null
          cover_image?: string | null
          featured?: boolean
          active?: boolean
          status?: string
          sort_order?: number
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          service: string | null
          budget: string | null
          description?: string | null
          message: string | null
          status: string
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          service?: string | null
          budget?: string | null
          description?: string | null
          message?: string | null
          status?: string
          source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          service?: string | null
          budget?: string | null
          description?: string | null
          message?: string | null
          status?: string
          source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          phone: string | null
          email: string | null
          whatsapp: string | null
          photo: string | null
          image_url: string | null
          image_storage_path: string | null
          social_links: { name: string; url: string }[]
          active: boolean
          display_order: number
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          phone?: string | null
          email?: string | null
          whatsapp?: string | null
          photo?: string | null
          image_url?: string | null
          image_storage_path?: string | null
          social_links?: { name: string; url: string }[]
          active?: boolean
          display_order?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string | null
          phone?: string | null
          email?: string | null
          whatsapp?: string | null
          photo?: string | null
          image_url?: string | null
          image_storage_path?: string | null
          social_links?: { name: string; url: string }[]
          active?: boolean
          display_order?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

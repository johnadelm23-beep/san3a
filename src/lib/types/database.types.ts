export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          category: string
          year: string
          technologies: string[]
          cover_image: string
          project_url: string | null
          featured: boolean
          published: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          display_order: number
        }
        Insert: Omit<Database['public']['Tables']['project_images']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['project_images']['Insert']>
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          deliverables: string[]
          order_num: number
          active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      offers: {
        Row: {
          id: string
          title: string
          description: string
          old_price: string | null
          new_price: string
          features: string[]
          image: string | null
          start_date: string | null
          end_date: string | null
          active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['offers']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['offers']['Insert']>
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          service: string
          budget: string
          description: string
          status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Rejected'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string
          photo: string | null
          social_links: { name: string; url: string }[]
          display_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>
      }
    }
  }
}

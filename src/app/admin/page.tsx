'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { 
  Inbox, 
  FolderKanban, 
  Layers, 
  Tag, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react'

type Lead = Database['public']['Tables']['leads']['Row']

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [projectsCount, setProjectsCount] = useState(0)
  const [servicesCount, setServicesCount] = useState(8)
  const [offersCount, setOffersCount] = useState(0)

  useEffect(() => {
    async function loadStats() {
      const allLeads = await DataService.getLeads()
      setLeads(allLeads)

      const allProjects = await DataService.getProjects()
      setProjectsCount(allProjects.length)

      const allServices = await DataService.getServices()
      setServicesCount(allServices.filter((s) => s.active).length)

      const allOffers = await DataService.getOffers()
      setOffersCount(allOffers.length)
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-10 max-w-6xl">
      
      {/* Overview Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-studio-border pb-8 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-studio-accent block mb-1">
            // OVERVIEW
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
            SAN3A CONTROL DASHBOARD
          </h1>
        </div>
        <div className="font-mono text-xs text-studio-muted">
          STATUS: <span className="text-emerald-500 font-semibold">ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="border border-studio-border bg-studio-surface p-6 space-y-3">
          <div className="flex justify-between items-center text-studio-muted">
            <span className="font-mono text-xs uppercase tracking-wider">PROJECT INQUIRIES</span>
            <Inbox className="w-4 h-4 text-studio-accent" />
          </div>
          <div className="text-3xl font-black tracking-tight text-studio-fg">
            {leads.length}
          </div>
          <div className="font-mono text-[10px] text-studio-muted">
            {leads.filter((l) => l.status === 'New').length} NEW UNREAD
          </div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-6 space-y-3">
          <div className="flex justify-between items-center text-studio-muted">
            <span className="font-mono text-xs uppercase tracking-wider">PUBLISHED PROJECTS</span>
            <FolderKanban className="w-4 h-4 text-studio-accent" />
          </div>
          <div className="text-3xl font-black tracking-tight text-studio-fg">
            {projectsCount}
          </div>
          <div className="font-mono text-[10px] text-studio-muted">
            ADMIN MANAGED
          </div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-6 space-y-3">
          <div className="flex justify-between items-center text-studio-muted">
            <span className="font-mono text-xs uppercase tracking-wider">ACTIVE SERVICES</span>
            <Layers className="w-4 h-4 text-studio-accent" />
          </div>
          <div className="text-3xl font-black tracking-tight text-studio-fg">
            {servicesCount}
          </div>
          <div className="font-mono text-[10px] text-studio-muted">
            DISCIPLINES ONLINE
          </div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-6 space-y-3">
          <div className="flex justify-between items-center text-studio-muted">
            <span className="font-mono text-xs uppercase tracking-wider">ACTIVE OFFERS</span>
            <Tag className="w-4 h-4 text-studio-accent" />
          </div>
          <div className="text-3xl font-black tracking-tight text-studio-fg">
            {offersCount}
          </div>
          <div className="font-mono text-[10px] text-studio-muted">
            SUPABASE READY
          </div>
        </div>

      </div>

      {/* Recent Leads Table */}
      <div className="border border-studio-border bg-studio-surface p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-studio-border pb-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-studio-fg">
              RECENT PROJECT INQUIRIES
            </h2>
            <p className="text-xs text-studio-muted">
              Leads submitted from /contact form
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="font-mono text-xs text-studio-fg hover:text-studio-accent flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {leads.length === 0 ? (
          <div className="py-12 text-center font-mono text-xs text-studio-muted">
            No inquiries received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-studio-border text-studio-muted uppercase tracking-wider">
                  <th className="pb-3 font-medium">NAME</th>
                  <th className="pb-3 font-medium">SERVICE</th>
                  <th className="pb-3 font-medium">BUDGET</th>
                  <th className="pb-3 font-medium">DATE</th>
                  <th className="pb-3 font-medium text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-studio-border/60">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-studio-bg/60 transition-colors">
                    <td className="py-3.5 text-studio-fg font-semibold">{lead.name}</td>
                    <td className="py-3.5 text-studio-muted">{lead.service}</td>
                    <td className="py-3.5 text-studio-muted">{lead.budget}</td>
                    <td className="py-3.5 text-studio-darkmuted">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 text-right">
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold border ${
                        lead.status === 'New'
                          ? 'border-studio-accent text-studio-accent'
                          : lead.status === 'Completed'
                          ? 'border-emerald-500 text-emerald-400'
                          : 'border-studio-muted text-studio-muted'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataService } from '@/lib/services/dataService'
import type { Project, Service, Offer, Lead, TeamMember } from '@/lib/services/dataService'
import { EmptyState } from '@/components/admin/EmptyState'
import { AdminButton } from '@/components/admin/AdminButton'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { 
  FolderKanban, 
  Tag, 
  Inbox, 
  Plus, 
  Users,
  Layers,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [projList, srvList, offerList, leadList, teamList] = await Promise.all([
          DataService.getProjects(),
          DataService.getServices(),
          DataService.getOffers(),
          DataService.getLeads(),
          DataService.getTeam(),
        ])

        setProjects(projList)
        setServices(srvList)
        setOffers(offerList)
        setLeads(leadList)
        setTeam(teamList)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const publishedProjectsCount = projects.filter((p) => p.status === 'published' || p.published === true).length
  const activeServicesCount = services.filter((s) => s.active).length
  const activeOffersCount = offers.filter((o) => o.active).length
  const newLeadsCount = leads.filter((l) => l.status === 'new' || l.status === 'New').length

  return (
    <div className="space-y-10 max-w-6xl">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-studio-accent block mb-1">
            // OVERVIEW
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
            SAN3A CONTROL CENTER
          </h1>
        </div>

        <div className="font-mono text-xs text-studio-muted flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>STATUS: <strong className="text-emerald-500 font-semibold">SUPABASE ACTIVE</strong></span>
        </div>
      </div>

      {/* Real-time Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
        <div className="border border-studio-border bg-studio-surface p-4 space-y-1">
          <div className="text-studio-muted flex items-center justify-between">
            <span>PROJECTS</span>
            <FolderKanban className="w-3.5 h-3.5 text-studio-accent" />
          </div>
          <div className="text-2xl font-extrabold text-studio-fg">{loading ? '...' : projects.length}</div>
          <div className="text-[10px] text-studio-darkmuted">Total catalog</div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-4 space-y-1">
          <div className="text-studio-muted flex items-center justify-between">
            <span>PUBLISHED</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">{loading ? '...' : publishedProjectsCount}</div>
          <div className="text-[10px] text-studio-darkmuted">Visible on /work</div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-4 space-y-1">
          <div className="text-studio-muted flex items-center justify-between">
            <span>SERVICES</span>
            <Layers className="w-3.5 h-3.5 text-studio-accent" />
          </div>
          <div className="text-2xl font-extrabold text-studio-fg">{loading ? '...' : activeServicesCount}</div>
          <div className="text-[10px] text-studio-darkmuted">Active offerings</div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-4 space-y-1">
          <div className="text-studio-muted flex items-center justify-between">
            <span>OFFERS</span>
            <Tag className="w-3.5 h-3.5 text-studio-accent" />
          </div>
          <div className="text-2xl font-extrabold text-studio-fg">{loading ? '...' : activeOffersCount}</div>
          <div className="text-[10px] text-studio-darkmuted">Active packages</div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-4 space-y-1">
          <div className="text-studio-muted flex items-center justify-between">
            <span>NEW LEADS</span>
            <Inbox className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{loading ? '...' : newLeadsCount}</div>
          <div className="text-[10px] text-studio-darkmuted">Pending response</div>
        </div>

        <div className="border border-studio-border bg-studio-surface p-4 space-y-1">
          <div className="text-studio-muted flex items-center justify-between">
            <span>TEAM</span>
            <Users className="w-3.5 h-3.5 text-studio-accent" />
          </div>
          <div className="text-2xl font-extrabold text-studio-fg">{loading ? '...' : team.length}</div>
          <div className="text-[10px] text-studio-darkmuted">Founders & team</div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="border border-studio-border bg-studio-surface p-6 space-y-4">
        <span className="font-mono text-xs text-studio-muted uppercase tracking-wider block font-semibold">
          QUICK ACTIONS
        </span>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/projects/new">
            <AdminButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
              Add Project
            </AdminButton>
          </Link>

          <Link href="/admin/offers/new">
            <AdminButton variant="secondary" size="sm" icon={<Plus className="w-4 h-4" />}>
              Create Offer
            </AdminButton>
          </Link>

          <Link href="/admin/services/new">
            <AdminButton variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>
              Add Service
            </AdminButton>
          </Link>

          <Link href="/admin/leads">
            <AdminButton variant="outline" size="sm" icon={<Inbox className="w-4 h-4" />}>
              View Leads ({leads.length})
            </AdminButton>
          </Link>
        </div>
      </div>

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Projects Section */}
        <div className="border border-studio-border bg-studio-surface p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-studio-border pb-4 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <FolderKanban className="w-4 h-4 text-studio-accent" />
              <h2 className="font-bold text-studio-fg uppercase">Recent Projects</h2>
            </div>
            <Link href="/admin/projects" className="text-studio-muted hover:text-studio-fg">
              View All →
            </Link>
          </div>

          {projects.length === 0 ? (
            <EmptyState
              icon={<FolderKanban className="w-8 h-8" />}
              title="No projects in database."
              description="Your published work will appear here once you add your first project."
              actionLabel="Add Project"
              onAction={() => window.location.href = '/admin/projects/new'}
            />
          ) : (
            <div className="divide-y divide-studio-border font-mono text-xs">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-studio-fg font-bold">{p.title}</div>
                    <div className="text-[10px] text-studio-muted">{p.category}</div>
                  </div>
                  <StatusBadge status={p.status === 'published' || p.published ? 'Published' : 'Draft'} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Offers Section */}
        <div className="border border-studio-border bg-studio-surface p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-studio-border pb-4 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-studio-accent" />
              <h2 className="font-bold text-studio-fg uppercase">Active Offers</h2>
            </div>
            <Link href="/admin/offers" className="text-studio-muted hover:text-studio-fg">
              View All →
            </Link>
          </div>

          {offers.length === 0 ? (
            <EmptyState
              icon={<Tag className="w-8 h-8" />}
              title="No promotional packages in database."
              description="Special service packages managed from here will automatically populate on the public /offers route."
              actionLabel="Create Offer"
              onAction={() => window.location.href = '/admin/offers/new'}
            />
          ) : (
            <div className="divide-y divide-studio-border font-mono text-xs">
              {offers.slice(0, 4).map((o) => (
                <div key={o.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-studio-fg font-bold">{o.title}</div>
                    <div className="text-[10px] text-studio-muted">{o.new_price || o.price || 'Custom Quote'}</div>
                  </div>
                  <StatusBadge status={o.active ? 'Active' : 'Inactive'} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Recent Leads Section */}
      <div className="border border-studio-border bg-studio-surface p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-studio-border pb-4 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <Inbox className="w-4 h-4 text-studio-accent" />
            <h2 className="font-bold text-studio-fg uppercase">Project Inquiries (Leads)</h2>
          </div>
          <Link href="/admin/leads" className="text-studio-muted hover:text-studio-fg">
            View All ({leads.length}) →
          </Link>
        </div>

        {leads.length === 0 ? (
          <EmptyState
            icon={<Inbox className="w-8 h-8" />}
            title="No project inquiries received yet."
            description="Client submissions from the /contact form will be logged here for tracking."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-studio-border text-studio-muted uppercase tracking-wider bg-studio-bg/60">
                  <th className="p-3 font-medium">CLIENT NAME</th>
                  <th className="p-3 font-medium">SERVICE</th>
                  <th className="p-3 font-medium">BUDGET</th>
                  <th className="p-3 font-medium">DATE</th>
                  <th className="p-3 font-medium text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-studio-border">
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="hover:bg-studio-bg/40 transition-colors">
                    <td className="p-3 text-studio-fg font-bold">
                      <Link href={`/admin/leads/${l.id}`} className="hover:underline">
                        {l.name}
                      </Link>
                    </td>
                    <td className="p-3 text-studio-muted">{l.service || '—'}</td>
                    <td className="p-3 text-studio-muted">{l.budget || '—'}</td>
                    <td className="p-3 text-studio-darkmuted">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <StatusBadge status={l.status} />
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

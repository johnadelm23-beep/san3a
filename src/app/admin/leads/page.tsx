'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DataService } from '@/lib/services/dataService'
import type { Lead, LeadStatus } from '@/lib/types/admin.types'
import { EmptyState } from '@/components/admin/EmptyState'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { useToast } from '@/context/ToastContext'
import { Inbox, Search, ArrowRight } from 'lucide-react'

const statuses: LeadStatus[] = ['New', 'Contacted', 'In Progress', 'Completed', 'Rejected']

export default function AdminLeadsPage() {
  const { showToast } = useToast()
  const [leads, setLeads] = useState<Lead[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    const list = await DataService.getLeads()
    setLeads([...(list as any)])
  }

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await DataService.updateLeadStatus(id, newStatus)
    await loadLeads()
    showToast(`Lead status updated to ${newStatus}.`, 'info')
  }

  const filteredLeads = leads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.email.toLowerCase().includes(search.toLowerCase()) || 
                          l.service.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (filterStatus === 'ALL') return true
    return l.status === filterStatus
  })

  return (
    <div className="space-y-8 max-w-6xl font-mono text-xs">
      
      {/* Header */}
      <div className="border-b border-studio-border pb-6">
        <span className="text-studio-accent uppercase tracking-widest block mb-1">
          // INQUIRIES MANAGEMENT
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg font-sans">
          PROJECT LEADS & INQUIRIES
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-studio-border bg-studio-surface p-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-studio-muted absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, or service..."
            className="w-full bg-studio-bg border border-studio-border pl-10 pr-4 py-2 text-xs text-studio-fg focus:outline-none focus:border-studio-fg"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 border transition-colors ${
              filterStatus === 'ALL'
                ? 'bg-studio-fg text-studio-bg border-studio-fg font-bold'
                : 'border-studio-border text-studio-muted hover:text-studio-fg'
            }`}
          >
            ALL ({leads.length})
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 border transition-colors ${
                filterStatus === st
                  ? 'bg-studio-fg text-studio-bg border-studio-fg font-bold'
                  : 'border-studio-border text-studio-muted hover:text-studio-fg'
              }`}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>

      </div>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          icon={<Inbox className="w-10 h-10" />}
          title="No project inquiries found."
          description={filterStatus === 'ALL' ? 'No project inquiries have been submitted yet.' : `No inquiries with status "${filterStatus}".`}
        />
      ) : (
        <div className="border border-studio-border bg-studio-surface overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-studio-border text-studio-muted uppercase tracking-wider bg-studio-bg/60">
                <th className="p-4 font-medium">CLIENT</th>
                <th className="p-4 font-medium">SERVICE</th>
                <th className="p-4 font-medium">BUDGET</th>
                <th className="p-4 font-medium">DATE</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-studio-bg/40 transition-colors">
                  <td className="p-4 space-y-0.5">
                    <Link href={`/admin/leads/${lead.id}`} className="text-studio-fg font-bold text-sm hover:underline block font-sans">
                      {lead.name}
                    </Link>
                    <div className="text-[11px] text-studio-muted font-mono">{lead.email}</div>
                  </td>
                  <td className="p-4 text-studio-fg">{lead.service}</td>
                  <td className="p-4 text-studio-muted">{lead.budget}</td>
                  <td className="p-4 text-studio-darkmuted">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className="bg-studio-bg border border-studio-border p-1 text-[11px] font-mono font-bold text-studio-fg focus:outline-none"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center space-x-1 border border-studio-border px-3 py-1.5 text-studio-fg hover:bg-studio-fg hover:text-studio-bg transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

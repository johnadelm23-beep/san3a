'use client'

import { useState, useEffect } from 'react'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { Inbox, Mail, MessageSquare, Phone, X, CheckCircle2 } from 'lucide-react'

type Lead = Database['public']['Tables']['leads']['Row']
type StatusType = Lead['status']

const statuses: StatusType[] = ['New', 'Contacted', 'In Progress', 'Completed', 'Rejected']

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('ALL')

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    const list = await DataService.getLeads()
    setLeads([...list])
  }

  const handleStatusChange = async (id: string, newStatus: StatusType) => {
    await DataService.updateLeadStatus(id, newStatus)
    await loadLeads()
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus })
    }
  }

  const filteredLeads = filterStatus === 'ALL' 
    ? leads 
    : leads.filter((l) => l.status === filterStatus)

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-studio-accent block mb-1">
            // INQUIRIES MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
            PROJECT LEADS
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto pb-2 sm:pb-0">
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
        <div className="border border-studio-border bg-studio-surface p-12 text-center space-y-4">
          <Inbox className="w-10 h-10 text-studio-muted mx-auto" />
          <h2 className="text-xl font-bold text-studio-fg">NO INQUIRIES FOUND</h2>
          <p className="text-xs text-studio-muted">
            {filterStatus === 'ALL' ? 'No project inquiries have been submitted yet.' : `No inquiries with status "${filterStatus}".`}
          </p>
        </div>
      ) : (
        <div className="border border-studio-border bg-studio-surface overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-studio-border text-studio-muted uppercase tracking-wider bg-studio-bg/60">
                <th className="p-4 font-medium">NAME / EMAIL</th>
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
                    <div className="text-studio-fg font-bold">{lead.name}</div>
                    <div className="text-[11px] text-studio-muted">{lead.email}</div>
                  </td>
                  <td className="p-4 text-studio-fg">{lead.service}</td>
                  <td className="p-4 text-studio-muted">{lead.budget}</td>
                  <td className="p-4 text-studio-darkmuted">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as StatusType)}
                      className={`bg-studio-bg border p-1.5 text-[11px] font-mono font-bold focus:outline-none ${
                        lead.status === 'New'
                          ? 'border-studio-accent text-studio-accent'
                          : lead.status === 'Completed'
                          ? 'border-emerald-500 text-emerald-400'
                          : 'border-studio-border text-studio-muted'
                      }`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1 border border-studio-border text-studio-fg hover:bg-studio-fg hover:text-studio-bg transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-studio-border bg-studio-surface max-w-2xl w-full p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-studio-border pb-4">
              <div>
                <span className="font-mono text-[10px] text-studio-accent uppercase block">
                  LEAD ID: {selectedLead.id}
                </span>
                <h2 className="text-xl font-bold tracking-tight text-studio-fg">
                  {selectedLead.name}
                </h2>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-studio-muted hover:text-studio-fg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs border-b border-studio-border pb-4">
              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">EMAIL:</span>
                <a href={`mailto:${selectedLead.email}`} className="text-studio-fg underline">
                  {selectedLead.email}
                </a>
              </div>

              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">PHONE / WHATSAPP:</span>
                <span className="text-studio-fg">{selectedLead.phone || 'N/A'}</span>
              </div>

              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">SERVICE REQUESTED:</span>
                <span className="text-studio-fg font-bold">{selectedLead.service}</span>
              </div>

              <div>
                <span className="text-studio-darkmuted uppercase block mb-1">BUDGET RANGE:</span>
                <span className="text-studio-fg">{selectedLead.budget}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-studio-darkmuted uppercase block">PROJECT DESCRIPTION:</span>
              <div className="p-4 border border-studio-border bg-studio-bg text-xs leading-relaxed text-studio-fg font-normal whitespace-pre-wrap">
                {selectedLead.description}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-studio-border">
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="inline-flex items-center gap-2 bg-studio-fg text-studio-bg px-4 py-2.5 text-xs font-mono font-bold uppercase"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-emerald-500/60 bg-emerald-500/10 text-emerald-400 px-4 py-2.5 text-xs font-mono font-bold uppercase"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              <div className="font-mono text-xs text-studio-muted">
                Status:{' '}
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as StatusType)}
                  className="bg-studio-bg border border-studio-border p-1 text-studio-fg font-bold"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

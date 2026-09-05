'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DataService } from '@/lib/services/dataService'
import type { Lead } from '@/lib/services/dataService'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { AdminButton } from '@/components/admin/AdminButton'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { useToast } from '@/context/ToastContext'
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton'
import { ArrowLeft, Mail, MessageSquare, Trash2 } from 'lucide-react'

const statuses = ['new', 'contacted', 'in_progress', 'completed', 'cancelled']

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()
  const id = params.id as string

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function fetchLead() {
      const list = await DataService.getLeads()
      const found = list.find((l) => l.id === id)
      if (found) setLead(found)
      setLoading(false)
    }
    fetchLead()
  }, [id])

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return
    await DataService.updateLeadStatus(lead.id, newStatus as any)
    setLead({ ...lead, status: newStatus as any })
    showToast(`Lead status updated to ${newStatus}.`, 'info')
  }

  const handleDeleteConfirm = async () => {
    if (!lead) return
    setDeleting(true)
    try {
      await DataService.deleteLead(lead.id)
      setDeleting(false)
      setConfirmDeleteOpen(false)
      showToast('Lead deleted successfully.', 'success')
      router.push('/admin/leads')
    } catch {
      setDeleting(false)
      showToast('Error deleting lead.', 'error')
    }
  }

  if (loading) return <LoadingSkeleton rows={6} />
  if (!lead) return <div className="font-mono text-xs text-studio-muted">Lead not found.</div>

  return (
    <div className="space-y-8 max-w-4xl font-mono text-xs">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-studio-border pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-studio-muted hover:text-studio-fg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inquiries</span>
        </button>

        <AdminButton
          variant="danger"
          size="sm"
          onClick={() => setConfirmDeleteOpen(true)}
          icon={<Trash2 className="w-3.5 h-3.5" />}
        >
          Delete Lead
        </AdminButton>
      </div>

      {/* Main Lead Details Card */}
      <div className="border border-studio-border bg-studio-surface p-8 space-y-8">
        
        {/* Header Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
          <div>
            <span className="text-[10px] text-studio-accent uppercase block">
              LEAD RECORD ID: {lead.id}
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-studio-fg font-sans">
              {lead.name}
            </h1>
          </div>
          <StatusBadge status={lead.status} />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-studio-border pb-6">
          <div>
            <span className="text-studio-darkmuted uppercase block mb-1">CLIENT EMAIL</span>
            <a href={`mailto:${lead.email}`} className="text-studio-fg text-sm underline font-bold">
              {lead.email || 'N/A'}
            </a>
          </div>

          <div>
            <span className="text-studio-darkmuted uppercase block mb-1">WHATSAPP / PHONE</span>
            <span className="text-studio-fg text-sm font-bold">{lead.phone || 'N/A'}</span>
          </div>

          <div>
            <span className="text-studio-darkmuted uppercase block mb-1">REQUESTED SERVICE</span>
            <span className="text-studio-fg font-bold text-sm">{lead.service || 'N/A'}</span>
          </div>

          <div>
            <span className="text-studio-darkmuted uppercase block mb-1">ESTIMATED BUDGET</span>
            <span className="text-studio-fg font-bold text-sm">{lead.budget || 'N/A'}</span>
          </div>
        </div>

        {/* Description Box */}
        <div className="space-y-2">
          <span className="text-studio-darkmuted uppercase block">PROJECT DESCRIPTION / MESSAGE</span>
          <div className="p-5 border border-studio-border bg-studio-bg text-sm text-studio-fg font-normal leading-relaxed whitespace-pre-wrap">
            {lead.message || lead.description || 'No detailed message provided.'}
          </div>
        </div>

        {/* Status Transition Actions */}
        <div className="space-y-3 pt-4 border-t border-studio-border">
          <span className="text-studio-darkmuted uppercase block">UPDATE STATUS</span>
          <div className="flex flex-wrap gap-3">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`px-4 py-2 border text-xs uppercase font-bold transition-all ${
                  lead.status === st
                    ? 'bg-studio-fg text-studio-bg border-studio-fg'
                    : 'border-studio-border text-studio-muted hover:text-studio-fg hover:border-studio-border-light'
                }`}
              >
                Mark as {st}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Reply Communication Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-studio-border">
          <div className="flex items-center gap-4">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center space-x-2 bg-studio-fg text-studio-bg px-5 py-3 text-xs uppercase font-extrabold"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>
            )}

            {lead.phone && (
              <a
                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border border-emerald-500/60 bg-emerald-500/10 text-emerald-400 px-5 py-3 text-xs uppercase font-extrabold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            )}
          </div>

          <div className="text-[11px] text-studio-muted">
            Submitted on {new Date(lead.created_at).toLocaleString()}
          </div>
        </div>

      </div>

      <ConfirmDialog
        isOpen={confirmDeleteOpen}
        title="Delete this project lead?"
        message="This action cannot be undone. The inquiry record will be removed from your dashboard."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteOpen(false)}
        loading={deleting}
      />

    </div>
  )
}

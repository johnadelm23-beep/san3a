'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DataService } from '@/lib/services/dataService'
import type { Offer } from '@/lib/types/admin.types'
import { EmptyState } from '@/components/admin/EmptyState'
import { AdminButton } from '@/components/admin/AdminButton'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { useToast } from '@/context/ToastContext'
import { Plus, Search, Tag, Edit3, Trash2 } from 'lucide-react'

export default function AdminOffersPage() {
  const { showToast } = useToast()
  const [offers, setOffers] = useState<Offer[]>([])
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'DRAFT' | 'EXPIRED' | 'INACTIVE'>('ALL')
  const [search, setSearch] = useState('')
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    const list = await DataService.getOffers()
    setOffers(list as any)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return
    setDeleting(true)
    try {
      await DataService.deleteOffer(deleteTargetId)
      setDeleting(false)
      setDeleteTargetId(null)
      showToast('Offer package deleted.', 'success')
      await loadOffers()
    } catch {
      setDeleting(false)
      showToast('Error deleting offer.', 'error')
    }
  }

  const filtered = offers.filter((o) => {
    const matchesSearch = o.title.toLowerCase().includes(search.toLowerCase()) || o.description.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (filter === 'ACTIVE') return o.active
    if (filter === 'INACTIVE') return !o.active
    return true
  })

  return (
    <div className="space-y-8 max-w-6xl font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
        <div>
          <span className="text-studio-accent uppercase tracking-widest block mb-1">
            // REPOSITORY MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg font-sans">
            OFFERS & PACKAGES
          </h1>
        </div>

        <Link href="/admin/offers/new">
          <AdminButton variant="primary" icon={<Plus className="w-4 h-4" />}>
            Create Offer
          </AdminButton>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-studio-border bg-studio-surface p-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-studio-muted absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search offer packages..."
            className="w-full bg-studio-bg border border-studio-border pl-10 pr-4 py-2 text-xs text-studio-fg focus:outline-none focus:border-studio-fg"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 border font-semibold tracking-wider uppercase transition-colors ${
                filter === f
                  ? 'bg-studio-fg text-studio-bg border-studio-fg font-bold'
                  : 'border-studio-border text-studio-muted hover:text-studio-fg'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

      </div>

      {/* List or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Tag className="w-10 h-10" />}
          title="No promotional packages yet."
          description="Special service packages managed from here will automatically populate on the public /offers route."
          actionLabel="Create Offer"
          onAction={() => window.location.href = '/admin/offers/new'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((offer) => (
            <div key={offer.id} className="border border-studio-border bg-studio-surface p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold text-studio-fg font-sans">{offer.title}</h2>
                  <StatusBadge status={offer.active ? 'Active' : 'Inactive'} />
                </div>

                <p className="text-xs text-studio-muted leading-relaxed font-normal">
                  {offer.description}
                </p>

                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl font-extrabold text-studio-fg font-sans">{offer.new_price}</span>
                  {offer.old_price && (
                    <span className="text-xs text-studio-muted line-through">{offer.old_price}</span>
                  )}
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-studio-border text-xs text-studio-muted">
                  {offer.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <span className="text-studio-accent">//</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-studio-border pt-4 flex justify-between items-center text-xs">
                <span className="text-studio-muted">{offer.end_date ? `EXP: ${offer.end_date}` : 'NO EXPIRATION'}</span>
                
                <div className="space-x-3">
                  <Link href={`/admin/offers/${offer.id}/edit`} className="text-studio-muted hover:text-studio-fg">
                    <Edit3 className="w-4 h-4 inline" />
                  </Link>
                  <button
                    onClick={() => setDeleteTargetId(offer.id)}
                    className="text-studio-muted hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete this offer package?"
        message="This action cannot be undone. The package will be removed from your management system."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />

    </div>
  )
}

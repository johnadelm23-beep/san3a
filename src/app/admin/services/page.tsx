'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { AdminButton } from '@/components/admin/AdminButton'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { useToast } from '@/context/ToastContext'
import { Plus, ToggleLeft, ToggleRight, Edit3, Trash2 } from 'lucide-react'

type Service = Database['public']['Tables']['services']['Row']

export default function AdminServicesPage() {
  const { showToast } = useToast()
  const [services, setServices] = useState<Service[]>([])
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    const list = await DataService.getServices()
    setServices([...list])
  }

  const handleToggleActive = async (id: string) => {
    await DataService.toggleServiceActive(id)
    await loadServices()
    showToast('Service status updated.', 'info')
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return
    setDeleting(true)
    setDeleting(false)
    setDeleteTargetId(null)
    showToast('Service removed.', 'success')
  }

  return (
    <div className="space-y-8 max-w-6xl font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
        <div>
          <span className="text-studio-accent uppercase tracking-widest block mb-1">
            // REPOSITORY MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg font-sans">
            SERVICES & DISCIPLINES
          </h1>
        </div>

        <Link href="/admin/services/new">
          <AdminButton variant="primary" icon={<Plus className="w-4 h-4" />}>
            Add Service
          </AdminButton>
        </Link>
      </div>

      {/* Services List */}
      <div className="border border-studio-border bg-studio-surface divide-y divide-studio-border">
        {services.map((service, idx) => (
          <div key={service.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-studio-bg/40 transition-colors">
            
            <div className="flex items-start space-x-6">
              <span className="font-mono text-sm text-studio-accent font-bold">
                0{idx + 1}
              </span>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-bold tracking-tight text-studio-fg">
                    {service.title}
                  </h2>
                  <StatusBadge status={service.active ? 'Active' : 'Disabled'} />
                </div>
                <p className="text-xs text-studio-muted max-w-xl font-normal">
                  {service.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {service.deliverables.map((deliv) => (
                    <span key={deliv} className="text-[10px] bg-studio-bg border border-studio-border px-2 py-0.5 text-studio-muted">
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-t md:border-t-0 border-studio-border pt-4 md:pt-0">
              <button
                onClick={() => handleToggleActive(service.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 border font-semibold transition-colors ${
                  service.active
                    ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400'
                    : 'border-studio-border text-studio-muted'
                }`}
              >
                {service.active ? (
                  <>
                    <ToggleRight className="w-4 h-4 text-emerald-400" />
                    <span>ACTIVE</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4 text-studio-muted" />
                    <span>DISABLED</span>
                  </>
                )}
              </button>

              <Link href={`/admin/services/${service.id}/edit`} className="p-2 text-studio-muted hover:text-studio-fg">
                <Edit3 className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setDeleteTargetId(service.id)}
                className="p-2 text-studio-muted hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete this service discipline?"
        message="This action cannot be undone. Removing this service will hide its public detail page."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />

    </div>
  )
}

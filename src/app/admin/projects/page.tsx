'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DataService } from '@/lib/services/dataService'
import type { Project } from '@/lib/types/admin.types'
import { EmptyState } from '@/components/admin/EmptyState'
import { AdminButton } from '@/components/admin/AdminButton'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { useToast } from '@/context/ToastContext'
import { Plus, Search, FolderKanban, Edit3, Trash2, ExternalLink } from 'lucide-react'

export default function AdminProjectsPage() {
  const { showToast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'FEATURED'>('ALL')
  const [search, setSearch] = useState('')
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const list = await DataService.getProjects()
    setProjects(list as any)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return
    setDeleting(true)
    try {
      await DataService.deleteProject(deleteTargetId)
      setDeleting(false)
      setDeleteTargetId(null)
      showToast('Project deleted successfully.', 'success')
      await loadProjects()
    } catch {
      setDeleting(false)
      showToast('Error deleting project.', 'error')
    }
  }

  const filtered = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (filter === 'PUBLISHED') return p.published
    if (filter === 'DRAFT') return !p.published
    if (filter === 'FEATURED') return p.featured
    return true
  })

  return (
    <div className="space-y-8 max-w-6xl font-mono text-xs">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
        <div>
          <span className="text-studio-accent uppercase tracking-widest block mb-1">
            // REPOSITORY MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg font-sans">
            PROJECT MANAGER
          </h1>
        </div>

        <Link href="/admin/projects/new">
          <AdminButton variant="primary" icon={<Plus className="w-4 h-4" />}>
            Add Project
          </AdminButton>
        </Link>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-studio-border bg-studio-surface p-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-studio-muted absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title or category..."
            className="w-full bg-studio-bg border border-studio-border pl-10 pr-4 py-2 text-xs text-studio-fg focus:outline-none focus:border-studio-fg"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          {(['ALL', 'PUBLISHED', 'DRAFT', 'FEATURED'] as const).map((f) => (
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

      {/* Projects Table or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="w-10 h-10" />}
          title="No projects found."
          description="Your published work will appear here once you add your first project."
          actionLabel="Add Project"
          onAction={() => window.location.href = '/admin/projects/new'}
        />
      ) : (
        <div className="border border-studio-border bg-studio-surface overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-studio-border text-studio-muted uppercase tracking-wider bg-studio-bg/60">
                <th className="p-4 font-medium">PROJECT</th>
                <th className="p-4 font-medium">CATEGORY</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium">FEATURED</th>
                <th className="p-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-studio-bg/40 transition-colors">
                  <td className="p-4 space-y-0.5">
                    <div className="text-studio-fg font-bold text-sm">{p.title}</div>
                    <div className="text-[10px] text-studio-darkmuted font-mono">{p.slug}</div>
                  </td>
                  <td className="p-4 text-studio-muted">{p.category}</td>
                  <td className="p-4">
                    <StatusBadge status={p.published ? 'Published' : 'Draft'} />
                  </td>
                  <td className="p-4">
                    {p.featured ? (
                      <span className="text-studio-accent font-bold">// FEATURED</span>
                    ) : (
                      <span className="text-studio-darkmuted">—</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <Link href={`/admin/projects/${p.id}/edit`} className="text-studio-muted hover:text-studio-fg transition-colors">
                      <Edit3 className="w-4 h-4 inline" />
                    </Link>
                    {p.project_url && (
                      <a href={p.project_url} target="_blank" rel="noopener noreferrer" className="text-studio-muted hover:text-studio-fg transition-colors">
                        <ExternalLink className="w-4 h-4 inline" />
                      </a>
                    )}
                    <button
                      onClick={() => setDeleteTargetId(p.id)}
                      className="text-studio-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete this project?"
        message="This action cannot be undone. The project will be removed from your management repository."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />

    </div>
  )
}

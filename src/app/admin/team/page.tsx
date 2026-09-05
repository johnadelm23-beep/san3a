'use client'

import { useState, useEffect } from 'react'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { FormField } from '@/components/admin/FormField'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { AdminButton } from '@/components/admin/AdminButton'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { useToast } from '@/context/ToastContext'
import { Edit3 } from 'lucide-react'

type TeamMember = Database['public']['Tables']['team_members']['Row']

export default function AdminTeamPage() {
  const { showToast } = useToast()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<TeamMember>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadTeam()
  }, [])

  const loadTeam = async () => {
    const list = await DataService.getTeam()
    setTeam([...list])
  }

  const handleStartEdit = (member: TeamMember) => {
    setEditingId(member.id)
    setEditForm({ ...member })
  }

  const handleSaveEdit = async () => {
    if (!editForm.name || !editForm.role) return
    setSaving(true)

    try {
      await DataService.saveTeamMember({
        id: editForm.id,
        name: editForm.name,
        role: editForm.role,
        bio: editForm.bio || null,
        phone: editForm.phone || null,
        email: editForm.email || null,
        whatsapp: editForm.whatsapp || null,
        photo: editForm.photo || editForm.image_url || null,
        image_url: editForm.image_url || editForm.photo || null,
        image_storage_path: editForm.image_storage_path || null,
        social_links: editForm.social_links || [],
        active: editForm.active ?? true,
        display_order: editForm.display_order ?? editForm.sort_order ?? 1,
        sort_order: editForm.sort_order ?? editForm.display_order ?? 1,
      })

      showToast('Founder profile updated successfully!', 'success')
      setEditingId(null)
      await loadTeam()
    } catch {
      showToast('Error saving founder profile.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-6xl font-mono text-xs">
      
      {/* Header */}
      <div className="border-b border-studio-border pb-6">
        <span className="text-studio-accent uppercase tracking-widest block mb-1">
          // REPOSITORY MANAGEMENT
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg font-sans">
          JOHN & GEORGE — FOUNDER PROFILES
        </h1>
        <p className="text-xs text-studio-muted mt-1">
          Configure founder profiles for John & George displayed across /about, /contact, and public footers.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {team.map((member) => (
          <div key={member.id} className="border border-studio-border bg-studio-surface p-8 space-y-6 flex flex-col justify-between">
            
            {editingId === member.id ? (
              <div className="space-y-4">
                <FormField label="Founder Name">
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg"
                  />
                </FormField>

                <FormField label="Role Title">
                  <input
                    type="text"
                    value={editForm.role || ''}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg"
                  />
                </FormField>

                <FormField label="Bio & Responsibilities">
                  <textarea
                    rows={4}
                    value={editForm.bio || ''}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg resize-none"
                  />
                </FormField>

                <FormField label="Phone">
                  <input
                    type="text"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg"
                  />
                </FormField>

                <FormField label="WhatsApp Link / Number">
                  <input
                    type="text"
                    value={editForm.whatsapp || ''}
                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg"
                  />
                </FormField>

                <ImageUploader
                  label="Founder Brand Image"
                  bucket="team"
                  value={editForm.photo || editForm.image_url || ''}
                  onChange={(url, path) => setEditForm({ ...editForm, photo: url, image_url: url, image_storage_path: path || null })}
                />

                <div className="pt-4 flex justify-end space-x-2">
                  <AdminButton size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                    Cancel
                  </AdminButton>
                  <AdminButton size="sm" variant="primary" onClick={handleSaveEdit} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Profile'}
                  </AdminButton>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-studio-border pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-studio-bg border border-studio-border flex items-center justify-center text-studio-accent font-bold">
                        0{member.display_order || member.sort_order || 1}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-studio-fg font-sans">{member.name}</h2>
                        <span className="text-studio-accent uppercase">{member.role}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartEdit(member)}
                      className="p-2 text-studio-muted hover:text-studio-fg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-studio-muted leading-relaxed font-normal">
                    {member.bio}
                  </p>

                  <div className="pt-2 font-mono text-[11px] text-studio-muted space-y-1">
                    <div>Phone: <span className="text-studio-fg">{member.phone || '—'}</span></div>
                    <div>WhatsApp: <span className="text-studio-fg">{member.whatsapp || '—'}</span></div>
                  </div>
                </div>

                <div className="border-t border-studio-border pt-4 flex justify-between items-center text-[11px] text-studio-muted">
                  <span>DISCIPLINE: SAN3A FOUNDER</span>
                  <StatusBadge status={member.active ? 'ACTIVE' : 'INACTIVE'} />
                </div>
              </>
            )}

          </div>
        ))}
      </div>

    </div>
  )
}

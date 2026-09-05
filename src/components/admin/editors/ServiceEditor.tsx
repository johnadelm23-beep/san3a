'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataService } from '@/lib/services/dataService'
import type { Service } from '@/lib/services/dataService'
import { useToast } from '@/context/ToastContext'
import { FormField } from '../FormField'
import { AdminButton } from '../AdminButton'
import { ArrowLeft, Save } from 'lucide-react'

interface ServiceEditorProps {
  initialData?: Partial<Service>
  isEdit?: boolean
}

export function ServiceEditor({ initialData, isEdit = false }: ServiceEditorProps) {
  const router = useRouter()
  const { showToast } = useToast()

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    short_description: initialData?.short_description || '',
    full_description: initialData?.full_description || '',
    deliverables: initialData?.deliverables?.join(', ') || '',
    active: initialData?.active ?? true,
    display_order: initialData?.display_order || 1,
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setLoading(true)
    const delivArray = formData.deliverables.split(',').map((d) => d.trim()).filter(Boolean)
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    try {
      await DataService.saveService({
        id: initialData?.id,
        title: formData.title,
        slug,
        description: formData.short_description || formData.full_description || formData.title,
        short_description: formData.short_description,
        full_description: formData.full_description,
        deliverables: delivArray,
        active: formData.active,
        display_order: Number(formData.display_order) || 1,
        sort_order: Number(formData.display_order) || 1,
      })

      showToast(isEdit ? 'Service updated successfully!' : 'Service created successfully!', 'success')
      setLoading(false)
      router.push('/admin/services')
    } catch {
      setLoading(false)
      showToast('Error saving service.', 'error')
    }
  }

  return (
    <div className="space-y-8 max-w-4xl font-mono text-xs">
      <div className="flex items-center justify-between border-b border-studio-border pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-studio-muted hover:text-studio-fg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </button>

        <AdminButton
          type="button"
          variant="primary"
          onClick={handleSave}
          disabled={loading}
          icon={<Save className="w-4 h-4" />}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Service' : 'Save Service'}
        </AdminButton>
      </div>

      <form onSubmit={handleSave} className="border border-studio-border bg-studio-surface p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField label="Service Title" required>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Web Development"
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>

          <FormField label="URL Slug">
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. web-development"
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>
        </div>

        <FormField label="Short Summary Description" required>
          <textarea
            rows={3}
            required
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            placeholder="Custom web applications and high-performance editorial platforms..."
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
          />
        </FormField>

        <FormField label="Full Service Overview">
          <textarea
            rows={5}
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="Detailed scope and process breakdown..."
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
          />
        </FormField>

        <FormField label="Deliverables (comma separated)">
          <input
            type="text"
            value={formData.deliverables}
            onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
            placeholder="Next.js App Router, Responsive UI, Database Integration"
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
          />
        </FormField>

        <div className="flex items-center space-x-8 pt-4 border-t border-studio-border">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="accent-studio-accent"
            />
            <span className="text-studio-fg font-semibold uppercase">Active Service</span>
          </label>
        </div>
      </form>
    </div>
  )
}

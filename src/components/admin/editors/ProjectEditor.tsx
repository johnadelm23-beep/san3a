'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataService } from '@/lib/services/dataService'
import type { Project } from '@/lib/types/admin.types'
import { useToast } from '@/context/ToastContext'
import { FormField } from '../FormField'
import { ImageUploader } from '../ImageUploader'
import { AdminButton } from '../AdminButton'
import { ArrowLeft, Save, Globe } from 'lucide-react'

interface ProjectEditorProps {
  initialData?: Partial<Project>
  isEdit?: boolean
}

export function ProjectEditor({ initialData, isEdit = false }: ProjectEditorProps) {
  const router = useRouter()
  const { showToast } = useToast()

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    full_description: initialData?.full_description || '',
    category: initialData?.category || 'Web Development',
    year: initialData?.year || '2026',
    technologies: initialData?.technologies?.join(', ') || 'Next.js, TypeScript, Tailwind CSS',
    cover_image: initialData?.cover_image || '',
    project_url: initialData?.project_url || '',
    featured: Boolean(initialData?.featured ?? false),
    published: Boolean(initialData?.published ?? true),
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.title.trim()) errs.title = 'Project title is required.'
    if (!formData.description.trim()) errs.description = 'Short description is required.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async (publishState: boolean) => {
    if (!validate()) return

    setLoading(true)
    const techArray = formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    try {
      await DataService.saveProject({
        id: initialData?.id,
        title: formData.title,
        slug,
        description: formData.description,
        full_description: formData.full_description,
        category: formData.category,
        year: formData.year,
        technologies: techArray,
        cover_image: formData.cover_image || '/projects/hero-preview.jpg',
        project_url: formData.project_url || null,
        featured: formData.featured,
        published: publishState,
      })

      setLoading(false)
      showToast(publishState ? 'Project published successfully!' : 'Project draft saved successfully!', 'success')
      router.push('/admin/projects')
    } catch {
      setLoading(false)
      showToast('Error saving project.', 'error')
    }
  }

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
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center space-x-3">
          <AdminButton
            type="button"
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={loading}
          >
            Save Draft
          </AdminButton>

          <AdminButton
            type="button"
            variant="primary"
            onClick={() => handleSave(true)}
            disabled={loading}
            icon={<Save className="w-4 h-4" />}
          >
            {loading ? 'Saving...' : formData.published ? 'Publish Project' : 'Publish Project'}
          </AdminButton>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="border border-studio-border bg-studio-surface p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField label="Project Title" required error={errors.title}>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Genesis Diagnostics Engine"
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>

          <FormField label="URL Slug" helperText="Auto-generated from title if left blank.">
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. genesis-diagnostics"
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField label="Category">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="UI / UX Design">UI / UX Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Branding">Branding</option>
              <option value="Custom Software">Custom Software</option>
            </select>
          </FormField>

          <FormField label="Year">
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>
        </div>

        <FormField label="Short Summary Description" required error={errors.description}>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="High-density cellular diagnostic interface and analytical reporting platform..."
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
          />
        </FormField>

        <FormField label="Full Editorial Breakdown" helperText="Detailed writeup describing technical architecture and design system.">
          <textarea
            rows={6}
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="Enter full technical breakdown, client goals, and system details..."
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
          />
        </FormField>

        <FormField label="Technologies & Stack (comma separated)">
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ImageUploader
            label="Cover Image"
            value={formData.cover_image}
            onChange={(url) => setFormData({ ...formData, cover_image: url })}
          />

          <FormField label="Live Project URL (Optional)">
            <div className="relative">
              <input
                type="text"
                value={formData.project_url}
                onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                placeholder="https://client-domain.com"
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
              />
            </div>
          </FormField>
        </div>

        <div className="flex items-center space-x-8 pt-4 border-t border-studio-border">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="accent-studio-accent"
            />
            <span className="text-studio-fg font-semibold uppercase">Feature on Homepage</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="accent-studio-accent"
            />
            <span className="text-studio-fg font-semibold uppercase">Publish Live to Website</span>
          </label>
        </div>

      </div>

    </div>
  )
}

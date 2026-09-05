'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataService } from '@/lib/services/dataService'
import type { Offer } from '@/lib/types/admin.types'
import { useToast } from '@/context/ToastContext'
import { FormField } from '../FormField'
import { ImageUploader } from '../ImageUploader'
import { AdminButton } from '../AdminButton'
import { ArrowLeft, Save } from 'lucide-react'

interface OfferEditorProps {
  initialData?: Partial<Offer>
  isEdit?: boolean
}

export function OfferEditor({ initialData, isEdit = false }: OfferEditorProps) {
  const router = useRouter()
  const { showToast } = useToast()

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    old_price: initialData?.old_price || '',
    new_price: initialData?.new_price || '',
    currency: initialData?.currency || 'USD ($)',
    features: initialData?.features?.join(', ') || 'Full Next.js App, Custom Design Tokens, Supabase Architecture, 1-Year Support',
    cover_image: initialData?.cover_image || (initialData as any)?.image || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    active: initialData?.active ?? true,
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.new_price.trim()) return

    setLoading(true)
    const featuresArray = formData.features.split(',').map((f) => f.trim()).filter(Boolean)

    try {
      await DataService.saveOffer({
        id: initialData?.id,
        title: formData.title,
        description: formData.description,
        old_price: formData.old_price || null,
        new_price: formData.new_price,
        features: featuresArray,
        image: formData.cover_image || null,
        cover_image: formData.cover_image || null,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        active: formData.active,
      })

      setLoading(false)
      showToast(isEdit ? 'Package offer updated!' : 'Package offer created!', 'success')
      router.push('/admin/offers')
    } catch {
      setLoading(false)
      showToast('Error saving offer.', 'error')
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
          <span>Back to Offers</span>
        </button>

        <AdminButton
          type="button"
          variant="primary"
          onClick={handleSave}
          disabled={loading}
          icon={<Save className="w-4 h-4" />}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Package' : 'Save Package'}
        </AdminButton>
      </div>

      <form onSubmit={handleSave} className="border border-studio-border bg-studio-surface p-8 space-y-6">
        <FormField label="Package Title" required>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Startup MVP Launch Package"
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FormField label="New Price *" required>
            <input
              type="text"
              required
              value={formData.new_price}
              onChange={(e) => setFormData({ ...formData, new_price: e.target.value })}
              placeholder="e.g. $4,500"
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>

          <FormField label="Old Price (Optional)">
            <input
              type="text"
              value={formData.old_price}
              onChange={(e) => setFormData({ ...formData, old_price: e.target.value })}
              placeholder="e.g. $6,000"
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>

          <FormField label="Currency">
            <input
              type="text"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>
        </div>

        <FormField label="Package Description">
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Comprehensive development and design sprint for seed-stage startups..."
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
          />
        </FormField>

        <FormField label="Package Features (comma separated)">
          <input
            type="text"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField label="Start Date">
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>

          <FormField label="End / Expiration Date">
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
            />
          </FormField>
        </div>

        <ImageUploader
          label="Package Cover Image (Optional)"
          value={formData.cover_image}
          onChange={(url) => setFormData({ ...formData, cover_image: url })}
        />

        <div className="flex items-center space-x-8 pt-4 border-t border-studio-border">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="accent-studio-accent"
            />
            <span className="text-studio-fg font-semibold uppercase">Active Offer Package</span>
          </label>
        </div>
      </form>
    </div>
  )
}

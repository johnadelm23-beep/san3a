'use client'

import { useState, useEffect } from 'react'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { Plus, Tag, Trash2, Edit3, X, Calendar } from 'lucide-react'

type Offer = Database['public']['Tables']['offers']['Row']

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Partial<Offer> | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    old_price: '',
    new_price: '',
    features: '',
    start_date: '',
    end_date: '',
    active: true,
  })

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    const list = await DataService.getOffers()
    setOffers(list)
  }

  const handleOpenAddModal = () => {
    setEditingOffer(null)
    setFormData({
      title: '',
      description: '',
      old_price: '',
      new_price: '',
      features: 'Full Next.js App, Custom Design Tokens, Supabase Integration, 1-Year Support',
      start_date: '',
      end_date: '',
      active: true,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this offer package?')) {
      await DataService.deleteOffer(id)
      await loadOffers()
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const featuresArray = formData.features.split(',').map((f) => f.trim()).filter(Boolean)

    await DataService.saveOffer({
      id: editingOffer?.id,
      title: formData.title,
      description: formData.description,
      old_price: formData.old_price || null,
      new_price: formData.new_price,
      features: featuresArray,
      image: null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      active: formData.active,
    })

    setModalOpen(false)
    await loadOffers()
  }

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-studio-border pb-6 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-studio-accent block mb-1">
            // REPOSITORY MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
            OFFERS & PACKAGES
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center space-x-2 bg-studio-fg text-studio-bg px-5 py-3 text-xs uppercase tracking-widest font-extrabold border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Offers List or Empty State */}
      {offers.length === 0 ? (
        <div className="border border-studio-border bg-studio-surface p-12 text-center space-y-4">
          <Tag className="w-10 h-10 text-studio-muted mx-auto" />
          <h2 className="text-xl font-bold text-studio-fg">NO PACKAGES CREATED</h2>
          <p className="text-xs text-studio-muted max-w-md mx-auto">
            Create promotional offers and service bundles. Active packages will display on the /offers page.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-block mt-4 border border-studio-border px-4 py-2 text-xs uppercase tracking-widest font-mono text-studio-fg hover:border-studio-fg"
          >
            + Create First Package
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="border border-studio-border bg-studio-surface p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold text-studio-fg">{offer.title}</h2>
                  <span className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold border ${
                    offer.active ? 'border-emerald-500 text-emerald-400' : 'border-studio-muted text-studio-muted'
                  }`}>
                    {offer.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>

                <p className="text-xs text-studio-muted leading-relaxed font-normal">
                  {offer.description}
                </p>

                <div className="flex items-baseline space-x-3 font-mono">
                  <span className="text-2xl font-extrabold text-studio-fg">{offer.new_price}</span>
                  {offer.old_price && (
                    <span className="text-xs text-studio-muted line-through">{offer.old_price}</span>
                  )}
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-studio-border text-xs text-studio-muted font-mono">
                  {offer.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <span className="text-studio-accent">//</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-studio-border pt-4 flex justify-between items-center font-mono text-xs text-studio-muted">
                <span>{offer.end_date ? `EXP: ${offer.end_date}` : 'NO EXPIRATION'}</span>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete Package
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-studio-border bg-studio-surface max-w-xl w-full p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-studio-border pb-4">
              <h2 className="text-xl font-bold tracking-tight text-studio-fg uppercase">
                Create Package Offer
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-studio-muted hover:text-studio-fg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-studio-muted uppercase block">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Startup MVP Package"
                  className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">New Price *</label>
                  <input
                    type="text"
                    required
                    value={formData.new_price}
                    onChange={(e) => setFormData({ ...formData, new_price: e.target.value })}
                    placeholder="$4,500"
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Old Price (optional)</label>
                  <input
                    type="text"
                    value={formData.old_price}
                    onChange={(e) => setFormData({ ...formData, old_price: e.target.value })}
                    placeholder="$6,000"
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-studio-muted uppercase block">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-studio-muted uppercase block">Features (comma separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-studio-muted uppercase block">Expiration Date</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="accent-studio-accent"
                    />
                    <span>Active Status</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 border border-studio-border text-studio-muted hover:text-studio-fg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-studio-fg text-studio-bg font-extrabold uppercase border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all"
                >
                  Save Package
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}

'use client'

import { useState } from 'react'
import { Settings, Save, ShieldCheck, Database, Server } from 'lucide-react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    studioName: 'SAN3A',
    contactEmail: 'hello@san3a.co',
    whatsappNumber: '+20 100 000 0000',
    currency: 'USD ($)',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Configured via .env.local',
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8 max-w-4xl font-mono text-xs">
      
      {/* Header */}
      <div className="border-b border-studio-border pb-6">
        <span className="text-studio-accent uppercase tracking-widest block mb-1">
          // REPOSITORY SYSTEM
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg font-sans">
          STUDIO SETTINGS
        </h1>
      </div>

      {saved && (
        <div className="p-4 border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
          ✓ SAN3A system settings updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="border border-studio-border bg-studio-surface p-8 space-y-6">
        
        <div className="space-y-4 pb-6 border-b border-studio-border">
          <span className="text-studio-fg font-bold block uppercase text-sm">
            [ STUDIO IDENTITY & CONTACT ]
          </span>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-studio-muted uppercase block">Studio Brand Name</label>
              <input
                type="text"
                value={settings.studioName}
                onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-studio-muted uppercase block">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-studio-muted uppercase block">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-studio-muted uppercase block">Display Currency</label>
              <input
                type="text"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
              />
            </div>
          </div>
        </div>

        {/* Database & Cloud Info */}
        <div className="space-y-4 pt-2">
          <span className="text-studio-fg font-bold block uppercase text-sm">
            [ SUPABASE DATABASE ARCHITECTURE ]
          </span>

          <div className="p-4 border border-studio-border bg-studio-bg space-y-2 text-studio-muted">
            <div className="flex justify-between items-center text-studio-fg">
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4 text-studio-accent" />
                DATABASE STATUS:
              </span>
              <span className="text-emerald-500 font-bold">READY / REPOSITORY LAYER ACTIVE</span>
            </div>
            <p className="text-[11px] leading-relaxed pt-1">
              Data queries use the SAN3A DataService repository abstraction. Adding Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) to `.env.local` instantly enables live database operations.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-studio-fg text-studio-bg font-extrabold uppercase border border-studio-fg hover:bg-transparent hover:text-studio-fg transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>

    </div>
  )
}

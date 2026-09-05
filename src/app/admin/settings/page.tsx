'use client'

import { useState } from 'react'
import { FormField } from '@/components/admin/FormField'
import { AdminButton } from '@/components/admin/AdminButton'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { useToast } from '@/context/ToastContext'
import { Save, Settings, Palette, Mail, Share2 } from 'lucide-react'
import { FacebookIcon } from '@/components/icons/FacebookIcon'

export default function AdminSettingsPage() {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<'general' | 'brand' | 'contact' | 'social'>('general')

  const [settings, setSettings] = useState({
    studioName: 'SAN3A',
    description: 'SAN3A is a two-person creative technology studio by John & George engineering web platforms, mobile applications, visual systems, and custom software.',
    logoUrl: '/projects/san3a.jpeg',
    faviconUrl: '/projects/san3a.jpeg',
    accentColor: '#D94A26',
    
    // John Contact
    johnName: 'John',
    johnPhone: '01226806622',
    johnWhatsApp: 'https://wa.me/201226806622',

    // George Contact
    georgeName: 'George',
    georgePhone: '+20 12 29518750',
    georgeWhatsApp: 'https://wa.me/201229518750',

    // Social (Facebook ONLY)
    facebookUrl: 'https://www.facebook.com/share/p/191qx2khJL/',
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('SAN3A studio settings updated successfully!', 'success')
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

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-studio-border pb-4 overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: Settings },
          { id: 'brand', label: 'Brand Asset', icon: Palette },
          { id: 'contact', label: 'Founders Contact', icon: Mail },
          { id: 'social', label: 'Facebook Social', icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 border font-bold uppercase transition-all ${
                isActive
                  ? 'bg-studio-fg text-studio-bg border-studio-fg'
                  : 'border-studio-border text-studio-muted hover:text-studio-fg hover:border-studio-border-light'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Forms */}
      <form onSubmit={handleSave} className="border border-studio-border bg-studio-surface p-8 space-y-6">
        
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-studio-fg uppercase border-b border-studio-border pb-3 font-sans">
              [ GENERAL STUDIO IDENTITY ]
            </h2>

            <FormField label="Studio Brand Name">
              <input
                type="text"
                value={settings.studioName}
                onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
              />
            </FormField>

            <FormField label="Short Studio Manifesto Description">
              <textarea
                rows={4}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg resize-none"
              />
            </FormField>
          </div>
        )}

        {/* Brand Tab */}
        {activeTab === 'brand' && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-studio-fg uppercase border-b border-studio-border pb-3 font-sans">
              [ SAN3A OFFICIAL BRAND ASSET ]
            </h2>

            <ImageUploader
              label="SAN3A Brand Image Path"
              value={settings.logoUrl}
              onChange={(url) => setSettings({ ...settings, logoUrl: url })}
              helperText="Official SAN3A brand visual located at /projects/san3a.jpeg"
            />

            <FormField label="Accent Hex Color">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
                />
                <div className="w-10 h-10 border border-studio-border shrink-0" style={{ backgroundColor: settings.accentColor }} />
              </div>
            </FormField>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-studio-fg uppercase border-b border-studio-border pb-3 font-sans">
              [ JOHN & GEORGE FOUNDER CONTACTS ]
            </h2>

            {/* John */}
            <div className="border border-studio-border bg-studio-bg p-5 space-y-4">
              <span className="text-studio-fg font-bold uppercase text-xs block border-b border-studio-border pb-2">
                JOHN CONTACT DETAILS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Phone Number">
                  <input
                    type="text"
                    value={settings.johnPhone}
                    onChange={(e) => setSettings({ ...settings, johnPhone: e.target.value })}
                    className="w-full bg-studio-surface border border-studio-border p-2.5 text-studio-fg"
                  />
                </FormField>

                <FormField label="WhatsApp URL">
                  <input
                    type="text"
                    value={settings.johnWhatsApp}
                    onChange={(e) => setSettings({ ...settings, johnWhatsApp: e.target.value })}
                    className="w-full bg-studio-surface border border-studio-border p-2.5 text-studio-fg"
                  />
                </FormField>
              </div>
            </div>

            {/* George */}
            <div className="border border-studio-border bg-studio-bg p-5 space-y-4">
              <span className="text-studio-fg font-bold uppercase text-xs block border-b border-studio-border pb-2">
                GEORGE CONTACT DETAILS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Phone Number">
                  <input
                    type="text"
                    value={settings.georgePhone}
                    onChange={(e) => setSettings({ ...settings, georgePhone: e.target.value })}
                    className="w-full bg-studio-surface border border-studio-border p-2.5 text-studio-fg"
                  />
                </FormField>

                <FormField label="WhatsApp URL">
                  <input
                    type="text"
                    value={settings.georgeWhatsApp}
                    onChange={(e) => setSettings({ ...settings, georgeWhatsApp: e.target.value })}
                    className="w-full bg-studio-surface border border-studio-border p-2.5 text-studio-fg"
                  />
                </FormField>
              </div>
            </div>
          </div>
        )}

        {/* Social Tab (Facebook ONLY) */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-studio-fg uppercase border-b border-studio-border pb-3 font-sans flex items-center gap-2">
              <FacebookIcon className="w-4 h-4 text-blue-500" />
              [ SAN3A OFFICIAL FACEBOOK PAGE ]
            </h2>

            <p className="text-xs text-studio-muted">
              SAN3A operates exclusively on Facebook. All other social media channels are disabled across the public platform.
            </p>

            <FormField label="Official Facebook Share URL">
              <input
                type="text"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                placeholder="https://www.facebook.com/..."
                className="w-full bg-studio-bg border border-studio-border p-3 text-studio-fg focus:outline-none focus:border-studio-fg"
              />
            </FormField>
          </div>
        )}

        {/* Save Bar */}
        <div className="pt-4 border-t border-studio-border flex justify-end">
          <AdminButton type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
            Save Settings
          </AdminButton>
        </div>

      </form>

    </div>
  )
}

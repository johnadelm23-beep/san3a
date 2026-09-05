'use client'

import { useState, useEffect } from 'react'
import { DataService } from '@/lib/services/dataService'
import type { Database } from '@/lib/types/database.types'
import { Layers, ToggleLeft, ToggleRight, Check, Edit2 } from 'lucide-react'

type Service = Database['public']['Tables']['services']['Row']

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])

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
  }

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="border-b border-studio-border pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-studio-accent block mb-1">
          // REPOSITORY MANAGEMENT
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-studio-fg">
          SERVICES & DISCIPLINES
        </h1>
        <p className="text-xs font-mono text-studio-muted mt-1">
          Configure active disciplines offered across /services and public routes.
        </p>
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
                <h2 className="text-lg font-bold tracking-tight text-studio-fg">
                  {service.title}
                </h2>
                <p className="text-xs text-studio-muted max-w-xl font-normal">
                  {service.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {service.deliverables.map((deliv) => (
                    <span key={deliv} className="font-mono text-[10px] bg-studio-bg border border-studio-border px-2 py-0.5 text-studio-muted">
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-t md:border-t-0 border-studio-border pt-4 md:pt-0 font-mono text-xs">
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
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

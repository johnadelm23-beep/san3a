'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { DataService } from '@/lib/services/dataService'
import type { Service } from '@/lib/types/admin.types'
import { ServiceEditor } from '@/components/admin/editors/ServiceEditor'
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton'

export default function EditServicePage() {
  const params = useParams()
  const id = params.id as string
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchService() {
      const list = await DataService.getServices()
      const found = list.find((s) => s.id === id)
      if (found) setService(found as any)
      setLoading(false)
    }
    fetchService()
  }, [id])

  if (loading) return <LoadingSkeleton rows={6} />
  if (!service) return <div className="font-mono text-xs text-studio-muted">Service not found.</div>

  return <ServiceEditor initialData={service} isEdit={true} />
}

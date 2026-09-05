'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { DataService } from '@/lib/services/dataService'
import type { Offer } from '@/lib/types/admin.types'
import { OfferEditor } from '@/components/admin/editors/OfferEditor'
import { LoadingSkeleton } from '@/components/admin/LoadingSkeleton'

export default function EditOfferPage() {
  const params = useParams()
  const id = params.id as string
  const [offer, setOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOffer() {
      const list = await DataService.getOffers()
      const found = list.find((o) => o.id === id)
      if (found) setOffer(found as any)
      setLoading(false)
    }
    fetchOffer()
  }, [id])

  if (loading) return <LoadingSkeleton rows={6} />
  if (!offer) return <div className="font-mono text-xs text-studio-muted">Offer package not found.</div>

  return <OfferEditor initialData={offer} isEdit={true} />
}

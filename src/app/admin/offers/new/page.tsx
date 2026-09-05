import { OfferEditor } from '@/components/admin/editors/OfferEditor'

export const metadata = {
  title: 'Create Offer — SAN3A Admin',
}

export default function NewOfferPage() {
  return <OfferEditor isEdit={false} />
}

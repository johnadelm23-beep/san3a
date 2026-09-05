import { ServiceEditor } from '@/components/admin/editors/ServiceEditor'

export const metadata = {
  title: 'Add Service — SAN3A Admin',
}

export default function NewServicePage() {
  return <ServiceEditor isEdit={false} />
}

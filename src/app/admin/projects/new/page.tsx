import { ProjectEditor } from '@/components/admin/editors/ProjectEditor'

export const metadata = {
  title: 'Add Project — SAN3A Admin',
}

export default function NewProjectPage() {
  return <ProjectEditor isEdit={false} />
}
